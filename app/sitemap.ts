import type { MetadataRoute } from 'next';
import { SITE_URL } from './metadata';

// Requis par output: 'export' : la route est generee au build, pas a la demande.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
