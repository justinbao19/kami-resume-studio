const STORAGE_KEY = "kami-resume-studio-v1";

const accents = {
  ink: { color: "#1b365d", soft: "#e8edf3" },
  forest: { color: "#285548", soft: "#e7eeea" },
  burgundy: { color: "#713b3b", soft: "#f1e8e6" },
  graphite: { color: "#353638", soft: "#ececeb" }
};

const themes = {
  light: { paper: "#fbfaf6", ink: "#23231f", muted: "#6d6a62", line: "#d9d4c8" },
  dark: { paper: "#172338", ink: "#f1eee5", muted: "#bcc7d5", line: "#40516a" }
};

const templateThemes = {
  editorial: {
    light: { accent: "#1b365d", paper: "#f7f5ee", ink: "#1e201d", muted: "#67675f", line: "#d8d3c6" },
    dark: { accent: "#a9c3e2", paper: "#172338", ink: "#f1eee5", muted: "#bdc8d6", line: "#43536b" }
  },
  "ats-classic": {
    light: { accent: "#263a55", paper: "#fffefa", ink: "#20211f", muted: "#65665f", line: "#cfcbc0" },
    dark: { accent: "#cad7e8", paper: "#20242a", ink: "#f4f1e9", muted: "#c4c6c5", line: "#4c5158" }
  },
  technical: {
    light: { accent: "#24524a", paper: "#f3f5f0", ink: "#19211f", muted: "#5b6864", line: "#cbd4ce" },
    dark: { accent: "#81c4b4", paper: "#10201d", ink: "#eaf2ed", muted: "#adc0b9", line: "#35534c" }
  },
  executive: {
    light: { accent: "#6a4a28", paper: "#f8f4ea", ink: "#201d19", muted: "#6d655b", line: "#d9cdbb" },
    dark: { accent: "#d9b77e", paper: "#231f1a", ink: "#f5efe3", muted: "#c4b9a8", line: "#554838" }
  },
  creative: {
    light: { accent: "#a54b36", paper: "#faf1e8", ink: "#25201d", muted: "#76645c", line: "#e2c9bc" },
    dark: { accent: "#f0a88d", paper: "#291a18", ink: "#fff2e9", muted: "#d6b9ae", line: "#634139" }
  },
  "sales-impact": {
    light: { accent: "#7a3d56", paper: "#faf5f1", ink: "#241e20", muted: "#746269", line: "#dccbd1" },
    dark: { accent: "#f0afc6", paper: "#281a21", ink: "#fff2f6", muted: "#d4b6c1", line: "#60404d" }
  },
  "operations-practical": {
    light: { accent: "#375a3c", paper: "#f4f3ea", ink: "#20231f", muted: "#646c61", line: "#cdd2c5" },
    dark: { accent: "#a9d0a7", paper: "#19231b", ink: "#eef3ea", muted: "#b6c5b3", line: "#3e5541" }
  },
  academic: {
    light: { accent: "#574a79", paper: "#f8f6f2", ink: "#202024", muted: "#696571", line: "#d5d0dd" },
    dark: { accent: "#c9bde8", paper: "#211e2a", ink: "#f3f0f8", muted: "#c2bccd", line: "#504961" }
  },
  "early-career": {
    light: { accent: "#2d5874", paper: "#f3f7f6", ink: "#1b2326", muted: "#5d6d72", line: "#cad7d8" },
    dark: { accent: "#8bc5e5", paper: "#14232b", ink: "#ecf4f6", muted: "#b2c8d1", line: "#355260" }
  }
};

const photoSupportedTemplates = new Set(["editorial", "technical", "creative", "early-career"]);
const iconSocialTemplates = new Set(["technical", "creative", "early-career"]);
const socialLabels = {
  linkedin: { zh: "LinkedIn", en: "LinkedIn" },
  x: { zh: "X", en: "X" },
  github: { zh: "GitHub", en: "GitHub" }
};

const copy = {
  zh: {
    summary: "个人简介",
    experience: "工作经历",
    projects: "项目经历",
    education: "教育背景",
    skills: "技能",
    core: "核心能力",
    tools: "方法与工具",
    languages: "语言",
    contact: "联系方式",
    present: "至今"
  },
  en: {
    summary: "Profile",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    skills: "Skills",
    core: "Core strengths",
    tools: "Methods & tools",
    languages: "Languages",
    contact: "Contact",
    present: "Present"
  }
};

