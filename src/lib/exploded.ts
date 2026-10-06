// Vues éclatées vectorielles (hero de l'accueil et du pilier PAC), même style que les schémas de /images/illustrations/.
// Projection oblique : face avant en vraie grandeur, profondeur z vers le haut à droite (K, L).
// Chaque pièce est dessinée assemblée ; `ex` = décalage écran de la pièce en position éclatée (réglage à l'œil).
// Classes de trait/remplissage : global.css (.ex .w, .s, .t, .d, .b, .l, .g, .p, .c, .lw).

const K = 0.5;
const L = 0.32;
const r = (n: number) => Math.round(n * 10) / 10;
type P = [number, number, number?];
const xy = ([x, y, z = 0]: P): [number, number] => [r(x + z * K), r(y - z * L)];
const pt = (p: P) => xy(p).join(',');
const face = (cls: string, ...pts: P[]) => `<path class="${cls}" d="M${pts.map(pt).join('L')}Z"/>`;
const line = (cls: string, a: P, b: P) => `<path class="${cls}" d="M${pt(a)}L${pt(b)}"/>`;
const range = (from: number, to: number, step: number) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

export interface Part { id: string; ex: [number, number]; svg: string }
export interface Unit { label: string; at: [number, number, number]; parts: Part[] } // at : origine et échelle de la pièce assemblée

/* --- Pompe à chaleur air/eau, unité extérieure ------------------------------------------- */
function pac(): Unit {
  const W = 380, H = 260, D = 140;
  const [fx, fy] = xy([150, 130, 28]);
  const [mx, my] = xy([150, 130, 70]);
  const [cx, cy] = xy([300, H - 120, 85]);
  const [gx, gy] = xy([150, 130, -4]);
  const blade = 'M-8,-16C-30,-52-20,-92 10,-96C36,-98 34,-58 14,-14Z';
  return {
    label: 'Illustration : vue éclatée d’une pompe à chaleur air/eau (unité extérieure) : capot, grille, hélice, moteur, compresseur, échangeur et socle.',
    at: [251, 241, 0.84],
    parts: [
      { id: 'base', ex: [170, 140], svg: [
        face('t', [0, H, 0], [W, H, 0], [W, H, D], [0, H, D]),
        face('s', [0, H, 0], [W, H, 0], [W, H + 14, 0], [0, H + 14, 0]),
        face('s', [W, H, 0], [W, H, D], [W, H + 14, D], [W, H + 14, 0]),
        ...[36, W - 96].map((x) => face('d', [x, H + 14, 0], [x + 60, H + 14, 0], [x + 60, H + 30, 0], [x, H + 30, 0])),
      ].join('') },
      { id: 'coil', ex: [140, -80], svg: [
        face('s', [0, 0, D], [W, 0, D], [W, H, D], [0, H, D]),
        ...range(24, W - 24, 16).map((x) => line('l', [x, 16, D], [x, H - 16, D])),
        face('w', [W, 0, 0], [W, 0, D], [W, H, D], [W, H, 0]),
        ...range(14, D - 14, 9).map((z) => line('l', [W, 16, z], [W, H - 16, z])),
      ].join('') },
      { id: 'comp', ex: [230, 60], svg: [
        `<path class="d" d="M${cx - 32},${cy}V${cy + 120}A32,10 0 0 0 ${cx + 32},${cy + 120}V${cy}Z"/>`,
        `<ellipse class="b" cx="${cx}" cy="${cy}" rx="32" ry="10"/>`,
        `<path class="p" d="M${cx},${cy - 8}C${cx},${cy - 40} ${cx - 40},${cy - 40} ${cx - 66},${cy - 22}"/>`,
      ].join('') },
      { id: 'motor', ex: [-190, -110], svg: [
        face('s', [144, 6, 70], [156, 6, 70], [156, H - 6, 70], [144, H - 6, 70]),
        `<circle class="d" cx="${mx}" cy="${my}" r="30"/><circle class="b" cx="${mx}" cy="${my}" r="11"/>`,
      ].join('') },
      { id: 'fan', ex: [-292, -181], svg:
        `<g transform="translate(${fx} ${fy})">${[0, 120, 240].map((a) => `<path class="d" d="${blade}" transform="rotate(${a})"/>`).join('')}<circle class="b" r="20"/></g>`,
      },
      { id: 'lid', ex: [30, -150], svg: [
        face('t', [0, -12, 0], [W, -12, 0], [W, -12, D], [0, -12, D]),
        face('w', [0, -12, 0], [W, -12, 0], [W, 0, 0], [0, 0, 0]),
        face('s', [W, -12, 0], [W, -12, D], [W, 0, D], [W, 0, 0]),
      ].join('') },
      { id: 'front', ex: [-60, 190], svg: [
        `<path class="w" fill-rule="evenodd" d="M0,0H${W}V${H}H0Z M44,130a106,106 0 1 0 212,0a106,106 0 1 0-212,0Z"/>`,
        `<path class="l" d="M284,26H360V234H284Z"/>`,
        ...range(46, 110, 10).map((y) => `<path class="l" d="M300,${y}H344"/>`),
      ].join('') },
      { id: 'grille', ex: [-266, 199], svg:
        `<g transform="translate(${gx} ${gy})">${[108, 84, 60, 36].map((rr) => `<circle class="g" r="${rr}"/>`).join('')}<path class="g" d="M-76,-76L-14,-14M76,-76L14,-14M-76,76L-14,14M76,76L14,14"/></g>`,
      },
    ],
  };
}

