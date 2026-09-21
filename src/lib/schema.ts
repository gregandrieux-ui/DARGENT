// JSON-LD par type de page (colonne Schema.org du xlsx). Aucun avis agrégé, aucune note inventée.
import { site } from '../data/site';

const abs = (p: string) => new URL(p, site.url).href;

export const organization = () => ({
  '@type': ['Organization', 'HVACBusiness'],
  '@id': abs('/#organization'),
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: abs('/logo.png'),
  image: abs('/logo.png'),
  telephone: '+33238864646',
  email: site.email,
  foundingDate: String(site.founded),
  address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postalCode, addressLocality: site.city, addressRegion: 'Centre-Val de Loire', addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [{ '@type': 'City', name: 'Orléans' }, { '@type': 'City', name: 'Saint-Jean-de-Braye' }, { '@type': 'AdministrativeArea', name: 'Loiret' }],
  hasCredential: site.qualifications.map((q) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: q.code, description: q.label })),
  vatID: site.tva,
  taxID: site.siret,
});

export const website = () => ({ '@type': 'WebSite', '@id': abs('/#website'), url: site.url, name: site.name, inLanguage: 'fr-FR', publisher: { '@id': abs('/#organization') } });

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const service = (name: string, description: string, path: string, serviceType?: string) => ({
  '@type': 'Service',
  '@id': abs(path + '#service'),
  name, description, url: abs(path),
  serviceType: serviceType ?? name,
  provider: { '@id': abs('/#organization') },
  areaServed: { '@type': 'AdministrativeArea', name: 'Agglomération orléanaise, Loiret' },
});

export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
});

export const webPage = (type: string, name: string, description: string, path: string) => ({
  '@type': type, name, description, url: abs(path), inLanguage: 'fr-FR', isPartOf: { '@id': abs('/#website') }, about: { '@id': abs('/#organization') },
});

export const localBusiness = (name: string, path: string, area: string) => ({
  '@type': 'HVACBusiness', '@id': abs(path + '#local'), name, url: abs(path), parentOrganization: { '@id': abs('/#organization') },
  telephone: '+33238864646', address: organization().address, areaServed: { '@type': 'City', name: area },
});

export const howTo = (name: string, steps: string[]) => ({
  '@type': 'HowTo', name, step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s })),
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
