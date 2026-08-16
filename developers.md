# Kami for developers and agents

Everything an agent needs to drive Kami: one local MCP server, nine content schemas, and a set of deterministic checks that decide whether a document is finished.

HTML version: <https://kami-resume-studio.vercel.app/developers>

## There is no hosted Kami API

Kami is a skill and a template system, not a service. It installs into the agent that uses it and runs on that machine: no account, no API key, no rate limit, no request that leaves the host. There is no REST or GraphQL endpoint to call, and this site publishes no authenticated surface, so nothing here needs OAuth discovery or a token exchange.

The integration surface is local: an MCP server for tool calls, JSON content schemas for structure, and CLI checks for verification. The static files listed at the end of this page are the machine-readable index of all of it, generated from the same registry the templates use so they cannot drift from what ships.

## Install

```
# Claude Code (v2.1.142+)
/plugin marketplace add justinbao19/kami-resume-studio
/plugin install kami@kami

# Codex plugin marketplace
codex plugin marketplace add justinbao19/kami-resume-studio
codex plugin add kami@kami

# Generic agents that read ~/.agents/
npx skills add justinbao19/kami-resume-studio/plugins/kami -a universal -g -y

# MCP client, from a checkout
claude mcp add kami -- python3 <checkout>/scripts/mcp_server.py
```

Claude Desktop: download the release asset `kami.zip` from <https://github.com/justinbao19/kami-resume-studio/releases/latest/download/kami.zip>, not GitHub's Source code ZIP, then upload it under Customize > Skills.

## MCP tools

The server speaks newline-delimited JSON-RPC 2.0 over stdio and has no third-party dependency for the protocol itself. Tools that need WeasyPrint, pypdf, or PyMuPDF surface the install hint as a tool error instead of crashing.

| Tool | What it does |
| --- | --- |
| `kami_templates` | List document templates, browser-only templates, the diagram library, and content schema types, with the reference docs to read before filling. |
| `kami_render` | Render trusted local Kami HTML to PDF through WeasyPrint, with build-time code highlighting. Returns the PDF path and page count. |
| `kami_check` | Run the deterministic checks for a file. HTML: placeholders and markdown residue, plus content coverage when a content IR JSON is supplied. PDF: markdown residue, orphans, density. JSON: content IR schema validation. |
| `kami_screenshot` | Rasterize every PDF page to PNG and return the paths plus a fixed review checklist for the perceptual pass. |

The server card, including protocol version and tool list, is published at </.well-known/mcp/server-card.json>.

## Resume Skill

The resume workflow is a specialized layer above the document engine. It collects authorized old resumes and career profiles, builds a source-linked candidate dossier, asks focused questions for missing latest-role evidence, matches the target job, and routes one of 14 resume families with light and dark themes.

The default bundle includes a primary resume, a light ATS Classic companion when the main design is dark or expressive, and a coordinated cover letter. Atelier Serif also supports recommendation-letter mode. Read the [human guide](https://kami-resume-studio.vercel.app/resume-skill) or [Markdown guide](https://kami-resume-studio.vercel.app/resume-skill.md).

## Content schemas

Nine schemas live under `references/schemas/`: changelog, equity-report, landing-page, letter, long-doc, one-pager, portfolio, resume, slides. Each states the structure and the quality bar for its type. Fill the schema first, lay out second.

```
python3 scripts/build.py --check-content content.json
python3 scripts/build.py --check-content content.json filled.html
```

The second form reports coverage: fields that exist in the content object but never reached the document. That is the most common failure in agent-generated layouts and it is invisible to a human skim.

## Checks

- `--check-placeholders` - unfilled template text still in the document.
- `--check-markdown` - markdown syntax that leaked into the rendered output.
- `--check-orphans` - single lines stranded at a page break.
- `--check-density` - pages ending with more than a quarter of the page empty.
- `--check-rhythm` - slide sequences that repeat one layout too many times.
- `--check-resume-balance` - column and section balance in a resume.
- `--check-visual` - exports page images and returns a fixed review checklist for a perceptual pass.

`python3 scripts/build.py --help` is the authoritative list. Repository-wide checks, `python3 scripts/build.py --check`, cover template lint, design-token sync, and public-site fact drift.

## Machine-readable files

- [/llms.txt](https://kami-resume-studio.vercel.app/llms.txt) - product summary, install commands, and when an agent should reach for Kami.
- [/index.md](https://kami-resume-studio.vercel.app/index.md) - the homepage as Markdown. A request to `/` carrying `Accept: text/markdown`, or `/?mode=agent`, redirects here.
- [/developers.md](https://kami-resume-studio.vercel.app/developers.md) - this page as Markdown.
- [/resume-skill.md](https://kami-resume-studio.vercel.app/resume-skill.md) - resume workflow, 13-family template catalog, installation, and direct orchestration.
- [/developers/llms.txt](https://kami-resume-studio.vercel.app/developers/llms.txt) - the developer surface on its own.
- [/.well-known/agent-skills/index.json](https://kami-resume-studio.vercel.app/.well-known/agent-skills/index.json) - Agent Skills discovery index, with a SHA-256 digest of the skill file it points to.
- [/.well-known/mcp/server-card.json](https://kami-resume-studio.vercel.app/.well-known/mcp/server-card.json) - MCP server card.
- [/feeds/catalog.jsonld](https://kami-resume-studio.vercel.app/feeds/catalog.jsonld) - JSON-LD catalog of all 8 document templates and 18 diagram types, indexed by [/schemamap.xml](https://kami-resume-studio.vercel.app/schemamap.xml).
- [/SKILL.md](https://kami-resume-studio.vercel.app/SKILL.md) - the skill definition itself, served as `text/markdown`.
- [/sitemap.xml](https://kami-resume-studio.vercel.app/sitemap.xml) and [/robots.txt](https://kami-resume-studio.vercel.app/robots.txt) - crawl surface and AI crawler policy.

## Elsewhere

[Home](https://kami-resume-studio.vercel.app/) · [About](https://kami-resume-studio.vercel.app/about) · [Contact](https://kami-resume-studio.vercel.app/contact) · [Privacy](https://kami-resume-studio.vercel.app/privacy) · [Source](https://github.com/justinbao19/kami-resume-studio)
