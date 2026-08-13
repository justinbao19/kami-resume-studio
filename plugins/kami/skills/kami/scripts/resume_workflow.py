#!/usr/bin/env python3
"""Deterministic helpers for the Kami Resume agent workflow.

The agent owns editorial judgment. This module owns repeatable bookkeeping:
gap detection, target-job keyword matching, interview question generation,
template/theme routing, and a small semantic HTML renderer for handoff.

Examples:
  python3 scripts/resume_workflow.py analyze dossier.json -o analysis.json
  python3 scripts/resume_workflow.py questions dossier.json analysis.json -o questions.json
  python3 scripts/resume_workflow.py route dossier.json analysis.json -o route.json
  python3 scripts/resume_workflow.py render dossier.json route.json -o resume.html
  python3 scripts/resume_workflow.py render dossier.json route.json --document-type cover-letter -o cover-letter.html
  python3 scripts/resume_workflow.py all dossier.json -o output/resume
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = ROOT / "references" / "resume-template-catalog.json"

ROLE_KEYWORDS: dict[str, set[str]] = {
    "product": {"product", "产品", "roadmap", "需求", "用户研究", "prd", "产品经理"},
    "software": {"software", "backend", "frontend", "fullstack", "工程师", "开发", "api", "系统"},
    "data": {"data", "数据", "analytics", "分析", "sql", "实验", "指标"},
    "ai": {"ai", "ml", "machine learning", "machine-learning", "模型", "机器学习", "生成式", "llm", "agent", "评测"},
    "security": {"security", "安全", "risk", "compliance", "漏洞", "威胁"},
    "infrastructure": {"infra", "platform", "平台", "云", "devops", "kubernetes", "可靠性"},
    "strategy": {"strategy", "战略", "咨询", "市场", "商业分析", "corporate strategy"},
    "consulting": {"consulting", "咨询", "客户", "case", "解决方案"},
    "executive": {"director", "head", "vp", "chief", "总监", "负责人", "副总裁", "总经理"},
    "design": {"design", "设计", "ux", "ui", "视觉", "交互", "品牌"},
    "brand": {"brand", "品牌", "内容", "content", "creative", "创意"},
    "sales": {"sales", "销售", "bd", "business development", "大客户", "签约"},
    "growth": {"growth", "增长", "转化", "投放", "留存", "acquisition"},
    "operations": {"operations", "运营", "流程", "交付", "项目管理", "program"},
    "supply-chain": {"supply chain", "供应链", "采购", "库存", "物流"},
    "manufacturing": {"manufacturing", "制造", "工厂", "生产", "质量"},
    "research": {"research", "研究", "论文", "实验室", "方法论"},
    "education": {"education", "教育", "教学", "课程", "学校"},
    "policy": {"policy", "政策", "公共事务", "政府", "合规"},
    "healthcare": {"healthcare", "医疗", "临床", "患者", "医院"},
    "student": {"student", "学生", "校招", "应届", "graduate", "intern", "实习"},
    "generalist": {"generalist", "综合", "跨职能", "管理"},
}

TEMPLATE_FAMILIES = {
    "product": "editorial",
    "strategy": "swiss-grid",
    "consulting": "swiss-grid",
    "generalist": "editorial",
    "software": "cupertino",
    "data": "technical",
    "ai": "technical",
    "security": "technical",
    "infrastructure": "technical",
    "executive": "atelier-serif",
    "director": "executive",
    "founder": "executive",
    "management": "executive",
    "design": "creative",
    "brand": "atelier-serif",
    "content": "creative",
    "creative": "creative",
    "media": "creative",
    "sales": "sales-impact",
    "growth": "sales-impact",
    "business-development": "sales-impact",
    "partnerships": "sales-impact",
    "operations": "aqua-ledger",
    "supply-chain": "operations-practical",
    "manufacturing": "operations-practical",
    "program": "operations-practical",
    "service": "operations-practical",
    "trades": "operations-practical",
    "logistics": "operations-practical",
    "research": "academic",
    "education": "academic",
    "policy": "academic",
    "healthcare": "academic",
    "academic": "academic",
    "student": "early-career",
    "graduate": "early-career",
    "internship": "early-career",
    "career-starter": "early-career",
}

THEME_DARK_FAMILIES = {"technical", "creative", "sales-impact", "early-career"}
CONSERVATIVE_FAMILIES = {"ats-classic", "academic", "operations-practical", "executive"}
PHOTO_TEMPLATES = {"editorial", "technical", "creative", "early-career", "aqua-ledger", "atelier-serif", "cupertino", "swiss-grid"}
ICON_SOCIAL_TEMPLATES = {"technical", "creative", "early-career", "aqua-ledger"}
SOCIAL_ICON_PATHS = {
    "linkedin": "<path d='M5.2 7.3A1.7 1.7 0 1 0 5.2 4a1.7 1.7 0 0 0 0 3.3ZM3.8 9h2.8v8H3.8V9Zm4.5 0h2.7v1.1c.6-.8 1.5-1.4 2.8-1.4 2.8 0 3.4 1.8 3.4 4.2V17h-2.8v-3.7c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V17H8.3V9Z'/>",
    "github": "<path d='M10 3.2a6.8 6.8 0 0 0-2.2 13.2c.3.1.4-.1.4-.3v-1.2c-1.7.4-2.1-.8-2.1-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.7.1 1.1.7 1.1.7.6 1.1 1.6.8 2 .6.1-.4.2-.8.4-1-1.4-.2-2.8-.7-2.8-3.1 0-.7.2-1.2.6-1.7-.1-.2-.3-.8.1-1.7 0 0 .5-.2 1.8.6.5-.1 1-.2 1.5-.2s1 0 1.5.2c1.3-.9 1.8-.6 1.8-.6.4.9.2 1.5.1 1.7.4.5.6 1 .6 1.7 0 2.4-1.4 2.9-2.8 3.1.2.2.4.6.4 1.2v1.8c0 .2.1.4.4.3A6.8 6.8 0 0 0 10 3.2Z'/>",
    "x": "<path d='M4 4h3.3l2.4 3.2L12.8 4H16l-4.8 5.4L16.2 16h-3.3l-2.8-3.7L6.6 16H3.4l5-5.9L4 4Zm2.2 1.3 6.9 9.4h.9L7.1 5.3h-.9Z'/>",
}
PAPER_TONES = {"white": "#FFFFFF", "ivory": "#FFFCF4"}


def load_json(path: Path) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise SystemExit(f"ERROR: file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(f"ERROR: invalid JSON in {path}: {exc}") from exc
    if not isinstance(data, dict):
        raise SystemExit(f"ERROR: expected a JSON object: {path}")
    return data


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def hex_rgba(value: str, alpha: float) -> str:
    """Convert catalog hex colors to a WeasyPrint-friendly rgba value."""
    raw = value.lstrip("#")
    if len(raw) != 6:
        return value
    try:
        red, green, blue = (int(raw[offset : offset + 2], 16) for offset in (0, 2, 4))
    except ValueError:
        return value
    return f"rgba({red}, {green}, {blue}, {alpha:.2f})"


def safe_href(value: Any) -> str:
    raw = text_of(value).strip()
    if not raw:
        return ""
    if re.match(r"^[a-z][a-z0-9+.-]*:", raw, re.I) and not re.match(r"^https?://", raw, re.I):
        return ""
    candidate = raw if re.match(r"^https?://", raw, re.I) else f"https://{raw}"
    parsed = urlparse(candidate)
    return candidate if parsed.scheme in {"http", "https"} and parsed.netloc else ""


def safe_photo_src(value: Any) -> str:
    raw = text_of(value).strip()
    if re.match(r"^data:image/(?:png|jpeg|jpg|webp);base64,", raw, re.I):
        return raw
    if raw and not re.match(r"^[a-z][a-z0-9+.-]*:", raw, re.I):
        return raw
    return ""


def text_of(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, list):
        return " ".join(text_of(item) for item in value)
    if isinstance(value, dict):
        return " ".join(text_of(item) for item in value.values())
    return str(value)


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def tokenize(text: str) -> set[str]:
    clean = normalize(text)
    words = set(re.findall(r"[a-z][a-z0-9+#.-]{1,30}|[\u3400-\u9fff]{2,12}", clean))
    return words


def parse_date(value: Any, *, end: bool = False) -> date:
    raw = normalize(text_of(value))
    if not raw:
        return date.today()
    present_tokens = {"present", "至今", "current", "now"}
    if end and any(token in raw for token in present_tokens):
        return date.max
    if raw in present_tokens:
        return date.max if end else date.today()
    matches = list(re.finditer(r"(20\d{2})(?:[./年-](\d{1,2}))?", raw))
    if matches:
        parsed = [date(int(match.group(1)), int(match.group(2) or 1), 1) for match in matches]
        return (max if end else min)(parsed)
    return date.min


def position_text(position: dict[str, Any]) -> str:
    return text_of({k: v for k, v in position.items() if k not in {"source_ids", "evidence"}})


def latest_position(dossier: dict[str, Any]) -> dict[str, Any] | None:
    positions = dossier.get("positions", [])
    if not positions:
        return None
    return max(
        positions,
        key=lambda item: (
            parse_date(item.get("end") or item.get("period"), end=True),
            parse_date(item.get("start") or item.get("period")),
        ),
    )


def bullets_for(position: dict[str, Any]) -> list[str]:
    raw = position.get("bullets", position.get("highlights", position.get("description", [])))
    if isinstance(raw, str):
        return [line.strip() for line in raw.splitlines() if line.strip()]
    return [text_of(item).strip() for item in raw if text_of(item).strip()]


def metric_bullets(bullets: list[str]) -> list[str]:
    pattern = re.compile(r"(?:\d|%|万|亿|k\b|m\b|million|billion|users?|客户|团队|次|天|月|年)", re.I)
    return [bullet for bullet in bullets if pattern.search(bullet)]


def position_gaps(position: dict[str, Any] | None) -> list[str]:
    if not position:
        return ["latest_role_missing"]
    gaps: list[str] = []
    bullets = bullets_for(position)
    if not text_of(position.get("title")):
        gaps.append("latest_role_title_missing")
    if not text_of(position.get("company")):
        gaps.append("latest_role_company_missing")
    if len(bullets) < 2:
        gaps.append("latest_role_needs_two_bullets")
    if bullets and len(metric_bullets(bullets)) / len(bullets) < 0.5:
        gaps.append("latest_role_needs_scale_or_result")
    if not text_of(position.get("ownership")):
        gaps.append("latest_role_ownership_unclear")
    if not text_of(position.get("methods")):
        gaps.append("latest_role_methods_missing")
    return gaps


def target_job(dossier: dict[str, Any]) -> dict[str, Any]:
    jobs = dossier.get("target_jobs", [])
    return jobs[0] if jobs else {}


def job_text(job: dict[str, Any]) -> str:
    return text_of(job.get("description") or job)


def role_scores(job: dict[str, Any], dossier: dict[str, Any]) -> dict[str, int]:
    combined = normalize(" ".join([job_text(job), text_of(dossier.get("candidate"))]))
    scores: dict[str, int] = {}
    for family, words in ROLE_KEYWORDS.items():
        scores[family] = sum(1 for word in words if word in combined)
    return dict(sorted(scores.items(), key=lambda pair: (-pair[1], pair[0])))


def job_requirements(job: dict[str, Any]) -> list[str]:
    raw = job.get("requirements") or job.get("responsibilities") or []
    if isinstance(raw, str):
        return [line.strip(" -*•\t") for line in raw.splitlines() if line.strip(" -*•\t")]
    return [text_of(item).strip() for item in raw if text_of(item).strip()]


def evidence_text(dossier: dict[str, Any]) -> str:
    return normalize(" ".join([
        text_of(dossier.get("candidate")),
        text_of(dossier.get("positions")),
        text_of(dossier.get("projects")),
        text_of(dossier.get("skills")),
        text_of(dossier.get("education")),
    ]))


REQUIREMENT_SYNONYMS = {
    "reliability": {"reliability", "availability", "slo", "sli", "incident"},
    "evaluation": {"evaluation", "评测", "评估", "quality"},
    "strategy": {"strategy", "roadmap", "路线图", "技术战略"},
    "commercialization": {"commercialization", "商业化", "revenue", "合同额", "客户"},
}


def requirement_satisfied(requirement: str, evidence: str) -> bool:
    required = normalize(requirement)
    if not required:
        return True
    if required in evidence:
        return True
    required_tokens = tokenize(required)
    evidence_tokens = tokenize(evidence)
    if required_tokens and required_tokens <= evidence_tokens:
        return True
    for token in required_tokens:
        alternatives = REQUIREMENT_SYNONYMS.get(token, {token})
        if not (alternatives & evidence_tokens or any(item in evidence for item in alternatives)):
            return False
    return bool(required_tokens)


def period_bounds(position: dict[str, Any]) -> tuple[date, date]:
    period = position.get("period")
    return (
        parse_date(position.get("start") or period),
        parse_date(position.get("end") or period, end=True),
    )


def detect_conflicts(dossier: dict[str, Any]) -> list[dict[str, Any]]:
    """Find conservative, reviewable conflicts without guessing which source is right."""
    conflicts: list[dict[str, Any]] = []
    for item in dossier.get("conflicts", []) or []:
        if isinstance(item, dict):
            conflicts.append(item)
        else:
            conflicts.append({"type": "declared_conflict", "detail": text_of(item)})

    positions = [item for item in dossier.get("positions", []) if isinstance(item, dict)]
    for index, left in enumerate(positions):
        left_company = normalize(text_of(left.get("company")))
        if not left_company:
            continue
        left_start, left_end = period_bounds(left)
        for right in positions[index + 1 :]:
            right_company = normalize(text_of(right.get("company")))
            if right_company != left_company:
                continue
            right_start, right_end = period_bounds(right)
            if not (left_start <= right_end and right_start <= left_end):
                continue
            left_title = text_of(left.get("title"))
            right_title = text_of(right.get("title"))
            if normalize(left_title) != normalize(right_title):
                conflicts.append({
                    "type": "overlapping_position_title",
                    "company": text_of(left.get("company")),
                    "positions": [left_title, right_title],
                    "periods": [text_of(left.get("period")), text_of(right.get("period"))],
                    "source_ids": sorted(set(left.get("source_ids", [])) | set(right.get("source_ids", []))),
                    "detail": "同一公司时间段重叠但岗位名称不同，需要确认是否为晋升、并行职责或来源错误。",
                })
    return conflicts


def analyze(dossier: dict[str, Any]) -> dict[str, Any]:
    candidate = dossier.get("candidate", {})
    job = target_job(dossier)
    latest = latest_position(dossier)
    bullets = bullets_for(latest or {})
    sources = dossier.get("sources", [])
    source_types = {normalize(text_of(source.get("type"))) for source in sources if isinstance(source, dict)}
    job_words = tokenize(job_text(job))
    evidence = evidence_text(dossier)
    missing_requirements = [req for req in job_requirements(job) if not requirement_satisfied(req, evidence)]
    if not job:
        missing_requirements.append("target_job_missing")
    if "resume" not in source_types and not any("pdf" in item for item in source_types):
        source_gap = "old_resume_missing"
    else:
        source_gap = None
    gaps = position_gaps(latest)
    conflicts = detect_conflicts(dossier)
    if conflicts:
        gaps.append("source_conflicts")
    if missing_requirements:
        gaps.append("target_requirements_missing")
    if source_gap:
        gaps.append(source_gap)
    if not candidate.get("name"):
        gaps.append("candidate_name_missing")
    if not dossier.get("education"):
        gaps.append("education_missing")
    if not dossier.get("skills"):
        gaps.append("skills_missing")
    return {
        "schema_version": 1,
        "candidate": {"name": candidate.get("name", ""), "headline": candidate.get("headline", "")},
        "source_count": len(sources),
        "source_types": sorted(source_types),
        "latest_position": {
            "company": latest.get("company", "") if latest else "",
            "title": latest.get("title", "") if latest else "",
            "period": latest.get("period", "") if latest else "",
            "source_ids": latest.get("source_ids", []) if latest else [],
            "bullet_count": len(bullets),
            "metric_bullet_count": len(metric_bullets(bullets)),
        },
        "role_scores": role_scores(job, dossier),
        "top_role_families": [family for family, score in list(role_scores(job, dossier).items())[:3] if score > 0],
        "target_requirements": job_requirements(job),
        "missing_target_requirements": missing_requirements,
        "conflicts": conflicts,
        "source_coverage": {
            "positions_with_source": sum(1 for item in dossier.get("positions", []) if item.get("source_ids")),
            "positions_total": len(dossier.get("positions", [])),
        },
        "gaps": sorted(set(gaps)),
        "readiness": {
            "score": max(0, 100 - len(set(gaps)) * 10 - len(missing_requirements) * 8),
            "latest_role_ready": len(position_gaps(latest)) == 0,
            "target_fit_ready": bool(job) and not missing_requirements,
        },
    }


def question_for_gap(gap: str, locale: str) -> str:
    zh = {
        "latest_role_missing": "你最近一份工作是什么公司、什么岗位、从何时到何时？最核心的业务结果是什么？",
        "latest_role_title_missing": "最近一份工作的正式岗位名称是什么？如果对外使用了更准确的英文或职级，也请一并提供。",
        "latest_role_company_missing": "最近一份工作所在的公司或业务线名称是什么？可以用脱敏后的行业称呼。",
        "latest_role_needs_two_bullets": "最近一份工作中，你亲自负责的两项最重要工作是什么？请分别说明动作、范围和结果。",
        "latest_role_needs_scale_or_result": "最近一份工作有哪些可验证的规模或结果？可以从客户/用户数、收入、转化、成本、效率、质量、团队、项目量或周期中选择。",
        "latest_role_ownership_unclear": "最近一份工作中哪些结果由你直接负责，哪些是团队共同完成？请为最重要的两项工作标注 ownership 边界。",
        "latest_role_methods_missing": "你是通过哪些具体机制、方法或工具完成最近一份工作的？例如评测、流程、实验、系统、销售方法或管理机制。",
        "old_resume_missing": "旧简历或历史版本目前是否可提供？如果没有，哪些平台或材料能作为职业经历的基线？",
        "candidate_name_missing": "简历中希望使用的姓名或英文名是什么？",
        "education_missing": "最高学历、学校、专业和时间范围是什么？",
        "skills_missing": "与目标岗位最相关的 5-8 项技能、工具或方法是什么？",
        "target_job_missing": "目标岗位名称、行业和最想申请的 1-2 个岗位链接或 JD 是什么？",
        "target_requirements_missing": "目标岗位要求中有几项还没有对应证据。请针对这些要求各给一个真实案例、你承担的范围，以及能验证的结果。",
        "source_conflicts": "我发现部分经历在不同来源中的日期或岗位名称存在重叠/冲突。请确认这是晋升、并行职责，还是某个来源需要更正，并说明应保留的正式写法。",
    }
    en = {
        "latest_role_missing": "What was your most recent company, title, and date range? What was the most important business outcome?",
        "latest_role_title_missing": "What was the formal title of your most recent role, including the English title or level if relevant?",
        "latest_role_company_missing": "What company or business line did you work in most recently? A redacted industry label is fine.",
        "latest_role_needs_two_bullets": "What were the two most important things you personally owned in the latest role? Include action, scope, and result for each.",
        "latest_role_needs_scale_or_result": "What defensible scale or result can you share for the latest role: users, revenue, conversion, cost, efficiency, quality, team, volume, or cycle time?",
        "latest_role_ownership_unclear": "Which outcomes did you directly own versus contribute to with the team? Mark the ownership boundary for the two most important items.",
        "latest_role_methods_missing": "Which concrete mechanisms, methods, or tools produced the latest-role outcomes: evaluation, process, experiments, systems, sales motion, or management practice?",
        "old_resume_missing": "Can you provide an older resume or another baseline source? If not, which platforms or materials should anchor the career history?",
        "candidate_name_missing": "What name or English name should appear on the resume?",
        "education_missing": "What are your highest degree, school, field, and date range?",
        "skills_missing": "What 5-8 skills, tools, or methods are most relevant to the target role?",
        "target_job_missing": "What target role, industry, and one or two job descriptions should guide the tailoring?",
        "target_requirements_missing": "Several high-priority job requirements do not yet have evidence. Give one real example for each, including your scope and a defensible result.",
        "source_conflicts": "Some sources show overlapping dates or different titles for the same role. Was this a promotion, parallel scope, or source error, and which formal wording should the resume use?",
    }
    return (en if locale == "en" else zh).get(gap, gap)


def questions(dossier: dict[str, Any], analysis: dict[str, Any]) -> dict[str, Any]:
    locale = text_of(dossier.get("candidate", {}).get("preferences", {}).get("output_language", "zh"))
    if locale == "bilingual":
        locale = "zh"
    gaps = list(dict.fromkeys(analysis.get("gaps", []) + ["target_job_missing"] if "target_job_missing" in analysis.get("gaps", []) else analysis.get("gaps", [])))
    ordered = [
        "latest_role_missing", "latest_role_title_missing", "latest_role_company_missing",
        "latest_role_needs_two_bullets", "latest_role_needs_scale_or_result",
        "latest_role_ownership_unclear", "latest_role_methods_missing", "old_resume_missing",
        "source_conflicts", "target_requirements_missing", "target_job_missing", "education_missing", "skills_missing", "candidate_name_missing",
    ]
    selected = [gap for gap in ordered if gap in gaps][:6]
    return {
        "schema_version": 1,
        "batch": 1,
        "purpose": "latest-role reconstruction and blocking evidence gaps",
        "questions": [{"id": gap, "gap": gap, "prompt": question_for_gap(gap, locale)} for gap in selected],
        "stop_when": [
            "latest role has two evidence-rich bullets",
            "at least half of selected bullets contain scale or result",
            "target role is known",
            "material date/title conflicts are resolved",
        ],
    }


def choose_theme(dossier: dict[str, Any], template: str) -> str:
    preference = dossier.get("candidate", {}).get("preferences", {}).get("theme_preference", "auto")
    if preference in {"light", "dark"}:
        return preference
    job = target_job(dossier)
    job_text_value = normalize(job_text(job))
    if template in CONSERVATIVE_FAMILIES:
        return "light"
    if any(word in job_text_value for word in {"government", "政府", "bank", "银行", "law", "法律", "hospital", "医院"}):
        return "light"
    return "dark" if template in THEME_DARK_FAMILIES else "light"


def choose_paper_tone(dossier: dict[str, Any], theme: str, *, ats: bool = False) -> str:
    if ats:
        return "white"
    preference = dossier.get("candidate", {}).get("preferences", {}).get("paper_tone_preference", "auto")
    if theme == "light" and preference in {"white", "ivory"}:
        return preference
    return "auto"


def route(dossier: dict[str, Any], analysis: dict[str, Any]) -> dict[str, Any]:
    family = (analysis.get("top_role_families") or ["generalist"])[0]
    primary = TEMPLATE_FAMILIES.get(family, "editorial")
    theme = choose_theme(dossier, primary)
    target = target_job(dossier)
    return {
        "schema_version": 1,
        "primary": {"template": primary, "theme": theme, "paper_tone": choose_paper_tone(dossier, theme)},
        "ats_companion": None if primary == "ats-classic" and theme == "light" else {"template": "ats-classic", "theme": "light", "paper_tone": "white"},
        "role_family": family,
        "target_role": target.get("title", target.get("role", "")),
        "reasons": [
            f"role family scored highest as {family}",
            f"template emphasizes {primary.replace('-', ' ')} evidence",
            "light ATS companion protects conservative application channels" if primary != "ats-classic" or theme != "light" else "primary is already ATS-safe",
        ],
        "rejected": [],
    }


def render(
    dossier: dict[str, Any],
    route_data: dict[str, Any],
    output: Path,
    *,
    ats: bool = False,
    document_type: str = "resume",
) -> None:
    route_choice = route_data.get("ats_companion") if ats else route_data.get("primary")
    route_choice = route_choice or route_data.get("primary") or {"template": "editorial", "theme": "light"}
    candidate = dossier.get("candidate", {})
    locale = candidate.get("preferences", {}).get("output_language", "zh")
    if locale == "bilingual":
        locale = "zh"
    labels = {
        "zh": {"profile": "个人简介", "experience": "工作经历", "projects": "项目经历", "education": "教育背景", "skills": "技能"},
        "en": {"profile": "Profile", "experience": "Experience", "projects": "Projects", "education": "Education", "skills": "Skills"},
    }[locale]
    template = route_choice.get("template", "editorial")
    theme = route_choice.get("theme", "light")
    paper_tone = route_choice.get("paper_tone", choose_paper_tone(dossier, theme, ats=ats))
    positions = dossier.get("positions", [])
    bullets = []
    for position in positions:
        items = "".join(f"<li>{html.escape(item)}</li>" for item in bullets_for(position))
        bullets.append(
            f"<article class='entry'><div class='entry-head'><h3>{html.escape(text_of(position.get('company')))}</h3>"
            f"<span>{html.escape(text_of(position.get('period')))}</span></div>"
            f"<p class='role'>{html.escape(text_of(position.get('title')))}</p><ul>{items}</ul></article>"
        )
    projects = []
    for project in dossier.get("projects", []):
        if not isinstance(project, dict):
            continue
        raw_highlights = project.get("highlights", project.get("bullets", []))
        if isinstance(raw_highlights, str):
            project_bullets = [line.strip() for line in raw_highlights.splitlines() if line.strip()]
        else:
            project_bullets = [text_of(item).strip() for item in raw_highlights if text_of(item).strip()]
        items = "".join(f"<li>{html.escape(item)}</li>" for item in project_bullets)
        href = safe_href(project.get("link"))
        name = html.escape(text_of(project.get("name") or project.get("title")))
        heading = f"<a href='{html.escape(href)}' target='_blank' rel='noopener noreferrer'>{name}</a>" if href else name
        projects.append(
            f"<article class='entry project-entry'><div class='entry-head'><h3>{heading}</h3>"
            f"<span>{html.escape(text_of(project.get('period')))}</span></div>"
            f"<p class='role'>{html.escape(text_of(project.get('role') or project.get('stack')))}</p>"
            f"<p class='project-description'>{html.escape(text_of(project.get('description')))}</p><ul>{items}</ul></article>"
        )
    skill_text = ", ".join(text_of(item) for item in dossier.get("skills", []))
    education = "".join(
        f"<li><strong>{html.escape(text_of(item.get('school')))}</strong> "
        f"{html.escape(text_of(item.get('degree')))} {html.escape(text_of(item.get('period')))}</li>"
        for item in dossier.get("education", [])
    )
    catalog = load_json(CATALOG_PATH)
    spec = next((item for item in catalog["templates"] if item["id"] == template), None)
    if spec is None:
        spec = next(item for item in catalog["templates"] if item["id"] == "editorial")
    palette = dict(spec[theme])
    if theme == "light" and paper_tone in PAPER_TONES:
        palette["paper"] = PAPER_TONES[paper_tone]
    accent_soft = hex_rgba(palette["accent"], 0.14)
    title = text_of(candidate.get("headline")) or text_of(target_job(dossier).get("title"))
    socials = candidate.get("socials", {}) if isinstance(candidate.get("socials"), dict) else {}
    social_links = []
    for platform, label in (("linkedin", "LinkedIn"), ("x", "X"), ("github", "GitHub")):
        item = socials.get(platform, {})
        if isinstance(item, str):
            item = {"enabled": True, "url": item}
        href = safe_href(item.get("url")) if isinstance(item, dict) and item.get("enabled") else ""
        if href:
            handle = urlparse(href).path.rstrip("/").split("/")[-1] or urlparse(href).netloc
            if template in ICON_SOCIAL_TEMPLATES:
                icon = SOCIAL_ICON_PATHS[platform]
                content = f"<svg viewBox='0 0 20 20' aria-hidden='true'>{icon}</svg>"
                class_name = "icon-social"
            else:
                content = html.escape(f"{label} @{handle.lstrip('@')}")
                class_name = "text-social"
            social_links.append(
                f"<a class='{class_name}' href='{html.escape(href)}' target='_blank' "
                f"rel='noopener noreferrer' aria-label='{label}'>{content}</a>"
            )
    social_html = f"<span class='socials'>{''.join(social_links)}</span>" if social_links else ""
    photo_src = safe_photo_src(candidate.get("photo")) if template in PHOTO_TEMPLATES and not ats else ""
    photo_placeholder = "<span class='avatar photo-placeholder' role='img' aria-label='Photo placeholder'><svg viewBox='0 0 48 48' aria-hidden='true'><circle cx='24' cy='17' r='8'/><path d='M10 40c1.4-9 6.6-13.5 14-13.5S36.6 31 38 40'/></svg></span>"
    if photo_src:
        photo_html = f"<img class='avatar' src='{html.escape(photo_src)}' alt='{html.escape(text_of(candidate.get('name')))}'>"
    elif template in PHOTO_TEMPLATES and not ats:
        photo_html = photo_placeholder
    else:
        photo_html = ""
    if document_type in {"cover-letter", "recommendation"}:
        letter = dossier.get("cover_letter", {}) if isinstance(dossier.get("cover_letter"), dict) else {}
        target = target_job(dossier)
        is_recommendation = document_type == "recommendation"
        heading = (
            ("推荐信" if locale == "zh" else "Letter of Recommendation")
            if is_recommendation
            else text_of(letter.get("subject") or ("求职信" if locale == "zh" else "Cover Letter"))
        )
        raw_body = letter.get("body", "")
        paragraphs = (
            [text_of(item).strip() for item in raw_body if text_of(item).strip()]
            if isinstance(raw_body, list)
            else [item.strip() for item in re.split(r"\n\s*\n", text_of(raw_body)) if item.strip()]
        )
        if not paragraphs:
            summary = text_of(dossier.get("resume_content", {}).get("summary") or candidate.get("summary"))
            paragraphs = [summary] if summary else []
        signer = text_of(letter.get("recommender_name") if is_recommendation else letter.get("signer")) or text_of(candidate.get("name"))
        signer_title = text_of(letter.get("recommender_title") if is_recommendation else candidate.get("headline"))
        body_html = "".join(f"<p>{html.escape(item)}</p>" for item in paragraphs)
        letter_html = f"""<!doctype html>