const samples = {
  zh: {
    profile: {
      name: "林知遥",
      title: "AI 产品经理",
      email: "zhiyao.lin@example.com",
      phone: "+86 138 0000 2026",
      location: "上海",
      website: "zhiyao.work",
      photo: "",
      socials: {
        linkedin: { enabled: true, url: "https://www.linkedin.com/in/zhiyao-lin" },
        x: { enabled: false, url: "" },
        github: { enabled: true, url: "https://github.com/zhiyao-lin" }
      },
      summary: "6 年 B 端产品经验，近 3 年聚焦生成式 AI 与知识工作流。擅长把模糊业务问题拆成可评估的产品机制，推动从用户研究、方案设计到规模化交付，并用数据验证真实价值。"
    },
    experience: [
      {
        company: "远舟科技",
        role: "高级产品经理 · AI 工作台",
        period: "2023.04 - 至今",
        highlights: "牵头企业知识助手从 0 到 1，覆盖检索、生成、引用校验与权限控制，服务 42 家中大型客户。\n建立离线评测集和线上反馈闭环，将高频问答准确率从 71% 提升至 89%，人工复核量下降 36%。\n重构新用户激活路径，把首周关键任务完成率从 48% 提升至 67%，季度续费收入增加 320 万元。"
      },
      {
        company: "木棉协作",
        role: "产品经理 · 团队协同",
        period: "2020.07 - 2023.03",
        highlights: "负责项目协同与自动化模块，访谈 80+ 名运营和项目负责人，沉淀 6 类核心工作流。\n推动规则引擎与模板中心上线，帮助 1.8 万个团队减少重复操作，月均自动执行 240 万次。\n与销售共建行业解决方案，使制造业客户试用转化率提升 19%，交付周期缩短 28%。"
      },
      {
        company: "云澜数据",
        role: "产品专员 · 数据洞察",
        period: "2018.07 - 2020.06",
        highlights: "参与客户洞察产品规划，将 12 类分散报表重组为角色化分析路径，支持 300+ 名一线顾问。\n设计异常提醒与周报机制，使关键数据查看频次提升 54%，客户月度活跃率提高 16%。"
      }
    ],
    projects: [
      {
        name: "企业知识助手评测体系",
        role: "产品负责人 · RAG / LLM Evaluation",
        period: "2024.03 - 2025.02",
        link: "https://zhiyao.work/projects/ai-evaluation",
        description: "从零建立企业问答产品的离线评测、灰度发布与线上反馈闭环。",
        highlights: "沉淀 1,200+ 条分行业评测集，覆盖准确性、引用完整性与权限安全。\n将版本验收周期从 5 天缩短至 2 天，并把高频问答准确率提升至 89%。"
      }
    ],
    education: [
      {
        school: "同济大学",
        degree: "管理科学与工程 · 硕士",
        period: "2017 - 2020"
      },
      {
        school: "华东理工大学",
        degree: "信息管理与信息系统 · 学士",
        period: "2013 - 2017"
      }
    ],
    skills: {
      core: "AI 产品设计，复杂工作流，用户研究，商业化",
      tools: "Figma，SQL，Python，Amplitude，飞书",
      languages: "中文母语，英语专业工作"
    }
  },
  en: {
    profile: {
      name: "Avery Lin",
      title: "AI Product Manager",
      email: "avery.lin@example.com",
      phone: "+1 415 555 0186",
      location: "San Francisco, CA",
      website: "averylin.work",
      photo: "",
      socials: {
        linkedin: { enabled: true, url: "https://www.linkedin.com/in/avery-lin" },
        x: { enabled: false, url: "" },
        github: { enabled: true, url: "https://github.com/avery-lin" }
      },
      summary: "AI product manager with 6 years of B2B experience, specializing in knowledge workflows and measurable adoption. Turns ambiguous customer problems into testable product systems, then partners with engineering and go-to-market teams to deliver durable business outcomes."
    },
    experience: [
      {
        company: "Northstar Systems",
        role: "Senior Product Manager, AI Workspace",
        period: "Apr 2023 - Present",
        highlights: "Led a secure enterprise knowledge assistant from zero to launch across retrieval, generation, citation checks, and permissions for 42 mid-market and enterprise customers.\nBuilt offline evaluations and an in-product feedback loop, raising answer accuracy from 71% to 89% while reducing manual review volume by 36%.\nRedesigned activation around first-value tasks, increasing week-one completion from 48% to 67% and adding $440K in quarterly renewal revenue."
      },
      {
        company: "Cottonwood Collaboration",
        role: "Product Manager, Workflow Automation",
        period: "Jul 2020 - Mar 2023",
        highlights: "Owned workflow automation and interviewed 80+ operations leaders to define six repeatable jobs across planning, approvals, and reporting.\nShipped a rules engine and template library used by 18K teams for 2.4M automated actions per month.\nPartnered with sales on manufacturing solutions, improving trial conversion by 19% and shortening implementation time by 28%."
      },
      {
        company: "Cloudline Data",
        role: "Associate Product Manager, Customer Analytics",
        period: "Jul 2018 - Jun 2020",
        highlights: "Reframed 12 fragmented reports into role-based analysis paths used by 300+ frontline consultants.\nDesigned anomaly alerts and weekly summaries that increased key-report views by 54% and monthly customer activity by 16%."
      }
    ],
    projects: [
      {
        name: "Enterprise AI Evaluation System",
        role: "Product Lead · RAG / LLM Evaluation",
        period: "Mar 2024 - Feb 2025",
        link: "https://averylin.work/projects/ai-evaluation",
        description: "Built the offline evaluation, staged release, and production feedback system for an enterprise knowledge assistant.",
        highlights: "Created a 1,200+ item industry evaluation set covering accuracy, citation integrity, and permission safety.\nReduced release validation from five days to two while raising high-frequency answer accuracy to 89%."
      }
    ],
    education: [
      {
        school: "Tongji University",
        degree: "M.S., Management Science and Engineering",
        period: "2017 - 2020"
      },
      {
        school: "East China University of Science and Technology",
        degree: "B.S., Information Management",
        period: "2013 - 2017"
      }
    ],
    skills: {
      core: "AI product strategy, workflow design, customer research, monetization",
      tools: "Figma, SQL, Python, Amplitude, Linear",
      languages: "Mandarin native, English professional"
    }
  }
};

const baseState = {
  documentName: "我的产品经理简历",
  template: "editorial",
  theme: "light",
  locale: "zh",
  accent: "auto",
  density: "balanced",
  zoom: null,
  data: samples.zh
};

let state = loadState();
let saveTimer = null;
let toastTimer = null;
let resetArmed = false;
let sampleArmed = false;

const preview = document.getElementById("resumePreview");
const viewport = document.getElementById("paperViewport");
const completionBadge = document.getElementById("completionBadge");
const completionBar = document.getElementById("completionBar");
const qualityList = document.getElementById("qualityList");
const qualityScore = document.getElementById("qualityScore");
const saveStatus = document.getElementById("saveStatus");
const documentNameInput = document.getElementById("documentName");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !saved.data || !saved.data.profile) return clone(baseState);
    const restored = {
      ...clone(baseState),
      ...saved,
      data: {
        ...clone(samples.zh),
        ...saved.data,
        profile: {
          ...clone(samples.zh.profile),
          ...saved.data.profile,
          socials: {
            ...clone(samples.zh.profile.socials),
            ...(saved.data.profile.socials || {})
          }
        },
        projects: Array.isArray(saved.data.projects) ? saved.data.projects : clone(samples.zh.projects),
        skills: { ...clone(samples.zh.skills), ...saved.data.skills }
      }
    };
    if (restored.template === "classic") restored.template = "ats-classic";
    if (restored.template === "modern") restored.template = "creative";
    if (!themes[restored.theme]) restored.theme = "light";
    return restored;
  } catch (error) {
    return clone(baseState);
  }
}

