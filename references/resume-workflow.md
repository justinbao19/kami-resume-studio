# Agent Resume Workflow

Use this reference for the end-to-end resume path. Detailed collection, interview, and template rules live in their own references.

## State machine

1. `INTAKE`: lock target role, target market, output language, page target, and available sources.
2. `COLLECT`: read the user's old resume, authorized career profiles, portfolio, and target job descriptions.
3. `PROFILE`: merge sources into `candidate-dossier.json`; preserve source IDs for every position, project, metric, and skill.
4. `GAPS`: run `python3 scripts/resume_workflow.py analyze ...`; inspect conflicts, missing latest-role evidence, and target-job gaps.
5. `INTERVIEW`: ask generated questions in batches of 4-6. Update the dossier after each answer batch and rerun analysis. Stop when critical gaps are resolved or the user explicitly asks to proceed with marked gaps.
6. `STRATEGY`: choose the primary positioning, evidence order, language, template, and theme. Always create a light ATS companion when the primary is dark or visually expressive. Treat photos as opt-in evidence: use them only when the target market and selected template support them, and keep a no-photo ATS version available.
7. `DRAFT`: write `resume_content` in the dossier. Every claim must trace to source material or a user answer.
8. `RENDER`: run the workflow renderer for primary and ATS HTML outputs, then render PDFs.
9. `VERIFY`: check content coverage, page count, density, fonts, and page images. Rework content before shrinking typography.
10. `DELIVER`: return primary resume, ATS resume when applicable, profile summary, unresolved facts, and role-match notes.

## Minimum execution contract

Lock these before drafting:

- Target role or at least a role family.
- Target market and resume language.
- One-page or two-page target.
- Sources available and sources missing.
- Whether the user wants a conservative or expressive presentation.
- Whether a personal photo is supplied and whether the target market expects or discourages it.
- Which optional social links are approved for display: LinkedIn, X, and GitHub.
- Whether the target role needs project, open-source, portfolio, or product case-study evidence.

Do not block collection because the target job description is missing. Build the base profile first, then ask for a representative job posting before the final tailoring pass.

## Evidence ledger

Classify every claim:

- `confirmed`: user stated it in this conversation or approved it after review.
- `sourced`: present in an old resume, platform profile, portfolio, certificate, or other user-authorized source.
- `inferred`: agent interpretation that still requires confirmation.
- `conflict`: two sources disagree on dates, title, ownership, number, or scope.

Only `confirmed` and `sourced` claims may appear in final resume copy. Convert `inferred` and `conflict` items into questions.

## Source priority

Use source priority for reliability, not for impressiveness:

1. Current-turn user answer.
2. User-approved correction.
3. Employer-issued or project evidence supplied by the user.
4. Old resume and portfolio.
5. User's own platform profile.
6. Agent inference.

Newer sources are not automatically more accurate. A platform title may be current while an old resume contains stronger metrics. Merge the best supported pieces.

## Latest-role rule

The most recent completed role is the highest-risk gap because it is often absent from the old resume.

Trigger a latest-role interview when any is true:

- A platform source contains a position newer than the old resume.
- The old resume ends more than six months before the latest platform position.
- The latest role has fewer than two concrete responsibilities.
- Fewer than half of its bullets contain a scale, baseline, result, or business outcome.
- The title changed but scope progression is unclear.

Never treat the platform description as complete. Ask what the user actually owned, how work was done, and what changed because of it.

## Target-job strategy

Separate three passes:

1. `Base truth`: the complete career profile, independent of a job posting.
2. `Role fit`: evidence that maps to the target job's responsibilities, mechanisms, seniority, and domain.
3. `Copy fit`: keywords and phrasing that improve recruiter scanning without copying the job description or inventing experience.

Use keywords only when supported by evidence. Missing high-value keywords become interview questions, not additions.

## Output bundle

Default output directory:

```text
output/resume/<candidate-slug>/<target-role-slug>/
  candidate-dossier.json
  analysis.json
  interview-questions.json
  route.json
  resume-primary.html
  resume-primary.pdf
  resume-ats.html
  resume-ats.pdf
  unresolved-claims.json
```

If the primary route is already `ats-classic/light`, do not duplicate it as a second file.
