---
name: Dargent Thermique
description: Clair et net — fond blanc, cartes arrondies à ombre légère, bleu du logo pour l'action, preuves avant promesses.
colors:
  paper: "#ffffff"
  tint: "#f4f8fb"
  navy-50: "#eaf3fa"
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
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.125rem, 1.2rem + 3vw, 3.5rem)"
    fontWeight: 700
    fontVariation: "font-stretch: 88%"
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  h1:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 2.875rem)"
    fontWeight: 700
    fontVariation: "font-stretch: 90%"
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1vw, 2.125rem)"
    fontWeight: 700
    fontVariation: "font-stretch: 90%"
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
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
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.pill}"
  button-alert:
    backgroundColor: "{colors.alert}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "#ffffff"
    borderColor: "{colors.line}"
    rounded: "{rounded.md}"
    shadow: "{shadows.shadow-1}"
  input-field:
    backgroundColor: "#ffffff"
    borderColor: "{colors.rule}"
    rounded: "{rounded.sm}"
    padding: "12px"
---

# Design System: Dargent Thermique

## Overview

**Direction : « clair et net »** (branch `visuals`, 23/09/2026, replaces the earlier "carnet d'entretien" direction).

A light, airy local-trade site: white paper, very light blue tints for alternating sections, rounded white cards with a barely-there shadow, and the logo's blue for every action. The page must feel calm and easy to scan for a 40–75 audience, often on a phone, often in a hurry (breakdown).

The editorial rules don't change (PRODUCT.md): proof before promise, no invented figures, PAC first, one CTA wording per intent.

**Key characteristics**
- Light everywhere: top bar, footer and CTA band are light tints. The only dark block is `.hero-alert` (dépannage pages), and it's dark on purpose as the urgency signal.
- Three inks keep their meaning: navy = action, cyan = accent (icons, focus, tags), red = urgent phone action only.
- One typeface (Archivo Variable), slightly condensed for headings (88–90%), normal for body.
- Two shadow levels only (`--shadow-1` resting, `--shadow-2` hover or floating). No other shadows.
- Radius scale: 8 (inputs, small rows), 12 (cards, photos), 20 (CTA card), pill (buttons, chips).

## Colors
- **Navy `#005ca9`**: buttons, links. Hover goes to `#004a8a`.
- **Navy 900 `#0b2a4a`**: headings, the dépannage hero background.
- **Navy 50 `#eaf3fa`**: CTA card, icon tiles, active nav pill, illustration backdrop.
- **Tint `#f4f8fb`**: alternating sections, top bar, footer, hero gradient start.
- **Cyan `#2db8c5`**: focus ring, quote marks, illustration accents. **Cyan 700 `#117a85`** is for cyan-colored text and icons on light backgrounds (AA).
- **Alert `#d93641`**: dépannage phone buttons and the dépannage icon tile only.
- **Warn**: the "À confirmer" callout only.
- **Line `#e1e8ee` / Rule `#c9d5df`**: card borders, then stronger borders (outline buttons, inputs).

## Typography
- Display (home H1 only), then H1, H2, H3 as in the frontmatter. Body is 17–18px, line-height 1.65, max 68ch.
- `.eyebrow` (small cyan-700 label with an icon) is allowed once per hero for location context. Never uppercase.
- `.section-head` = H2 plus a one-line muted intro, max 720px.

## Layout
- 1200px container, 16px gutter (32px from 768px).
- Sections: 64px padding (96px from 768px), white or `--tint`, alternating.
- `.entry` two-column split (5/7, 7/5 or 6/6 from 900px).
- Mobile: a sticky bottom bar with two pill buttons (Appeler, Demander un devis) that respects the iOS safe area.

