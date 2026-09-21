// Faits vérifiés sur l'ancien site et dans la spécification. Tout ce qui est incertain est dans toConfirm.
export const site = {
  name: 'Dargent Thermique',
  legalName: 'Dargent Thermique SAS',
  url: 'https://dargent-thermique.fr',
  phone: '02 38 86 46 46',
  phoneHref: 'tel:+33238864646',
  email: 'contact@dargent-thermique.fr',
  street: '1 avenue André-Marie Ampère',
  postalCode: '45800',
  city: 'Saint-Jean-de-Braye',
  region: 'Loiret',
  geo: { lat: 47.9126, lng: 1.9737 }, // ZI avenue Ampère, à vérifier sur la fiche Google Business Profile
  siret: '323 765 404 00021',
  rcs: 'Orléans 323 765 404',
  tva: 'FR13 323 765 404',
  ape: '43.22B',
  founded: 1936,
  atAmpereSince: 1969,
  designOfficeSince: 1993,
  googleReviewUrl: 'https://g.page/r/CRqhi-YLHXN1EB0/review',
  qualifications: [
    { code: 'Qualibat 8321', label: 'Installations de pompes à chaleur aérothermiques' },
    { code: 'Qualibat 5423', label: 'Climatiseurs à détente directe, technicité supérieure' },
    { code: 'Qualibat 5312', label: 'Installations thermiques, technicité confirmée' },
    { code: 'Qualibat 5112', label: 'Plomberie et sanitaire, technicité confirmée' },
    { code: 'RGE / QUALIPAC', label: 'Reconnu Garant de l’Environnement' },
    { code: 'Professionnel du gaz', label: 'Installations gaz' },
    { code: 'Attestation fluides n° 111363-R1', label: 'Manipulation des fluides frigorigènes, Bureau Veritas' },
  ],
  reviews: [
    { name: 'Patrick Blain', text: 'Nous avons fait poser une climatisation Daikin, 2 groupes extérieurs et 6 unités intérieures. Étude et conseils parfaits, chantier livré à la date prévue, équipe efficace et propre.' },
    { name: 'Sylvain Aguenier', text: 'Délai respecté et technicien compétent pour l’installation de notre PAC air/air. Commercial à l’écoute, qui nous a accompagnés pour obtenir les aides financières.' },
    { name: 'Geoffrey Thomas', text: 'Venus réparer le thermostat de notre pompe à chaleur en panne, remis en route grâce à eux. Je recommande.' },
  ],
  hours: '[À CONFIRMER : horaires d’ouverture]',
};
export const showTodo = (import.meta.env.PUBLIC_SHOW_TODO ?? 'true') !== 'false';
export const ga4Id = import.meta.env.PUBLIC_GA4_ID ?? '';
