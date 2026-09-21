# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 (statique), CSS natif sans framework, déploiement Netlify (Netlify Forms, `_redirects`). Décidé par l'utilisateur le 20/09/2026.

## Users

Propriétaires occupants de maisons et d'appartements de l'agglomération orléanaise (Loiret), en général de 40 à 75 ans, qui remplacent une chaudière, posent une climatisation ou une pompe à chaleur, ou cherchent un dépanneur pour un équipement en panne. Ils arrivent par une recherche locale (« pompe à chaleur Orléans », « dépannage climatisation Orléans »), souvent après un premier devis ailleurs, et veulent savoir à qui ils confient leur maison avant d'appeler.

Audience secondaire confirmée par la spec : professionnels et collectivités (climatisation tertiaire, VRV, gestion centralisée), à condition que la direction confirme le maintien de l'offre (voir « À confirmer »).

## Product Purpose

Site vitrine de migration : `climatisation-chauffage-orleans.com` devient `dargent-thermique.fr`. Il présente l'entreprise, oriente vers trois univers (pompe à chaleur en priorité commerciale, climatisation, chauffage) et un hub entretien-dépannage, prouve la légitimité (qualifications, ancienneté, photos de chantiers, avis) et convertit en demande de devis ou en appel. Succès : demandes de devis et appels qualifiés, migration SEO sans perte (redirections, titres, maillage), aucune promesse invérifiable publiée.

Périmètre et contenu sont fixés par `specification-production-seo-dargent-thermique.xlsx` (15/09/2026) : 47 URL cibles dont 42 publiables, 26 anciennes URL à rediriger, règles de maillage, checklist de bascule. Ce classeur est l'autorité éditoriale.

## Positioning

Un installateur qui étudie le projet avant de le chiffrer : visite technique, dimensionnement par le bureau d'études interne (créé en 1993), devis établi après visite et jamais au téléphone. Porté par trois générations de chauffagistes depuis 1936, qualifié RGE Qualibat, habilité fluides frigorigènes. Confirmé par l'utilisateur le 20/09/2026.

## Operating Context

- Siège et salle d'exposition : 1 avenue André-Marie Ampère, ZI de Saint-Jean-de-Braye (45800), depuis 1969 ; proximité tangentielle, A10, A71.
- Parcours type : recherche locale → page service ou pilier → preuves (photos, qualifications, avis) → devis (formulaire court) ou appel au 02 38 86 46 46. Dépannage : appel direct, devis avant réparation.
- Équipe maintenance dédiée (composition à confirmer), véhicules équipés, magasin de pièces, registre des fluides.
- Documents réglementaires réels : attestation de capacité fluides n° 111363-R1 (Bureau Veritas), certificats Qualibat 5112, 5312, 5423, 8321 (validité annuelle), QUALIPAC/RGE, Professionnel du gaz, adhésion Ecologic.
- Production en 4 lots (spec) : fondations et P1, prestations P2, preuves et pages locales, institutionnel et légal. Pages locales publiées seulement avec 3 preuves propres à la commune.

## Capabilities and Constraints

