import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ausome Parents',
    short_name: 'Ausome Parents',
    description: 'Ausome Parents',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0875E8',
    icons: [
      {
        src: '/favicon-new-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon-new-logo.png',
        sizes: '1254x1254',
        type: 'image/png',
      },
    ],
  };
}
