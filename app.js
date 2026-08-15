const STORAGE_KEY = "kami-resume-studio-v1";
const LAYOUT_STORAGE_KEY = "kami-resume-studio-layout-v1";
const EDITOR_RAIL_MIN = 280;
const EDITOR_RAIL_MAX = 480;

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

const paperTones = {
  white: "#ffffff",
  ivory: "#fffcf4"
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
  },
  "aqua-ledger": {
    light: { accent: "#2f3336", paper: "#ffffff", ink: "#1c1c1c", muted: "#666666", line: "#e5e5e3" },
    dark: { accent: "#d6d6d4", paper: "#1a1b1c", ink: "#f3f3f1", muted: "#a8a8a6", line: "#3a3b3c" }
  },
  "slate-sidebar": {
    light: { accent: "#252b34", paper: "#ffffff", ink: "#252b34", muted: "#737983", line: "#d9dde2" },
    dark: { accent: "#eef0f3", paper: "#171a1f", ink: "#f1f3f5", muted: "#aeb4bd", line: "#3b414a" }
  },
  "atelier-serif": {
    light: { accent: "#5a5651", paper: "#f5f3f0", ink: "#262522", muted: "#74706a", line: "#d0cbc4" },
    dark: { accent: "#d1c7b8", paper: "#211f1d", ink: "#f2eee8", muted: "#bcb4aa", line: "#514c47" }
  },
  cupertino: {
    light: { accent: "#147ce5", paper: "#fbfcfe", ink: "#1d1d1f", muted: "#6e6e73", line: "#d5d5d7" },
    dark: { accent: "#64a8ff", paper: "#1c1c1e", ink: "#f5f5f7", muted: "#aeaeb2", line: "#48484a" }
  },
  "swiss-grid": {
    light: { accent: "#3579a8", paper: "#f7f9fa", ink: "#15191c", muted: "#626b70", line: "#9da8ae" },
    dark: { accent: "#80bde4", paper: "#171b1e", ink: "#f1f4f5", muted: "#b2babf", line: "#4e5960" }
  }
};

