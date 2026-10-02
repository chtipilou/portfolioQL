import type { MetadataRoute } from 'next';
import { SITE_URL } from './metadata';

// Requis par output: 'export' : la route est generee au build, pas a la demande.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Console de consultation des logs : sans interet pour l'indexation.
      disallow: '/who/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
