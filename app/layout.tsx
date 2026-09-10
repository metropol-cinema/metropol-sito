import type { Metadata } from 'next';
import { Archivo, Atkinson_Hyperlegible, Fraunces, Inter } from 'next/font/google';

import { AccessibilityBar } from '@/components/accessibility-bar';
import { Analytics } from '@/components/analytics';
import { CookieBanner } from '@/components/cookie-banner';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SCRIPT_INIZIALE } from '@/lib/a11y';
import { jsonLdScript } from '@/lib/json-ld';
import { SALA } from '@/lib/sala';
import { SITE } from '@/lib/site';
import './globals.css';

// Display: Fraunces con gli assi variabili esposti — WONK e opsz alto danno
// l'alto contrasto da locandina (impostati in globals.css sui titoli).
const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
});
// Corpo e UI.
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
// Utility: occhielli, giorni della settimana, etichette dei biglietti.
const utility = Archivo({
  subsets: ['latin'],
  display: 'swap',
  axes: ['wdth'],
  variable: '--font-utility',
});
// Alta leggibilità: Atkinson Hyperlegible, disegnato dal Braille Institute per
// chi ha poca vista — le lettere che di solito si scambiano (I l 1, O 0, b d)
// hanno forme volutamente diverse. Lo attiva la barra di accessibilità e
// sostituisce tutti e tre i ruoli qui sopra. Licenza libera (OFL) e servito da
// noi come gli altri: nessuna richiesta a Google dal browser del visitatore.
const readable = Atkinson_Hyperlegible({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-readable',
});

// Dati strutturati del cinema, per assistenti vocali e motori di ricerca.
const theaterJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MovieTheater',
  name: SITE.name,
  alternateName: SITE.venueName,
  address: SITE.venueAddress,
  url: 'https://www.cinemametropol.com',
  sameAs: [SITE.social.facebook, SITE.social.instagram],
  // Accessibilità della sala, per assistenti vocali e mappe: le stesse cose
  // che stanno in /accessibilita, in una forma che le macchine sanno leggere.
  // Cambiano lì? Cambiale anche qui (lib/accessibilita.ts).
  isAccessibleForFree: false,
  // Capienza della sala: 450 posti più quattro per le carrozzine (lib/sala.ts).
  maximumAttendeeCapacity: SALA.posti + SALA.postiCarrozzina,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Accesso in carrozzina', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Posti attrezzati per carrozzine', value: 4 },
    { '@type': 'LocationFeatureSpecification', name: 'Servizi igienici accessibili', value: true },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Sottotitoli e audiodescrizione (MovieReading, sala CinemAmico)',
      value: true,
    },
    { '@type': 'LocationFeatureSpecification', name: 'Anello magnetico per apparecchi acustici', value: false },
  ],
};

const DESCRIPTION =
  'Il cinema della comunità di Villafranca di Verona: film in programmazione, rassegne, corsi ed eventi della Sala "Alida Ferrarini".';

/**
 * Base per gli URL assoluti delle anteprime di condivisione. Su Vercel arriva
 * dal progetto, quindi il giorno dello switch a www.cinemametropol.com si
 * aggiorna da sé senza toccare il codice.
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cinema Metropol · Villafranca di Verona',
    template: '%s · Cinema Metropol',
  },
  description: DESCRIPTION,
  /* La bobina della scheda del browser. È lo STESSO set della dashboard e
     degli altri strumenti (public/favicon_io/): il marchio è uno solo, e chi
     tiene aperti sito e gestionale deve vedere la stessa icona. Il `.ico`
     va per primo perché è quello che i browser da scrivania preferiscono. */
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico', sizes: 'any' },
      { url: '/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon_io/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
  manifest: '/favicon_io/site.webmanifest',
  // L'immagine di anteprima è app/opengraph-image.png (il marchio a colori):
  // Next la aggancia da sola, qui restano solo i testi che l'accompagnano.
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: SITE.association,
    title: 'Cinema Metropol · Villafranca di Verona',
    description: DESCRIPTION,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      // Lo script inline scrive `data-tema` & co. su <html> prima che React
      // parta: per React è una differenza fra server e client, e va detto che
      // è voluta. Vale solo per gli attributi di questo elemento.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${utility.variable} ${readable.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        {/* Le preferenze di lettura salvate vanno applicate PRIMA del primo
            disegno: altrimenti chi ha scelto il tema chiaro si becca un lampo
            di nero a ogni pagina. Da qui il piccolo script inline. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_INIZIALE }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(theaterJsonLd) }}
        />
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        {/* Subito dopo il salto al contenuto: chi naviga da tastiera trova gli
            strumenti di lettura al secondo Tab, non in fondo alla pagina. */}
        <AccessibilityBar />
        {/* Sta qui, e non in fondo al body, per l'ordine di tabulazione: chi
            naviga da tastiera trova la domanda sui cookie subito, non dopo
            tutta la pagina. Dove si vede lo decide il CSS, non questa riga. */}
        <CookieBanner />
        <SiteHeader />
        <div id="contenuto" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </div>
        <SiteFooter />
        {/* Non carica niente finché il consenso non c'è: vedi lib/consenso.ts. */}
        <Analytics />
      </body>
    </html>
  );
}
