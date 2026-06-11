import type { Metadata } from 'next';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

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
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
