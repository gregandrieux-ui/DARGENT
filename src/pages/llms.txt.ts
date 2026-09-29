// llms.txt (llmstxt.org) : résumé du site pour les moteurs de réponse IA, généré depuis les mêmes pages que le sitemap.
import { getCollection } from 'astro:content';
import { site } from '../data/site';

const groups: [string, (id: string) => boolean][] = [
  ['Pompe à chaleur', (id) => id.startsWith('pompe-a-chaleur')],
  ['Climatisation', (id) => id.startsWith('climatisation')],
  ['Chauffage', (id) => id.startsWith('chauffage')],
  ['Entretien, dépannage et aides', (id) => /^(entretien-depannage|aides-|ventilation|professionnels|marques-)/.test(id)],
  ['Entreprise et zones', (id) => /^(entreprise|zones-intervention|recrutement)/.test(id)],
];

export async function GET() {
  const pages = (await getCollection('pages')).filter((p) => !p.data.draft && p.data.template !== 'legal');
  const line = (p: (typeof pages)[number]) => `- [${p.data.h1}](${site.url}/${p.id}/): ${p.data.description}`;
  const body = [
    `# ${site.name}`,
    '',
    `> Installateur chauffagiste à ${site.city} (${site.region}) depuis ${site.founded} : pompes à chaleur, climatisation, chauffage, entretien et dépannage dans l’agglomération orléanaise. Devis établi après visite technique, jamais au téléphone.`,
    '',
    `Téléphone : ${site.phone}. Adresse : ${site.street}, ${site.postalCode} ${site.city}. Qualifications : ${site.qualifications.map((q) => q.code).join(', ')}.`,
    ...groups.flatMap(([title, match]) => ['', `## ${title}`, '', ...pages.filter((p) => match(p.id)).map(line)]),
    '',
    '## Contact',
    '',
    `- [Demander un devis](${site.url}/devis/): formulaire court ; rappel pour organiser une visite technique, devis gratuit et sans engagement.`,
    `- [Contact](${site.url}/contact/): téléphone, adresse et plan d’accès.`,
  ].join('\n');
  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