function saveState() {
  saveStatus.textContent = "正在保存...";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveStatus.textContent = "已保存到本机";
  }, 260);
}

function getPath(root, path) {
  return path.split(".").reduce((value, key) => value?.[key], root);
}

function setPath(root, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((current, key) => current[key], root);
  target[last] = value;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hexToRgba(value, alpha = .12) {
  const hex = String(value).replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return value;
  const [red, green, blue] = [0, 2, 4].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16));
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function splitItems(value = "") {
  return String(value)
    .split(/[，,]/)
    .map(item => item.trim())
    .filter(Boolean);
}

function splitHighlights(value = "") {
  return String(value)
    .split(/\n+/)
    .map(item => item.trim())
    .filter(Boolean);
}

function initials(name = "") {
  const clean = name.trim();
  if (!clean) return "KR";
  if (/^[\u3400-\u9fff]/.test(clean)) return clean.slice(-2);
  return clean.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

function contactValues(profile) {
  return [profile.email, profile.phone, profile.location, profile.website].filter(Boolean);
}

function safeUrl(value = "") {
  const raw = String(value).trim();
  if (!raw) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^https?:\/\//i.test(raw)) return "";
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch (error) {
    return "";
  }
}

function socialHandle(value = "") {
  const url = safeUrl(value);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ? `@${parts[parts.length - 1].replace(/^@/, "")}` : parsed.hostname;
  } catch (error) {
    return value;
  }
}

function socialIcon(platform) {
  const paths = {
    linkedin: '<path d="M5.2 7.3A1.7 1.7 0 1 0 5.2 4a1.7 1.7 0 0 0 0 3.3ZM3.8 9h2.8v8H3.8V9Zm4.5 0h2.7v1.1c.6-.8 1.5-1.4 2.8-1.4 2.8 0 3.4 1.8 3.4 4.2V17h-2.8v-3.7c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V17H8.3V9Z"/>',
    github: '<path d="M10 3.2a6.8 6.8 0 0 0-2.2 13.2c.3.1.4-.1.4-.3v-1.2c-1.7.4-2.1-.8-2.1-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.7.1 1.1.7 1.1.7.6 1.1 1.6.8 2 .6.1-.4.2-.8.4-1-1.4-.2-2.8-.7-2.8-3.1 0-.7.2-1.2.6-1.7-.1-.2-.3-.8.1-1.7 0 0 .5-.2 1.8.6.5-.1 1-.2 1.5-.2s1 0 1.5.2c1.3-.9 1.8-.6 1.8-.6.4.9.2 1.5.1 1.7.4.5.6 1 .6 1.7 0 2.4-1.4 2.9-2.8 3.1.2.2.4.6.4 1.2v1.8c0 .2.1.4.4.3A6.8 6.8 0 0 0 10 3.2Z"/>',
    x: '<path d="M4 4h3.3l2.4 3.2L12.8 4H16l-4.8 5.4L16.2 16h-3.3l-2.8-3.7L6.6 16H3.4l5-5.9L4 4Zm2.2 1.3 6.9 9.4h.9L7.1 5.3h-.9Z"/>'
  };
  return `<svg viewBox="0 0 20 20" aria-hidden="true">${paths[platform] || ""}</svg>`;
}

function socialLinks(profile, template) {
  const socials = profile.socials || {};
  const items = Object.entries(socialLabels)
    .map(([platform, labels]) => ({ platform, label: labels[state.locale] || labels.en, item: socials[platform] }))
    .filter(({ item }) => item?.enabled && safeUrl(item.url));
  if (!items.length) return "";
  const iconMode = iconSocialTemplates.has(template);
  return items.map(({ platform, label, item }) => {
    const href = safeUrl(item.url);
    const handle = socialHandle(item.url);
    return iconMode
      ? `<a class="social-link social-link-icon" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)} ${escapeHtml(handle)}">${socialIcon(platform)}</a>`
      : `<a class="social-link social-link-text" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"><b>${escapeHtml(label)}</b><span>${escapeHtml(handle)}</span></a>`;
  }).join("");
}

function avatarMarkup(profile, template, className = "resume-avatar") {
  if (!photoSupportedTemplates.has(template)) return "";
  const photo = String(profile.photo || "");
  const content = photo.startsWith("data:image/")
    ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(profile.name || "个人照片")}">`
    : `<span>${escapeHtml(initials(profile.name))}</span>`;
  return `<div class="${className}">${content}</div>`;
}

function renderSocialBlock(profile, template, className = "resume-socials") {
  const links = socialLinks(profile, template);
  return links ? `<div class="${className}">${links}</div>` : "";
}

function projectHref(project) {
  return safeUrl(project.link || "");
}

