# Handoff: Portfolio v2 — "Duality Refined" Modernization + ATS Resume Page

## Overview

A complete modernization of the Mitchell Ungar portfolio site (repo: `MitchellUngar14/mitchell-ungar-ai-portfolio`, live target: **mitchellungar.vercel.app**). It replaces the current card-heavy single-page layout with a typographic, hairline-driven design ("Duality Refined") that keeps the existing steel-blue ↔ rose "Cosmic Duality" brand DNA, and adds a dedicated, ATS-optimized, printable **Resume page**.

Two deliverables:

1. **Portfolio home** — evolved MU intro animation (now "docks" into the nav), fixed left rail with scroll-spy (becomes a bottom bar on mobile), sticky top bar, asymmetric hero, duality strip, stats, About, Experience (5 entries incl. new cEDH Canada freelance role), Selected Work (featured cEDH Canada card + 6 compact cards), Skills & Education, Contact, footer.
2. **Resume page** — single-column, keyword-rich resume that prints cleanly to US Letter (Print/Save-PDF button), designed so recruiter ATS/AI parsers extract everything.

## About the Design Files

The files in this bundle are **design references created in HTML** — working prototypes showing the intended look and behavior. They are **not production code to copy directly**. The task is to **recreate these designs in the existing Next.js codebase** (`Next.js App Router + Tailwind + globals.css` in `mitchell-ungar-ai-portfolio`) using its established patterns:

- Keep the CSS-variable theme approach in `src/app/globals.css` (replace the old token values with the tokens below).
- Keep `next/font` for fonts in `src/app/layout.tsx` — Chakra Petch and Outfit are already loaded; **add JetBrains Mono** (weights 400/500/600).
- Rebuild sections as components in `src/components/` (e.g. `IntroAnimation.tsx`, `RailNav.tsx`, `TopBar.tsx`, `ExperienceRow.tsx`, `ProjectCard.tsx`, `SkillGroup.tsx`).
- The Resume page should become a route (e.g. `src/app/resume/page.tsx`) replacing the old `/resume-2025.pdf` link target.

To view the prototypes: open `Portfolio v2.dc.html` in a browser from this folder (the bundled `support.js`, `image-slot.js`, `doc-page.js`, and `uploads/` image must sit alongside it, as they do in this bundle). `Resume.dc.html` is linked from the "View Resume" buttons.

## Fidelity

**High-fidelity.** Colors, typography, spacing, copy, timings, and interactions are final. Recreate pixel-perfectly with the codebase's existing stack (Tailwind utilities or CSS variables — match the computed values, not the authoring method).

## Screens / Views

### 1. Intro overlay (plays on load, once per visit)