/* --- Climatiseur mural (unité intérieure) ------------------------------------------------ */
function clim(): Unit {
  const W = 440, H = 130, D = 90;
  const [fl, ft] = xy([40, 78, 56]);
  const [fr] = xy([W - 70, 78, 56]);
  return {
    label: 'Illustration : vue éclatée d’un climatiseur mural (unité intérieure) : façade, volet, filtres, échangeur, ventilateur tangentiel, châssis et plaque murale.',
    at: [258, 325, 0.8],
    parts: [
      { id: 'plate', ex: [214, -285], svg: [
        face('s', [30, 8, D + 14], [W - 30, 8, D + 14], [W - 30, H - 8, D + 14], [30, H - 8, D + 14]),
        ...range(70, W - 70, 60).map((x) => face('l', [x, 34, D + 14], [x + 24, 34, D + 14], [x + 24, 46, D + 14], [x, 46, D + 14])),
      ].join('') },
      { id: 'chassis', ex: [164, -200], svg: [
        face('s', [0, 0, D], [W, 0, D], [W, H, D], [0, H, D]),
        face('w', [W, 0, 0], [W, 0, D], [W, H, D], [W, H, 0]),
        ...range(18, D - 18, 12).map((z) => line('l', [W, 24, z], [W, H - 24, z])),
      ].join('') },
      { id: 'coil', ex: [110, -107], svg: [
        face('t', [16, 12, 34], [W - 16, 12, 34], [W - 16, 12, 48], [16, 12, 48]),
        face('w', [16, 12, 34], [W - 16, 12, 34], [W - 16, 84, 34], [16, 84, 34]),
        ...range(26, W - 26, 9).map((x) => line('l', [x, 16, 34], [x, 80, 34])),
        ...[30, 58].map((y) => { const [x0, y0] = xy([W - 16, y, 40]); return `<path class="p" d="M${x0},${y0}h14a7,7 0 0 1 0,14h-14"/>`; }),
      ].join('') },
      { id: 'fan', ex: [60, -70], svg: [
        `<path class="d" d="M${fl},${ft}H${fr}a8,18 0 0 1 0,36H${fl}a8,18 0 0 1 0,-36Z"/>`,
        ...range(fl + 12, fr - 8, 12).map((x) => `<path class="lw" d="M${x},${ft + 4}V${ft + 32}"/>`),
        `<rect class="b" x="${fr + 4}" y="${ft + 4}" width="30" height="28" rx="6"/>`,
      ].join('') },
      { id: 'filters', ex: [-20, 45], svg: [0, 1].map((i) => {
        const x0 = i ? W / 2 + 6 : 24, x1 = i ? W - 24 : W / 2 - 6;
        return face('w', [x0, 10, 14], [x1, 10, 14], [x1, 74, 14], [x0, 74, 14])
          + range(x0 + 12, x1 - 6, 14).map((x) => line('l', [x, 14, 14], [x, 70, 14])).join('')
          + range(22, 62, 12).map((y) => line('l', [x0 + 4, y, 14], [x1 - 4, y, 14])).join('');
      }).join('') },
      { id: 'cover', ex: [-110, 170], svg: [
        face('t', [0, 0, 0], [W, 0, 0], [W, 0, D], [0, 0, D]),
        ...range(16, D - 14, 12).map((z) => line('l', [16, 0, z], [W - 16, 0, z])),
        face('s', [W, 0, 0], [W, 0, D], [W, H, D], [W, H, 0]),
        `<rect class="w" width="${W}" height="${H}" rx="14"/>`,
        `<path class="l" d="M20,${H - 34}H${W - 20}"/>`,
        `<circle class="c" cx="${W - 44}" cy="30" r="5"/>`,
      ].join('') },
      { id: 'flap', ex: [-150, 230], svg: `<rect class="s" x="24" y="${H - 30}" width="${W - 48}" height="16" rx="8"/>` },
    ],
  };
}

export const units = { pac: pac(), clim: clim() };
export type UnitName = keyof typeof units;