const photoSupportedTemplates = new Set(["editorial", "technical", "creative", "early-career", "aqua-ledger", "slate-sidebar", "atelier-serif", "cupertino", "swiss-grid"]);
const iconSocialTemplates = new Set(["technical", "creative", "early-career", "slate-sidebar"]);
const sectionReorderTemplates = new Set(["slate-sidebar"]);
const resumeSectionKeys = ["summary", "experience", "projects", "education", "skills"];
const socialPlatforms = {
  linkedin: {
    labels: { zh: "LinkedIn", en: "LinkedIn" },
    placeholder: "https://linkedin.com/in/username",
    color: "#0a66c2",
    viewBox: "0 0 64 64",
    icon: '<path fill="currentColor" d="M55.92 4H8.08A4.08 4.08 0 0 0 4 8.08v47.84A4.08 4.08 0 0 0 8.08 60h47.84A4.08 4.08 0 0 0 60 55.92V8.08A4.08 4.08 0 0 0 55.92 4Z"/><path fill="#fff" d="M52 35.76V52h-8V37.81c0-4.31-2.73-6.11-5-6.11a5.82 5.82 0 0 0-6 6.21V52h-8V25h7.53v3.79h.11c.8-1.64 4.44-4.37 9.13-4.37S52 27.59 52 35.76ZM16 11.3A4.7 4.7 0 1 0 20.7 16a4.69 4.69 0 0 0-4.7-4.7ZM12 52h8V25h-8Z"/>'
  },
  github: {
    labels: { zh: "GitHub", en: "GitHub" },
    placeholder: "https://github.com/username",
    color: "#24292f",
    viewBox: "0 0 24 24",
    icon: '<path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577l-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22l-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297Z"/>'
  },
  x: {
    labels: { zh: "X", en: "X" },
    placeholder: "https://x.com/username",
    color: "#111111",
    viewBox: "0 0 24 24",
    icon: '<path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993l-9.508-13.838Zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182l-6.327-9.05Z"/>'
  },
  behance: {
    labels: { zh: "Behance", en: "Behance" },
    placeholder: "https://behance.net/username",
    color: "#1769ff",
    viewBox: "0 0 24 24",
    icon: '<path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084c2.978 0 4.717 1.306 4.717 3.848 0 1.455-.671 2.537-2.009 3.248 1.798.579 2.697 1.889 2.697 3.931 0 3.007-2.079 4.511-5.197 4.511H0V4.084h6.947Zm-.235 12.9c1.604 0 2.407-.686 2.407-2.059 0-1.48-.78-2.22-2.338-2.22h-3.54v4.279h3.471Zm13.635-5.967c-.383-.413-.934-.619-1.654-.619-1.426 0-2.238.802-2.434 2.405h4.769c-.083-.754-.31-1.349-.681-1.786ZM6.534 10.369c1.322 0 1.983-.615 1.983-1.846 0-1.181-.74-1.771-2.219-1.771H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>'
  },
  dribbble: {
    labels: { zh: "Dribbble", en: "Dribbble" },
    placeholder: "https://dribbble.com/username",
    color: "#ea4c89",
    viewBox: "0 0 24 24",
    icon: '<path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12Zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.25 10.25 0 0 0 4.395-6.87Zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4A10.2 10.2 0 0 0 12 22.266c1.42 0 2.77-.29 4-.814ZM4.385 18.87c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74-5.12 1.53-10.084 1.465-10.534 1.455l-.004.312c0 2.633.998 5.037 2.634 6.855Zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17ZM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702A10.2 10.2 0 0 0 12 1.764c-.825 0-1.63.1-2.4.285Zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33a10.2 10.2 0 0 0-2.31-6.38Z"/>'
  },
  medium: {
    labels: { zh: "Medium", en: "Medium" },
    placeholder: "https://medium.com/@username",
    color: "#111111",
    viewBox: "0 0 24 24",
    icon: '<path d="M2.01 6.55a.65.65 0 0 0-.213-.548L.213 4.095V3.81h4.918l3.802 8.34 3.34-8.34h4.687v.285l-1.355 1.298a.397.397 0 0 0-.15.38v9.54a.397.397 0 0 0 .15.38l1.323 1.298v.285h-6.655v-.285l1.37-1.33c.134-.135.134-.175.134-.38V7.57L7.97 17.246h-.514L3.02 7.57v6.486c-.037.279.056.56.253.76l1.782 2.156v.285H0v-.285l1.782-2.156c.196-.2.284-.484.229-.76V6.55Zm16.878-2.74L24 3.81v.285l-1.25 1.195a.37.37 0 0 0-.142.348v9.832a.37.37 0 0 0 .142.348L24 17.013v.285h-5.112v-.285l1.294-1.226c.127-.127.127-.164.127-.348V5.67c0-.184 0-.221-.127-.348l-1.294-1.226V3.81Z"/>'
  },
  gitlab: {
    labels: { zh: "GitLab", en: "GitLab" },
    placeholder: "https://gitlab.com/username",
    color: "#fc6d26",
    viewBox: "0 0 24 24",
    icon: '<path d="m23.6 9.593-.034-.086L20.3.981a.851.851 0 0 0-1.626.089l-2.206 6.748H7.538L5.332 1.07a.857.857 0 0 0-1.626-.09L.433 9.502l-.032.086a6.066 6.066 0 0 0 2.012 7.01l.041.03 9.548 7.222 9.576-7.244.013-.01A6.068 6.068 0 0 0 23.6 9.593Z"/>'
  },
  link: {
    labels: { zh: "自定义链接", en: "Custom link" },
    placeholder: "https://example.com",
    color: "#4f5965",
    viewBox: "0 0 24 24",
    icon: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>'
  }
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

const letterSamples = {
  zh: {
    company: "星河智能",
    role: "AI 产品负责人",
    recipient: "招聘团队，您好：",
    date: "2026 年 8 月 13 日",
    subject: "申请 AI 产品负责人",
    body: "我希望申请贵公司的 AI 产品负责人岗位。过去六年，我持续把复杂的企业知识工作拆解为可验证的产品机制，并推动产品从用户研究、方案定义走向规模化交付。\n\n在最近一段经历中，我牵头企业知识助手从零到一，覆盖检索、生成、引用校验与权限控制，并建立离线评测和线上反馈闭环。相关工作将高频问答准确率从 71% 提升至 89%，同时降低了人工复核量。\n\n我期待把这套以证据、评测和业务结果为核心的方法带入贵公司，与产品、工程和商业团队共同建立值得长期信赖的 AI 工作流。",
    closing: "谨致问候",
    signer: "林知遥",
    recommenderName: "周明远",
    recommenderTitle: "前直属主管 · 产品副总裁"
  },
  en: {
    company: "Northstar Intelligence",
    role: "Head of AI Product",
    recipient: "Dear Hiring Team,",
    date: "August 13, 2026",
    subject: "Application for Head of AI Product",
    body: "I am applying for the Head of AI Product role. Over six years, I have turned complex enterprise knowledge problems into testable product systems and guided them from customer research through scaled delivery.\n\nMost recently, I led a secure knowledge assistant from zero to launch across retrieval, generation, citation checks, and permissions. The evaluation and feedback system raised high-frequency answer accuracy from 71% to 89% while reducing manual review.\n\nI would welcome the opportunity to bring this evidence-led approach to your product, engineering, and commercial teams and help build AI workflows that users can trust over time.",
    closing: "Sincerely,",
    signer: "Avery Lin",
    recommenderName: "Morgan Zhou",
    recommenderTitle: "Former VP of Product"
  }
};

const baseState = {
  documentName: "我的产品经理简历",
  documentType: "resume",
  template: "editorial",
  theme: "light",
  paperTone: "auto",
  locale: "zh",
  accent: "auto",
  density: "balanced",
  zoom: null,
  sectionOrder: [...resumeSectionKeys],
  data: { ...samples.zh, coverLetter: letterSamples.zh }
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
const workspace = document.querySelector(".workspace");
const editorRailResizer = document.getElementById("editorRailResizer");
const designRail = document.getElementById("designRail");
const designRailToggle = document.getElementById("designRailToggle");
const designRailClose = document.getElementById("designRailClose");
let editorRailWidth = loadEditorRailWidth();
let designRailOpen = false;
let layoutRaf = null;
let activeResizePointerId = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeSectionOrder(value) {
  const requested = Array.isArray(value) ? value.filter(key => resumeSectionKeys.includes(key)) : [];
  return [...new Set([...requested, ...resumeSectionKeys])];
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
        skills: { ...clone(samples.zh.skills), ...saved.data.skills },
        coverLetter: { ...clone(letterSamples.zh), ...(saved.data.coverLetter || {}) }
      }
    };
    if (restored.template === "classic") restored.template = "ats-classic";
    if (restored.template === "modern") restored.template = "creative";
    if (!themes[restored.theme]) restored.theme = "light";
    if (!["auto", "white", "ivory"].includes(restored.paperTone)) restored.paperTone = "auto";
    if (!["resume", "cover-letter", "recommendation"].includes(restored.documentType)) restored.documentType = "resume";
    restored.sectionOrder = normalizeSectionOrder(restored.sectionOrder);
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

function loadEditorRailWidth() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY));
    return Number.isFinite(saved?.editorRailWidth) ? saved.editorRailWidth : 330;
  } catch (error) {
    return 330;
  }
}

function isDesktopWorkspace() {
  return window.matchMedia("(min-width: 961px)").matches;
}

function editorRailMaximum() {
  if (!isDesktopWorkspace()) return EDITOR_RAIL_MAX;
  const designWidth = designRailOpen ? (window.innerWidth <= 1180 ? 250 : 278) : 0;
  const previewMinimum = designRailOpen && window.innerWidth <= 1180 ? 380 : 480;
  return Math.max(EDITOR_RAIL_MIN, Math.min(EDITOR_RAIL_MAX, window.innerWidth - designWidth - previewMinimum - 8));
}

function scheduleWorkspaceRefresh() {
  if (layoutRaf) return;
  layoutRaf = requestAnimationFrame(() => {
    layoutRaf = null;
    if (!state.zoom) fitPreview(true);
    else updatePageEstimate();
  });
}

