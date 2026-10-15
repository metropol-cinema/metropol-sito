/**
 * Header di sicurezza applicati a ogni risposta del sito pubblico.
 *
 * Il sito è di sola lettura e non ha form né sessioni, ma i contenuti (titoli,
 * descrizioni, sale, listini) arrivano dal gestionale e a monte da Cinebot e
 * TMDB: dati di cui non siamo la fonte. La CSP è la rete di sicurezza dietro
 * l'escape del JSON-LD (lib/json-ld.ts).
 *
 * Niente `script-src`/`default-src`: l'App Router inietta script inline
 * (hydration + flight data) e servirebbero i nonce. Le direttive qui sotto non
 * hanno controindicazioni.
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
    ].join('; '),
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Solo in sviluppo: il bollino di Next sta in basso a sinistra, dove ora c'è
  // il bottone della barra di accessibilità, e se lo copre non lo si clicca.
  devIndicators: { position: 'top-right' },
  images: {
    // Per usare le locandine da TMDB (campo tmdbId) con next/image, se vorrai.
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
  async headers() {
    const intestazioni = [...securityHeaders];
    // L'anteprima (ogni branch che non è `main`) non va nei motori di ricerca:
    // sarebbe un doppione del sito vero. L'header vale anche per immagini e
    // file, dove il meta robots dell'HTML non arriva. Il robots.txt invece la
    // lascia visitare, apposta: un crawler che non entra non vede il noindex,
    // e le pagine già indicizzate dell'indirizzo Vercel non uscirebbero mai.
    if (process.env.VERCEL_ENV !== 'production') {
      intestazioni.push({ key: 'X-Robots-Tag', value: 'noindex, nofollow' });
    }
    return [{ source: '/:path*', headers: intestazioni }];
  },
  /**
   * Le pagine del vecchio sito Wix, come le conosce Google (sitemap di
   * www.cinemametropol.com, ottobre 2026). Dopo il passaggio di dominio i
   * vecchi link — nei risultati di ricerca, nelle newsletter già mandate, sui
   * volantini stampati — arrivano qui e devono trovare la pagina nuova, non un
   * 404. Permanenti: dicono a Google di trasferire la pagina, non di aspettare.
   * 301 e non il 308 che Next usa con `permanent: true`: lo strumento «Cambio
   * di indirizzo» di Search Console vuole proprio 301 (ottobre 2026). Per lo
   * stesso motivo sono 301 anche i rimandi dei domini (.com, www) su Vercel.
   * /prossimamente non c'è: ha lo stesso indirizzo di prima.
   */
  async redirects() {
    return [
      ['/chi-siamo', '/associazione/chi-siamo'],
      ['/come-associarsi', '/associazione/come-associarsi'],
      ['/diventa-volontario', '/associazione/diventa-volontario'],
      ['/statuto', '/associazione/statuto'],
      ['/storia-metropol', '/associazione/storia'],
      ['/corso-cinema', '/corsi'],
      // Una copia di pagina rimasta pubblicata su Wix: era un corso anche lei.
      ['/copia-di-corso-cinema-1', '/corsi'],
      ['/in-programmazione', '/programmazione'],
      ['/venerdi-del-metropol', '/venerdi'],
      ['/dove-siamo', '/info#dove-siamo'],
      ['/newsletter', '/#iscriviti-newsletter'],
    ].map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
};

export default nextConfig;