<html lang='{locale}'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>{html.escape(heading)} - {html.escape(text_of(candidate.get('name')))}</title>
<style>
@page {{ size:A4; margin:0; }}
:root {{ --paper:{palette['paper']}; --ink:{palette['ink']}; --accent:{palette['accent']}; --line:{hex_rgba(palette['accent'], .25)}; }}
* {{ box-sizing:border-box; }} body {{ margin:0; background:var(--paper); color:var(--ink); font-family:Charter,Georgia,serif; }}
.page {{ min-height:297mm; padding:18mm; display:flex; flex-direction:column; }}
header {{ display:flex; gap:6mm; align-items:center; padding-bottom:7mm; border-bottom:.4pt solid var(--line); }}
.avatar {{ width:22mm; height:27mm; object-fit:cover; }} .photo-placeholder {{ display:grid; place-items:center; color:var(--accent); background:rgba(127,127,127,.08); }} .photo-placeholder svg {{ width:48%; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; }} h1 {{ margin:0; font-size:25pt; }}
.eyebrow {{ margin:0 0 2mm; color:var(--accent); font:700 8pt Arial,sans-serif; letter-spacing:.12em; text-transform:uppercase; }}
.meta {{ display:grid; grid-template-columns:repeat(3,1fr); gap:5mm; padding:5mm 0; border-bottom:.4pt solid var(--line); color:var(--accent); font:8.5pt Arial,sans-serif; }}
.letter-body {{ max-width:155mm; padding-top:12mm; font-size:11pt; line-height:1.75; }} .letter-body p {{ margin:0 0 6mm; }}
.closing {{ padding-top:4mm; }} .closing span {{ font:8.5pt Arial,sans-serif; opacity:.75; }}
footer {{ margin-top:auto; padding-top:5mm; border-top:.4pt solid var(--line); font:8pt Arial,sans-serif; opacity:.75; }}
body.aqua-ledger .page {{ background:linear-gradient(145deg,var(--paper),{hex_rgba(palette['accent'], .12)}); }}
body.atelier-serif .page {{ padding-left:65mm; background:linear-gradient(90deg,{hex_rgba(palette['ink'], .10)} 0 52mm,var(--paper) 52mm); }}
body.cupertino {{ font-family:"Helvetica Neue",Arial,sans-serif; }}
body.swiss-grid .page {{ background:linear-gradient(90deg,transparent 0 43mm,var(--line) 43mm 43.3mm,transparent 43.3mm); }}
@media print {{ body {{ print-color-adjust:exact; -webkit-print-color-adjust:exact; }} }}
</style></head><body class='{template} theme-{theme}'><main class='page'>
<header>{photo_html}<div><p class='eyebrow'>{html.escape(heading)}</p><h1>{html.escape(text_of(candidate.get('name')))}</h1><span>{html.escape(title)}</span></div></header>
<div class='meta'><span>{html.escape(text_of(letter.get('date')))}</span><span>{html.escape(text_of(letter.get('company') or target.get('company')))}</span><span>{html.escape(text_of(letter.get('role') or target.get('title') or target.get('role')))}</span></div>
<div class='letter-body'><p><strong>{html.escape(text_of(letter.get('recipient')))}</strong></p>{body_html}<p class='closing'>{html.escape(text_of(letter.get('closing')))}<br><strong>{html.escape(signer)}</strong><br><span>{html.escape(signer_title)}</span></p></div>
<footer>{html.escape(' · '.join(text_of(candidate.get(key)) for key in ('email','phone','location','website') if candidate.get(key)))}</footer>
</main></body></html>"""
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(letter_html, encoding="utf-8")
        return
    html_doc = f"""<!doctype html>