function setEditorRailWidth(value, { persist = false } = {}) {
  const maximum = editorRailMaximum();
  editorRailWidth = Math.max(EDITOR_RAIL_MIN, Math.min(maximum, Math.round(value)));
  document.documentElement.style.setProperty("--editor-rail-width", `${editorRailWidth}px`);
  editorRailResizer.setAttribute("aria-valuemax", String(maximum));
  editorRailResizer.setAttribute("aria-valuenow", String(editorRailWidth));
  if (persist) localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify({ editorRailWidth }));
  scheduleWorkspaceRefresh();
}

function syncWorkspaceAccessibility() {
  const designVisible = isDesktopWorkspace() ? designRailOpen : workspace.dataset.currentView === "design";
  designRail.setAttribute("aria-hidden", String(!designVisible));
  designRail.inert = !designVisible;
}

function setDesignRailOpen(open, { returnFocus = false } = {}) {
  designRailOpen = Boolean(open);
  workspace.classList.toggle("is-design-open", designRailOpen);
  designRailToggle.setAttribute("aria-expanded", String(designRailOpen));
  designRailToggle.setAttribute("aria-label", designRailOpen ? "收起模板设置" : "展开模板设置");
  designRailToggle.title = designRailOpen ? "收起模板设置" : "展开模板设置";
  setEditorRailWidth(editorRailWidth);
  syncWorkspaceAccessibility();
  if (returnFocus) designRailToggle.focus();
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

function photoPlaceholderMarkup() {
  return `<span class="photo-placeholder" aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="17" r="8"></circle><path d="M10 40c1.4-9 6.6-13.5 14-13.5S36.6 31 38 40"></path></svg></span>`;
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
  const spec = socialPlatforms[platform] || socialPlatforms.link;
  return `<svg viewBox="${spec.viewBox}" aria-hidden="true">${spec.icon}</svg>`;
}

function slateIcon(name) {
  const paths = {
    profile: '<circle cx="12" cy="8" r="3"></circle><path d="M6 20c.8-4 2.8-6 6-6s5.2 2 6 6"></path>',
    briefcase: '<rect x="3" y="7" width="18" height="12" rx="2"></rect><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2"></path>',
    folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"></path>',
    education: '<path d="m3 10 9-5 9 5-9 5-9-5Z"></path><path d="M7 12.2V17c2.8 2 7.2 2 10 0v-4.8M21 10v6"></path>',
    spark: '<path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z"></path><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"></path>',
    phone: '<path d="M7.2 3.5 9 7.7 6.8 9c1.5 3 3.8 5.3 6.8 6.8l1.3-2.2 4.2 1.8v3c0 1-.8 1.8-1.8 1.8C9.8 19.7 4.3 14.2 3.8 6.7c0-1 .8-1.8 1.8-1.8h1.6v-1.4Z"></path>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path>',
    link: '<path d="M10 13a4.5 4.5 0 0 0 6.4.1l2-2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1"></path><path d="M14 11a4.5 4.5 0 0 0-6.4-.1l-2 2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1"></path>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    role: '<circle cx="12" cy="12" r="8"></circle><path d="M8 12h8M12 8v8"></path>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.profile}</svg>`;
}

function socialLinks(profile, template) {
  const socials = profile.socials || {};
  const items = Object.entries(socials)
    .map(([key, item]) => {
      const platform = socialPlatforms[key] ? key : (item?.platform || "link");
      const labels = socialPlatforms[platform]?.labels || socialPlatforms.link.labels;
      return { platform, label: item?.label || labels[state.locale] || labels.en, item };
    })
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
    : photoPlaceholderMarkup();
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

function renderAquaLedger(data, labels) {
  const summaryLabel = state.locale === "zh" ? "个人简介" : "SUMMARY";
  const experienceLabel = state.locale === "zh" ? "工作经历" : "EXPERIENCE";
  const projectsLabel = state.locale === "zh" ? "项目经历" : "PROJECTS";
  const profileLabel = state.locale === "zh" ? "教育背景" : "EDUCATION";
  const contacts = [
    data.profile.location ? `<span class="aqua-meta aqua-meta-location">${escapeHtml(data.profile.location)}</span>` : "",
    data.profile.phone ? `<span class="aqua-meta aqua-meta-phone">${escapeHtml(data.profile.phone)}</span>` : "",
    data.profile.email ? `<span class="aqua-meta aqua-meta-email">${escapeHtml(data.profile.email)}</span>` : "",
    data.profile.website ? `<span class="aqua-meta aqua-meta-web">${escapeHtml(data.profile.website)}</span>` : ""
  ].filter(Boolean).join("");
  const experience = (data.experience || []).map((item, index) => {
    const bullets = splitHighlights(item.highlights).map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("");
    return `<div class="resume-entry aqua-entry">
      <div class="aqua-entry-meta">
        ${index === 0 ? `<h2>${experienceLabel}</h2>` : ""}
        <h3><span class="aqua-company">${escapeHtml(item.company)}</span><span class="aqua-sep">|</span><span class="aqua-role">${escapeHtml(item.role)}</span></h3>
        <p class="resume-period">${escapeHtml(item.period)}</p>
      </div>
      ${bullets ? `<ul>${bullets}</ul>` : `<div></div>`}
    </div>`;
  }).join("");
  const projects = (data.projects || []).map((item, index) => {
    const href = projectHref(item);
    const title = href
      ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)}</a>`
      : escapeHtml(item.name);
    const bullets = splitHighlights(item.highlights).map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("");
    return `<div class="project-entry project-entry-aqua">
      <div class="aqua-entry-meta">
        ${index === 0 ? `<h2>${projectsLabel}</h2>` : ""}
        <h3>${title}</h3>
        <p class="resume-period">${escapeHtml(item.period)}</p>
      </div>
      <div class="aqua-project-copy">
        ${item.role ? `<p class="entry-subtitle">${escapeHtml(item.role)}</p>` : ""}
        ${item.description ? `<p class="project-description">${escapeHtml(item.description)}</p>` : ""}
        ${bullets ? `<ul>${bullets}</ul>` : ""}
      </div>
    </div>`;
  }).join("") || `<div class="project-entry project-entry-aqua"><div class="aqua-entry-meta"><h2>${projectsLabel}</h2></div><p class="empty-projects">${state.locale === "zh" ? "暂无项目经历" : "No selected projects yet."}</p></div>`;
  return `<div class="aqua-page aqua-page-one" aria-label="${state.locale === "zh" ? "简历第 1 页" : "Resume page 1"}">
      ${avatarMarkup(data.profile, "aqua-ledger", "aqua-photo")}<header class="aqua-header"><div class="aqua-identity"><h1 class="resume-title">${escapeHtml(data.profile.title)}</h1><p class="resume-name">${escapeHtml(data.profile.name)}</p><div class="aqua-contact">${contacts}${renderSocialBlock(data.profile, "aqua-ledger")}</div></div></header>
      <section class="aqua-row aqua-summary"><h2>${summaryLabel}</h2><div><p>${escapeHtml(data.profile.summary)}</p></div></section>
      <section class="aqua-ledger-section aqua-experience"><div class="aqua-section-list">${experience}</div></section>
    </div>
    <div class="aqua-page aqua-page-two" aria-label="${state.locale === "zh" ? "简历第 2 页" : "Resume page 2"}">
      <section class="aqua-ledger-section aqua-projects"><div class="aqua-section-list">${projects}</div></section>
      <section class="aqua-row aqua-bottom"><h2>${profileLabel}</h2><div class="aqua-mini-grid"><div>${renderSkillGroups(data.skills, labels)}</div><div>${renderEducation(data.education)}</div></div></section>
    </div>`;
}