function renderProjects(projects = [], labels, variant = "default") {
  if (!projects.length) return `<p class="empty-projects">${state.locale === "zh" ? "暂无项目经历" : "No selected projects yet."}</p>`;
  return projects.map(item => {
    const href = projectHref(item);
    const title = href
      ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)}</a>`
      : escapeHtml(item.name);
    const bullets = splitHighlights(item.highlights).map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("");
    return `<div class="project-entry project-entry-${variant}">
      <div class="entry-heading"><h3>${title}</h3><span class="resume-period">${escapeHtml(item.period)}</span></div>
      <p class="entry-subtitle">${escapeHtml(item.role)}</p>
      ${item.description ? `<p class="project-description">${escapeHtml(item.description)}</p>` : ""}
      ${bullets ? `<ul>${bullets}</ul>` : ""}
    </div>`;
  }).join("");
}

function renderExperience(experience, variant = "default") {
  return experience.map(item => {
    const bullets = splitHighlights(item.highlights)
      .map(bullet => `<li>${escapeHtml(bullet)}</li>`)
      .join("");
    return `
      <div class="resume-entry">
        <div class="entry-heading">
          <h3>${escapeHtml(item.company)}</h3>
          <span class="resume-period">${escapeHtml(item.period)}</span>
        </div>
        <p class="entry-subtitle">${escapeHtml(item.role)}</p>
        ${bullets ? `<ul>${bullets}</ul>` : ""}
      </div>`;
  }).join("");
}

function renderEducation(education, compact = false) {
  return education.map(item => compact
    ? `<p class="education-line"><b>${escapeHtml(item.school)}</b>${escapeHtml(item.degree)} · ${escapeHtml(item.period)}</p>`
    : `<div class="education-item"><b>${escapeHtml(item.school)}</b><span>${escapeHtml(item.degree)}</span><span>${escapeHtml(item.period)}</span></div>`
  ).join("");
}

function renderSkillGroups(skills, labels) {
  const groups = [
    [labels.core, skills.core],
    [labels.tools, skills.tools],
    [labels.languages, skills.languages]
  ];
  return groups.map(([label, value]) => `
    <div class="skill-group">
      <b>${escapeHtml(label)}</b>
      <p>${escapeHtml(value)}</p>
    </div>`).join("");
}

function renderEditorial(data, labels) {
  const contactLabels = state.locale === "zh"
    ? ["邮箱", "电话", "城市", "主页"]
    : ["Email", "Phone", "Location", "Web"];
  const contact = [data.profile.email, data.profile.phone, data.profile.location, data.profile.website]
    .map((item, index) => [contactLabels[index], item])
    .filter(([, item]) => item)
    .map(([label, item]) => `<span><i class="contact-label">${label}</i>${escapeHtml(item)}</span>`)
    .join("");

  return `
    <header class="resume-header">
      <div class="editorial-identity">
        ${avatarMarkup(data.profile, "editorial")}
        <div><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1>
        <p class="resume-title">${escapeHtml(data.profile.title)}</p></div>
      </div>
      <div class="resume-contact">${contact}${renderSocialBlock(data.profile, "editorial")}</div>
    </header>
    <p class="resume-summary">${escapeHtml(data.profile.summary)}</p>
    <div class="editorial-grid">
      <main>
        <section class="resume-section">
          <h2 class="resume-section-title">${labels.experience}</h2>
          ${renderExperience(data.experience)}
        </section>
        <section class="resume-section project-section">
          <h2 class="resume-section-title">${labels.projects}</h2>
          ${renderProjects(data.projects, labels, "editorial")}
        </section>
      </main>
      <aside>
        <section class="resume-section sidebar-section">
          <h2 class="resume-section-title">${labels.skills}</h2>
          ${renderSkillGroups(data.skills, labels)}
        </section>
        <section class="resume-section sidebar-section">
          <h2 class="resume-section-title">${labels.education}</h2>
          ${renderEducation(data.education)}
        </section>
      </aside>
    </div>`;
}

function renderClassic(data, labels) {
  const contact = contactValues(data.profile)
    .map(item => `<span>${escapeHtml(item)}</span>`)
    .join("");
  const skills = [
    [labels.core, data.skills.core],
    [labels.tools, data.skills.tools],
    [labels.languages, data.skills.languages]
  ].map(([label, value]) => `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`).join("<br>");

  return `
    <header class="resume-header">
      <h1 class="resume-name">${escapeHtml(data.profile.name)}</h1>
      <p class="resume-title">${escapeHtml(data.profile.title)}</p>
      <div class="resume-contact">${contact}${renderSocialBlock(data.profile, "ats-classic")}</div>
    </header>
    <section class="resume-section">
      <h2 class="resume-section-title">${labels.summary}</h2>
      <p class="resume-summary">${escapeHtml(data.profile.summary)}</p>
    </section>
    <section class="resume-section">
      <h2 class="resume-section-title">${labels.experience}</h2>
      ${renderExperience(data.experience, "classic")}
    </section>
    <section class="resume-section project-section">
      <h2 class="resume-section-title">${labels.projects}</h2>
      ${renderProjects(data.projects, labels, "classic")}
    </section>
    <div class="classic-bottom">
      <section class="resume-section">
        <h2 class="resume-section-title">${labels.education}</h2>
        ${renderEducation(data.education, true)}
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">${labels.skills}</h2>
        <p class="skills-plain">${skills}</p>
      </section>
    </div>`;
}

function renderModern(data, labels) {
  const contacts = [
    [state.locale === "zh" ? "邮箱" : "Email", data.profile.email],
    [state.locale === "zh" ? "电话" : "Phone", data.profile.phone],
    [state.locale === "zh" ? "城市" : "Location", data.profile.location],
    [state.locale === "zh" ? "主页" : "Website", data.profile.website]
  ].filter(([, value]) => value);

  return `
    <aside class="modern-sidebar">
      ${avatarMarkup(data.profile, "creative", "resume-monogram")}
      <section class="resume-section">
        <h2 class="resume-section-title">${labels.contact}</h2>
        <div class="modern-contact">
          ${contacts.map(([label, value]) => `<span>${escapeHtml(label)}<b>${escapeHtml(value)}</b></span>`).join("")}
        </div>
        ${renderSocialBlock(data.profile, "creative", "modern-socials")}
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">${labels.skills}</h2>
        ${renderSkillGroups(data.skills, labels)}
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">${labels.education}</h2>
        ${renderEducation(data.education)}
      </section>
    </aside>
    <main class="modern-main">
      <header>
        <h1 class="resume-name">${escapeHtml(data.profile.name)}</h1>
        <p class="resume-title">${escapeHtml(data.profile.title)}</p>
      </header>
      <p class="resume-summary">${escapeHtml(data.profile.summary)}</p>
      <section class="resume-section">
        <h2 class="resume-section-title">${labels.experience}</h2>
        ${renderExperience(data.experience, "modern")}
      </section>
      <section class="resume-section project-section">
        <h2 class="resume-section-title">${labels.projects}</h2>
        ${renderProjects(data.projects, labels, "creative")}
      </section>
    </main>`;
}

function metricSnippets(experience, limit = 3) {
  return experience
    .flatMap(item => splitHighlights(item.highlights).map(text => ({ text, company: item.company })))
    .filter(item => /\d|%|￥|\$|万|亿|users?|customers?|revenue|team/i.test(item.text))
    .slice(0, limit);
}

function renderTechnical(data, labels) {
  return `
    <aside class="technical-sidebar">
      ${avatarMarkup(data.profile, "technical", "resume-monogram")}
      <p class="technical-label">SYSTEM PROFILE</p>
      <h1 class="resume-name">${escapeHtml(data.profile.name)}</h1>
      <p class="resume-title">${escapeHtml(data.profile.title)}</p>
      <div class="technical-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      ${renderSocialBlock(data.profile, "technical", "technical-socials")}
      <section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section>
    </aside>
    <main class="technical-main">
      <section class="resume-section technical-summary"><h2 class="resume-section-title">${labels.summary}</h2><p class="resume-summary">${escapeHtml(data.profile.summary)}</p></section>
      <section class="resume-section"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section>
      <section class="resume-section project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "technical")}</section>
      <section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education, true)}</section>
    </main>`;
}

function renderExecutive(data, labels) {
  const metrics = metricSnippets(data.experience);
  return `
    <header class="executive-header">
      <div><p class="executive-kicker">LEADERSHIP PROFILE</p><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p></div>
      <div class="executive-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "executive")}</div>
    </header>
    <p class="resume-summary executive-summary">${escapeHtml(data.profile.summary)}</p>
    <div class="executive-metrics">${metrics.map(item => `<div><strong>${escapeHtml(item.text)}</strong><span>${escapeHtml(item.company)}</span></div>`).join("")}</div>
    <section class="resume-section"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section>
    <section class="resume-section project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "executive")}</section>
    <div class="executive-bottom"><section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education, true)}</section><section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section></div>`;
}

function renderCreative(data, labels) {
  return `
    <header class="creative-header">${avatarMarkup(data.profile, "creative", "creative-mark")}<div><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p></div></header>
    <p class="resume-summary creative-summary">${escapeHtml(data.profile.summary)}</p>
    <div class="creative-grid"><main><section class="resume-section"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section><section class="resume-section project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "creative")}</section></main><aside><section class="resume-section"><h2 class="resume-section-title">${labels.contact}</h2><div class="creative-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>${renderSocialBlock(data.profile, "creative")}</section><section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section><section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education)}</section></aside></div>`;
}

function renderSalesImpact(data, labels) {
  const metrics = metricSnippets(data.experience);
  return `
    <header class="sales-header"><div><p class="sales-kicker">OUTCOMES / GROWTH / SCALE</p><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p></div><div class="sales-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "sales-impact")}</div></header>
    <p class="resume-summary">${escapeHtml(data.profile.summary)}</p>
    <div class="impact-grid">${metrics.map((item, index) => `<div class="impact-card"><b>0${index + 1}</b><strong>${escapeHtml(item.text)}</strong><span>${escapeHtml(item.company)}</span></div>`).join("")}</div>
    <section class="resume-section"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section>
    <section class="resume-section project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "sales")}</section>
    <div class="sales-bottom"><section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section><section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education, true)}</section></div>`;
}

function renderOperations(data, labels) {
  return `
    <header class="operations-header"><p class="operations-kicker">OPERATIONS / DELIVERY / RELIABILITY</p><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p><div class="operations-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "operations-practical")}</div></header>
    <p class="resume-summary">${escapeHtml(data.profile.summary)}</p>
    <section class="resume-section operations-timeline"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section>
    <section class="resume-section project-section operations-projects"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "operations")}</section>
    <div class="operations-bottom"><section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section><section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education, true)}</section></div>`;
}

function renderAcademic(data, labels) {
  return `
    <header class="academic-header"><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p><div class="academic-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "academic")}</div></header>
    <section class="resume-section academic-profile"><h2 class="resume-section-title">${labels.summary}</h2><p class="resume-summary">${escapeHtml(data.profile.summary)}</p></section>
    <div class="academic-grid"><main><section class="resume-section"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section><section class="resume-section project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "academic")}</section></main><aside><section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education)}</section><section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section></aside></div>`;
}

