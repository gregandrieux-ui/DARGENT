---
name: Dargent Thermique
description: Direction D « AirHero » — structure bleu nuit, surfaces bleu pâle, accent cyan du logo, géométrie arrondie, titres Clash Display.
colors:
  paper: "#ffffff"
  tint: "#f4f8fb"
  navy-50: "#eaf3fa"
  blue-100: "#e7eff6"
  blue-200: "#b5cce2"
  navy-900: "#0b2a4a"
  navy: "#005ca9"
  navy-700: "#004a8a"
  cyan: "#2db8c5"
  cyan-100: "#e3f6f8"
  cyan-200: "#96dce2"
  cyan-700: "#117a85"
  ink: "#21313e"
  ink-600: "#4a5a68"
  line: "#e1e8ee"
  rule: "#c9d5df"
  alert: "#d93641"
  alert-50: "#fdeced"
  warn: "#f5b800"
typography:
  display:
    fontFamily: "Clash Display, Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.3rem + 3vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  h1:
    fontFamily: "Clash Display, Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Clash Display, Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.3rem + 2vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  sm: "10px"
  md: "13px"
  lg: "24px"
  xl: "32px"
  pill: "999px"
shadows:
  shadow-1: "0 1px 2px rgba(11,42,74,.04), 0 2px 8px rgba(11,42,74,.05)"
  shadow-2: "0 2px 4px rgba(11,42,74,.05), 0 12px 28px rgba(11,42,74,.09)"
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
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy-900}"
    borderColor: "{colors.blue-200}"
    rounded: "{rounded.pill}"
  button-alert:
    backgroundColor: "{colors.alert}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "#ffffff"
    borderColor: "{colors.blue-100}"
    rounded: "{rounded.lg}"
  input-field:
    backgroundColor: "#ffffff"
    borderColor: "{colors.rule}"
    rounded: "{rounded.sm}"
    padding: "12px"
---


# Design System: Dargent Thermique

## Overview

**Direction D « AirHero »** (branch `airhero`, 01/10/2026, replaces « clair et net » + Direction C styling). Source: `AirHero.md` (design language of an HVAC template, applied without copying its content or assets).

A warm, trustworthy local-trade site: white canvas, deep navy structure (navigation, home hero, closing CTA, footer), pale-blue surfaces, the logo cyan for every conversion moment, and friendly rounded geometry. Audience 40–75, often on a phone, often in a hurry (breakdown).

The editorial rules don't change (PRODUCT.md): proof before promise, no invented figures, PAC first, one CTA wording per intent.