- Pages : accueil, 2 piliers (PAC, climatisation) et leurs pages filles, pilier chauffage, ventilation, hub entretien-dépannage, aides financières, réalisations, zones d'intervention (hub + Saint-Jean-de-Braye ; Orléans en brouillon noindex tant que les preuves manquent), entreprise (4 pages), marques partenaires, professionnels, recrutement, devis, contact, 5 pages légales.
- Formulaires : devis (court), contact, candidature ; Netlify Forms ; mention RGPD ; aucun pavé anti-spam menaçant.
- Interdits éditoriaux (spec) : aucun montant d'aide, tarif, délai, COP ou pourcentage d'économie hors page aides ; sur la page aides, chaque montant sourcé et daté ; aucune promesse de délai ou de garantie sans engagement écrit ; aucune photo ou avis sans accord client ; aucun logo sans autorisation.
- Données non vérifiées rendues visibles par un marqueur « À confirmer » (masquable par variable d'environnement) : effectif, horaires, groupe propriétaire (2018), validité des certificats, marques distribuées, délais, forfaits d'entretien, seuil de devis 150 € TTC, salle d'exposition ouverte au public, forme juridique et capital, hébergeur, directeur de publication, offre pro maintenue, fioul/biofioul, page connectivité.
- Analytics : propriété GA4 appartenant à l'entreprise, accès à récupérer ; le site lit `PUBLIC_GA4_ID`, sans ID aucun traceur ni bandeau.
- Canonique : `https://dargent-thermique.fr/`, sans www, slash final.

## Brand Commitments

- Nom : Dargent Thermique. Logo existant conservé tel quel (cercle bleu à trois vagues blanche, rouge, cyan ; « DARGENT » en bleu, « THERMIQUE » en cyan) : `public/logo.png` (337×94, seule version disponible ; vectoriel à demander au client). Décision utilisateur du 20/09/2026.
- Couleurs héritées du logo et du site actuel : bleu `#005ca9`, cyan `#2db8c5`, cyan clair `#96dce2`, encre `#21313e`, rouge `#ea444e`.
- Voix : celle de la spec, française, factuelle, sans superlatif ni promesse chiffrée ; « Dargent Thermique » ou « nous », jamais « Climatisation & Chauffage Orléans ».
- Ponctuation française (espaces insécables, guillemets « »), aucun tiret cadratin.

## Evidence on Hand

- 30 photos de réalisations légendées, 6 catégories (climatisations réversibles dont VRV avec traitement acoustique, chaudières à condensation, ventilations, ballons thermodynamiques, planchers chauffants, maintenance) : ancien site `/assets/img/realisations/`, à re-héberger sous `public/images/realisations/` en conservant les noms.
- 3 avis Google nommés (Patrick Blain, climatisation Daikin 2 groupes/6 unités ; Sylvain Aguenier, PAC air/air, accompagnement aides ; Geoffrey Thomas, dépannage thermostat PAC).
- Frise historique 1936, 1947, 1960, 1969, 1982, 1993, 2007, 2018, 2023.
- 7 logos partenaires (Daikin, Atlantic Fujitsu, Mitsubishi Electric, Vaillant, Frisquet, Chappée, GRDF), ~55 logos clients en 9 catégories : autorisations d'usage à confirmer.
- Photos du site : fourgon, ruches (4), engagements ; 3 vidéos des ruches ; attestation de capacité PDF ; 5 brochures fabricants (droits à confirmer).
- Absences à ne pas fabriquer : aucune photo de PAC air/eau posée, aucune photo de gainable, aucun chantier localisé à Orléans, Olivet, Fleury-les-Aubrais ou Saint-Jean-de-la-Ruelle, aucun chiffre de volume de recherche, aucun montant d'aide vérifié, aucune photo d'équipe.

## Product Principles

1. La preuve avant la promesse : chaque affirmation est adossée à une qualification, une photo réelle, un avis ou un document ; sinon elle est marquée à confirmer ou retirée.
2. La pompe à chaleur d'abord : priorité commerciale n° 1, toujours en tête de navigation et du premier bloc de contenu.
3. Une page, une intention : aucun contenu dupliqué entre pages sœurs ; le pilier oriente, la page fille développe.
4. Convertir sans disperser : un devis établi après visite, un appel direct pour la panne, un seul libellé par intention sur une page.
5. Ne rien publier qui engage l'entreprise sans validation écrite (délais, garanties, montants, logos, avis).

## Accessibility & Inclusion

Public majoritairement de plus de 50 ans, consultation mobile fréquente en situation de panne : texte de corps 17-18 px, contraste AA minimum, téléphone cliquable et visible sans défilement, formulaires courts à labels visibles, navigation clavier complète, `prefers-reduced-motion` respecté.
