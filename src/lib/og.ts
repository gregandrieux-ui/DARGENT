// Cartes Open Graph 1200×630 : une par visuel source (photo ou illustration), plus une carte par défaut.
export const ogPath = (src?: string) => `/og/${src ? src.replace(/^\/images\//, '').replace(/\.\w+$/, '').replaceAll('/', '--') : 'default'}.jpg`;