function paginateAquaLedger() {
  const firstPage = preview.querySelector(".aqua-page-one");
  const renderedSecondPage = preview.querySelector(".aqua-page-two");
  if (!firstPage || !renderedSecondPage) return;

  const experienceEntries = [...firstPage.querySelectorAll(".aqua-entry")];
  const projectEntries = [...renderedSecondPage.querySelectorAll(".project-entry-aqua")];
  const profileBlock = renderedSecondPage.querySelector(".aqua-bottom");
  const experienceLabel = state.locale === "zh" ? "工作经历" : "EXPERIENCE";
  const projectsLabel = state.locale === "zh" ? "项目经历" : "PROJECTS";
  const firstExperienceSection = firstPage.querySelector(".aqua-experience");

  firstExperienceSection.querySelector(".aqua-section-list").replaceChildren();
  renderedSecondPage.remove();

  const createPage = () => {
    const page = document.createElement("div");
    page.className = "aqua-page aqua-page-continuation";
    preview.append(page);
    return page;
  };

  const createSection = (page, sectionClass) => {
    const section = document.createElement("section");
    section.className = `aqua-ledger-section ${sectionClass}`;
    const list = document.createElement("div");
    list.className = "aqua-section-list";
    section.append(list);
    page.append(section);
    return list;
  };

  const setEntryHeading = (entry, label, show) => {
    const meta = entry.querySelector(".aqua-entry-meta");
    meta.querySelector(":scope > h2")?.remove();
    if (!show) return;
    const heading = document.createElement("h2");
    heading.textContent = label;
    meta.prepend(heading);
  };

  const packEntries = (entries, page, list, sectionClass, label) => {
    let currentPage = page;
    let currentList = list;
    for (const entry of entries) {
      const startsPage = currentList.children.length === 0;
      setEntryHeading(entry, label, startsPage);
      currentList.append(entry);
      if (currentPage.scrollHeight <= currentPage.clientHeight + 1 || (startsPage && currentPage !== firstPage)) continue;

      entry.remove();
      currentPage = createPage();
      currentList = createSection(currentPage, sectionClass);
      setEntryHeading(entry, label, true);
      currentList.append(entry);
    }
    return currentPage;
  };

  let currentPage = packEntries(
    experienceEntries,
    firstPage,
    firstExperienceSection.querySelector(".aqua-section-list"),
    "aqua-experience",
    experienceLabel
  );

  currentPage = createPage();
  let projectList = createSection(currentPage, "aqua-projects");
  currentPage = packEntries(projectEntries, currentPage, projectList, "aqua-projects", projectsLabel);

  if (profileBlock) {
    profileBlock.classList.toggle("is-page-start", currentPage.children.length === 0);
    currentPage.append(profileBlock);
    if (currentPage.scrollHeight > currentPage.clientHeight + 1 && currentPage.children.length > 1) {
      profileBlock.remove();
      currentPage = createPage();
      profileBlock.classList.add("is-page-start");
      currentPage.append(profileBlock);
    }
  }

  [...preview.querySelectorAll(":scope > .aqua-page")].forEach((page, index) => {
    page.setAttribute("aria-label", state.locale === "zh" ? `简历第 ${index + 1} 页` : `Resume page ${index + 1}`);
  });
}