function renderEarlyCareer(data, labels) {
  return `
    <header class="early-header">${avatarMarkup(data.profile, "early-career", "early-monogram")}<div><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p></div><div class="early-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "early-career")}</div></header>
    <p class="resume-summary">${escapeHtml(data.profile.summary)}</p>
    <section class="resume-section"><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section>
    <section class="resume-section project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "early")}</section>
    <div class="early-bottom"><section class="resume-section"><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education)}</section><section class="resume-section"><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section></div>`;
}

function canonicalTemplate(template) {
  if (template === "classic") return "ats-classic";
  if (template === "modern") return "creative";
  return template;
}

function templateClass(template) {
  if (template === "ats-classic") return "classic";
  if (template === "creative") return "modern";
  return template;
}

function renderPreview() {
  state.template = canonicalTemplate(state.template);
  const templateTheme = templateThemes[state.template]?.[state.theme];
  const theme = templateTheme || themes[state.theme] || themes.light;
  const accent = state.accent === "auto"
    ? { color: theme.accent || templateThemes.editorial.light.accent, soft: hexToRgba(theme.accent || templateThemes.editorial.light.accent) }
    : (accents[state.accent] || accents.ink);
  const labels = copy[state.locale] || copy.zh;
  preview.className = `resume-page template-${templateClass(state.template)} template-id-${state.template} theme-${state.theme} density-${state.density}`;
  preview.style.setProperty("--accent", accent.color);
  preview.style.setProperty("--accent-soft", accent.soft);
  preview.style.setProperty("--paper", theme.paper);
  preview.style.setProperty("--resume-ink", theme.ink);
  preview.style.setProperty("--resume-muted", theme.muted);
  preview.style.setProperty("--resume-line", theme.line);
  updatePhotoEditor();

  const renderers = {
    editorial: renderEditorial,
    "ats-classic": renderClassic,
    technical: renderTechnical,
    executive: renderExecutive,
    creative: renderCreative,
    "sales-impact": renderSalesImpact,
    "operations-practical": renderOperations,
    academic: renderAcademic,
    "early-career": renderEarlyCareer
  };
  preview.innerHTML = (renderers[state.template] || renderEditorial)(state.data, labels);

  updateCompletion();
  updateQuality();
  updateSummaryCount();
  requestAnimationFrame(updatePageEstimate);
}