**Key characteristics**
- Navy `--brand-900` carries structure: nav bar (rounded lower corners), home hero, `.big-cta`, footer (rounded upper corners), dépannage hero.
- Cyan `--cyan` is the accent (replaces AirHero's yellow, user choice): top strip, primary buttons, mobile « Demander un devis », CTA pill. Navy text on cyan (6.1:1).
- Red stays for urgent phone actions only.
- Two typefaces: Clash Display (headings, metrics) and Plus Jakarta Sans (everything else).
- Radius scale 10 / 13 / 24 / 32 / pill. No resting shadows on cards; a 2px lift on hover.
- **Light only**: dark mode removed on 01/10/2026 (`color-scheme: light`).

## Colors
- **Navy 900 `#0b2a4a`** (`--brand-900`): structural surfaces above, headings on light surfaces.
- **Navy `#005ca9`** (`--brand`): text links, install tile, focus ring on light surfaces.
- **Cyan `#2db8c5`**: strip, `.btn`, CTA pill, sticky bar primary, focus ring on navy (`--focus` is redefined per surface). Hover goes to **cyan 200 `#96dce2`**.
- **Navy 50 `#eaf3fa`** / **blue 100 `#e7eff6`** / **blue 200 `#b5cce2`**: section fills and metric tiles / card borders / outline borders and muted text on navy.
- **Tint `#f4f8fb`**: alternating sections, FAQ, exits, `.nums`.
- **Cyan 700 `#117a85`**: maintain tile, cyan text on light backgrounds.
- **Alert `#d93641`**: dépannage phone buttons, breakdown tile only. **Warn**: the « À confirmer » callout only.
- `--brand*` and `--navy*` hold the same values since dark mode was dropped; either works.

## Typography
- **Clash Display** (Fontshare, ITF Free Font License, self-hosted `public/fonts/ClashDisplay-Variable.woff2`, weights 200–700, French glyphs checked): H1–H3, metrics (`.proofs`, `.stats`), step numbers. Weight 600, tracking −0.02 to −0.03em, line-height 1.02–1.08.
- **Plus Jakarta Sans Variable** (`@fontsource-variable/plus-jakarta-sans`): body 17–18px (deliberately larger than AirHero's 15–16px for the audience), labels and buttons 600–700.
- Scale: H1 up to 72px (long SEO H1s), H2 up to 56px, H3 up to 26px; caps reached on wide screens only (≈60/48px at 1250px).
- `.eyebrow` = small pill label (cyan-100 on light, translucent white on navy). Never uppercase.

## Layout
- Fluid container capped at 1600px, 16px gutter (32px from 768px). Breakpoints 600 / 768 / 900 / 1100; the full nav still fits at 1100px with Jakarta. From 1360px the header phone button shows its number again.
- Sections: 64px padding (96px from 768px), white or `--tint`.
- `.entry` two-column split from 900px.
- Mobile: sticky bottom bar (Appeler outline, Demander un devis cyan), iOS safe area respected.

## Components
- **Top strip** (`Header.astro`, `.strip`): cyan, 44px, not sticky (keeps mobile height for content; AirHero's is sticky). Two messages cross-fade every 4s: « Une panne ? Appelez le 02 38 86 46 46 » and « Pompe à chaleur : les aides en vigueur → ». Pauses on hover; keyboard focus shows the focused message; reduced motion shows the first one only. Both stay in the DOM for screen readers.
- **Header**: navy, sticky, rounded lower corners. Logo PNG on a white pill (the blue wordmark is unreadable on navy; logo kept unaltered). White links, hover cyan-200, current page = cyan underline + bold (no pill). Dropdown and mobile panel stay white.
- **Buttons**: pill, 48px min. `.btn` cyan + navy text, hover lifts 2px. `.btn-outline` white with blue-200 border. `.btn-alert` red, urgent calls only.
- **Card**: white, 24px radius, 2px blue-100 border, no shadow; with `a.stretched` it lifts 2px and the border goes blue-200.
- **Metric tiles** (`.proofs`): separate rounded tiles, Clash value up to 44px (tabular), short bold label; tile 2 white, tile 3 navy. 4 columns from 900px, 2×2 below.
- **Tiles** (`.tiles`): 32px radius; navy = install, cyan-700 = maintain, navy-900 = neutral, red = breakdown.
- **Exploded view** (`Exploded.astro` + `src/lib/exploded.ts`): see below.
- **CTA band** (`.big-cta`): navy, 32px radius, cyan pill + white phone; red pill on breakdown pages.
- **Footer**: navy, 32px top corners, white headings, blue-100 links (cyan on hover), Cachet stays a white card, 44px link targets.
- **Stacking cards**, **Exits**, **Ruled**, **Checks**, **FAQ**, **Steps**, **Marks**: unchanged behaviour (see git history of this file), now 24px radius and Clash numbers.

## Exploded view (01/10/2026)
Vector exploded views of a PAC outdoor unit and a wall-mounted clim indoor unit, in the schéma style (navy outlines 4px, white / `#dfeaf3` parts, cyan pipes and LED, navy-50 panel with a soft cyan halo). Drawn in `src/lib/exploded.ts` with an oblique projection (front face true size, depth up-right); each part is drawn assembled and carries its exploded screen offset `ex` (hand-tuned, keep parts inside the 800×600 viewBox).
- Home hero: random PAC or clim per visit (inline script before paint; no JS = PAC). PAC pilier: PAC only, its schéma moves to the gallery. Climatisation pilier keeps its schéma (user choice).
- Motion, CSS only (`animation-timeline`): assembled → exploded → reassembled. From 900px wide and 700px tall the hero is pinned for one extra screen of scroll (`.hero-x` 200svh, `.hero-x-pin` sticky). Smaller screens: the figure animates while it crosses the viewport. No support or reduced motion: static exploded view.
- Always labelled « Illustration » (chip + `aria-label`). Never presented as an installation, never used in réalisations or as OG image.
- AI image generation was tried and dropped (free plan model could not draw exploded views).

## Illustrations
`public/images/illustrations/*.svg` stand in for weak or missing site photos. There are two styles, chosen by page type:
- **Schéma** (product pages): cutaway/section views, no scenery. Navy-50 background, navy-900 outlines 4–6px, white equipment. Flows: supply/warm = navy solid with an arrowhead, return/cold = cyan dashed. Numbered navy-900 discs, with at most 3–4 labels of 26px or more in `system-ui` (webfonts don't load inside `<img>` SVG). Examples: `pac-air-eau.svg`, `clim-reversible.svg`.
- **Infographie** (service/info pages): white 22px-radius cards on navy-50, a numbered disc, a simple line icon, a bold label plus a muted detail. Example: `entretien-pac.svg`.
- Both are 800×600, `role="img"` with an `aria-label`, with no red, and no figures that the page text doesn't state.
- In the hero they use `object-fit: contain` so labels are never cropped.
- Set (27/09/2026): schémas `pac-air-eau`, `pac-hybride`, `pac-haute-temperature`, `clim-reversible`, `gainable-combles`, `gainable-plafond`, `ventilation-double-flux`, `ballon-thermodynamique`, `plancher-chauffant`, `vrv-tertiaire`; infographies `entretien-pac`, `pac-installation`, `aides-parcours`, `qualifications-qualibat`, `histoire-frise`, `recrutement-metiers`.
- Added (28/09/2026), so no service page keeps a photo in its hero: schémas `chaudiere-condensation` (also the Chauffage pilier; the Climatisation pilier reuses `clim-reversible`), `regulation-chauffage`; infographies `clim-installation`, `entretien-clim`, `depannage-clim`, `depannage-pac`, `entretien-chaudiere`, `formules-entretien`, `engagements`, `site-avenue-ampere`. Their connectors between cards carry `marker-end="url(#an)"`, so they get the same animated flow as the schémas.
- A visual goes in as `photos[0]` (hero). Real photos and « à collecter » slots stay after it, so real chantier photos keep being collected. **They are not chantier photos.** `Photo.astro` detects the folder, forces the caption label "Illustration", and uses 800×600 dimensions. They are never used in réalisations or as the OG image. Replace them with real photos (with client consent) as they come in.

## Direction C « service direct » (site-wide, 27/09/2026)
Chosen by the client from three directions; its patterns stay under Direction D, restyled.
- **Headings**: now Clash Display 600 through the `--display` token (was Bricolage Grotesque 800).
- **Colour tiles** (`.tiles`, `.tile`, radius `--round` 26px) mean the same thing everywhere:
  - navy = install
  - cyan-700 = maintain
  - navy-900 = neutral third choice
  - red = breakdown only
- The homepage uses the tiles as an intent chooser. The pilier pages (PAC, climatisation, chauffage) show them as « Votre besoin, notre réponse », fed by the `needs` frontmatter field.
- **Tint bands**: `.proofs` on the homepage, and `.facts` for the frontmatter `facts` under each hero. FAQ, exits and `.ruled` use tint rounded cards, radius 18–22px, with no borders.
- **Visit first**: `.nums` numbered steps. They appear on the homepage and in `Reassurance` at the end of every service page.
- **Reviews**: `.revs` cards with an initial avatar (`Testimonials`).
- **Closing CTA**: a `.big-cta` navy-900 block with a white pill and the phone number (`CtaBand`). On breakdown pages the pill is red.
- The shared patterns live in `global.css`. `index.astro` keeps only its own intro layout.

## Do / Don't
- **Do** keep transitions at 200ms (`--dur`) on hover and active, and respect `prefers-reduced-motion` (zeroed site-wide). Beyond hover, only these motions are allowed, all in CSS with no JS:
  1. A cross-page crossfade (`@view-transition`, 300ms). The header stays fixed.
  2. Animated flows in the schémas and in the infographies added on 28/09/2026: dashes move in the arrow direction on a 1.2s loop, via a `<style>` inside each SVG (it animates any path with `marker-end` `#an` or `#ac`).
  3. Cards, tiles, `.nums` and reviews rise on scroll (`animation-timeline: view()`). Without support, they just show.
  4. The FAQ opens smoothly (`::details-content`).
  5. Surfaces that appear (desktop sub-menu, mobile menu panel, cookie banner) fade in over 180ms with `@starting-style` (entry only; hiding is instant so two sub-menus never overlap).
  6. The top strip cross-fade (4s per message, paused on hover/focus).
  7. The exploded view, scrubbed by scroll.
- Internal links are prerendered on hover with Speculation Rules (`Base.astro`, moderate eagerness, `/documents/` excluded), so the crossfade lands on a page that is already loaded.
- **Don't** add motion to the CTAs beyond the 2px hover lift, or any loop other than the illustration flows and the top strip. The dépannage hero illustration keeps its flows (client choice, 28/09/2026); nothing else in that hero moves.
- **Do** keep touch targets at 44px or more (nav, chips, footer links, exits).
- **Do** use one primary CTA per view. The phone link sits next to it as a text link.
- **Don't** add new shadow values, gradients, or new accent hues (cyan is the only accent; no yellow).
- **Don't** use red for anything but urgent calls.
- **Don't** present an illustration as a real installation.
