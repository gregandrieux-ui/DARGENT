---
name: Dargent Thermique
description: Le carnet d'entretien — chaque page est une fiche pré-imprimée, chaque preuve une case cochée, la signature un cachet.
colors:
  paper: "#fbfcfd"
  navy-900: "#0b2a4a"
  navy: "#005ca9"
  navy-700: "#004a8a"
  cyan: "#2db8c5"
  cyan-100: "#e3f6f8"
  cyan-200: "#96dce2"
  ink: "#21313e"
  ink-600: "#4a5a68"
  line: "#d9e0e6"
  bg-alt: "#f3f4f5"
  alert: "#ea444e"
  warn: "#f5b800"
typography:
  display:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 2.4vw, 3.25rem)"
    fontWeight: 700
    fontVariation: "font-stretch: 78%"
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 2.75rem)"
    fontWeight: 700
    fontVariation: "font-stretch: 82%"
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1vw, 2rem)"
    fontWeight: 700
    fontVariation: "font-stretch: 82%"
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  none: "0px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.navy-700}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-alert:
    backgroundColor: "{colors.alert}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px"
---

# Design System: Dargent Thermique

## Overview

**Creative North Star: "Le carnet d'entretien"**

The site is the maintenance logbook Dargent Thermique leaves after every visit: each page is a pre-printed sheet, each proof a checked box, the signature is the company's stamp. It deliberately refuses the category template — no smiling technician photo, no centered hero H1, no three equal cards, no bordered badge-bandeau of partner logos.

The build ships this literally, not decoratively: ruled definition-list tables (`<dl class="ruled">`) stand in for form fields, checkmarks are real proof items (never promises), photos are captioned "Observations :" like a technician's notes, and the `.cachet` stamp is rotated -1.5° and physically overlaps the content beneath it, as a real rubber stamp would. Depth comes only from this overlap and from ruled hairlines — there is no shadow anywhere in the stylesheet. Content density is intentionally high (600–1200 words of real prose per page): this is a regulated-industry SEO site, and the "carnet" aesthetic's usual airiness is a deliberate trade against that requirement, not an oversight.

**Key Characteristics:**
- Three inks only: navy (ink/action), cyan (single accent, reserved), red (urgent-only)
- One typeface (Archivo Variable), condensed via `font-stretch` for display, normal for body
- No shadows; depth by overlap and hairline rules only
- Numbered "sorties" (exit links) close every page, like footnotes on a form
- Checked-box proof rows, never marketing kickers or claims

## Colors

A fixed three-ink system on a near-white form paper, inherited from the existing logo and prior site — no palette invention.

### Primary
- **Navy** (`#005ca9`): buttons, links, primary interactive ink. Hover deepens to Navy 700 (`#004a8a`).
- **Navy 900** (`#0b2a4a`): headings, load-bearing rules (table tops, `<hr>`), the top bar and footer background, the stamp/table ink.

### Secondary
- **Cyan** (`#2db8c5`): the single reserved accent — the cachet's ruled cartouche accent, checkbox checkmarks, active nav underline, focus rings, and the `btn-cyan` CTA variant. Cyan 100 (`#e3f6f8`) is its hover/tint background (checked-row hover, active filter pill); Cyan 200 (`#96dce2`) is used as light-on-navy text (footer, alert-hero promise text) and as the text-selection background.

### Tertiary
- **Alert red** (`#ea444e`): reserved exclusively for urgent/dépannage phone CTAs (`btn-alert`, `.hero-alert .tel-big .icon`, sticky-bar alert tile). Never a second decorative accent.

### Neutral
- **Paper** (`#fbfcfd`): page background, the "form paper" the whole system sits on.
- **Ink** (`#21313e`): body text.
- **Ink 600** (`#4a5a68`): muted/secondary text, field labels, captions.
- **Line** (`#d9e0e6`): secondary hairlines (table row dividers, card/input borders).
- **Bg-alt** (`#f3f4f5`): alternating section background, missing-photo placeholder fill.
- **Warn** (`#f5b800` on `#fff6d6`): the disclosed-data callout only (`.todo` / "À confirmer"), not a design accent.

### Named Rules
**The Three-Ink Rule.** Only navy, cyan, and alert-red carry meaning. Cyan is rarity-gated to the cachet, checks, active states, and focus; red never appears except on a dépannage/urgent phone action. No other hue is introduced for decoration.