function renderSlateSidebar(data, labels) {
  const locale = state.locale;
  const sideLabels = locale === "zh"
    ? { info: "个人信息", highlights: "个人亮点", other: "其它" }
    : { info: "Personal Info", highlights: "Highlights", other: "Other" };
  const summaryPoints = String(data.profile.summary || "")
    .split(locale === "zh" ? /[。；]+/ : /(?<=[.!?])\s+/)
    .map(item => item.trim())
    .filter(Boolean);
  const contactRows = [
    ["role", data.profile.title],
    ["phone", data.profile.phone],
    ["mail", data.profile.email],
    ["pin", data.profile.location]
  ].filter(([, value]) => value).map(([icon, value]) => `<li>${slateIcon(icon)}<span>${escapeHtml(value)}</span></li>`).join("");
  const websiteHref = safeUrl(data.profile.website);
  const websiteLink = websiteHref
    ? `<a class="social-link social-link-icon" href="${escapeHtml(websiteHref)}" target="_blank" rel="noopener noreferrer" aria-label="${locale === "zh" ? "个人主页" : "Website"}" title="${locale === "zh" ? "个人主页" : "Website"}">${socialIcon("link")}</a>`
    : "";
  const personalLinks = `${websiteLink}${socialLinks(data.profile, "slate-sidebar")}`;
  const skills = [
    [labels.core, data.skills.core],
    [labels.tools, data.skills.tools],
    [labels.languages, data.skills.languages]
  ].filter(([, value]) => value).map(([label, value]) => `<li><b>${escapeHtml(label)}:</b> ${escapeHtml(value)}</li>`).join("");
  const orderedSidebarSections = normalizeSectionOrder(state.sectionOrder).map(key => {
    if (key === "summary") return `<section class="slate-side-section" data-resume-section="summary"><h2>${slateIcon("spark")}<span>${sideLabels.highlights}</span></h2><ul class="slate-plus-list">${summaryPoints.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`;
    if (key === "skills") return `<section class="slate-side-section" data-resume-section="skills"><h2>${slateIcon("folder")}<span>${sideLabels.other}</span></h2><ul class="slate-other-list">${skills}</ul></section>`;
    return "";
  }).join("");
  const sidebar = `<aside class="slate-sidebar">
    ${avatarMarkup(data.profile, "slate-sidebar", "slate-photo")}
    <h1 class="slate-name">${escapeHtml(data.profile.name)}</h1>
    <section class="slate-side-section"><h2>${slateIcon("profile")}<span>${sideLabels.info}</span></h2><ul class="slate-contact-list">${contactRows}</ul>${personalLinks ? `<nav class="slate-social-links" aria-label="${locale === "zh" ? "个人链接" : "Personal links"}">${personalLinks}</nav>` : ""}</section>
    ${orderedSidebarSections}
  </aside>`;
  const experienceEntries = (data.experience || []).map(item => {
    const bullets = splitHighlights(item.highlights).map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("");
    return `<article class="slate-entry" data-slate-entry="experience"><header><h3>${escapeHtml(item.company)}${item.role ? ` · ${escapeHtml(item.role)}` : ""}</h3><span>${escapeHtml(item.period)}${data.profile.location ? ` · ${escapeHtml(data.profile.location)}` : ""}</span></header>${bullets ? `<ul>${bullets}</ul>` : ""}</article>`;
  }).join("");
  const educationEntries = (data.education || []).map(item => `<article class="slate-education-entry" data-slate-entry="education"><header><h3>${escapeHtml(item.school)}</h3><span>${escapeHtml(item.period)}</span></header><p>${escapeHtml(item.degree)}</p></article>`).join("");
  const projectEntries = (data.projects || []).map(item => {
    const href = projectHref(item);
    const title = href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)}</a>` : escapeHtml(item.name);
    const bullets = splitHighlights(item.highlights).map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("");
    return `<article class="slate-entry slate-project-entry" data-slate-entry="projects"><header><h3>${title}${item.role ? ` · ${escapeHtml(item.role)}` : ""}</h3><span>${escapeHtml(item.period)}</span></header>${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}${bullets ? `<ul>${bullets}</ul>` : ""}</article>`;
  }).join("") || `<p class="slate-empty" data-slate-entry="projects">${locale === "zh" ? "暂无项目经历" : "No selected projects yet."}</p>`;
  const section = (label, icon, className, body) => `<section class="slate-main-section ${className}"><h2>${slateIcon(icon)}<span>${label}</span></h2><div class="slate-section-body">${body}</div></section>`;
  return `<div class="slate-page slate-page-one" data-resume-page aria-label="${locale === "zh" ? "简历第 1 页" : "Resume page 1"}">${sidebar}<main class="slate-main">${section(labels.experience, "briefcase", "slate-experience", experienceEntries)}${section(labels.education, "education", "slate-education", educationEntries)}</main></div>
    <div class="slate-page slate-page-two" data-resume-page aria-label="${locale === "zh" ? "简历第 2 页" : "Resume page 2"}">${sidebar}<main class="slate-main">${section(labels.projects, "folder", "slate-projects", projectEntries)}</main></div>`;
}

function paginateSlateSidebar() {
  const firstPage = preview.querySelector(".slate-page-one");
  const secondPage = preview.querySelector(".slate-page-two");
  if (!firstPage || !secondPage) return;
  const sidebar = firstPage.querySelector(".slate-sidebar").outerHTML;
  const entries = {
    experience: [...firstPage.querySelectorAll('[data-slate-entry="experience"]')],
    education: [...firstPage.querySelectorAll('[data-slate-entry="education"]')],
    projects: [...secondPage.querySelectorAll('[data-slate-entry="projects"]')]
  };
  const specs = {
    experience: [state.locale === "zh" ? "工作经历" : "Experience", "briefcase", "slate-experience"],
    education: [state.locale === "zh" ? "教育背景" : "Education", "education", "slate-education"],
    projects: [state.locale === "zh" ? "项目经历" : "Projects", "folder", "slate-projects"]
  };
  const firstMain = firstPage.querySelector(".slate-main");
  firstMain.replaceChildren();
  secondPage.remove();
  const createPage = () => {
    const page = document.createElement("div");
    page.className = "slate-page slate-page-continuation";
    page.dataset.resumePage = "";
    page.innerHTML = `${sidebar}<main class="slate-main"></main>`;
    preview.append(page);
    return page;
  };
  const createSection = (page, type) => {
    const [label, icon, className] = specs[type];
    const section = document.createElement("section");
    section.className = `slate-main-section ${className}`;
    section.innerHTML = `<h2>${slateIcon(icon)}<span>${label}</span></h2><div class="slate-section-body"></div>`;
    page.querySelector(".slate-main").append(section);
    return section.querySelector(".slate-section-body");
  };
  const pack = (items, startPage, type) => {
    let page = startPage;
    let body = createSection(page, type);
    for (const entry of items) {
      body.append(entry);
      const main = page.querySelector(".slate-main");
      const onlyEntryOnPage = main.querySelectorAll(":scope > .slate-main-section").length === 1 && body.children.length === 1;
      if (main.scrollHeight <= main.clientHeight + 1 || onlyEntryOnPage) continue;
      entry.remove();
      if (!body.children.length) body.closest(".slate-main-section")?.remove();
      page = createPage();
      body = createSection(page, type);
      body.append(entry);
    }
    return page;
  };
  const orderedMainSections = normalizeSectionOrder(state.sectionOrder).filter(type => entries[type]);
  let currentPage = firstPage;
  orderedMainSections.forEach((type, index) => {
    if (index === 1) currentPage = createPage();
    currentPage = pack(entries[type], currentPage, type);
  });
  [...preview.querySelectorAll(":scope > .slate-page")].forEach((page, index) => page.setAttribute("aria-label", state.locale === "zh" ? `简历第 ${index + 1} 页` : `Resume page ${index + 1}`));
}

function renderAtelierSerif(data, labels) {
  return `<aside class="atelier-rail">${avatarMarkup(data.profile, "atelier-serif", "atelier-photo")}<div class="atelier-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>${renderSocialBlock(data.profile, "atelier-serif")}<section><h2>${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section><section><h2>${labels.education}</h2>${renderEducation(data.education)}</section></aside>
    <main class="atelier-main"><header><p>SELECTED PROFILE / 2026</p><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p></header><p class="resume-summary">${escapeHtml(data.profile.summary)}</p><section><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section><section class="project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "atelier")}</section></main>`;
}