- Full-viewport fixed overlay, background `#060b10`, z-index above everything; film-grain layer (SVG fractal noise tile, opacity 0.035) and two faint radial ambient pools (steel left, rose right).
- Centered column, gap 26px: MU monogram SVG (viewBox `0 0 680 200`, width `min(70vw, 520px)`), gradient hairline divider (`min(48vw, 360px)` × 1px, transparent → #6f92aa 25% → #c4727a 75% → transparent), caption row.
- Monogram paths (stroke-width 6, square caps, miter joins, no fill):
  - M: `M 20,190 L 20,15 L 170,145 L 320,15 L 320,190`, stroke `#8fb3cc`
  - U: `M 380,15 L 380,125 C 380,185 430,195 520,195 C 610,195 660,185 660,125 L 660,15`, stroke `#c4727a`
- Caption: JetBrains Mono 12px, letter-spacing 0.32em, uppercase — `Engineering` (#8fb3cc) `×` (#4a5f72) `Leadership` (#d4949b).
- Skip hint bottom-center: mono 11px, ls 0.24em, uppercase, fades to rgba(191,205,216,0.25).

### 2. Left rail (desktop) / bottom bar (mobile)

- Desktop: fixed, 76px wide, full height, right hairline border, `rgba(10,17,25,0.6)` + backdrop-blur(8px). Column layout, `justify-content: space-between`, padding 26px 0. Contents: "MU" logo (Chakra Petch 700, 20px, ls 0.06em, gradient text 135° #8fb3cc→#c4727a), vertical stack of section numbers 01–05 (JetBrains Mono 11px, #4a5f72; active section: #8fb3cc + soft text-shadow glow), vertical-rl text "KINGSTON · ON · 2026" (mono 10px, ls 0.18em, #4a5f72).
- Mobile (≤820px): same element re-styled as a fixed bottom bar — full width, 56px tall, row layout, top hairline border, bg `rgba(10,17,25,0.92)`; location text hidden; numbers get 18px vertical padding (44px+ tap targets).

### 3. Top bar (sticky)

- Sticky top, padding `18px clamp(20px, 4.5vw, 56px)`, bottom hairline `rgba(143,179,204,0.1)`. Transparent at top; after 40px scroll: bg `rgba(10,17,25,0.82)`, backdrop-blur(14px), shadow `0 4px 24px rgba(0,0,0,0.25)` (0.35s ease transitions).
- Left: breadcrumb "PORTFOLIO — 2026" (mono 11px, ls 0.16em, uppercase, #6f92aa).
- Right, gap 28px: links About / Experience / Work / Skills / Contact (Chakra Petch 13px 500, ls 0.1em, uppercase, #7a90a4 → hover #e9f0f5; hidden on mobile) + **Resume ↓** pill (padding 9px 18px, radius 6px, gradient 135° #9e5860→#c4727a, white, Chakra Petch 12px 600, ls 0.12em; hover: gradient #c4727a→#e06870 + glow shadow). Links to the Resume page.

### 4. Hero

- Padding `clamp(44px, 8vw, 84px) clamp(20px, 4.5vw, 56px) 52px`.
- Kicker row: 7px steel dot + "ENGINEERING" (#8fb3cc), "×" (#4a5f72), 7px rose dot + "LEADERSHIP" (#d4949b) — mono 12px, ls 0.22em, uppercase.
- H1: "Mitchell⏎Ungar." — Chakra Petch 700, `clamp(44px, 9vw, 108px)`, line-height 0.95, ls −0.02em, #e9f0f5; the period is #c4727a.
- Paragraph (max-width 640px, `clamp(17px, 2.4vw, 20px)`, weight 300, lh 1.65, #7a90a4): "Principal engineer & manager — 13+ years shipping **enterprise systems** (#8fb3cc), leading **teams of nine** (#d4949b), and putting **AI tooling** (#8fb3cc) to real work in insurance and fintech." (highlighted spans weight 400).
- Meta line: "KINGSTON, ON — OPEN TO CONSULTING & TECHNICAL LEADERSHIP" (mono 11.5px, ls 0.14em, #4a5f72).
- CTA row (gap 16px, wraps): **View Resume ↓** (primary pill, padding 13px 28px, 14px text; hover lifts −1px w/ `0 6px 28px rgba(224,104,112,0.25)`) and **Explore Work →** (ghost: 1px border rgba(143,179,204,0.35), #8fb3cc; hover: border/bg tint) — anchors to `#work`.

### 5. Duality strip + stats

- Strip: "SYSTEMS" (mono 10px, ls 0.24em, #6f92aa) — flexible 2px gradient bar #6f92aa→#c4727a with soft glow — "PEOPLE" (#d4949b).
- Stats: grid `repeat(auto-fit, minmax(150px, 1fr))`, gap `clamp(16px, 3vw, 32px)`. Each: 2px left border (steel rgba(143,179,204,0.4) for first two, rose rgba(196,114,122,0.45) for last two), padding-left 16px; value Chakra Petch 700 40px #e9f0f5 (accent on +/$ suffix); label 13px uppercase ls 0.1em #4a5f72.
- Values: **13+** Years shipping · **9** Direct reports · **$100K+** Costs saved · **4** Enterprise clients.

### 6. Section headers (shared pattern)

Index (mono 11px #c4727a: 01…05) + title (Chakra Petch 600 24px, ls 0.14em, uppercase, #e9f0f5) + flexible hairline + optional right meta (mono 11px #4a5f72). Sections separated by top hairline `rgba(143,179,204,0.1)`; padding `clamp(36px, 6vw, 56px) clamp(20px, 4.5vw, 56px) 64px`.

### 7. 01 About

Two-column grid `repeat(auto-fit, minmax(min(100%, 320px), 1fr))`, gap `clamp(24px, 4vw, 44px)`; paragraphs 17px, weight 300, lh 1.8, #7a90a4 with #b9c8d4 / #8fb3cc / #d4949b emphasis spans. Copy is in the prototype (Benefits By Design / Levio history; testing & standards philosophy).

### 8. 02 Experience (5 rows)

Row = flex-wrap container (gap 14px 36px, padding 30px 0, top hairline). Left cell `flex: 0 0 200px`: date (mono 12px #6f92aa, e.g. "2025 — NOW") + tag chip (mono 10px, padding 3px 8px, radius 3px — CONTRACT/FREELANCE in rose #d4949b on rgba(196,114,122,0.1); LEADERSHIP in steel). Right cell `flex: 1 1 340px; min-width: 0`: company (Chakra Petch 700 22px #e9f0f5, linked; client after "/" in #8fb3cc 500), role (16px #b9c8d4), bullet list (15px weight 300 lh 1.65 #7a90a4, 5px round dot markers — steel #4a6e85, rose #9e5860 on the freelance/manager rows).

Entries (top→bottom): **cEDH Canada** (2025—NOW, FREELANCE, "Sole Full Stack Developer — design, build & maintain", 4 bullets incl. solo + business-owner note) · **Levio / Liberty Mutual** (2024—NOW, CONTRACT, Principal Software Engineer, 3 bullets) · **Levio** (2023—NOW, LEADERSHIP, Manager — team of 9, 3 bullets) · **Levio / AAA · CSAA** (2022—2024, CONTRACT, Senior Full Stack Developer, 3 bullets) · **Benefits By Design** (2015—2022, Senior Java Developer, 5 bullets). Exact bullet copy is in the prototype.

### 9. 03 Selected Work (meta: "7 PROJECTS / ALL LIVE")

- **Featured card (cEDH Canada)**: full-width, 2-col grid `repeat(auto-fit, minmax(min(100%, 330px), 1fr))` (stacks on mobile), radius 10px, rose border rgba(196,114,122,0.28) (hover 0.5), bg rgba(16,28,40,0.4). Left: screenshot (min-height 330px; image `uploads/pasted-1783538606763-0.png`, object-fit cover). Right (padding 26px 28px): badge chip "FEATURED · FREELANCE · SOLO BUILD", title Chakra Petch 700 26px + "CEDHCANADA.CA ↗" mono link (→ https://cedhcanada.ca), description, 3 rose-dot highlight bullets (13.5px), bottom-anchored mono stack line "NEXT.JS 16 · REACT 19 · TAILWIND V4 · POSTGRESQL · DRIZZLE · STRIPE · AUTH.JS · PLAYWRIGHT".
- **Compact grid**: `repeat(auto-fit, minmax(min(100%, 300px), 1fr))`, gap 20px. Card: radius 10px, hairline border rgba(143,179,204,0.14) (hover 0.3), padding 20px 22px; title Chakra Petch 600 16.5px; LIVE ↗ (#8fb3cc) / CODE ↗ (#6f92aa) mono 10.5px links, `white-space: nowrap`, links-row `flex-shrink: 0`; desc 13.5px; mono tech line 10px #4a6e85. Cards: DeckTutor, MythWeaver, Whiteboard, Legion Branch 560, Bad Advice For Free, Apogee Insurance (Apogee includes demo-credentials mono line). All URLs are in the prototype.

### 10. 04 Skills & Education

- Skills: grid `repeat(auto-fit, minmax(min(100%, 270px), 1fr))`, gap `36px clamp(24px, 4vw, 44px)`. Six groups, each: mono category header (11px, ls 0.16em, steel #6f92aa — rose #d4949b for "AI & TOOLING" and "LEADERSHIP", with matching hairline) + rows (name 15px #b9c8d4 / years mono 11.5px #d4949b, space-between, padding 7px 0).
- Data: Languages & Frameworks (Java EE/Spring 12+, React/TS 5, Next.js 2, Tailwind CSS 2) · Cloud & DevOps (AWS 3, CI/CD 11, Vercel 2, Git/GitHub 11+) · Backend & Data (PostgreSQL 4, MS SQL Server 7, Oracle SQL 3, Apache Kafka 4, Drizzle ORM 2, Stripe 1, Auth.js/NextAuth 1) · AI & Tooling (Prompt Engineering 2, Claude Code/Gemini CLI 2, RAG/ChromaDB 1, Ollama 1) · Methodologies & Testing (Agile/Scrum/SAFe 11, TDD 7, Microservices 3, Playwright/Vitest E2E 1, Cypress 1) · Leadership (Team Management 3, Developer Training 7, Project Leadership 12+).
- Education sub-header "04.B" + grid `repeat(auto-fit, minmax(min(100%, 230px), 1fr))`: 2px left-border items (school Chakra Petch 600 16px, program 14px w300, mono date line 10.5px). St. Lawrence College · U. of Alberta (Coursera verify link) · Udemy (certificate link) · Scrum Alliance CSD.

### 11. 05 Contact + footer

- Two-col grid (same auto-fit 320px pattern, vertically centered): left "Let's talk." (Chakra Petch 700 `clamp(38px, 6vw, 52px)`, rose period) + subtitle; right column of 3 link rows (padding 16px 20px, radius 8px, hairline border, bg rgba(16,28,40,0.4); label mono 11px #6f92aa + value 15px #b9c8d4; hover: rose border rgba(196,114,122,0.35) + rose bg tint). EMAIL → mailto, LINKEDIN, GITHUB.
- Footer: flex-wrap space-between, top hairline: "© 2026 MITCHELL UNGAR" (mono 10.5px #4a5f72) · dot-gradient-dot ornament · "BACK TO TOP ↑" link.

### 12. Resume page (`/resume`)

- Screen-only toolbar (hide on print): dark bar `rgba(10,17,25,0.95)` — "← BACK TO PORTFOLIO" link, center label "RESUME — ATS-OPTIMIZED · PRINTS TO US LETTER", rose-gradient **Print / Save PDF** button (`window.print()`).
- Document: US Letter sheet, 0.65in margins, white, Outfit. Header: name 30px 700 #141a22; title line 13px 500 #33566e nowrap ("Principal Software Engineer · Engineering Manager · Consultant"); right-aligned contact block 11.5px (#3d444e): Kingston, Ontario, Canada / email · **mitchellungar.vercel.app** / linkedin · github. 2px bottom rule #1d2530.
- Sections (headers 13px 700, ls 0.18em, uppercase, #33566e): **Summary** (12.5px lh 1.62 #2a2f37; "13+ years…") · **Core Competencies** (11.5px keyword run, "·"-separated — ATS keyword block) · **Professional Experience** (5 roles; title row 14px 600 + right-aligned dates 11.5px #5a6170; disc bullets 12.5px lh 1.6; cEDH entry first, marked sole developer) · **Technical Skills** (8 labeled lines: Languages & Frameworks, Cloud & Infrastructure incl. Kafka 4 yrs + Vercel, AI & Emerging Tech, Integrations & Payments, Databases & Migration, Testing & Quality incl. Cypress 1 yr + Playwright/Vitest, CI/CD & Tooling, Reporting, Methodologies & Leadership) · **Education & Certifications** (4 rows, verify links).
- ATS constraints to preserve: single column, no tables/columns for content, standard section names, plain-text URLs, real `<ul>` bullets, prints to selectable-text PDF.

## Interactions & Behavior

- **Intro sequence** (skippable via click or any key; skipped entirely under `prefers-reduced-motion`): M draws 1.45s cubic-bezier(0.65,0.05,0.25,1) @0.25s, U draws 1.25s @0.55s (stroke-dasharray 800/650), glow pulse @1.8s, divider scaleX 0→1 @1.95s (0.6s), caption fade-up @2.25s, hint @2.8s, auto-exit @3.4s. **Exit**: overlay bg fades to transparent (0.8s), line/caption/hint/ambient fade, monogram flies to the rail logo's bounding rect (translate+scale, 0.85s cubic-bezier(0.65,0.05,0.25,1)) fading out at arrival; rail logo pops in (scale 0.6→1, 0.5s, delay 0.55s). Compute the flight FLIP-style from `getBoundingClientRect` at exit time (works for both rail positions).
- **Header**: scrolled state at `scrollY > 40` (see §3).
- **Scroll-spy**: active section = last section whose top ≤ 220px from viewport top; highlights rail number.
- **Scroll reveal**: elements start opacity 0 / translateY(22px); IntersectionObserver (threshold 0.08, rootMargin `0px 0px -40px 0px`) transitions to visible — 0.75s cubic-bezier(0.16,1,0.3,1), per-element stagger delays (0–340ms; values in prototype `data-reveal-delay` attrs). Observation begins ~250ms after the intro exits. Disabled under reduced motion.
- **Hovers**: primary pills brighten gradient + lift −1px + rose glow; ghost button tints; cards brighten border; text links → #d4949b; company links → #d4949b.
- **Navigation**: smooth scroll (`scroll-behavior: smooth`, `scroll-padding-top: 88px`); "Explore Work →" → `#work`; Resume buttons → resume route.
- **Responsive** (breakpoint 820px): rail ↔ bottom bar (see §2), top-bar links hidden, main content loses the 76px left margin and gains 68px bottom padding; all grids collapse via the auto-fit minmax values above; hero/CTA/footer wrap. Resume sheet scales to viewport below 900px (zoom ≈ `(vw − 16) / 868`, min 0.4); print output is unaffected.

## State Management

- `introComplete: boolean` (drives overlay unmount + reveal start)
- `scrolled: boolean` (top bar), `activeSection: string` (scroll-spy) — derived from one scroll listener
- `isMobile: boolean` — `matchMedia('(max-width: 820px)')` listener
- No data fetching; all content is static. Keep content in typed data arrays (EXPERIENCE, PROJECTS, SKILLS, EDUCATION) as the current codebase does — updated data is in the prototypes.

## Design Tokens

**Palette (dark portfolio)**: bg `#0a1119` · intro bg `#060b10` · heading `#e9f0f5` · text `#b9c8d4` · secondary `#7a90a4` · muted `#4a5f72` · steel `#6f92aa` / light `#8fb3cc` / bright `#a8cce0` / deep `#4a6e85` · rose `#c4727a` / pale `#d4949b` / muted `#9e5860` / bright `#e06870` · hairlines `rgba(143,179,204,0.10 / 0.12 / 0.14)` · card bg `rgba(16,28,40,0.4)` · rose chip bg `rgba(196,114,122,0.1)` + border `0.16` · steel chip bg `rgba(111,146,170,0.1)` + border `0.16`.

**Palette (resume, print-safe)**: ink `#141a22` · body `#2a2f37` · soft `#3d444e` · dim `#5a6170` · accent `#33566e` · rule `#1d2530`.

**Type**: Chakra Petch (display; 500/600/700) · Outfit (body; 300/400/500/600) · JetBrains Mono (labels/data; 400/500/600). Mono labels always uppercase with 0.06–0.32em tracking.

**Radii**: 3px (chips) · 6px (buttons) · 8px (contact rows) · 10px (cards). **Gradients**: brand 135° `#8fb3cc→#c4727a`; button 135° `#9e5860→#c4727a` (hover `#c4727a→#e06870`); duality 90° `#6f92aa→#c4727a`.

**Spacing**: section side padding `clamp(20px, 4.5vw, 56px)`; section top `clamp(36px, 6vw, 56px)`; card padding 20–28px; grid gaps 20px / clamp(24–44px).

**Atmosphere**: fixed radial light pools (steel top-left 0.08, rose top-right 0.055, steel bottom 0.03) + SVG fractal-noise grain tile at opacity 0.026 (0.035 on intro).

## Assets

- `uploads/pasted-1783538606763-0.png` — cEDH Canada About-page screenshot (owner-provided). Recommend exporting a crisper 2× hero screenshot for production.
- Google Fonts: Chakra Petch, Outfit, JetBrains Mono (via `next/font`).
- No icon set: contact glyphs are text; monogram is the inline SVG above.

## Files

- `Portfolio v2.dc.html` — full portfolio prototype (all sections, intro, responsive behavior; scripts embedded)
- `Resume.dc.html` — resume page prototype (toolbar + Letter sheet)
- `support.js`, `image-slot.js`, `doc-page.js` — prototype runtime helpers (reference only; do **not** ship)
- `uploads/pasted-1783538606763-0.png` — featured project screenshot

## Implementation Notes

- Testimonials from the old site are **intentionally dropped** (pending real quotes).
- Replace the old `/resume-2025.pdf` hero link with the new resume route; keep `public/resume-2025.md` updated to match the new content or retire it.
- The prototype's `image-slot` / `doc-page` elements are prototype-only; in Next.js use a plain `next/image` for the screenshot and a print-styled route (`@page { size: letter; margin: 0 }` + 0.65in padding, or equivalent) for the resume.
- Dates assume the cEDH Canada engagement started in 2025 — confirm with Mitchell before shipping.