## Typography

**Display/Heading Font:** Archivo Variable (with system-ui, -apple-system, Segoe UI fallback)
**Body Font:** Archivo Variable (same family, normal stretch)

**Character:** One variable font doing two jobs — condensed and bold (`font-stretch` 78–82%, weight 700) for pre-printed-form headings, normal stretch and weight 400/600 for body and values. Numerals are tabular throughout (`font-variant-numeric: tabular-nums`), reinforcing the ledger/form register.

### Hierarchy
- **Display** (700, `clamp(2rem, 1.2rem + 2.4vw, 3.25rem)`, 1.15, stretch 78%): the home hero H1 only (`.hero .display`).
- **H1** (700, `clamp(2rem, 1.3rem + 2.4vw, 2.75rem)`, 1.15, stretch 82%, -0.02em): page headings on content templates.
- **H2** (700, `clamp(1.625rem, 1.3rem + 1vw, 2rem)`, 1.15, stretch 82%, -0.015em): section headings.
- **H3** (700, `clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)`, 1.15): sub-section/card headings.
- **Body** (400, `clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)`, 1.6, max 68ch): running prose; 17–18px minimum floor is a deliberate accessibility commitment (audience is 40–75, frequently mobile).
- **Label** (400, `0.8125rem`): field labels in `.ruled` tables, photo caption labels, footer legal line. Small and regular, never uppercase, never a decorative kicker.

### Named Rules
**The Pre-Printed Label Rule.** Labels (`dt`, caption `.lbl`) stay small, regular-weight, sentence case, and sit beside a bold value on its own line (`dd`) — a form field, not a marketing eyebrow. This is the one place a small caps-like label could have crept in as a kicker; the build never uppercases or bolds the label itself.

## Layout

12-column intent expressed via a `1200px` container (`--container`) with responsive gutter (16px mobile, 32px ≥768px). The signature two-part split is `.entry` (5fr/7fr ≥900px, stacked below), used for hero and most content sections; `.entry-rev`/`.entry-even` reverse the column order. Spacing runs on a strict 4px-rooted scale (4/8/12/16/24/32/48/64/96px) — `--s-1` through `--s-9` — used consistently for gaps, padding, and margins; no ad hoc pixel values. Section vertical rhythm scales with viewport: 48px → 64px (≥768px) → 96px (≥1200px) padding-block. Mobile adds a fixed sticky call bar (56px tall, two-tile grid) below 768px; desktop drops it in favor of the header's persistent phone number and quote CTA.

## Elevation & Depth

Flat by design: no `box-shadow` exists anywhere in the stylesheet. Depth is conveyed by two devices only — physical overlap (the cachet stamp overlapping the ruled table or photo beneath it via negative margin + `z-index: 1`) and hairline rule weight (a 1px `--line` hairline for minor dividers, a 1px `--rule`/navy-900 hairline for load-bearing tops of tables, `<hr>`, and section-opening rules). This is a deliberate world constraint (OWN-WORLD: "aucune ombre nulle part ; profondeur par chevauchement seulement"), not an omission.

### Named Rules
**The Overlap-Not-Float Rule.** The `.cachet` stamp must always visually bite into an adjacent element — never sit free on white space. Implementation pattern: wrap the stamp and the element it overlaps in a shared container, give the stamp `position: relative; z-index: 1;` and a negative bottom margin (e.g. `margin-bottom: -14px` in the home `.stamp-row`) so it overlaps the ruled content that follows. Reuse this exact technique (negative margin + z-index, not absolute positioning) wherever the cachet appears.

## Shapes

Two silhouettes only, sharply divided by role: the **pill** (`border-radius: 999px`, via `--pill`) for every clickable action — buttons, the mobile menu summary, filter-chip labels — and **the square** (`border-radius: 0`) for everything that represents paper or data — cards, photos, inputs, the cachet cartouche, tables. Photos are "stapled": zero corner radius, sometimes overhanging the container margin (`.hero-photo` at ≥900px: `margin-right: calc(-1 * var(--gutter))`). Borders are hairline (1–1.5px) throughout; the cachet uses a double-ruled look via a 1px border plus a 1px outline offset by 3px.

## Components

