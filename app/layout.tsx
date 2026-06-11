import type { Metadata } from 'next';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SITE } from '@/lib/site';
import './globals.css';

// Dati strutturati del cinema, per assistenti vocali e motori di ricerca.
const theaterJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MovieTheater',
  name: SITE.name,
  alternateName: SITE.venueName,
  address: SITE.venueAddress,
  url: 'https://www.cinemametropol.com',
  sameAs: [SITE.social.facebook, SITE.social.instagram],
};

export const metadata: Metadata = {
  title: {
    default: 'Cinema Metropol · Villafranca di Verona',
    template: '%s · Cinema Metropol',
  },
  description:
    'Il cinema della comunità di Villafranca di Verona: film in programmazione, rassegne, corsi ed eventi della Sala "Alida Ferrarini".',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(theaterJsonLd) }}
        />
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <SiteHeader />
        <div id="contenuto" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
