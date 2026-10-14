import type { MetadataRoute } from 'next';

import { IN_PRODUZIONE, URL_SITO } from '@/lib/ambiente';

/**
 * In produzione: tutto visitabile tranne le API, e la sitemap.
 *
 * In anteprima la si lascia visitare lo stesso, apposta. A tenerla fuori dai
 * risultati ci pensa il `noindex` (header in next.config.mjs e meta in
 * app/layout.tsx), e un crawler a cui il robots.txt chiude la porta non lo
 * legge mai: le pagine dell'indirizzo Vercel già indicizzate, che dopo il
 * passaggio di dominio diventa l'anteprima, non uscirebbero più dai risultati.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IN_PRODUZIONE) return { rules: { userAgent: '*', allow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${URL_SITO}/sitemap.xml`,
    host: URL_SITO,
  };
}
