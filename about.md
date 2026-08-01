# About Kami

Kami is a constraint-based design system for documents that an AI agent writes and a person actually reads.

HTML version: <https://kami-resume-studio.vercel.app/about>

## A design system, not a template gallery

Language models write well and lay out badly. Ask one for a resume and the text is usually fine while the page is not: mixed accent colors, synthetic bold, hard drop shadows, a heading three sizes away from its body. Kami removes those decisions from the model. It ships a fixed constraint set, a warm parchment canvas at `#f5f4ed`, a single ink-blue accent at `#1B365D`, serif-led hierarchy, and editorial whitespace, and holds that set across every document type it produces.

What comes out is HTML that exports to PDF, PNG, or an editable PPTX deck. Eight document templates cover the common cases: one-pager, letter, long document, portfolio, resume, slides, equity report, and changelog. Eighteen inline SVG diagram types cover the pictures those documents need, from architecture and flowchart to candlestick and Venn. A separate landing-page template applies the same restraint to a product page.

Because the constraints are fixed, the interesting work moves to content quality and verification. Kami ships nine JSON content schemas and a set of checks that look for the failures agents actually produce: unfilled placeholders, markdown syntax leaking into the render, a line orphaned at a page break, a page that ends a third empty, a deck where six slides in a row share one layout.

## Deliberate omissions

Kami is not a hosted service. There is no Kami account, no API key, no server that receives your documents. The skill installs into your agent and runs on your machine; this domain serves a static site and a set of public metadata files, nothing more.

The original Kami document templates keep a deliberately narrow visual language. Resume templates add controlled light and dark themes, role-specific palettes, and different content structures, but every option remains recruiter-readable and ATS-conscious.

Finally, the Agent workflow will not invent what a resume should claim. It can consolidate sources, ask evidence questions, and sharpen wording for a target role, but metrics, ownership, and outcomes must come from a source or the user.

## One maintainer, MIT licensed

Kami Resume is maintained by [JustinBao](https://github.com/justinbao19). It is a resume-focused adaptation of [Kami by Tw93](https://github.com/tw93/Kami), whose original document system, visual language, and MIT copyright notice remain credited in this repository. The source lives at <https://github.com/justinbao19/kami-resume-studio> under the MIT license.

Releases are tagged in the repository and published as a `kami.zip` asset for Claude Desktop, alongside the Claude Code and Codex plugin marketplaces. The homepage carries the current version. Interface, template registry, and public facts are cross-checked in CI, so the version on the site, in the plugin manifests, and in the skill package cannot drift apart.

The site is published in English, Simplified Chinese, Traditional Chinese, Japanese, and Korean, each with its own serif and its own typographic tuning rather than one font stretched across five scripts.

## Elsewhere

[Home](https://kami-resume-studio.vercel.app/) · [Developers](https://kami-resume-studio.vercel.app/developers) · [Contact](https://kami-resume-studio.vercel.app/contact) · [Privacy](https://kami-resume-studio.vercel.app/privacy) · [Source](https://github.com/justinbao19/kami-resume-studio)
