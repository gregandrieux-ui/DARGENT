# AirHero Design Language — LLM Implementation Guide

**Source analysed:** [airhero.framer.website/about](https://airhero.framer.website/about)  
**Captured:** 2026-10-01  
**Purpose:** Give an implementation LLM enough design information to make another website feel like AirHero without copying its content, markup, or brand assets.

---

## 1. Instruction to the implementation LLM

Apply the AirHero visual language, not the original website's content. Preserve the target application's information architecture, routes, accessibility, data, and business logic. Change visual presentation only unless a component is required to express the design language.

### Before editing:
- Identify the target framework, entry points, routing, global styles, component library, and responsive breakpoints.
- Inventory existing components and reuse them where possible.
- Do not replace working behavior with static mock data.
- Do not copy AirHero logos, photography, text, or proprietary assets. Use the target brand's content and licensed assets.
- Establish tokens first, then global layout, then components, then responsive behavior, then motion.
- Run the target project's real formatter, typecheck, tests, and build after implementation.

The result should be a warm, trustworthy, conversion-oriented local-services site: white space + deep navy structure + bright yellow moments + soft blue surfaces + friendly rounded geometry.

---

## 2. Design diagnosis

AirHero is a polished HVAC/local-services template. Its design combines:
- A clean white page canvas.
- Deep navy navigation, service bands, and footer areas.
- A high-energy yellow offer banner and CTA accent.
- Pale blue backgrounds and borders that make sections feel airy and dependable.
- A display face for large headings and statistics, paired with a highly legible sans-serif body face.
- Large rounded or pill-shaped containers rather than sharp cards.
- Editorial, human messaging supported by trust metrics, team portraits, service promises, and a phone CTA.
- Layered organic visual motifs: rounded statistic tiles, soft image crops, irregular decorative shapes, and restrained blur.

> Avoid making the target look like a generic SaaS dashboard, a dark tech startup, or a flat utility page.

---

## 3. Token system

Use semantic names in the target project. The source Framer page exposes a larger color ramp; these are the practical mappings.

```css
:root {
  /* Canvas and text */
  --color-white: #ffffff;
  --color-canvas: #ffffff;
  --color-ink: #1a1c21;
  --color-ink-soft: #3e434e;
  --color-muted: #656971;

  /* Navy ramp */
  --color-navy-950: #062743;
  --color-navy-900: #0b4172;
  --color-navy-800: #0e5492;
  --color-navy-700: #0f5ca0;

  /* Blue ramp */
  --color-blue-100: #e7eff6;
  --color-blue-200: #b5cce2;
  --color-blue-300: #91b4d3;
  --color-blue-500: #5e92bf;
  --color-blue-600: #3f7db3;

  /* Yellow ramp */
  --color-yellow-50: #fffbe0;
  --color-yellow-100: #fdf2b1;
  --color-yellow-200: #fdec8c;
  --color-yellow-300: #fce457;
  --color-yellow-400: #fbdc36;
  --color-yellow-500: #fad604;
  --color-yellow-600: #e4c304;

  --color-border: var(--color-blue-100);
  --color-focus: #0f5ca0;
  --color-danger: #c92e38;

  /* Type */
  --font-display: "Clash Display", "Plus Jakarta Sans", sans-serif;
  --font-body: "Plus Jakarta Sans", Inter, system-ui, sans-serif;

  /* Layout */
  --container-max: 1200px;
  --gutter-desktop: 32px;
  --gutter-tablet: 24px;
  --gutter-mobile: 16px;
  --section-y: clamp(72px, 9vw, 144px);

  /* Shape */
  --radius-sm: 10px;
  --radius-md: 13px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-pill: 999px;

  /* Depth */
  --shadow-soft: 0 10px 26px rgba(6, 39, 67, .08);
  --shadow-card: 0 2px 12px rgba(6, 39, 67, .08);
  --blur-decorative: 50px;
}
```

### Color rules
- Use white for the primary canvas and dark ink for normal copy.
- Use navy-950/900 for high-contrast bands, navigation, footer, and important headings on light surfaces.
- Use yellow-500 for the announcement strip and primary conversion moments; do not use it as the default page background.
- Use blue-100 for section fills, separators, and borders; blue-200 for visible outline contrast.
- Keep body text near ink-soft or muted. Do not use pure black for all copy.
- Check WCAG contrast for every target-brand color combination. If the target accent fails, retain the hue but darken its text or add a dark surface.

---

## 4. Typography

The source declares Clash Display at weights 400/500/600/700 and Plus Jakarta Sans at weights 400/500/600/700. It also includes Inter for fallback/runtime UI. Load licensed equivalents if the original fonts are unavailable; do not hotlink source font files in production without permission.

### Recommended scale:

| Role | Desktop | Tablet | Mobile | Font | Weight | Line-height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display hero** | 72–96px | 60–76px | 44–56px | Clash Display | 500–600 | .92–1.02 |
| **H2 section** | 52–64px | 44–54px | 36–44px | Clash Display | 500–600 | 1.0–1.08 |
| **H3/card heading** | 24–32px | 24–30px | 22–26px | Clash Display | 500–600 | 1.1–1.2 |
| **Statistic** | 48px | 44px | 40px | Clash Display | 600 | 1 |
| **Body lead** | 18–20px | 18px | 17–18px | Plus Jakarta Sans | 400–500 | 1.5–1.65 |
| **Body** | 15–16px | 15–16px | 14–16px | Plus Jakarta Sans | 400 | 1.55–1.7 |
| **Nav/button** | 13–15px | 13–15px | 14px | Plus Jakarta Sans | 600 | 1.2–1.4 |
| **Eyebrow/label** | 11–13px | 11–13px | 11–12px | Plus Jakarta Sans | 600 | 1.3 |

Use modest negative tracking on display headings (-0.02em to -0.04em). Keep body tracking near normal. Large metrics use tabular numerals and a tight line-height.

---

## 5. Global geometry and rhythm

- Center all major content in a max-width container of approximately 1200px.
- Use full-bleed color sections with an inset container.
- Use 16px mobile gutters, 24px tablet gutters, and 32px desktop gutters.
- Build vertical rhythm around 8px multiples: 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Prefer generous section padding over many visible borders.
- Use `min-height: 100vh` only for true hero/layout needs; avoid artificial empty space.
- Keep text measure around 52–68 characters for readable paragraphs.
- Use `overflow: clip/hidden` only where decorative shapes or image crops need containment.

```css
.container {
  width: min(100% - 2 * var(--gutter-desktop), var(--container-max));
  margin-inline: auto;
}

@media (max-width: 1199px) {
  .container {
    width: min(100% - 2 * var(--gutter-tablet), var(--container-max));
  }
}

@media (max-width: 809px) {
  .container {
    width: min(100% - 2 * var(--gutter-mobile), var(--container-max));
  }
}
```

---

## 6. Page composition to reproduce

Use this as a visual blueprint, replacing the source's HVAC copy with the target site's content.

### 6.1 Offer strip
- Full-width, fixed or sticky-at-top yellow strip.
- Height roughly 32–40px on desktop.
- Centered inline message, small bold text, and a compact underlined or high-contrast action.
- Include a small icon only if it improves comprehension.
- Keep its z-index above navigation; compensate for its height so it never covers content.

### 6.2 Navigation
- Place a navy navigation bar beneath the offer strip.
- Rounded lower corners or a rounded floating shell are appropriate.
- **Desktop:** logo left, 4–5 simple links centered/right, phone/contact CTA at the far edge.
- **Mobile:** logo + menu trigger; move links into an accessible disclosure/drawer.
- Keep the navigation visually calm: no gradients, excessive shadows, or dense dropdowns.
- Active link should be indicated by color/weight or a small underline, not by a large pill.

### 6.3 Hero/banner
- Use a strong promise headline with a short supporting paragraph and one primary CTA.
- Compose text against a large image or pale blue surface with a clear focal point.
- Use rounded image corners and/or an organic clipped shape rather than a rigid rectangular collage.
- Add one secondary trust cue (rating, response time, years, or service area).
- The source about page uses the message pattern: reassuring headline → local-service explanation → “meet the team” action.

### 6.4 Metrics row
- Present 3–4 trust statistics directly after the hero.
- Each metric is a compact rounded tile/pill with a large display number and a small bold label.
- Use alternating white/pale-blue/yellow or navy accents sparingly.
- **Desktop:** horizontal row. **Tablet:** 2×2 grid. **Mobile:** one or two columns depending on label length.
- Preserve meaningful values; never leave placeholder zeros in the target implementation.

### 6.5 “Why us” section
- Pair a section heading and short story with a grid of service principles.
- Each principle needs an icon or small decorative mark, a concise heading, and 1–2 lines of explanation.
- Keep cards border-light, rounded, and spacious; avoid heavy card shadows.
- Recommended principles: speed, expertise, transparency, quality, support, guarantee.

### 6.6 Team section
- Use an editorial heading such as “Trusted professionals” plus a supporting paragraph.
- Show team members in a responsive grid with portrait images, names, and roles.
- Crop portraits consistently (`aspect-ratio`, `object-fit: cover`) and use rounded corners or organic masks.
- Let the content breathe; do not turn the team grid into a dense directory.

### 6.7 Emergency/contact CTA
- Full-width navy band near the end of the page.
- Large, direct service promise, short response-time statement, and a prominent phone/contact action.
- Use yellow for the CTA or key number, with white body copy.
- Make the phone number a real `tel:` link and expose the same action to keyboard and screen-reader users.

### 6.8 Service areas and footer
- Service areas can be a simple text/list block on white or pale blue.
- Footer should be dark navy with a clear logo, short description, grouped links, contact details, and legal line.
- Keep link groups aligned and generous rather than adding dense columns.

---

## 7. Components and CSS patterns

### Buttons
Primary: navy or yellow fill, pill shape, semibold Jakarta Sans, 12–16px horizontal padding, visible hover transition.

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: var(--radius-pill);
  font: 600 14px/1.2 var(--font-body);
  transition: transform .2s ease, background-color .2s ease, color .2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.button--primary {
  background: var(--color-navy-900);
  color: #fff;
}

.button--accent {
  background: var(--color-yellow-500);
  color: var(--color-ink);
}
```

### Cards and tiles
- Default background: white or blue-100.
- Border: 1–2px blue-100/blue-200.
- Radius: 13px for small cards, 24–32px for feature panels.
- Shadow: optional and very soft; use shadow to lift, never to outline every component.
- Hover: 2px lift or a subtle border/accent shift, not an aggressive scale.

### Images and decoration
- Use real, relevant photography with warm human subjects and service context.
- Crop with `object-fit: cover`; preserve the face/focal point.
- Use yellow organic blobs, pale blue arcs, or circular shapes behind imagery.
- Decorative elements may use `backdrop-filter: blur(50px)` and translucent yellow, but must not reduce text contrast or be required for meaning.

### Icons
- Use one consistent outline/rounded icon set.
- Keep icons simple, approximately 20–28px in feature rows.
- Place icons inside small circular or rounded-square blue/yellow surfaces.
- Do not mix filled, 3D, and thin-line icon styles.

---

## 8. Responsive behavior

The source uses three Framer variants: desktop at `min-width: 1200px`, tablet from `810px` to `1199.98px`, and mobile below `810px`.

Implement equivalent behavior:

### Desktop ≥1200px
- Full navigation links.
- Two-column hero and content layouts.
- Horizontal metrics row.
- Team/features in 3–4 columns.
- Large display type and generous section spacing.

### Tablet 810–1199px
- Preserve horizontal navigation if it fits; otherwise use a menu trigger early.
- Reduce heading size and gutters.
- Convert 4-column rows to 2 columns.
- Keep hero split layout only if both columns retain usable width.

### Mobile <810px
- One-column flow; center or left-align according to content length, not habit.
- Collapse nav links into an accessible menu.
- Stack hero text and image; keep CTA full-width only when it improves reachability.
- Metrics become 1–2 columns with shorter labels.
- Team cards become 1–2 columns.
- Reduce section padding to approximately 64–88px.
- Avoid horizontal overflow from decorative artwork, phone numbers, or long labels.

Use fluid sizing where useful:
```css
h1 { font-size: clamp(44px, 7vw, 92px); }
h2 { font-size: clamp(36px, 5vw, 64px); }
.section { padding-block: clamp(72px, 9vw, 144px); }
```

---

## 9. Motion and interaction

Motion is supportive, not theatrical:
- Use 180–250ms ease transitions for buttons, links, cards, and nav states.
- Reveal sections with a small upward fade only if the target already uses an animation system.
- Animate counters only when values are real and the animation does not obscure them.
- Respect `prefers-reduced-motion: reduce`; remove transforms and reveal delays.
- Never make essential content depend on hover or animation.

---

## 10. Accessibility and implementation safeguards

- Use semantic `header`, `nav`, `main`, `section`, and `footer` landmarks.
- Give every meaningful image useful alt text; make decorative shapes `aria-hidden="true"`.
- Provide visible `:focus-visible` states.
- Ensure menu buttons expose `aria-expanded`, `aria-controls`, and keyboard support.
- Do not use color alone for active/current/error states.
- Ensure the yellow strip remains readable on small screens and does not hide content.
- Keep tap targets at least 44×44px.
- Preserve logical heading order.
- Test at 320px, 375px, 768px, 1024px, and 1440px widths.

---

## 11. LLM implementation workflow

1. **Inspect:** read the target project files and determine the existing style architecture.
2. **Plan:** map target components to the composition in section 6; list files to change.
3. **Tokenize:** add semantic CSS variables/theme values from section 3.
4. **Foundation:** load fonts or approved equivalents, reset spacing, set canvas, container, and type scale.
5. **Shell:** implement offer strip, nav, footer, and responsive container.
6. **Content sections:** restyle hero, metrics, feature cards, team, and CTA while preserving target content and interactions.
7. **Responsive pass:** implement the 1200/810 breakpoints and test overflow.
8. **Polish:** add rounded geometry, subtle borders, soft shadows, organic decoration, and reduced-motion handling.
9. **Verify:** run formatter, typecheck, tests, build, and visual checks at all required widths.
10. **Report:** summarize changed files, tokens, accessibility checks, and any deliberate deviations.

---

## 12. Acceptance checklist

- [ ] White canvas, deep navy structural surfaces, yellow accent moments, and pale blue supporting surfaces are visually balanced.
- [ ] Display headings feel rounded/friendly and body copy remains highly readable.
- [ ] Navigation, offer strip, CTA, metrics, feature grid, team, and footer follow the composition above.
- [ ] Containers align to one consistent max-width and gutters.
- [ ] Cards use soft borders and rounded geometry rather than heavy shadows.
- [ ] Real target content replaces all AirHero wording and placeholder metrics.
- [ ] No AirHero logo, copy, or unlicensed source images were copied.
- [ ] Mobile menu, grids, phone links, and long text work without overflow.
- [ ] Keyboard focus, contrast, semantic landmarks, alt text, and reduced motion are implemented.
- [ ] Project checks actually run successfully; do not claim a check that was not run.

---

## 13. Source-analysis notes

The captured HTML identified these source facts:
- **Page title:** AirHero — HVAC Framer Template.
- **Primary sections:** top offer, navigation, banner/hero, counters, “Why Us”, team, emergency CTA, service areas, footer.
- **Framer responsive variants:** desktop ≥1200px, tablet 810–1199.98px, mobile <810px.
- **Source token anchors include:** `#ffffff`, `#1a1c21`, `#062743`, `#0b4172`, `#0f5ca0`, `#e7eff6`, `#b5cce2`, and `#fad604`.
- **Source stat values use:** Clash Display, 48px, weight 600, line-height 1, and tabular numerals.
- **Source offer bar uses:** yellow `#fad604`, a centered 1200px container, 8px vertical/16px horizontal padding, and a 16px icon.
- **Source system uses:** rounded corners from approximately 10px/13px through large 32px and pill radii.

> These observations describe a design language. They are not a request to reproduce AirHero's exact page or brand identity.
