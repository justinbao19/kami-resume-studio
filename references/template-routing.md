# Resume Template Routing

Use `references/resume-template-catalog.json` as the machine-readable catalog and this file for routing judgment.

## Two-output rule

The primary resume expresses the candidate and role. The ATS companion protects parsing and conservative application channels.

- If the primary route is dark, creative, split-column, or highly stylized, also produce `ats-classic/light`.
- If the primary route is already `ats-classic/light`, one output is enough.
- A dark theme is never the only deliverable for an online application.

## Photo capability

Photos are an explicit, market-sensitive option rather than a default resume field.

- Photo-capable families in the web editor: `editorial`, `technical`, `creative`, `early-career`, `aqua-ledger`, `slate-sidebar`, `atelier-serif`, `cupertino`, and `swiss-grid`.
- No-photo families: `ats-classic`, `executive`, `sales-impact`, `operations-practical`, and `academic`.
- If a user supplies a photo while a no-photo family is selected, keep it in the dossier but show the editor control as unavailable and omit it from the render.
- Keep the ATS companion photo-free unless the target market explicitly requires a photo and the user confirms that requirement.
- When no image is supplied, preview a neutral portrait icon inside supported photo slots. Never derive the placeholder from the candidate name or initials.

## Paper tone

- Light themes accept `auto`, `white`, or `ivory`. `auto` keeps the family palette, `white` uses `#FFFFFF`, and `ivory` uses `#FFFCF4`.
- Dark themes ignore the paper-tone override and retain the family dark paper.
- The ATS companion defaults to white paper.

## Optional social links

LinkedIn, X, and GitHub are opt-in fields. Validate the URL, preserve it as a hyperlink in HTML/PDF, and choose the presentation by family:

- Technical, creative, and early-career: compact platform icons with accessible labels.
- Aqua Ledger and other families: text labels and handles, with no decorative icon row.
- Never display a social link that is not enabled and confirmed by the user.

## Role-to-template defaults

| Role family | Default | Alternatives |
| --- | --- | --- |
| Product and generalist roles | editorial | cupertino, ats-classic |
| Strategy, consulting, transformation, executive communication | swiss-grid | editorial, aqua-ledger, ats-classic |
| Software product and human-centered technology | cupertino | technical, ats-classic |
| Data, AI, security, infrastructure | technical | cupertino, ats-classic |
| Director, head, VP, GM, founder | atelier-serif | executive, ats-classic |
| UX, architecture, visual systems, creative technology | creative | cupertino, editorial |
| Brand, luxury, editorial content | atelier-serif | creative, editorial |
| Sales, business development, growth, partnerships | sales-impact | slate-sidebar, executive, ats-classic |
| Operations, supply chain, manufacturing, program management | aqua-ledger | operations-practical, ats-classic |
| International operations, community, customer success, market expansion | slate-sidebar | aqua-ledger, operations-practical, ats-classic |
| Retail, hospitality, customer service, skilled trades, logistics frontline | operations-practical | slate-sidebar, ats-classic, early-career |
| Research, education, policy, healthcare, academic CV | academic | ats-classic, editorial |
| Student, new graduate, internship, career starter | early-career | technical, creative |
| Cross-functional specialist without a dominant family | editorial | ats-classic, operations-practical |

## Theme routing

Choose light by default for finance, law, government, healthcare, education, manufacturing, and conservative corporate applications.

Dark may be primary when all are true:

- The role or industry rewards individual expression.
- The user asks for it or source materials strongly support it.
- The content remains readable without screenshots or decorative imagery.
- A light ATS companion is also delivered.

Dark defaults fit creative, technical, founder, gaming, media, developer-tool, and portfolio-adjacent roles. Do not use dark just because the user says "高级".

## Personality modifiers

- `quiet`, `precise`, `credible`: editorial, ats-classic, academic.
- `bold`, `inventive`, `expressive`: creative, technical-dark.
- `decisive`, `commercial`, `high-energy`: sales-impact, executive.
- `reliable`, `hands-on`, `structured`: operations-practical, ats-classic.
- `curious`, `emerging`, `potential`: early-career.
- `cool`, `precise`, `polished`: aqua-ledger.
- `polished`, `direct`, `international`: slate-sidebar.
- `cultivated`, `narrative`, `luxury`: atelier-serif.
- `minimal`, `human`, `product-led`: cupertino.
- `analytical`, `structured`, `executive-ready`: swiss-grid.

## Content-shape modifiers

- Many metrics: sales-impact or executive.
- Strong projects/open source: technical or creative.
- Long publication/certification list: academic.
- Sparse experience but strong projects/education: early-career.
- Several role families or freelance work: editorial.
- Dense chronological history: ats-classic or operations-practical.

## Template selection report

Always record:

```json
{
  "primary": {"template": "technical", "theme": "dark", "paper_tone": "auto"},
  "ats_companion": {"template": "ats-classic", "theme": "light", "paper_tone": "white"},
  "reasons": ["target role is staff engineer", "strong open-source evidence"],
  "rejected": [{"template": "creative", "reason": "visual work is not the primary hiring evidence"}]
}
```

Do not ask the user to pick from ten templates unless they explicitly want manual control. Route automatically, then explain the choice in one sentence.

## Letter routing

Use the primary resume family for the cover letter. `atelier-serif` also supports a recommendation-letter mode. The letter shares profile, photo, language, theme, and contact links, but keeps recipient, target company, target role, subject, body, closing, signer, and optional recommender fields independent.
