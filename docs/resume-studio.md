# Kami Resume 改造说明

Kami Resume 是基于 Kami 文档设计系统改造的中英文简历生成器。第一阶段的目标不是立刻重写底层，而是在 Kami 已验证的纸张排版、内容约束和 PDF 工具之上补齐普通用户可以直接使用的产品层。

## Agent-first 简历工作流

真正的入口是根目录的 `SKILL.md`，而不是可视化编辑器。Agent 会把用户提供的旧 PDF、LinkedIn、BOSS 直聘、猎聘、58 同城等可见职业资料，以及目标 JD 归一化成 `candidate-dossier.json`，再按以下状态推进：

`INTAKE → COLLECT → PROFILE → GAPS → INTERVIEW → STRATEGY → DRAFT → RENDER → VERIFY → DELIVER`

每条事实都保留来源 ID，并区分 `confirmed`、`sourced`、`inferred`、`conflict`。最近一份尚未写入旧简历的工作会优先进入访谈：岗位范围、工作重心、方法、数据规模、结果、所有权边界和离职前后的时间线都必须通过用户确认，不能由模型补写。目标岗位缺口会变成具体问题，而不是直接复制 JD 关键词。

平台采集只读取用户明确授权、已在自己浏览器中打开的可见页面；不索要密码、验证码、Cookie 或 Token，不绕过登录、验证码、付费墙或访问控制。敏感职业资料默认只留在当前工作区，不写入长期 memory，也不上传第三方。

确定性辅助脚本位于 `scripts/resume_workflow.py`：

```bash
python3 scripts/resume_workflow.py analyze candidate-dossier.json -o analysis.json
python3 scripts/resume_workflow.py questions candidate-dossier.json analysis.json -o interview-questions.json
python3 scripts/resume_workflow.py route candidate-dossier.json analysis.json -o route.json
python3 scripts/resume_workflow.py all candidate-dossier.json -o output/resume
```

## 模板路由

当前目录定义 14 类 × 2 主题 = 28 个可路由变体。浅色模式另有模板推荐、纯白与象牙白纸张选项，详见 `references/resume-template-catalog.json`：

| 类型 | 适合岗位 |
| --- | --- |
| 纸序 Editorial | 产品、综合与叙事表达 |
| 清衡 ATS Classic | 金融、法律、政府、保守企业与 ATS |
| 栈迹 Technical | 软件、数据、AI、安全、基础设施 |
| 领航 Executive | 高管、负责人、创始人与管理岗位 |
| 锋面 Creative | 设计、品牌、内容、创意技术 |
| 增长场 Sales Impact | 销售、增长、BD、伙伴关系 |
| 实干线 Operations Practical | 运营、供应链、制造、项目与服务 |
| 学研录 Academic | 研究、教育、政策、医疗、学术 |
| 初航 Early Career | 学生、校招、实习与早期职业 |
| 冰川履历 Aqua Ledger | 精细运营、项目与服务岗位 |
| 侧写 Slate Sidebar | 国际运营、社群与市场拓展 |
| 灰廊雅集 Atelier Serif | 高管、品牌与长篇叙事 |
| 库比蒂诺 Cupertino | 产品、软件、AI 与人本科技 |
| 麦肯锡网格 McKinsey Grid | 战略咨询、业务转型与高管沟通 |

深色、创意或分栏主版本不会作为唯一交付物；系统会同时生成 `ats-classic/light` companion，适合招聘网站、企业 ATS 和打印归档。

配套求职信复用主简历的个人信息、照片、模板、主题和语言，收件人、目标公司、岗位、标题、正文、落款与签名保持独立。灰廊雅集还支持推荐信模式。

## 从 Kami 继承的能力

- `assets/templates/resume*.html`: 已有的中英文打印模板和 A4 排版规则。
- `references/schemas/resume.json`: 简历内容字段、长度和质量约束。
- `references/resume-writing.md`: 角色、动作、结果、量化证据和所有权表达规范。
- `scripts/render.py` 与 `scripts/build.py`: WeasyPrint PDF 渲染和构建入口。
- `scripts/verify.py` 与相关检查器: 页数、密度、字体、占位符和视觉质量检查。

Kami 原项目擅长让 Agent 生成完成稿，但没有面向普通用户的可视化编辑、模板选择和状态管理。当前改造重点就是补上这一层。

## 当前 MVP

公开页面与编辑器现在组成一个无需构建工具的静态应用：

- `index.html`: 中文产品落地页。
- `index-en.html`: 英文产品落地页。
- `editor.html`: 工作台信息架构和可访问语义。
- `styles.css`: 产品界面、三套简历模板、响应式布局和 A4 打印规则。
- `app.js`: 简历数据模型、实时渲染、本地保存、内容检查和交互状态。
- `.impeccable.md`: 已确认的用户、品牌气质和设计原则。

已实现：

