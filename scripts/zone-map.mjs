// Carte « Zone d'intervention » de la page Entreprise : fond OpenStreetMap figé en image (pas de tuiles chargées
// chez le visiteur, donc ni requête tierce ni consentement), nette jusqu'à 100 km d'Orléans puis fondue en transparence.
// Usage : node scripts/zone-map.mjs  →  public/images/zone-intervention-carte.webp
// Licence : © les contributeurs d'OpenStreetMap (ODbL), attribution affichée sous la carte.
import sharp from 'sharp';

const Z = 9;
const CENTER = { lat: 47.903, lng: 1.909 }; // Orléans
const HQ = { lat: 47.9126, lng: 1.9737 }; // siège, cf. src/data/site.ts
const R_SHARP = 100; // km : carte nette
const R_FADE = 125; // km : carte entièrement fondue
const OUT = 1100; // px de l'image finale (affichée ~550 px, densité 2x)

const world = 256 * 2 ** Z;
const px = ({ lat, lng }) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return [((lng + 180) / 360) * world, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * world];
};
const mpp = (156543.03392 * Math.cos((CENTER.lat * Math.PI) / 180)) / 2 ** Z; // mètres par pixel
const rFade = Math.ceil((R_FADE * 1000) / mpp);
const size = 2 * rFade + 10;
const [cx, cy] = px(CENTER);
const left = Math.round(cx - size / 2);
const top = Math.round(cy - size / 2);

const tiles = [];
for (let tx = Math.floor(left / 256); tx <= Math.floor((left + size) / 256); tx++)
  for (let ty = Math.floor(top / 256); ty <= Math.floor((top + size) / 256); ty++) {
    const res = await fetch(`https://tile.openstreetmap.org/${Z}/${tx}/${ty}.png`, { headers: { 'User-Agent': 'dargent-thermique.fr static map build (contact@dargent-thermique.fr)' } });
    if (!res.ok) throw new Error(`tuile ${tx}/${ty} : ${res.status}`);
    tiles.push({ input: Buffer.from(await res.arrayBuffer()), left: tx * 256 - left, top: ty * 256 - top });
  }

const c = size / 2;
const [hx, hy] = px(HQ).map((v, i) => v - (i ? top : left));
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs><radialGradient id="g" cx="${c}" cy="${c}" r="${rFade}" gradientUnits="userSpaceOnUse">
    <stop offset="${(R_SHARP / R_FADE).toFixed(3)}" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient></defs>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
</svg>`);
const marker = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" font-family="system-ui,-apple-system,Segoe UI,sans-serif">
  <circle cx="${hx}" cy="${hy}" r="7" fill="#005ca9" stroke="#fff" stroke-width="3"/>
  <text x="${hx + 12}" y="${hy + 30}" font-size="22" font-weight="700" fill="#0b2a4a" stroke="#fff" stroke-width="5" paint-order="stroke">Siège</text>
</svg>`);

const map = await sharp({ create: { width: size, height: size, channels: 4, background: '#f2efe9' } })
  .composite(tiles).png().toBuffer();
const faded = await sharp(map)
  .modulate({ saturation: 0.75 })
  .composite([{ input: marker }, { input: mask, blend: 'dest-in' }])
  .png().toBuffer(); // sharp redimensionne avant de composer : on compose d'abord, en pleine taille
await sharp(faded)
  .resize(OUT)
  .webp({ quality: 78, alphaQuality: 80 })
  .toFile('public/images/zone-intervention-carte.webp');
console.log(`ok : ${tiles.length} tuiles, ${size} px → ${OUT} px`);