function renderCupertino(data, labels) {
  return `<header class="cupertino-header">${avatarMarkup(data.profile, "cupertino", "cupertino-photo")}<div><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p><div class="cupertino-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "cupertino")}</div></div></header><p class="resume-summary">${escapeHtml(data.profile.summary)}</p><section><h2 class="resume-section-title">${labels.experience}</h2>${renderExperience(data.experience)}</section><section class="project-section"><h2 class="resume-section-title">${labels.projects}</h2>${renderProjects(data.projects, labels, "cupertino")}</section><div class="cupertino-bottom"><section><h2 class="resume-section-title">${labels.skills}</h2>${renderSkillGroups(data.skills, labels)}</section><section><h2 class="resume-section-title">${labels.education}</h2>${renderEducation(data.education)}</section></div>`;
}

function renderSwissGrid(data, labels) {
  return `<header class="swiss-header"><div class="swiss-number">00</div><div><p>STRATEGY PROFILE / SELECTED IMPACT</p><h1 class="resume-name">${escapeHtml(data.profile.name)}</h1><p class="resume-title">${escapeHtml(data.profile.title)}</p></div>${avatarMarkup(data.profile, "swiss-grid", "swiss-photo")}</header><section class="swiss-row"><h2>01<br>${labels.summary}</h2><p class="resume-summary">${escapeHtml(data.profile.summary)}</p></section><section class="swiss-row"><h2>02<br>${labels.experience}</h2><div>${renderExperience(data.experience)}</div></section><section class="swiss-row"><h2>03<br>${labels.projects}</h2><div>${renderProjects(data.projects, labels, "swiss")}</div></section><section class="swiss-row"><h2>04<br>${labels.skills}</h2><div class="swiss-bottom"><div>${renderSkillGroups(data.skills, labels)}</div><div>${renderEducation(data.education)}</div><div class="swiss-contact">${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, "swiss-grid")}</div></div></section>`;
}

function renderLetter(data, template, kind) {
  const letter = data.coverLetter || letterSamples[state.locale] || letterSamples.zh;
  const isRecommendation = kind === "recommendation";
  const heading = isRecommendation
    ? (state.locale === "zh" ? "推荐信" : "Letter of Recommendation")
    : (letter.subject || (state.locale === "zh" ? "求职信" : "Cover Letter"));
  const signer = isRecommendation ? letter.recommenderName : (letter.signer || data.profile.name);
  const signerTitle = isRecommendation ? letter.recommenderTitle : data.profile.title;
  const body = String(letter.body || "").split(/\n\s*\n/).filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("");
  return `<div class="letter-shell letter-${template}"><header class="letter-header">${avatarMarkup(data.profile, template, "letter-photo")}<div><p class="letter-eyebrow">${escapeHtml(heading)}</p><h1>${escapeHtml(data.profile.name)}</h1><span>${escapeHtml(data.profile.title)}</span></div></header><div class="letter-meta"><span>${escapeHtml(letter.date)}</span><span>${escapeHtml(letter.company)}</span><span>${escapeHtml(letter.role)}</span></div><main><p class="letter-recipient">${escapeHtml(letter.recipient)}</p>${body}<p class="letter-closing">${escapeHtml(letter.closing)}<br><strong>${escapeHtml(signer)}</strong><br><span>${escapeHtml(signerTitle)}</span></p></main><footer>${contactValues(data.profile).map(item => `<span>${escapeHtml(item)}</span>`).join("")}${renderSocialBlock(data.profile, template)}</footer></div>`;
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
  const theme = { ...(templateTheme || themes[state.theme] || themes.light) };
  if (state.theme === "light" && paperTones[state.paperTone]) theme.paper = paperTones[state.paperTone];
  const accent = state.accent === "auto"
    ? { color: theme.accent || templateThemes.editorial.light.accent, soft: hexToRgba(theme.accent || templateThemes.editorial.light.accent) }
    : (accents[state.accent] || accents.ink);
  const labels = copy[state.locale] || copy.zh;
  preview.className = `resume-page template-${templateClass(state.template)} template-id-${state.template} theme-${state.theme} paper-tone-${state.paperTone} density-${state.density}`;
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
    "early-career": renderEarlyCareer,
    "aqua-ledger": renderAquaLedger,
    "slate-sidebar": renderSlateSidebar,
    "atelier-serif": renderAtelierSerif,
    cupertino: renderCupertino,
    "swiss-grid": renderSwissGrid
  };
  preview.innerHTML = state.documentType === "resume"
    ? (renderers[state.template] || renderEditorial)(state.data, labels)
    : renderLetter(state.data, state.template, state.documentType);
  if (state.documentType === "resume" && state.template === "aqua-ledger") paginateAquaLedger();
  if (state.documentType === "resume" && state.template === "slate-sidebar") paginateSlateSidebar();

  updateCompletion();
  updateQuality();
  updateSummaryCount();
  requestAnimationFrame(updatePageEstimate);
}

