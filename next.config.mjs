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
  images: {
    // Per usare le locandine da TMDB (campo tmdbId) con next/image, se vorrai.
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
