# dargent-thermique.fr

Site vitrine de Dargent Thermique (Saint-Jean-de-Braye), migration de `climatisation-chauffage-orleans.com`.
Produit d'après `specification-production-seo-dargent-thermique.xlsx` (15/09/2026), qui reste l'autorité éditoriale.

## Stack

Astro 7 statique, CSS natif (`src/styles/global.css`), une police variable (Archivo, auto-hébergée), icônes Tabler (`src/icons`), Netlify (Forms, `_redirects`). Aucun JavaScript sur les pages de contenu (menu mobile en `<details>`, filtres de galerie en CSS `:has()`).

## Commandes

```bash
npm install
npm run dev        # http://localhost:4322
npm run build      # dist/
npm run preview    # http://localhost:4321 sur dist/
npm test           # QA post-build : node scripts/check-site.mjs dist
npm run spec       # xlsx -> src/data/spec.json (openpyxl requis)
npm run assets     # re-télécharge photos, logos, PDF, vidéos de l'ancien site dans public/
```

## Où sont les choses

| Quoi | Où |
|---|---|
| Une page de contenu (une par URL du xlsx) | `src/content/pages/<chemin>.md` : frontmatter = ligne de la spec (title, description, h1, promise, CTA, liens, à confirmer, photos), corps = H2 de la spec |
| Schéma du frontmatter | `src/content.config.ts` |
| Rendu commun des pages de contenu | `src/pages/[...slug].astro` |
| Accueil, devis, contact, réalisations, hub zones, merci | `src/pages/*.astro` |
| Faits d'entreprise (NAP, qualifications, avis) | `src/data/site.ts` |
| Navigation et pied de page | `src/data/nav.ts` |
| Photos de réalisations et légendes | `src/data/realisations.ts` (fichiers dans `public/images/realisations/`, chemins conservés pour les redirections) |
| JSON-LD | `src/lib/schema.ts` |
| Redirections (301, 410, fichiers, ancien domaine) | `public/_redirects` |
| Contexte design (impeccable) | `PRODUCT.md`, `.impeccable/surfaces/src-pages-index-astro.md` (direction contract), `DESIGN.md` |

## Variables d'environnement (Netlify > Site configuration > Environment variables)

| Variable | Valeur | Effet |
|---|---|---|
| `PUBLIC_SHOW_TODO` | `true` (défaut) / `false` | Affiche ou masque les encarts jaunes « À confirmer » et les slots « Photo de chantier à collecter ». Passer à `false` seulement quand les données sont validées. |
| `PUBLIC_GA4_ID` | `G-XXXXXXXXXX` | Active Google Analytics 4 avec bandeau de consentement (Consent Mode v2, refus effectif). Sans valeur : aucun script, aucun cookie, aucun bandeau. |

## Déploiement Netlify

1. Nouveau site depuis ce dépôt, build `npm run build`, publish `dist` (déjà dans `netlify.toml`).
2. Domaine principal `dargent-thermique.fr` (sans www) ; ajouter `www.dargent-thermique.fr` en alias (Netlify redirige www vers apex).
3. **Ajouter `www.climatisation-chauffage-orleans.com` et `climatisation-chauffage-orleans.com` comme alias de domaine du même site** et pointer leur DNS vers Netlify : les règles de domaine de `public/_redirects` ne s'appliquent qu'à cette condition. Conserver l'ancien domaine actif au moins 12 mois.
4. Forms : après le premier déploiement, Netlify détecte les formulaires `devis`, `contact`, `candidature`. Configurer les notifications e-mail vers `contact@dargent-thermique.fr` (Forms > Form notifications). Activer le filtrage anti-spam Netlify.
5. Renseigner `PUBLIC_GA4_ID` quand l'accès à la propriété GA4 est récupéré (voir ci-dessous).
6. Déclarer `dargent-thermique.fr` dans Google Search Console (propriété Domaine, TXT DNS), soumettre `https://dargent-thermique.fr/sitemap-index.xml`, utiliser l'outil de changement d'adresse depuis l'ancienne propriété le jour de la bascule.

## Analytics

La propriété GA4 existante appartient à Dargent Thermique ; l'accès est à récupérer auprès de l'agence sortante (demander un rôle Administrateur sur le compte GA et sur la propriété Search Console). Une fois l'accès obtenu : ajouter un flux de données Web pour `dargent-thermique.fr`, copier son ID de mesure dans `PUBLIC_GA4_ID`, déclarer les conversions `form_devis`, `form_contact`, `form_candidature`, `click_tel`.

## Décisions à prendre avant la bascule

Voir la liste complète dans l'onglet « A confirmer » du xlsx. Sur le site, chaque donnée non vérifiée est visible dans un encart jaune « À confirmer » ou écrite `[À CONFIRMER : …]` dans le texte. Pour les retrouver :

```bash
grep -rn "À CONFIRMER" src/content src/pages src/data | wc -l
```

Photos à collecter (slots « Photo de chantier à collecter ») : PAC air/eau (pilier, air-eau, installation), PAC haute température, PAC hybride, climatisation gainable, chantiers à Orléans.

Pages créées mais non publiées : `zones-intervention/orleans/` (`draft: true`, noindex, hors sitemap) tant que 3 preuves orléanaises manquent. Pages « Reporter » du xlsx non créées : Olivet, Fleury-les-Aubrais, Saint-Jean-de-la-Ruelle, études de cas PAC et climatisation.

Pages `.php` de l'ancien site : 410 par défaut dans `public/_redirects`. À confirmer avec les données Search Console avant la bascule (passer en 301 vers `/pompe-a-chaleur/` si trafic ou liens externes significatifs).

## Checklist de bascule

Reprise de l'onglet « Checklist » du xlsx : `npm test` couvre H1 unique, Title et meta uniques et aux longueurs, liens internes, 3 liens entrants par page, profondeur 3, JSON-LD, absence de montants hors page aides, absence de liens agence, couverture des 26 anciennes URL par `_redirects`, pages brouillon hors sitemap, zéro tiret cadratin.