function renderSocialEditor() {
  const list = document.getElementById("socialEditorList");
  const select = document.getElementById("socialPlatformSelect");
  if (!list || !select) return;
  const socials = state.data.profile.socials || (state.data.profile.socials = {});
  list.innerHTML = Object.entries(socials).map(([key, item]) => {
    const platform = socialPlatforms[key] ? key : (item?.platform || "link");
    const spec = socialPlatforms[platform] || socialPlatforms.link;
    const label = item?.label || spec.labels[state.locale] || spec.labels.en;
    const custom = !socialPlatforms[key];
    const removable = !["linkedin", "x", "github"].includes(key);
    return `<div class="social-editor-row" data-social-key="${escapeHtml(key)}">
      <input type="checkbox" data-bind="profile.socials.${escapeHtml(key)}.enabled" aria-label="显示 ${escapeHtml(label)}">
      <span class="social-editor-logo" style="--social-color:${spec.color}" aria-hidden="true">${socialIcon(platform)}</span>
      ${custom
        ? `<input class="social-label-input" type="text" data-bind="profile.socials.${escapeHtml(key)}.label" aria-label="链接名称" placeholder="个人链接">`
        : `<b>${escapeHtml(label)}</b>`}
      <input type="url" data-bind="profile.socials.${escapeHtml(key)}.url" aria-label="${escapeHtml(label)} 链接" placeholder="${escapeHtml(spec.placeholder)}">
      ${removable ? `<button class="social-remove-button" type="button" data-remove-social="${escapeHtml(key)}" aria-label="移除 ${escapeHtml(label)}" title="移除 ${escapeHtml(label)}">×</button>` : ""}
    </div>`;
  }).join("");
  const available = Object.entries(socialPlatforms)
    .filter(([key]) => key === "link" || !socials[key]);
  select.innerHTML = available.map(([key, spec]) => `<option value="${key}">${escapeHtml(spec.labels[state.locale] || spec.labels.en)}</option>`).join("");
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

  renderSocialEditor();
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
    : photoPlaceholderMarkup();
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
  if (state.documentType !== "resume") {
    const letter = state.data.coverLetter || {};
    const required = [letter.company, letter.role, letter.recipient, letter.body, letter.closing];
    const score = Math.round(required.filter(value => String(value || "").trim()).length / required.length * 100);
    completionBadge.textContent = `${score}%`;
    completionBar.style.width = `${score}%`;
    return;
  }
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
  if (state.documentType !== "resume") {
    const letter = state.data.coverLetter || {};
    const issues = [];
    if (!letter.company || !letter.role) issues.push("补充目标公司和岗位，才能让信件与投递对象对齐。");
    if (String(letter.body || "").split(/\n\s*\n/).filter(Boolean).length < 2) issues.push("正文建议分成至少两段：岗位动机与证据匹配。");
    if (state.documentType === "recommendation" && (!letter.recommenderName || !letter.recommenderTitle)) issues.push("推荐信必须确认推荐人姓名、身份和关系，不能由 Agent 虚构。");
    qualityList.innerHTML = (issues.length ? issues : ["目标、正文和签署信息已完整。"]).map(item => `<li class="${issues.length ? "" : "good"}">${escapeHtml(item)}</li>`).join("");
    qualityScore.textContent = issues.length ? `${issues.length} 条建议` : "状态良好";
    return;
  }
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
  if (state.documentType !== "resume") return;
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
  const fixedPages = preview.querySelectorAll(":scope > [data-resume-page], :scope > .aqua-page").length;
  const pages = fixedPages || Math.max(1, Math.ceil(contentHeight / 1123));
  const overflow = pages > 1 || contentHeight > 1123;
  pageEstimate.textContent = fixedPages ? `A4 · ${pages} 页` : (overflow ? `A4 · 约 ${pages} 页` : `A4 · ${pages} 页`);
  preview.classList.toggle("is-overflowing", overflow);
  const scale = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--preview-scale")) || 1;
  const scaler = document.getElementById("paperScaler");
  const scaledHeight = contentHeight * scale;
  scaler.style.minHeight = `${scaledHeight}px`;
  scaler.style.height = `${scaledHeight}px`;
}

function syncSectionTabs() {
  const tabs = document.getElementById("sectionTabs");
  const order = ["profile", ...normalizeSectionOrder(state.sectionOrder)];
  order.forEach((section, index) => {
    const button = tabs.querySelector(`[data-section="${section}"]`);
    if (!button) return;
    button.querySelector("span").textContent = String(index + 1).padStart(2, "0");
    tabs.append(button);
  });
}

function moveResumeSection(section, target, placeAfter = false) {
  const order = normalizeSectionOrder(state.sectionOrder).filter(key => key !== section);
  const targetIndex = order.indexOf(target);
  if (!resumeSectionKeys.includes(section) || targetIndex < 0) return;
  order.splice(targetIndex + (placeAfter ? 1 : 0), 0, section);
  state.sectionOrder = order;
  syncSectionTabs();
  renderPreview();
  saveState();
  showToast(state.locale === "zh" ? "简历模块顺序已更新" : "Resume section order updated");
}

function updateControls() {
  syncSectionTabs();
  const sectionReorderEnabled = state.documentType === "resume" && sectionReorderTemplates.has(canonicalTemplate(state.template));
  document.querySelectorAll('#sectionTabs [data-section]:not([data-section="profile"])').forEach(button => {
    button.draggable = sectionReorderEnabled;
    button.title = sectionReorderEnabled ? "拖动调整侧写模板模块顺序" : "";
  });
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
  document.querySelectorAll("[data-paper-tone]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperTone === state.paperTone);
    button.disabled = state.theme === "dark";
  });
  const paperToneHelp = document.getElementById("paperToneHelp");
  if (paperToneHelp) paperToneHelp.textContent = state.theme === "dark" ? "深色模式使用模板纸面" : "浅色模式可选";
  document.querySelectorAll("[data-document-type]").forEach(button => {
    button.classList.toggle("active", button.dataset.documentType === state.documentType);
  });
  const resumeMode = state.documentType === "resume";
  document.querySelectorAll('[data-document-only="resume"]').forEach(item => item.hidden = !resumeMode);
  document.querySelectorAll('[data-document-only="letter"]').forEach(item => item.hidden = resumeMode);
  document.querySelector('[data-editor-section="letter"]')?.classList.toggle("active", !resumeMode);
  document.getElementById("letterEditorTitle").textContent = state.documentType === "recommendation" ? "推荐信" : "求职信";
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

