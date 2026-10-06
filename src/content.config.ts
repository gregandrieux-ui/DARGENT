import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.object({ href: z.string(), label: z.string() });

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    id: z.string(),                       // ID xlsx (PAC-01…)
    priority: z.enum(['P1', 'P2', 'P3']),
    title: z.string().max(60),            // Title SEO (xlsx)
    description: z.string().max(160),     // Meta description (xlsx)
    h1: z.string(),
    promise: z.string(),                  // Promesse principale, sous le H1
    template: z.enum(['pilier', 'service', 'local', 'hub', 'legal', 'about', 'reassurance']),
    schema: z.enum(['Service', 'CollectionPage', 'AboutPage', 'WebPage', 'LocalBusiness', 'ImageGallery', 'ContactPage']).default('WebPage'),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    howto: z.array(z.string()).default([]),   // étapes affichées telles quelles → HowTo
    cta: link,                             // CTA principal (xlsx), un seul libellé par page
    cta2: link.optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),   // table à filets du hero
    stats: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]), // chiffres-clés du hero (remplacent promise + checks)
    checks: z.array(z.object({ label: z.string(), detail: z.string().optional() })).default([]), // preuves cochées
    photos: z.array(z.object({ src: z.string().optional(), alt: z.string().default(''), caption: z.string().optional(), missing: z.string().optional() })).default([]),
    links: z.array(link).default([]),      // Liens sortants (xlsx) → sorties numérotées
    toConfirm: z.array(z.string()).default([]),
    aides: z.boolean().default(false),     // bloc réassurance : lien vers la page aides si pertinent
    alert: z.boolean().default(false),     // hero dépannage : téléphone en rouge
    unit: z.enum(['pac']).optional(),      // hero : vue éclatée animée (Exploded.astro) ; photos[0] passe en galerie
    draft: z.boolean().default(false),     // noindex + hors sitemap + non listé
    crumbs: z.array(link).default([]),
    needs: z.array(z.object({ q: z.string(), title: z.string(), text: z.string(), href: z.string() })).default([]), // tuiles « Votre besoin, notre réponse » (piliers)     // fil d'Ariane intermédiaire (sans Accueil ni page courante)
  }),
});

export const collections = { pages };
