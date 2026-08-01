# Kami Resume

Kami Resume is an Agent-first bilingual resume generator and hands-on editor. It helps job seekers turn an old CV, career-platform profiles, project evidence, and a target job description into a credible, role-matched Chinese or English resume.

The browser editor is available at `/editor.html`. It works without an account, saves personal content in the current browser, previews nine resume families in light and dark themes, and exports A4 PDF. The Agent workflow is defined in `SKILL.md` and runs locally in the user's workspace.

## Two ways to start

1. Hands-on editing: open `/editor.html`, load a Chinese or English sample, edit profile, summary, experience, projects, education, skills, optional photo, and LinkedIn/X/GitHub links, then export PDF.
2. Agent collaboration: provide an old PDF/DOCX resume, pasted career material, authorized visible LinkedIn/BOSS 直聘/猎聘/58 同城 pages, portfolio or GitHub evidence, and a target job description.

## Agent resume workflow

The Agent normalizes sources into a traceable candidate dossier, detects timeline and title conflicts, and asks focused questions about the latest role that may be missing from the old resume. It verifies responsibilities, scope, methods, metrics, outcomes, and ownership before drafting.

It then matches supported evidence to the target job, chooses the output language and one of nine resume families, renders a primary version, and creates a light ATS-safe companion when the main design is dark or expressive. It does not invent metrics or copy the job description as unsupported experience.

Run the deterministic workflow with:

```bash
python3 scripts/resume_workflow.py all candidate-dossier.json -o output/resume
```

## Editor capabilities

- Chinese and English content and labels.
- Nine template families with light and dark themes.
- Optional photos for compatible templates; ATS companion output remains photo-free.
- Project experience with role, period, link, context, and evidence-rich outcomes.
- Optional LinkedIn, X, and GitHub hyperlinks preserved in HTML and PDF.
- Local autosave, completion checks, evidence prompts, live A4 preview, and PDF export.

## Privacy and source intake

Career material is sensitive. The editor keeps content in the browser. The Skill keeps source files and generated artifacts in the local workspace unless the user explicitly authorizes a specific external action. Browser collection reads only pages the user has authorized and made visible; it never asks for passwords, cookies, tokens, or OTPs and does not bypass login, CAPTCHA, paywalls, or access controls.

## Open-source origin and thanks

Kami Resume is a resume-focused adaptation of the open-source [Kami project by tw93](https://github.com/tw93/Kami). We thank the original author for the warm-paper visual language, editorial template system, rendering pipeline, and verification foundation. The repository retains the original MIT License and copyright notice.

## Install Kami Resume

The repository still includes the broader Kami document system: Eight document templates (one-pager, letter, long document, portfolio, resume, slides, equity report, and changelog), 18 inline SVG diagram types, schemas, renderers, and deterministic verification tools.

The repository also ships the original Kami document engine alongside the resume workflow:

- Claude Code v2.1.142+: `/plugin marketplace add justinbao19/kami-resume-studio` then `/plugin install kami@kami`
- Codex: `codex plugin marketplace add justinbao19/kami-resume-studio` then `codex plugin add kami@kami`
- Generic agents: `npx skills add justinbao19/kami-resume-studio/plugins/kami -a universal -g -y`
- Claude Desktop package `kami.zip`: <https://github.com/justinbao19/kami-resume-studio/releases/latest/download/kami.zip>

Current Kami version badge: v1.11.0.