let draggedResumeSection = "";
const sectionTabs = document.getElementById("sectionTabs");
sectionTabs.addEventListener("dragstart", event => {
  const button = event.target.closest('[data-section][draggable="true"]');
  if (!button) return;
  draggedResumeSection = button.dataset.section;
  button.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedResumeSection);
});
sectionTabs.addEventListener("dragover", event => {
  const target = event.target.closest('[data-section][draggable="true"]');
  if (!target || !draggedResumeSection || target.dataset.section === draggedResumeSection) return;
  event.preventDefault();
  sectionTabs.querySelectorAll(".is-drop-before, .is-drop-after").forEach(item => item.classList.remove("is-drop-before", "is-drop-after"));
  const after = event.clientX > target.getBoundingClientRect().left + target.offsetWidth / 2;
  target.classList.add(after ? "is-drop-after" : "is-drop-before");
});
sectionTabs.addEventListener("drop", event => {
  const target = event.target.closest('[data-section][draggable="true"]');
  if (!target || !draggedResumeSection) return;
  event.preventDefault();
  const after = target.classList.contains("is-drop-after");
  moveResumeSection(draggedResumeSection, target.dataset.section, after);
});
sectionTabs.addEventListener("dragend", () => {
  draggedResumeSection = "";
  sectionTabs.querySelectorAll(".is-dragging, .is-drop-before, .is-drop-after").forEach(item => item.classList.remove("is-dragging", "is-drop-before", "is-drop-after"));
});
sectionTabs.addEventListener("keydown", event => {
  const button = event.target.closest('[data-section][draggable="true"]');
  if (!button || !event.altKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  const order = normalizeSectionOrder(state.sectionOrder);
  const index = order.indexOf(button.dataset.section);
  const nextIndex = index + (event.key === "ArrowLeft" ? -1 : 1);
  if (nextIndex < 0 || nextIndex >= order.length) return;
  event.preventDefault();
  const target = order[nextIndex];
  moveResumeSection(button.dataset.section, target, event.key === "ArrowRight");
  sectionTabs.querySelector(`[data-section="${button.dataset.section}"]`)?.focus();
});

document.getElementById("documentTypeControl").addEventListener("click", event => {
  const button = event.target.closest("[data-document-type]");
  if (!button) return;
  state.documentType = button.dataset.documentType;
  rerender();
  showToast(button.textContent.trim() + "预览已启用");
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

document.getElementById("addSocialLink").addEventListener("click", () => {
  const select = document.getElementById("socialPlatformSelect");
  const platform = select.value || "link";
  const socials = state.data.profile.socials || (state.data.profile.socials = {});
  const key = platform === "link" ? `custom${Date.now()}` : platform;
  const spec = socialPlatforms[platform] || socialPlatforms.link;
  socials[key] = {
    enabled: true,
    url: "",
    ...(platform === "link" ? { platform: "link", label: spec.labels[state.locale] || spec.labels.en } : {})
  };
  renderSocialEditor();
  syncInputs();
  document.querySelector(`[data-bind="profile.socials.${key}.url"]`)?.focus();
  renderPreview();
  saveState();
});

document.getElementById("socialEditorList").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-social]");
  if (!button) return;
  delete state.data.profile.socials[button.dataset.removeSocial];
  renderSocialEditor();
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

document.getElementById("paperToneControl").addEventListener("click", event => {
  const button = event.target.closest("[data-paper-tone]");
  if (!button || button.disabled) return;
  state.paperTone = button.dataset.paperTone;
  rerender();
  const labels = { auto: "模板推荐纸色", white: "纯白纸张", ivory: "象牙白纸张" };
  showToast(`已切换为${labels[state.paperTone]}`);
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
  state.data = { ...clone(samples[state.locale]), coverLetter: clone(letterSamples[state.locale]) };
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
    const resetButton = event.currentTarget;
    resetArmed = true;
    resetButton.lastChild.textContent = " 再次点击确认";
    setTimeout(() => {
      resetArmed = false;
      const currentResetButton = document.getElementById("resetButton");
      if (currentResetButton?.lastChild) currentResetButton.lastChild.textContent = " 重置示例";
    }, 15000);
    return;
  }
  const preservedTemplate = state.template;
  const preservedLocale = state.locale;
  state = clone(baseState);
  state.template = preservedTemplate;
  state.locale = preservedLocale;
  state.data = { ...clone(samples[preservedLocale]), coverLetter: clone(letterSamples[preservedLocale]) };
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

designRailToggle.addEventListener("click", () => setDesignRailOpen(!designRailOpen));
designRailClose.addEventListener("click", () => setDesignRailOpen(false, { returnFocus: true }));

editorRailResizer.addEventListener("pointerdown", event => {
  if (!isDesktopWorkspace() || event.button !== 0) return;
  activeResizePointerId = event.pointerId;
  editorRailResizer.setPointerCapture?.(event.pointerId);
  editorRailResizer.classList.add("is-dragging");
  document.body.classList.add("is-resizing-rail");
});

window.addEventListener("pointermove", event => {
  if (event.pointerId !== activeResizePointerId) return;
  setEditorRailWidth(event.clientX);
});

function finishEditorRailResize(event) {
  if (event.pointerId !== activeResizePointerId) return;
  activeResizePointerId = null;
  if (editorRailResizer.hasPointerCapture?.(event.pointerId)) editorRailResizer.releasePointerCapture(event.pointerId);
  editorRailResizer.classList.remove("is-dragging");
  document.body.classList.remove("is-resizing-rail");
  setEditorRailWidth(editorRailWidth, { persist: true });
}

window.addEventListener("pointerup", finishEditorRailResize);
window.addEventListener("pointercancel", finishEditorRailResize);
editorRailResizer.addEventListener("dblclick", () => setEditorRailWidth(330, { persist: true }));
editorRailResizer.addEventListener("keydown", event => {
  const steps = { ArrowLeft: -16, ArrowRight: 16, Home: EDITOR_RAIL_MIN, End: editorRailMaximum() };
  if (!(event.key in steps)) return;
  event.preventDefault();
  const next = event.key === "Home" || event.key === "End" ? steps[event.key] : editorRailWidth + steps[event.key];
  setEditorRailWidth(next, { persist: true });
});

document.querySelector(".mobile-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-mobile-view]");
  if (!button) return;
  document.querySelectorAll("[data-mobile-view]").forEach(item => item.classList.toggle("active", item === button));
  document.querySelector(".workspace").dataset.currentView = button.dataset.mobileView;
  syncWorkspaceAccessibility();
  if (button.dataset.mobileView === "preview") requestAnimationFrame(() => fitPreview(true));
});

window.addEventListener("resize", () => {
  setEditorRailWidth(editorRailWidth);
  syncWorkspaceAccessibility();
  if (!state.zoom) fitPreview();
});

setDesignRailOpen(false);
renderRepeatEditors();
updateControls();
renderPreview();
requestAnimationFrame(() => fitPreview());
