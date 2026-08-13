# Kami Resume Agent Skill

Human-readable page: <https://kami-resume-studio.vercel.app/resume-skill>

Kami Resume is a local, Agent-first workflow for generating a role-matched Chinese or English resume, an ATS-safe companion when required, and a coordinated cover letter. It can work from an old PDF or DOCX resume, pasted career material, authorized visible LinkedIn/BOSS 直聘/猎聘/58 同城 pages, portfolio or GitHub evidence, and a target job description.

## What the Agent should do

1. Collect only files and visible pages the user supplied or explicitly authorized.
2. Normalize roles, projects, skills, education, metrics, and dates into a candidate dossier with source IDs.
3. Mark every claim as `confirmed`, `sourced`, `inferred`, or `conflict`.
4. Ask focused questions about the latest role that may be absent from the old resume: responsibilities, work focus, scope, methods, measurable outcomes, ownership, and timeline.
5. Match confirmed evidence to the target job without inventing metrics or copying unsupported requirements.
6. Choose the output language, one of 13 resume families, and a light or dark theme.
7. Generate the primary resume, a light `ats-classic` companion when the primary is dark, expressive, or multi-column, and a coordinated cover letter.
8. Verify content, links, pagination, density, photo behavior, and print output before delivery.

## Template catalog

The editor and Agent router expose 13 families and 26 light/dark variants. Every family supports project experience.

| ID | Chinese / English | Primary fit | Photo | Social presentation |
| --- | --- | --- | --- | --- |
| `editorial` | 纸序 / Editorial | Product, strategy, consulting | yes | text |
| `ats-classic` | 清衡 / ATS Classic | Finance, legal, government, ATS | no | text |
| `technical` | 栈迹 / Technical | Software, data, AI, security | yes | icons |
| `executive` | 领航 / Executive | Executives, heads, founders | no | text |
| `creative` | 锋面 / Creative | Design, brand, content | yes | icons |
| `sales-impact` | 增长场 / Sales Impact | Sales, growth, business development | no | text |
| `operations-practical` | 实干线 / Operations Practical | Operations, supply chain, services | no | text |
| `academic` | 学研录 / Academic | Research, education, policy, health | no | text |
| `early-career` | 初航 / Early Career | Students, graduates, internships | yes | icons |
| `aqua-ledger` | 冰川履历 / Aqua Ledger | Strategy, consulting, polished operations | yes | icons |
| `atelier-serif` | 灰廊雅集 / Atelier Serif | Executive, brand, luxury, narrative roles | yes | text |
| `cupertino` | 库比蒂诺 / Cupertino | Product, software, AI, human-centered technology | yes | text |
| `swiss-grid` | 经纬网格 / Swiss Grid | Design, architecture, creative technology | yes | text |

The four reference-led families, Aqua Ledger, Atelier Serif, Cupertino, and Swiss Grid, include coordinated cover-letter layouts. Atelier Serif also supports a recommendation-letter mode. Letter fields remain independent: recipient, target company, target role, subject, body, closing, signer, and optional recommender details.

## Install

Claude Code 2.1.142 or newer:

```text
/plugin marketplace add justinbao19/kami-resume-studio
/plugin install kami@kami
```

Codex:

```bash
codex plugin marketplace add justinbao19/kami-resume-studio
codex plugin add kami@kami
```

Generic agents that read the common Agent Skills directory:

```bash
npx skills add justinbao19/kami-resume-studio/plugins/kami -a universal -g -y
```

For WorkBuddy, Hermes Agent, and other `SKILL.md`-compatible clients, use the generic installer where supported or point the client to the packaged Skill directory. Exact import locations can vary by client version.

Claude Desktop uses the `kami.zip` release asset, uploaded under Customize > Skills. The canonical release asset is available from the repository releases, and can be rebuilt locally with `bash scripts/package-skill.sh`.

## Direct workflow

```bash
python3 scripts/resume_workflow.py analyze candidate-dossier.json -o analysis.json
python3 scripts/resume_workflow.py questions candidate-dossier.json analysis.json -o interview-questions.json
python3 scripts/resume_workflow.py route candidate-dossier.json analysis.json -o route.json
python3 scripts/resume_workflow.py all candidate-dossier.json -o output/resume
```

The complete bundle includes the dossier, analysis, interview questions, route, primary HTML, ATS HTML when required, cover letter, optional recommendation letter, unresolved claims, and matching notes.

## Privacy and access limits

- Read only files and pages the user supplied or explicitly authorized.
- Never request passwords, cookies, access tokens, or one-time codes.
- Never bypass login, CAPTCHA, paywalls, or other access controls.
- Treat career material as sensitive and keep it local unless the user explicitly authorizes a specific external action.
- Do not write personal resume facts into public fixtures, durable memory, or the open-source repository.

## Source and license

Kami Resume is adapted from the open-source [Kami project by tw93](https://github.com/tw93/Kami). The repository retains the original MIT License and copyright notice. The resume product, career-evidence workflow, and browser editor are extensions maintained in [justinbao19/kami-resume-studio](https://github.com/justinbao19/kami-resume-studio).
