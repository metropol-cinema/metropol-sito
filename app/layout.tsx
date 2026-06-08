import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cinema Metropol · Programmazione',
  description: 'I film in programmazione al Cinema Metropol di Villafranca di Verona.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
