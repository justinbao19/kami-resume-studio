# Screenshot-derived resume families

This reference is the visual contract for the five resume families added from user-provided visual references. It records layout behavior only. Do not copy names, portraits, employers, or other identifying content from the references.

## Shared rules

- Support Chinese and English with A4 print output.
- Use system fonts and broad fallbacks. Do not bundle Apple or commercial font files.
- Light and dark variants keep the same grid and hierarchy.
- Photos are optional and local. Social links remain clickable in HTML and PDF.
- Empty photo slots use a neutral portrait-outline icon, never initials or candidate text.
- Light themes may keep their template paper or use pure white `#FFFFFF` or ivory `#FFFCF4`. Dark themes keep the documented dark paper.
- Cover letters reuse the selected family masthead, typography, rules, and palette.
- Recommendation letters are supported by Atelier Serif when recommender identity and relationship are confirmed.

## Aqua Ledger

- Source group: screenshots 1 to 3.
- Intent: executive operations, consulting, polished program work.
- Grid: 28 percent label rail and 72 percent content, separated with fine horizontal rules.
- Header: broad pale aqua field, rectangular portrait on the right, large neo-grotesk role title.
- Typography: Helvetica Neue, Avenir Next, PingFang SC, Hiragino Sans GB, sans-serif.
- Light palette: paper `#F5FBFD`, ink `#162A31`, cyan `#31A9C8`, rule `#BFD8DE`.
- Dark palette: paper `#11272F`, ink `#EEFBFE`, cyan `#7BD7ED`, rule `#31515A`.
- Gradient: low-contrast ice blue, concentrated in the masthead and lower page corner.
- Photo: upright rectangle with restrained crop.
- Socials: compact icons.
- Letter: same wide masthead and numbered left label.

## Atelier Serif

- Source group: screenshots 4 to 6.
- Intent: leadership, luxury, brand, consulting, long-form narrative.
- Grid: approximately 30 percent grayscale portrait rail and 70 percent main column.
- Header: very large serif name, quiet uppercase metadata, generous vertical rhythm.
- Typography: Bodoni 72, Didot, Songti SC, and STSong for display; Helvetica Neue and PingFang SC for evidence text.
- Light palette: paper `#F5F3F0`, ink `#262522`, accent `#5A5651`, rule `#D0CBC4`.
- Dark palette: paper `#211F1D`, ink `#F2EEE8`, accent `#D1C7B8`, rule `#514C47`.
- Photo: large portrait, grayscale by default.
- Socials: text labels and handles.
- Letter: cover letter and recommendation letter use the same side rail.

## Slate Sidebar

- Source group: two-page A4 PDF supplied as a private visual reference.
- Intent: international operations, community, customer success, and market expansion.
- Grid: 36.6 percent repeated sidebar and 63.4 percent main column on every A4 page.
- Header: large upright portrait at the top of the sidebar, followed by a bold Songti name and compact personal-information rows.
- Main column: icon-led section titles with one fine bottom rule; company and role align left while period and location align right in muted italic text.
- Typography: Songti SC, STSong, or Noto Serif SC for the name; Avenir Next, Helvetica Neue, PingFang SC, or Noto Sans SC for evidence text.
- Light palette: sidebar `#EBEDF0`, paper `#FFFFFF`, ink `#252B34`, muted `#737983`, rule `#D9DDE2`.
- Dark palette: sidebar `#22272F`, paper `#171A1F`, ink `#F1F3F5`, muted `#AEB4BD`, rule `#3B414A`.
- Icons: thin open-source-style outline icons. Do not use emoji, platform logos as decoration, or a runtime icon dependency.
- Photo: upright rectangle with a restrained 6 pixel radius and `object-fit: cover`.
- Sidebar: repeat personal information, summary highlights, and grouped skills on every page.
- Pagination: keep each page at A4 height, keep entries intact, place projects on a new page, and add continuation pages without lengthening an existing sheet.
- Socials: text labels and handles in the personal-information list.
- Letter: repeat the pale gray identity rail with a single white body column.

## Cupertino

- Source group: screenshot 7.
- Intent: product, technology, design leadership, human-centered software.
- Grid: clean single column with a compact circular portrait header.
- Header: generous white space, bold name, bright restrained blue role line.
- Typography: Helvetica Neue, Avenir Next, PingFang SC, sans-serif.
- Light palette: paper `#FBFCFE`, ink `#1D1D1F`, blue `#147CE5`, rule `#D5D5D7`.
- Dark palette: paper `#1C1C1E`, ink `#F5F5F7`, blue `#64A8FF`, rule `#48484A`.
- Photo: circular.
- Socials: text labels and handles.
- Letter: minimal header, ample margins, no decorative glow.

## McKinsey Grid

- Source group: screenshots 8 to 10.
- Intent: strategy consulting, transformation programs, operating-model work, and executive communication.
- Grid: 27 percent numbered label column and 73 percent content column, with continuous rules.
- Header: prominent but unsplit name, numbered cell, pale blue portrait field, and strict consulting-style alignment.
- Typography: Helvetica Neue, Avenir Next, PingFang SC, sans-serif with tight display tracking.
- Light palette: paper `#F7F9FA`, ink `#15191C`, blue `#3579A8`, rule `#9DA8AE`.
- Dark palette: paper `#171B1E`, ink `#F1F4F5`, blue `#80BDE4`, rule `#4E5960`.
- Gradient: subtle pale blue field outside the core black rule grid.
- Photo: tall rectangle aligned to the header grid.
- Socials: text labels and handles.
- Pagination: repeat the numbered left rail and maintain column alignment on continuation pages.
- Letter: subject and body align to the same 27/73 grid.

## Font verification

Font stacks must remain readable when the preferred system family is unavailable. Verify Chinese and English at browser widths 375 and 1280 pixels, then print A4. Do not infer successful font use from page count alone.
