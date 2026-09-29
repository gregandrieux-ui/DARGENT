// Carte OG composée au build avec sharp (déjà fourni par Astro) : visuel + cartouche logo, sans texte (aucune police requise).
import { readFile } from 'node:fs/promises';
import sharp, { type OverlayOptions, type Sharp } from 'sharp';
import { getCollection } from 'astro:content';
import { ogPath } from '../../lib/og';
import { photos } from '../../data/realisations';

const W = 1200, H = 630;
const pub = (p: string) => readFile(`${process.cwd()}/public${p}`);

export async function getStaticPaths() {
  const pages = await getCollection('pages');
  const srcs = new Set<string | undefined>([undefined, photos[0].src, photos.find((x) => x.n === '033')?.src]);
  for (const p of pages) srcs.add(p.data.photos[0]?.src);
  return [...srcs].map((src) => ({ params: { key: ogPath(src).slice(4, -4) }, props: { src } }));
}

export async function GET({ props }: { props: { src?: string } }) {
  const { src } = props;
  const logo = await sharp(await pub('/logo.png')).resize({ width: 337 }).toBuffer();
  const plate = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="397" height="134"><rect width="397" height="134" rx="24" fill="#fff"/></svg>');
  let base: Sharp;
  let layers: OverlayOptions[];
  if (!src) {
    base = sharp({ create: { width: W, height: H, channels: 4, background: '#ffffff' } });
    layers = [{ input: await pub('/logo.png'), gravity: 'center' }];
  } else if (src.endsWith('.svg')) {
    base = sharp({ create: { width: W, height: H, channels: 4, background: '#eaf3fa' } });
    const art = await sharp(await pub(src), { density: 144 }).resize({ width: 760, height: H - 60, fit: 'contain', background: '#eaf3fa' }).png().toBuffer();
    layers = [{ input: art, top: 30, left: W - 760 - 30 }, { input: plate, top: (H - 134) / 2, left: 30 }, { input: logo, top: (H - 94) / 2, left: 60 }];
  } else {
    base = sharp(await pub(src)).resize(W, H, { fit: 'cover' });
    layers = [{ input: plate, top: H - 134 - 40, left: 40 }, { input: logo, top: H - 94 - 60, left: 70 }];
  }
  const jpg = await base.composite(layers).flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
}