1. 基本信息、职业摘要、工作经历、项目经历、教育背景和技能编辑。
2. 14 类模板全部进入网页编辑器，并支持逐类切换浅色/深色主题。
3. 中文与英文标签、中文与英文示例数据。
4. 模板推荐配色、四种自定义强调色、两种主题、三种浅色纸张选项和两种排版密度。
5. 统一照片上传入口，并按模板能力启用或禁用；照片只保存在当前浏览器，ATS companion 始终不带照片。
6. LinkedIn、GitHub、X、Behance、Dribbble、Medium、GitLab 与自定义链接；技术、创意、早期职业和侧写模板使用可点击图标，其余模板使用平台名与用户名。
7. 项目经历可新增和删除，并支持项目名称、角色或技术栈、时间、链接、简介和量化成果。
8. 浏览器本地自动保存，不上传个人数据。
9. 内容完成度、量化证据、项目证据和联系方式检查。
10. 桌面工作台支持内容栏限宽拖动和默认收起的模板栏；文档类型与章节导航自适应栏宽，侧写模板章节可拖动排序并保存到本地。
11. 浏览器打印并导出 A4 PDF，长内容允许自然分页。

## 模板与照片能力

| 模板 | 场景 | 照片 | 社媒形式 |
| --- | --- | --- | --- |
| 纸序 | 产品、战略、咨询、综合岗位 | 支持 | 文字 |
| 清衡 | 金融、法律、政府、ATS 投递 | 不支持 | 文字 |
| 栈迹 | 软件、数据、AI、安全、基础设施 | 支持 | 图标 |
| 领航 | 高管、负责人、创始人、管理岗位 | 不支持 | 文字 |
| 锋面 | 设计、品牌、内容、创意技术 | 支持 | 图标 |
| 增长场 | 销售、增长、BD、伙伴关系 | 不支持 | 文字 |
| 实干线 | 运营、供应链、制造、项目与服务 | 不支持 | 文字 |
| 学研录 | 研究、教育、政策、医疗、学术 | 不支持 | 文字 |
| 初航 | 学生、校招、实习、早期职业 | 支持 | 图标 |
| 冰川履历 | 战略、咨询、精细运营、服务岗位 | 支持 | 文本 |
| 侧写 | 国际运营、社群、市场拓展 | 支持 | 横排图标 |
| 灰廊雅集 | 高管、品牌、叙事表达 | 支持 | 文字 |
| 库比蒂诺 | 产品、软件、AI、人本科技 | 支持 | 文字 |
| 麦肯锡网格 | 战略咨询、业务转型、高管沟通 | 支持 | 文字 |

照片和社媒都是可选信息。照片模板在未上传图片时显示无文字的人像图标，不再用姓名或首字母占位。用户未主动提供或启用社媒时，模板不会输出占位链接。项目经历则是全部模板都支持的一级模块，可用于放大产品案例、开源贡献、研究成果或跨职能项目。

## 本地运行

```bash
python3 -m http.server 4173
```

然后访问 `http://127.0.0.1:4173` 查看中文落地页，访问 `/index-en.html` 查看英文落地页，或访问 `/editor.html` 直接进入编辑器。项目当前没有 npm 依赖，也没有构建步骤。

快速回归 Agent 填写流程可以使用 `scripts/tests/fixtures/resume_case_3_resolved.json`。该 fixture 根据一份真实简历的经历结构制作，但已替换姓名、联系方式、学校、雇主、项目名和社媒信息，不包含原始 PDF 或照片。

## 当前验证状态

站点事实检查已区分新的中英文 Resume Studio 落地页、编辑器与保留的 Kami 多语言页面。当前仓库通过 `python3 scripts/build.py --check`、`python3 scripts/tests/test_build.py` 和 `python3 scripts/build_metadata.py --check`。后续修改落地页、编辑器、模板数量或安装方式时，需要同步更新站点事实、机器可读元数据和对应测试，不能恢复旧首页必须与 `index-zh|ja|ko|tw.html` 使用相同 DOM 骨架的假设。

## 下一阶段建议

### 1. 模板系统工程化

- 把模板渲染器拆成独立模块，并建立统一 token、字段能力和模板清单。
- 增加工程师、校招生、管理者、设计师和学术型简历模板。
- 为每套模板建立中文、英文、长内容和短内容的视觉回归样例。
- 将浏览器模板与 Kami 的 WeasyPrint 模板对齐，避免网页预览和服务端 PDF 漂移。

### 2. AI 内容流程

- 导入旧简历、绩效材料和项目笔记，先抽取事实再改写。
- 支持岗位描述分析、关键词覆盖和逐条经历定制。
- 对数字、所有权和时间冲突进行追问，不自动夸大事实。
- 使用 `resume-writing.md` 作为 AI 改写的质量标准。

### 3. 可靠导出与账号能力

- 使用服务端渲染生成确定性 PDF，并运行 Kami 的页数、密度和字体检查。
- 支持版本历史、多个目标岗位版本和 JSON 数据导入导出。
- 默认加密存储敏感简历数据，并提供彻底删除能力。

## 字体与许可

Kami 原仓库中的 TsangerJinKai02 字体仅允许个人免费使用，商业使用需要单独授权。当前 Web MVP 没有加载该字体，而是使用操作系统中文字体回退。正式商业发布前，应选择明确可商用的中英文字体组合，或取得相应字体许可。

Kami 代码与模板采用 MIT License。继续改造时应保留上游许可和来源说明。
