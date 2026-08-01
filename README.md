# Kami Resume

Agent-first bilingual resume generation, job matching, and visual editing.

[Live demo](https://kami-resume-studio.vercel.app) · [Open the editor](https://kami-resume-studio.vercel.app/editor.html) · [Agent Skill](SKILL.md) · [Architecture](docs/resume-studio.md)

Kami Resume helps job seekers turn an old CV, authorized career-platform pages, project evidence, and a target job description into a credible Chinese or English resume. You can work manually in the browser editor or let an Agent consolidate sources, recover missing recent work, match the target role, select a suitable template, and produce an ATS-safe companion.

## Highlights

- Agent workflow for old resumes, LinkedIn, BOSS 直聘, 猎聘, 58 同城, portfolios, GitHub, and target job descriptions.
- Evidence-first interviewing for recent work that is missing from an old CV.
- Role matching without inventing metrics, ownership, or unsupported experience.
- Nine resume families with light and dark themes.
- Chinese and English editing, samples, and output.
- Optional photos for compatible templates.
- Project experience as a first-class resume section.
- LinkedIn, X, and GitHub links preserved as clickable PDF links.
- Local browser autosave and A4 PDF export.
- ATS-safe companion output for dark, expressive, or multi-column designs.
- Original Kami rendering, schemas, diagrams, and deterministic quality checks.

## Try it locally

No package installation or build step is required for the browser application.

```bash
python3 -m http.server 4173
```

Then open:

- Chinese landing page: `http://127.0.0.1:4173/`
- English landing page: `http://127.0.0.1:4173/index-en.html`
- Resume editor: `http://127.0.0.1:4173/editor.html`

## Install the Agent Skill

Claude Code v2.1.142 or newer:

```bash
/plugin marketplace add justinbao19/kami-resume-studio
/plugin install kami@kami
```

Codex plugin marketplace:

```bash
codex plugin marketplace add justinbao19/kami-resume-studio
codex plugin add kami@kami
```

Generic agents that read `~/.agents/`:

```bash
npx skills add justinbao19/kami-resume-studio/plugins/kami -a universal -g -y
```

Claude Desktop:

Download [`kami.zip`](https://github.com/justinbao19/kami-resume-studio/releases/latest/download/kami.zip) from the latest release and upload it under Customize > Skills. The tracked package can also be built locally with:

```bash
bash scripts/package-skill.sh
```

## Agent workflow

The Skill moves through a traceable workflow:

```text
INTAKE -> COLLECT -> PROFILE -> GAPS -> INTERVIEW -> STRATEGY -> DRAFT -> RENDER -> VERIFY -> DELIVER
```

The Agent first creates a candidate dossier with source IDs and confidence states. It then detects timeline or title conflicts, asks focused questions about the latest role, and separates confirmed facts from sourced, inferred, or conflicting claims.

Deterministic helpers are available for testing or direct orchestration:

```bash
python3 scripts/resume_workflow.py analyze candidate-dossier.json -o analysis.json
python3 scripts/resume_workflow.py questions candidate-dossier.json analysis.json -o interview-questions.json
python3 scripts/resume_workflow.py route candidate-dossier.json analysis.json -o route.json
python3 scripts/resume_workflow.py all candidate-dossier.json -o output/resume
```

The source intake workflow reads only files or visible pages the user has explicitly authorized. It does not request passwords, cookies, tokens, or one-time codes, and it does not bypass login, CAPTCHA, paywalls, or access controls.

## Resume template system

The editor and Agent router expose 9 template families and 18 light or dark combinations:

| Family | Best suited for |
| --- | --- |
| Editorial | Product, strategy, consulting, generalist roles |
| ATS Classic | Finance, legal, government, conservative companies |
| Technical | Software, data, AI, security, infrastructure |
| Executive | Leadership, functional heads, founders |
| Creative | Design, brand, content, creative technology |
| Sales Impact | Sales, growth, business development, partnerships |
| Operations Practical | Operations, supply chain, manufacturing, services |
| Academic | Research, education, policy, medical, academic work |
| Early Career | Students, internships, campus recruiting, career switches |

The broader document engine still includes Eight document templates and 18 inline SVG diagram types inherited from Kami.

## Repository map

- `SKILL.md`: Agent runtime and routing instructions.
- `editor.html`, `app.js`, `styles.css`: browser resume editor.
- `references/resume-workflow.md`: end-to-end resume workflow.
- `references/source-intake.md`: authorized source collection rules.
- `references/interview-playbook.md`: evidence recovery questions.
- `references/template-routing.md`: template selection logic.
- `references/resume-template-catalog.json`: template capability catalog.
- `scripts/resume_workflow.py`: deterministic analysis, question, routing, and output helper.
- `assets/templates/`: self-contained document templates.
- `scripts/build.py`: validation and rendering entry point.
- `scripts/mcp_server.py`: local MCP interface.

## Verification

```bash
python3 scripts/build.py --check
python3 scripts/tests/test_build.py
python3 scripts/build_metadata.py --check
```

The project currently passes 203 repository tests, including Skill packaging, source evidence, social-link safety, project rendering, template registries, and ATS companion behavior.

## Open-source origin and thanks

Kami Resume is a resume-focused adaptation of the open-source [Kami project by tw93](https://github.com/tw93/Kami). Thanks to the original author for the warm-paper visual language, editorial template system, rendering pipeline, and verification foundation.

The original MIT copyright notice remains in [LICENSE](LICENSE). Font files and fallback sources retain their original licensing requirements. In particular, TsangerJinKai02 is free for personal use only and requires an appropriate license for commercial use.

## License

MIT. See [LICENSE](LICENSE).