## Components
- **Buttons**: pill, 48px minimum height. The primary gets a soft blue glow on hover, and `:active` scales to 0.98. The outline button is white with a `--rule` border and a navy-50 hover. `btn-alert` is for urgent calls only.
- **Card** (`.card`): white, 12px radius, `--line` border, `--shadow-1`. Put `a.stretched` on the title link to make the whole card clickable (it lifts 2px with `--shadow-2`). Content goes in `.card-body`, with an optional `.card-icon` (44px navy-50 tile) and `.tag` chip.
- **Exits** (`.exits`): stacked link rows, 52px tall, with a chevron. Used for "Pour continuer" and link lists.
- **Ruled** (`.ruled`): the key-facts list, inside a white rounded card with row dividers. On the dépannage hero it becomes translucent.
- **Checks / Quals**: an icon plus a bold label and muted detail. Quals are small bordered rows.
- **Cachet** (`Cachet.astro`): now a plain contact card (logo, name, address, phone, SIRET), with no rotation.
- **Marks**: qualification logos in full color on small white bordered tiles.
- **FAQ**: separated rounded `<details>` with a round +/− badge.
- **Steps**: numbered navy-50 discs joined by a line. Vertical by default, horizontal (`.steps-row`) on the home page from 768px.
- **CTA band**: a rounded navy-50 card inside the container (`.cta-card`), red-tinted `is-alert` variant.
- **Header**: white, translucent with blur, sticky. The full nav shows from 1100px (it needs ≈1070px). Below that: burger + devis button. Nav items are pills (tint on hover, navy-50 when active). The dropdown is a rounded shadowed panel.
- **Footer**: `--tint`, contact card, four link columns, legal line.

## Illustrations
`public/images/illustrations/*.svg` stand in for weak or missing site photos. There are two styles, chosen by page type:
- **Schéma** (product pages): cutaway/section views, no scenery. Navy-50 background, navy-900 outlines 4–6px, white equipment. Flows: supply/warm = navy solid with an arrowhead, return/cold = cyan dashed. Numbered navy-900 discs, with at most 3–4 labels of 26px or more in `system-ui` (webfonts don't load inside `<img>` SVG). Examples: `pac-air-eau.svg`, `clim-reversible.svg`.
- **Infographie** (service/info pages): white 22px-radius cards on navy-50, a numbered disc, a simple line icon, a bold label plus a muted detail. Example: `entretien-pac.svg`.
- Both are 800×600, `role="img"` with an `aria-label`, with no red, and no figures that the page text doesn't state.
- In the hero they use `object-fit: contain` so labels are never cropped.
- Set (27/09/2026): schémas `pac-air-eau`, `pac-hybride`, `pac-haute-temperature`, `clim-reversible`, `gainable-combles`, `gainable-plafond`, `ventilation-double-flux`, `ballon-thermodynamique`, `plancher-chauffant`, `vrv-tertiaire`; infographies `entretien-pac`, `pac-installation`, `aides-parcours`, `qualifications-qualibat`, `histoire-frise`, `recrutement-metiers`.
- A visual goes in as `photos[0]` (hero). Real photos and « à collecter » slots stay after it, so real chantier photos keep being collected. **They are not chantier photos.** `Photo.astro` detects the folder, forces the caption label "Illustration", and uses 800×600 dimensions. They are never used in réalisations or as the OG image. Replace them with real photos (with client consent) as they come in.

## Direction C « service direct » (site-wide, 27/09/2026)
Chosen by the client from three directions. It was applied first to the homepage and then to every page.
- **Headings** use Bricolage Grotesque Variable, weight 800. It is imported once in `Base.astro`, through the `--display` token. The body stays Archivo.
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
- **Do** keep transitions at 200ms (`--dur`) on hover and active, and respect `prefers-reduced-motion` (zeroed site-wide). Beyond hover, only four motions are allowed, all in CSS with no JS:
  1. A cross-page crossfade (`@view-transition`, 300ms). The header stays fixed.
  2. Animated flows in the schémas: dashes move in the arrow direction on a 1.2s loop, via a `<style>` inside each SVG.
  3. Cards, tiles, `.nums` and reviews rise on scroll (`animation-timeline: view()`). Without support, they just show.
  4. The FAQ opens smoothly (`::details-content`).
- **Don't** add motion to the dépannage hero or the CTAs, or any loop other than the schéma flows.
- **Do** keep touch targets at 44px or more (nav, chips, footer links, exits).
- **Do** use one primary CTA per view. The phone link sits next to it as a text link.
- **Don't** add new shadow values, gradients beyond the hero tint fade, or new accent hues.
- **Don't** use red for anything but urgent calls.
- **Don't** present an illustration as a real installation.