### Buttons
- **Shape:** full pill (999px), 1.5px border, min-height 48px.
- **Primary:** navy fill (`#005ca9`) / white text, `12px 24px` padding scaled by `--s-3 --s-5`.
- **Hover / Focus:** background deepens to navy-700 on hover (150ms ease); `:active` scales to 0.98. Focus uses a 3px cyan outline with 3px offset site-wide (`:focus-visible`), not a button-specific treatment.
- **Outline / Cyan / Alert variants:** `btn-outline` (transparent, navy text, cyan-100 hover fill); `btn-cyan` (cyan fill, navy-900 text — used for the primary CTA band action); `btn-alert` (red fill — dépannage/urgent phone actions only).

### Cards / Containers
- **Corner Style:** square (0 radius).
- **Background:** white on `.card`, else transparent over paper or `bg-alt`.
- **Shadow Strategy:** none — see Elevation & Depth. Separation is a 1px `--rule`-colored border.
- **Border:** 1px solid `--rule` on cards and the OSM map iframe.
- **Internal Padding:** `--s-4` (16px).

### Inputs / Fields
- **Style:** square corners, 1px `--rule` border, white background, 48px min-height, `--s-3` padding.
- **Focus:** 3px cyan outline (2px offset) plus border shifts to navy.
- **Error:** `:user-invalid` border shifts to alert red; no red background fill.

### Navigation
- Desktop (≥1024px): tab-like top nav, each link padded top/bottom to sit flush with the 72px header, active/hover state is a 3px cyan underline plus navy text color — never a background pill.
- Mobile (<1024px): native `<details>`/`<summary>` full-panel menu (no JS), pill-shaped "Menu" summary that inverts to navy fill when open.
- Dropdown sub-menus: square white panel, 1px `--rule` border, cyan-100 hover row.

### The Cachet (signature component)
Logo (existing PNG, `337×94`, kept as-is) plus name/address/phone set in small label lines, rotated -1.5°, inside a double-ruled square cartouche (1px border + 1px outline at 3px offset). Always overlaps an adjacent element per the Overlap-Not-Float Rule above; appears in the home hero (compact variant, no address/SIRET) and in the footer and content-template hero fallback (full variant). Never appears un-rotated or free-floating.

### The Marks Row (qualification/partner logos)
`.marks`: a flex row of grayscale, 75%-opacity logos (44px tall) under a single top hairline (`--rule`), full color on hover. This replaced an earlier bordered badge-grid pattern that was explicitly rejected during build for reading as the generic HVAC-vendor "bandeau de badges" template. Do not reintroduce individually bordered/boxed logo tiles; `.marks` is the correct, canonical pattern for this content.

### Checks (proof list)
Square-check icon in cyan, label bold + muted detail inline. Hover tints the row cyan-100 and thickens the checkmark stroke (2 → 2.5) over 150ms — the one authored micro-interaction beyond default hover/active transitions. Each item is a disclosed, real proof (attestation, registry, visit-first policy), never a marketing claim.

## Do's and Don'ts

### Do:
- **Do** keep motion to `150ms` CSS transitions on `:hover`/`:active` only; the checks-row cyan tint + stroke-thickening is the one authored moment, not a precedent for adding more.
- **Do** reuse the negative-margin + `z-index` overlap technique for the cachet (see Elevation & Depth) rather than absolute positioning or drop shadows to fake depth.
- **Do** use `.marks` (grayscale row under a hairline) for any future qualification/partner-logo listing.
- **Do** keep cyan rare: cachet, checks, active nav/filter state, focus rings, and the single `btn-cyan` CTA variant — not a general-purpose accent.
- **Do** respect `prefers-reduced-motion` (already zeroed site-wide) and the 17–18px body-text floor for this 40–75 audience.

### Don't:
- **Don't** add a `box-shadow` anywhere; this world's depth model is overlap and hairlines only.
- **Don't** reintroduce a bordered/boxed logo grid ("bandeau de badges") — it was explicitly rejected as the generic HVAC-template look; `.marks` is the replacement and the only sanctioned pattern.
- **Don't** add kickers, eyebrows, or uppercase micro-labels above headings. No eyebrow class exists in the build and none should be added; small labels stay sentence-case and sit beside their value (see The Pre-Printed Label Rule).
- **Don't** use red (`#ea444e`) for anything except urgent/dépannage phone CTAs; it is not a second accent.
- **Don't** round the corners of cards, photos, inputs, or the cachet — square is the "paper/data" shape; pill is reserved for clickable actions only.
