import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Iscrizione registrata',
  // Una pagina di ritorno da un pagamento non ha niente da fare sui motori.
  robots: { index: false, follow: false },
};

/**
 * Ritorno da Stripe dopo il pagamento.
 *
 * Non interroga Stripe di proposito: l'iscrizione la registra il webhook, che è
 * l'unica fonte attendibile. Questa pagina dice solo che è andata, senza
 * promettere un esito che non ha verificato.
 */
export default function GraziePage() {
  return (
    <main className="container max-w-2xl py-16 sm:py-24">
      <CheckCircle2 className="h-12 w-12 text-cinema-ticket" aria-hidden="true" />
      <h1 className="mt-6 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
        Grazie, ci sei
      </h1>
      <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
        Il pagamento è stato inviato e la ricevuta arriva per email da Stripe. Ti aspettiamo in{' '}
        {SITE.venueName}: se qualcosa non torna, scrivici e sistemiamo.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/corsi"
          className="rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-bg transition-colors hover:bg-cinema-ticket-hover"
        >
          Torna al corso
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-cinema-border-strong px-5 py-2.5 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
        >
          Vai alla home
        </Link>
      </div>
    </main>
  );
}