function renderRepeatEditors() {
  const experienceEditor = document.getElementById("experienceEditor");
  const projectEditor = document.getElementById("projectEditor");
  const educationEditor = document.getElementById("educationEditor");

  experienceEditor.innerHTML = state.data.experience.map((item, index) => `
    <article class="repeat-item">
      <div class="repeat-head">
        <span>EXPERIENCE ${String(index + 1).padStart(2, "0")}</span>
        ${state.data.experience.length > 1 ? `<button class="remove-button" type="button" data-remove-experience="${index}">删除</button>` : ""}
      </div>
      <div class="form-grid form-grid-two">
        <label class="field field-wide"><span>公司 / 组织</span><input type="text" data-bind="experience.${index}.company"></label>
        <label class="field field-wide"><span>职位 / 角色</span><input type="text" data-bind="experience.${index}.role"></label>
        <label class="field field-wide"><span>时间</span><input type="text" data-bind="experience.${index}.period"></label>
        <label class="field field-wide"><span>成果描述 <small>每行一条</small></span><textarea rows="7" data-bind="experience.${index}.highlights"></textarea></label>
      </div>
    </article>`).join("");

  projectEditor.innerHTML = state.data.projects.map((item, index) => `
    <article class="repeat-item project-repeat-item">
      <div class="repeat-head">
        <span>PROJECT ${String(index + 1).padStart(2, "0")}</span>
        ${state.data.projects.length > 1 ? `<button class="remove-button" type="button" data-remove-project="${index}">删除</button>` : ""}
      </div>
      <div class="form-grid form-grid-two">
        <label class="field field-wide"><span>项目名称</span><input type="text" data-bind="projects.${index}.name" placeholder="例如：企业知识助手评测体系"></label>
        <label class="field"><span>角色 / 技术栈</span><input type="text" data-bind="projects.${index}.role"></label>
        <label class="field"><span>时间</span><input type="text" data-bind="projects.${index}.period"></label>
        <label class="field field-wide"><span>项目链接 <small>可选</small></span><input type="url" data-bind="projects.${index}.link" placeholder="https://"></label>
        <label class="field field-wide"><span>项目简介</span><textarea rows="3" data-bind="projects.${index}.description"></textarea></label>
        <label class="field field-wide"><span>项目成果 <small>每行一条</small></span><textarea rows="5" data-bind="projects.${index}.highlights"></textarea></label>
      </div>
    </article>`).join("");

  educationEditor.innerHTML = state.data.education.map((item, index) => `
    <article class="repeat-item">
      <div class="repeat-head">
        <span>EDUCATION ${String(index + 1).padStart(2, "0")}</span>
        ${state.data.education.length > 1 ? `<button class="remove-button" type="button" data-remove-education="${index}">删除</button>` : ""}
      </div>
      <div class="form-grid">
        <label class="field"><span>学校</span><input type="text" data-bind="education.${index}.school"></label>
        <label class="field"><span>学位 / 专业</span><input type="text" data-bind="education.${index}.degree"></label>
        <label class="field"><span>时间</span><input type="text" data-bind="education.${index}.period"></label>
      </div>
    </article>`).join("");

  syncInputs();
}

function syncInputs() {
  document.querySelectorAll("[data-bind]").forEach(input => {
    const value = getPath(state.data, input.dataset.bind);
    if (input.type === "checkbox") input.checked = Boolean(value);
    else if (document.activeElement !== input) input.value = value ?? "";
    if (input.dataset.bind?.match(/^profile\.socials\.[^.]+\.url$/)) {
      const row = input.closest(".social-editor-row");
      const checkbox = row?.querySelector('input[type="checkbox"]');
      input.disabled = checkbox ? !checkbox.checked : false;
      row?.classList.toggle("is-disabled", Boolean(checkbox && !checkbox.checked));
    }
  });
  documentNameInput.value = state.documentName;
  updatePhotoEditor();
}

function updatePhotoEditor() {
  const input = document.getElementById("photoInput");
  const preview = document.getElementById("photoEditorPreview");
  const capability = document.getElementById("photoCapability");
  const help = document.getElementById("photoHelp");
  const card = document.getElementById("photoEditorCard");
  if (!input || !preview || !capability || !help || !card) return;
  const supported = photoSupportedTemplates.has(canonicalTemplate(state.template));
  input.disabled = !supported;
  card.classList.toggle("is-disabled", !supported);
  capability.textContent = supported ? "当前模板支持" : "当前模板不支持头像";
  help.textContent = supported
    ? "用于支持头像位置的模板。图片只保存在当前浏览器。"
    : "清衡、领航、增长场、实干线、学研录更适合无头像排版，当前不会上传照片。";
  const photo = String(state.data.profile.photo || "");
  preview.innerHTML = photo.startsWith("data:image/")
    ? `<img src="${escapeHtml(photo)}" alt="个人照片预览">`
    : "<span>头像</span>";
}

function sectionScore(section) {
  const data = state.data;
  if (section === "profile") {
    const values = [data.profile.name, data.profile.title, data.profile.email, data.profile.phone, data.profile.location];
    return values.filter(Boolean).length / values.length;
  }
  if (section === "summary") return data.profile.summary?.trim().length >= 40 ? 1 : data.profile.summary ? .5 : 0;
  if (section === "experience") {
    if (!data.experience.length) return 0;
    const complete = data.experience.filter(item => item.company && item.role && splitHighlights(item.highlights).length >= 2).length;
    return complete / data.experience.length;
  }
  if (section === "projects") {
    if (!data.projects.length) return 0;
    const complete = data.projects.filter(item => item.name && (item.description || splitHighlights(item.highlights).length >= 1)).length;
    return complete / data.projects.length;
  }
  if (section === "education") {
    if (!data.education.length) return 0;
    return data.education.filter(item => item.school && item.degree).length / data.education.length;
  }
  if (section === "skills") return [data.skills.core, data.skills.tools, data.skills.languages].filter(Boolean).length / 3;
  return 0;
}

function updateCompletion() {
  const sections = ["profile", "summary", "experience", "projects", "education", "skills"];
  const weights = [18, 12, 27, 16, 12, 15];
  const score = Math.round(sections.reduce((total, section, index) => total + sectionScore(section) * weights[index], 0));
  completionBadge.textContent = `${score}%`;
  completionBar.style.width = `${score}%`;

  sections.forEach(section => {
    const status = document.querySelector(`[data-section-status="${section}"]`);
    const value = sectionScore(section);
    status.className = value >= .99 ? "done" : value > 0 ? "partial" : "";
  });
}

