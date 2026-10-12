// 30 photos de chantiers de l'ancien site, légendes = attributs alt d'origine (à enrichir : commune, année, accord client).
export const categories = [
  { id: 'climatisations-reversibles', label: 'Climatisation', page: '/climatisation/' },
  { id: 'chaudieres-condensation-basses-temperatures', label: 'Chaudières à condensation', page: '/chauffage/chaudiere-condensation/' },
  { id: 'planchers-chauffants', label: 'Planchers chauffants', page: '/chauffage/plancher-chauffant/' },
  { id: 'ballons-thermodynamiques', label: 'Ballons thermodynamiques', page: '/chauffage/ballon-thermodynamique/' },
  { id: 'ventilations', label: 'Ventilation', page: '/ventilation/' },
  { id: 'maintenance', label: 'Entretien et maintenance', page: '/entretien/' },
] as const;

type Cat = (typeof categories)[number]['id'];
const p = (cat: Cat, n: string, caption: string) => ({ cat, n, caption, src: `/images/realisations/${cat}/dargent-thermique-${n}.jpg`, thumb: `/images/realisations/${cat}/v/dargent-thermique-${n}.jpg` });

export const photos = [
  p('climatisations-reversibles', '031', 'Unité extérieure VRV de climatisation avec traitement acoustique'),
  p('climatisations-reversibles', '027', 'Groupe extérieur de climatisation avec traitement acoustique'),
  p('climatisations-reversibles', '030', 'Unité extérieure avec traitement acoustique'),
  p('climatisations-reversibles', '026', 'Gestion centralisée d’une climatisation tertiaire'),
  p('climatisations-reversibles', '032', 'Unité intérieure de climatisation tertiaire'),
  p('climatisations-reversibles', '006', 'Climatisation du magasin Gémo à Gien'),
  p('climatisations-reversibles', '007', 'Climatisation du magasin Gémo à Gien, unités extérieures'),
  p('climatisations-reversibles', '014', 'Console murale de climatisation réversible'),
  p('chaudieres-condensation-basses-temperatures', '022', 'Chaudières à condensation en cascade'),
  p('chaudieres-condensation-basses-temperatures', '023', 'Chaudières à condensation en cascade, vue d’ensemble'),
  p('chaudieres-condensation-basses-temperatures', '012', 'Chaudière au sol'),
  p('chaudieres-condensation-basses-temperatures', '013', 'Chaudière au sol, raccordements'),
  p('chaudieres-condensation-basses-temperatures', '025', 'Chaudière murale à condensation avec plancher chauffant'),
  p('chaudieres-condensation-basses-temperatures', '024', 'Chaudière au sol à condensation'),
  p('chaudieres-condensation-basses-temperatures', '035', 'Chaudière au sol à condensation, chaufferie'),
  p('chaudieres-condensation-basses-temperatures', '036', 'Chaudière au sol à condensation, départ des circuits'),
  p('planchers-chauffants', '010', 'Plancher chauffant sous mousse projetée'),
  p('planchers-chauffants', '011', 'Plancher chauffant sous mousse projetée, pose des tubes'),
  p('planchers-chauffants', '015', 'Plancher chauffant sous mousse projetée, collecteur'),
  p('ballons-thermodynamiques', '019', 'Ballon thermodynamique'),
  p('ventilations', '021', 'Centrale de traitement d’air'),
  p('ventilations', '040', 'Réseau de ventilation'),
  p('ventilations', '001', 'Ventilation double flux, école et groupe scolaire'),
  p('ventilations', '002', 'Ventilation double flux, école et groupe scolaire, gaines'),
  p('ventilations', '009', 'Ventilation double flux, école et groupe scolaire, centrale'),
  p('maintenance', '008', 'Maintenance d’une installation de chauffage'),
  p('maintenance', '033', 'Maintenance d’une unité extérieure de climatisation par un technicien Dargent Thermique'),
  p('maintenance', '034', 'Maintenance de climatisation, contrôle de l’unité extérieure'),
  p('maintenance', '037', 'Intervention de maintenance'),
  p('maintenance', '038', 'Intervention de maintenance, chaufferie'),
];
export const byCat = (cat: Cat) => photos.filter((x) => x.cat === cat);