<html lang='{locale}'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>{html.escape(text_of(candidate.get('name')))} - {html.escape(title)}</title>
<style>
@page {{ size: A4; margin: 14mm; }}
:root {{ --paper: {palette['paper']}; --ink: {palette['ink']}; --accent: {palette['accent']}; --accent-soft: {accent_soft}; }}
* {{ box-sizing: border-box; }} body {{ margin:0; background:var(--paper); color:var(--ink); font-family: Charter, Georgia, serif; line-height:1.5; }}
.page {{ max-width: 180mm; margin:auto; }} header {{ border-bottom:1px solid var(--accent); padding-bottom:8mm; margin-bottom:7mm; }}
h1 {{ margin:0 0 2mm; font-size:28pt; }} .title {{ margin:0; color:var(--accent); font:600 10pt Arial,sans-serif; letter-spacing:.08em; text-transform:uppercase; }}
.identity {{ min-width:0; display:flex; align-items:center; gap:5mm; }} .identity > div {{ min-width:0; }} .avatar {{ width:20mm; height:20mm; flex:0 0 auto; border-radius:50%; object-fit:cover; object-position:center 35%; }} .photo-placeholder {{ display:grid; place-items:center; color:var(--accent); background:var(--accent-soft); }} .photo-placeholder svg {{ width:48%; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; }} h1 {{ overflow-wrap:anywhere; }} .contact {{ margin-top:4mm; font:9pt Arial,sans-serif; opacity:.75; }} .socials {{ display:flex; flex-wrap:wrap; align-items:center; gap:2mm; margin-top:1.5mm; }} .socials a {{ color:var(--accent); text-decoration:none; }} .socials .icon-social {{ width:4.5mm; height:4.5mm; display:inline-flex; align-items:center; justify-content:center; border:.4pt solid var(--accent); }} .socials .icon-social svg {{ width:3.5mm; height:3.5mm; fill:currentColor; }} .socials .text-social + .text-social::before {{ content:'·'; margin-right:2mm; color:var(--ink); }} h2 {{ color:var(--accent); font:700 10pt Arial,sans-serif; letter-spacing:.12em; text-transform:uppercase; border-bottom:1px solid var(--accent); padding-bottom:2mm; margin:7mm 0 4mm; }}
.summary {{ font-size:11pt; }} .entry {{ break-inside:avoid; margin:0 0 5mm; }} .entry-head {{ display:flex; justify-content:space-between; gap:8mm; align-items:baseline; }} h3 {{ margin:0; font-size:12pt; }} h3 a {{ color:inherit; text-decoration:none; border-bottom:.4pt solid var(--accent); }} .entry-head span {{ font:9pt Arial,sans-serif; opacity:.7; white-space:nowrap; }} .role {{ margin:1mm 0 1mm; font:600 9.5pt Arial,sans-serif; color:var(--accent); opacity:.82; }} .project-description {{ margin:0 0 1mm; font-size:9.5pt; opacity:.8; }} ul {{ margin:1mm 0 0; padding-left:5mm; }} li {{ margin-bottom:1.2mm; font-size:10pt; }} .skills {{ font-size:10pt; }}
.resume-template.technical .page {{ max-width: 178mm; border-left: 4mm solid var(--accent); padding-left: 8mm; }} .resume-template.technical h1 {{ font-family: 'Kami Mono', monospace; font-size: 22pt; letter-spacing: -.04em; }} .resume-template.technical h2 {{ letter-spacing: .05em; }}
.resume-template.executive .page {{ max-width: 184mm; }} .resume-template.executive header {{ border-bottom-width: 2px; }} .resume-template.executive h1 {{ font-size: 31pt; }} .resume-template.executive .summary {{ font-size: 12pt; }} .resume-template.executive .entry-head h3 {{ font-size: 13pt; }}
.resume-template.creative .page {{ max-width: 176mm; }} .resume-template.creative header {{ padding: 8mm; margin-left: -8mm; background: var(--accent-soft); border-bottom: 0; }} .resume-template.creative h1 {{ font-size: 34pt; }} .resume-template.creative h2 {{ border-bottom: 0; border-left: 2mm solid var(--accent); padding-left: 3mm; }}
.resume-template.sales-impact .page {{ max-width: 184mm; }} .resume-template.sales-impact h1 {{ font-size: 30pt; }} .resume-template.sales-impact .entry-head h3 {{ color: var(--accent); }} .resume-template.sales-impact .entry li::marker {{ color: var(--accent); }}
.resume-template.operations-practical .page {{ max-width: 180mm; }} .resume-template.operations-practical header {{ border-bottom-style: dashed; }} .resume-template.operations-practical h2 {{ font-size: 9pt; }}
.resume-template.academic .page {{ max-width: 182mm; }} .resume-template.academic header {{ text-align: center; }} .resume-template.academic .contact {{ text-align: center; }} .resume-template.academic h2 {{ letter-spacing: .05em; }}
.resume-template.early-career .page {{ max-width: 178mm; }} .resume-template.early-career header {{ border-bottom: 0; padding-bottom: 3mm; }} .resume-template.early-career h1 {{ font-size: 32pt; }} .resume-template.early-career h2 {{ border-bottom: 0; }}
.resume-template.ats-classic .page {{ max-width: 180mm; }} .resume-template.ats-classic header {{ text-align: center; }} .resume-template.ats-classic .contact {{ text-align: center; }}
.resume-template.aqua-ledger {{ font-family:"Helvetica Neue",Arial,sans-serif; }} .resume-template.aqua-ledger .page {{ max-width:184mm; }} .resume-template.aqua-ledger header {{ margin:-14mm -14mm 7mm; padding:14mm; background:linear-gradient(125deg,var(--accent-soft),var(--paper)); border:0; }} .resume-template.aqua-ledger h1 {{ font-size:24pt; }} .resume-template.aqua-ledger .title {{ font-size:18pt; }} .resume-template.aqua-ledger section {{ display:grid; grid-template-columns:36mm 1fr; gap:7mm; padding:5mm 0; border-bottom:.4pt solid var(--accent); }} .resume-template.aqua-ledger section h2 {{ margin:0; border:0; }}
.resume-template.atelier-serif .page {{ max-width:184mm; border-left:46mm solid var(--accent-soft); padding-left:10mm; }} .resume-template.atelier-serif header {{ border-bottom:0; }} .resume-template.atelier-serif h1 {{ font-family:"Bodoni 72",Didot,Georgia,serif; font-size:38pt; font-weight:400; letter-spacing:-.04em; }} .resume-template.atelier-serif h2 {{ color:var(--ink); border-bottom:.4pt solid var(--accent); }}
.resume-template.cupertino {{ font-family:"Helvetica Neue",Arial,sans-serif; }} .resume-template.cupertino .page {{ max-width:176mm; }} .resume-template.cupertino header {{ border-bottom:.4pt solid var(--accent); }} .resume-template.cupertino h1 {{ font-size:29pt; letter-spacing:-.04em; }} .resume-template.cupertino h2 {{ color:var(--ink); font-size:13pt; letter-spacing:-.02em; text-transform:none; }}
.resume-template.swiss-grid {{ font-family:"Helvetica Neue",Arial,sans-serif; }} .resume-template.swiss-grid .page {{ max-width:184mm; border-left:.4pt solid var(--accent); }} .resume-template.swiss-grid header {{ display:grid; grid-template-columns:36mm minmax(0,1fr); padding-left:7mm; border-bottom:.4pt solid var(--accent); }} .resume-template.swiss-grid h1 {{ font-size:32pt; line-height:1.02; letter-spacing:-.045em; }} .resume-template.swiss-grid section {{ display:grid; grid-template-columns:36mm minmax(0,1fr); gap:7mm; padding:5mm 0 5mm 7mm; border-bottom:.4pt solid var(--accent); }} .resume-template.swiss-grid section h2 {{ margin:0; border:0; }}
@media print {{ body {{ print-color-adjust:exact; -webkit-print-color-adjust:exact; }} }}
</style></head><body class='resume-template {template} theme-{theme}'><main class='page'>
<header><div class='identity'>{photo_html}<div><h1>{html.escape(text_of(candidate.get('name')))}</h1><p class='title'>{html.escape(title)}</p></div></div><p class='contact'>{html.escape(' · '.join(text_of(candidate.get(key)) for key in ('email','phone','location','website') if candidate.get(key)))}{social_html}</p></header>
<section><h2>{labels['profile']}</h2><p class='summary'>{html.escape(text_of(dossier.get('resume_content',{}).get('summary') or candidate.get('summary')))}</p></section>
<section><h2>{labels['experience']}</h2>{''.join(bullets)}</section>
<section><h2>{labels['projects']}</h2>{''.join(projects)}</section>
<section><h2>{labels['skills']}</h2><p class='skills'>{html.escape(skill_text)}</p></section>
<section><h2>{labels['education']}</h2><ul>{education}</ul></section>
</main></body></html>"""
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html_doc, encoding="utf-8")


def run_all(dossier: dict[str, Any], output_dir: Path) -> None:
    analysis = analyze(dossier)
    question_set = questions(dossier, analysis)
    route_data = route(dossier, analysis)
    output_dir.mkdir(parents=True, exist_ok=True)
    write_json(output_dir / "analysis.json", analysis)
    write_json(output_dir / "interview-questions.json", question_set)
    write_json(output_dir / "route.json", route_data)
    write_json(output_dir / "candidate-dossier.json", dossier)
    write_json(output_dir / "unresolved-claims.json", {
        "gaps": analysis.get("gaps", []),
        "missing_target_requirements": analysis.get("missing_target_requirements", []),
        "conflicts": analysis.get("conflicts", []),
        "note": "Only confirmed or sourced claims should enter the final resume; review these items before delivery.",
    })
    render(dossier, route_data, output_dir / "resume-primary.html")
    if route_data.get("ats_companion"):
        render(dossier, route_data, output_dir / "resume-ats.html", ats=True)
    render(dossier, route_data, output_dir / "cover-letter.html", document_type="cover-letter")
    if dossier.get("cover_letter", {}).get("kind") == "recommendation":
        render(dossier, route_data, output_dir / "recommendation-letter.html", document_type="recommendation")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("analyze", "questions", "route"):
        command = sub.add_parser(name)
        command.add_argument("dossier", type=Path)
        if name != "analyze":
            command.add_argument("analysis", type=Path)
        command.add_argument("-o", "--output", type=Path, required=True)
    render_parser = sub.add_parser("render")
    render_parser.add_argument("dossier", type=Path)
    render_parser.add_argument("route", type=Path)
    render_parser.add_argument("-o", "--output", type=Path, required=True)
    render_parser.add_argument("--ats", action="store_true")
    render_parser.add_argument("--document-type", choices=("resume", "cover-letter", "recommendation"), default="resume")
    all_parser = sub.add_parser("all")
    all_parser.add_argument("dossier", type=Path)
    all_parser.add_argument("-o", "--output", type=Path, required=True)
    args = parser.parse_args(argv)
    dossier = load_json(args.dossier)
    if args.command == "analyze":
        write_json(args.output, analyze(dossier))
    elif args.command == "questions":
        write_json(args.output, questions(dossier, load_json(args.analysis)))
    elif args.command == "route":
        write_json(args.output, route(dossier, load_json(args.analysis)))
    elif args.command == "render":
        render(dossier, load_json(args.route), args.output, ats=args.ats, document_type=args.document_type)
    else:
        run_all(dossier, args.output)
    print(f"OK: {args.command} complete")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
