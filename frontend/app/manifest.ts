import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Voyages Algérie',
    short_name: 'Voyages DZ',
    description: 'Réservez vos voyages depuis l\'Algérie — Omra, packages, circuits, vols.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF7',
    theme_color: '#0F4C81',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
    categories: ['travel', 'lifestyle'],
    lang: 'fr',
    shortcuts: [
      {
        name: 'Offres',
        short_name: 'Offres',
        description: 'Voir toutes les offres',
        url: '/offres',
      },
      {
        name: 'Omra',
        short_name: 'Omra',
        description: 'Packages Omra 2026',
        url: '/omra',
      },
    ],
  };
}