function updateQuality() {
  const issues = [];
  const summaryLength = state.data.profile.summary.trim().length;
  const summaryWords = state.data.profile.summary.trim().split(/\s+/).filter(Boolean).length;
  const bullets = state.data.experience.flatMap(item => splitHighlights(item.highlights));
  const metricBullets = bullets.filter(item => /\d/.test(item));

  if ((state.locale === "zh" && summaryLength < 45) || (state.locale === "en" && summaryWords < 25)) {
    issues.push("职业摘要偏短，建议补充年限、擅长领域和一个代表性结果。");
  } else if ((state.locale === "zh" && summaryLength > 190) || (state.locale === "en" && summaryWords > 80)) {
    issues.push("职业摘要较长，建议压缩到招聘者能在 15 秒内读完的长度。");
  }

  if (state.data.experience.length < 2) {
    issues.push("只有一段工作经历，可以补充更早经历或一项高相关项目。");
  }

  if (!state.data.projects.length || !state.data.projects.some(item => item.name && (item.description || splitHighlights(item.highlights).length))) {
    issues.push("项目经历为空，建议加入一个能证明方法、作品或业务结果的代表项目。");
  }

  if (bullets.length && metricBullets.length / bullets.length < .5) {
    issues.push("量化证据偏少，至少让一半成果包含规模、比例、金额或周期。");
  }

  if (!state.data.profile.email || !state.data.profile.phone) {
    issues.push("联系方式不完整，可能影响招聘者快速联系你。");
  }

  if (!issues.length) {
    const strengths = [
      "摘要信息密度合适，职业定位清晰。",
      `${metricBullets.length} 条成果包含量化证据，可信度良好。`,
      "必需联系方式与核心章节已完整。"
    ];
    qualityList.innerHTML = strengths.map(item => `<li class="good">${escapeHtml(item)}</li>`).join("");
    qualityScore.textContent = "状态良好";
  } else {
    qualityList.innerHTML = issues.slice(0, 4).map(item => `<li>${escapeHtml(item)}</li>`).join("");
    qualityScore.textContent = `${issues.length} 条建议`;
  }
}

function updateSummaryCount() {
  const value = state.data.profile.summary.trim();
  const count = state.locale === "en"
    ? value.split(/\s+/).filter(Boolean).length
    : value.length;
  document.getElementById("summaryCount").textContent = state.locale === "en"
    ? `${count} words`
    : `${count} / 160`;
}

function updatePageEstimate() {
  const pageEstimate = document.getElementById("pageEstimate");
  const contentHeight = Math.max(preview.scrollHeight, preview.offsetHeight, 1123);
  const pages = Math.max(1, Math.ceil(contentHeight / 1123));
  const overflow = contentHeight > 1123;
  pageEstimate.textContent = overflow ? `A4 · 约 ${pages} 页` : `A4 · ${pages} 页`;
  preview.classList.toggle("is-overflowing", overflow);
  const scale = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--preview-scale")) || 1;
  document.getElementById("paperScaler").style.minHeight = `${contentHeight * scale}px`;
}

function updateControls() {
  document.querySelectorAll("[data-template]").forEach(button => {
    button.classList.toggle("active", canonicalTemplate(button.dataset.template) === canonicalTemplate(state.template));
  });
  document.querySelectorAll("[data-locale]").forEach(button => {
    button.classList.toggle("active", button.dataset.locale === state.locale);
  });
  document.querySelectorAll("[data-accent]").forEach(button => {
    button.classList.toggle("active", button.dataset.accent === state.accent);
  });
  document.querySelectorAll("[data-density]").forEach(button => {
    button.classList.toggle("active", button.dataset.density === state.density);
  });
  document.querySelectorAll("[data-theme]").forEach(button => {
    button.classList.toggle("active", button.dataset.theme === state.theme);
  });
  document.getElementById("loadSample").textContent = state.locale === "zh" ? "载入中文示例" : "Load English sample";
}

function setZoom(value) {
  state.zoom = Math.max(.45, Math.min(1.05, value));
  document.documentElement.style.setProperty("--preview-scale", state.zoom.toFixed(2));
  document.getElementById("zoomLabel").textContent = `${Math.round(state.zoom * 100)}%`;
  saveState();
  requestAnimationFrame(updatePageEstimate);
}

function fitPreview(force = false) {
  if (state.zoom && !force) {
    setZoom(state.zoom);
    return;
  }
  const room = Math.max(360, viewport.clientWidth - 72);
  const scale = Math.max(.45, Math.min(.86, room / 794));
  state.zoom = null;
  document.documentElement.style.setProperty("--preview-scale", scale.toFixed(2));
  document.getElementById("zoomLabel").textContent = `${Math.round(scale * 100)}%`;
  requestAnimationFrame(updatePageEstimate);
}

function rerender({ editor = false } = {}) {
  if (editor) renderRepeatEditors();
  syncInputs();
  updateControls();
  renderPreview();
  saveState();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.getElementById("sectionTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-section]");
  if (!button) return;
  document.querySelectorAll("[data-section]").forEach(item => item.classList.toggle("active", item === button));
  document.querySelectorAll("[data-editor-section]").forEach(section => {
    section.classList.toggle("active", section.dataset.editorSection === button.dataset.section);
  });
});

document.querySelector(".editor-rail").addEventListener("input", event => {
  const input = event.target.closest("[data-bind]");
  if (!input || input.type === "checkbox") return;
  setPath(state.data, input.dataset.bind, input.value);
  renderPreview();
  syncInputs();
  saveState();
});

document.querySelector(".editor-rail").addEventListener("change", event => {
  const input = event.target.closest("[data-bind]");
  if (!input || input.type !== "checkbox") return;
  setPath(state.data, input.dataset.bind, input.checked);
  syncInputs();
  renderPreview();
  saveState();
});

function resizePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("无法读取照片"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("照片格式无法识别"));
      image.onload = () => {
        const size = 480;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        const scale = Math.max(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
        resolve(canvas.toDataURL("image/jpeg", .84));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

document.getElementById("photoInput").addEventListener("change", async event => {
  const file = event.currentTarget.files?.[0];
  if (!file || !photoSupportedTemplates.has(canonicalTemplate(state.template))) return;
  try {
    state.data.profile.photo = await resizePhoto(file);
    syncInputs();
    renderPreview();
    saveState();
    showToast("照片已加入当前简历");
  } catch (error) {
    showToast("照片读取失败，请换一张 JPG 或 PNG 图片");
  } finally {
    event.currentTarget.value = "";
  }
});

document.getElementById("removePhoto").addEventListener("click", () => {
  state.data.profile.photo = "";
  syncInputs();
  renderPreview();
  saveState();
  showToast("已移除个人照片");
});

document.getElementById("experienceEditor").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-experience]");
  if (!button) return;
  state.data.experience.splice(Number(button.dataset.removeExperience), 1);
  rerender({ editor: true });
  showToast("已删除一段工作经历");
});

document.getElementById("projectEditor").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-project]");
  if (!button) return;
  state.data.projects.splice(Number(button.dataset.removeProject), 1);
  rerender({ editor: true });
  showToast("已删除一个项目经历");
});

document.getElementById("educationEditor").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-education]");
  if (!button) return;
  state.data.education.splice(Number(button.dataset.removeEducation), 1);
  rerender({ editor: true });
  showToast("已删除一条教育经历");
});

document.getElementById("addExperience").addEventListener("click", () => {
  state.data.experience.push({ company: "", role: "", period: "", highlights: "" });
  rerender({ editor: true });
  setTimeout(() => document.querySelector(`[data-bind="experience.${state.data.experience.length - 1}.company"]`)?.focus(), 0);
});

document.getElementById("addProject").addEventListener("click", () => {
  state.data.projects.push({ name: "", role: "", period: "", link: "", description: "", highlights: "" });
  rerender({ editor: true });
  setTimeout(() => document.querySelector(`[data-bind="projects.${state.data.projects.length - 1}.name"]`)?.focus(), 0);
});

document.getElementById("addEducation").addEventListener("click", () => {
  state.data.education.push({ school: "", degree: "", period: "" });
  rerender({ editor: true });
  setTimeout(() => document.querySelector(`[data-bind="education.${state.data.education.length - 1}.school"]`)?.focus(), 0);
});

document.getElementById("templateList").addEventListener("click", event => {
  const button = event.target.closest("[data-template]");
  if (!button) return;
  state.template = button.dataset.template;
  rerender();
  const templateName = button.querySelector(":scope > span:nth-child(2) b")?.textContent || "新";
  showToast(`已切换为「${templateName}」模板`);
});

document.getElementById("localeControl").addEventListener("click", event => {
  const button = event.target.closest("[data-locale]");
  if (!button) return;
  state.locale = button.dataset.locale;
  sampleArmed = false;
  rerender();
  showToast(state.locale === "zh" ? "预览标签已切换为中文" : "Preview labels switched to English");
});

document.getElementById("themeControl").addEventListener("click", event => {
  const button = event.target.closest("[data-theme]");
  if (!button) return;
  state.theme = button.dataset.theme;
  rerender();
  showToast(state.theme === "dark" ? "已切换为深色简历" : "已切换为浅色简历");
});

document.getElementById("colorOptions").addEventListener("click", event => {
  const button = event.target.closest("[data-accent]");
  if (!button) return;
  state.accent = button.dataset.accent;
  rerender();
});

document.getElementById("densityControl").addEventListener("click", event => {
  const button = event.target.closest("[data-density]");
  if (!button) return;
  state.density = button.dataset.density;
  rerender();
});

document.getElementById("loadSample").addEventListener("click", event => {
  if (!sampleArmed) {
    sampleArmed = true;
    event.currentTarget.textContent = state.locale === "zh" ? "再次点击确认覆盖" : "Click again to replace";
    setTimeout(() => {
      sampleArmed = false;
      updateControls();
    }, 15000);
    return;
  }
  state.data = clone(samples[state.locale]);
  state.documentName = state.locale === "zh" ? "我的产品经理简历" : "AI Product Manager Resume";
  sampleArmed = false;
  rerender({ editor: true });
  showToast(state.locale === "zh" ? "已载入中文示例" : "English sample loaded");
});

documentNameInput.addEventListener("input", event => {
  state.documentName = event.target.value;
  saveState();
});

document.getElementById("resetButton").addEventListener("click", event => {
  if (!resetArmed) {
    resetArmed = true;
    event.currentTarget.lastChild.textContent = " 再次点击确认";
    setTimeout(() => {
      resetArmed = false;
      event.currentTarget.lastChild.textContent = " 重置示例";
    }, 15000);
    return;
  }
  const preservedTemplate = state.template;
  const preservedLocale = state.locale;
  state = clone(baseState);
  state.template = preservedTemplate;
  state.locale = preservedLocale;
  state.data = clone(samples[preservedLocale]);
  state.documentName = preservedLocale === "zh" ? "我的产品经理简历" : "AI Product Manager Resume";
  resetArmed = false;
  rerender({ editor: true });
  fitPreview(true);
  showToast("已恢复当前语言的示例内容");
});

document.getElementById("exportButton").addEventListener("click", () => {
  showToast("正在打开打印面板，请选择“另存为 PDF”");
  setTimeout(() => window.print(), 180);
});

document.getElementById("zoomOut").addEventListener("click", () => {
  const current = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--preview-scale")) || .75;
  setZoom(current - .05);
});

document.getElementById("zoomIn").addEventListener("click", () => {
  const current = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--preview-scale")) || .75;
  setZoom(current + .05);
});

document.querySelector(".mobile-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-mobile-view]");
  if (!button) return;
  document.querySelectorAll("[data-mobile-view]").forEach(item => item.classList.toggle("active", item === button));
  document.querySelector(".workspace").dataset.currentView = button.dataset.mobileView;
  if (button.dataset.mobileView === "preview") requestAnimationFrame(() => fitPreview(true));
});

window.addEventListener("resize", () => {
  if (!state.zoom) fitPreview();
});

renderRepeatEditors();
updateControls();
renderPreview();
requestAnimationFrame(() => fitPreview());
