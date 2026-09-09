'use client';

import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { PageHeader } from '@/components/page-header';

/**
 * La rete di sicurezza **di pagina**: prende gli errori del contenuto e lascia
 * in piedi tutto il resto — testata, menu, piè di pagina, temi, preferenze di
 * lettura. Prima non c'era, e qualunque inciampo in una pagina finiva sulla
 * rete globale (`app/global-error.tsx`), che ridisegna il documento da zero:
 * il sito spariva per intero anche quando a rompersi era una sezione sola, e
 * chi arrivava lì non aveva nemmeno un menu da cui ripartire.
 *
 * Il `digest` è il codice che Next assegna all'errore lato server e che si
 * ritrova identico nei registri di Vercel: è l'unico ponte fra "ho visto una
 * pagina rotta" e "ecco cosa è successo". Mostrarlo costa una riga in grigio e
 * fa risparmiare un pomeriggio.
 */
export default function ErrorePagina({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Nei registri del browser per esteso: a schermo ci va solo il codice, ma a
  // chi apre la console serve lo stack.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container max-w-3xl py-16 sm:py-24">
      <PageHeader
        eyebrow="Errore"
        title="Qualcosa si è inceppato"
        lead={
          <p>
            Non siamo riusciti a caricare questa pagina. Riprova: quasi sempre basta. Se
            insiste, dal menu qui sopra si arriva lo stesso alla programmazione.
          </p>
        }
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-3 text-sm font-bold text-cinema-on-ticket transition-opacity hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Riprova
        </button>
        <Link
          href="/"
          className="border-b border-cinema-border-strong pb-0.5 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
        >
          Torna alla home
        </Link>
      </div>

      {error.digest && (
        <p className="mt-10 text-xs leading-relaxed text-cinema-text-subtle">
          Codice del guasto:{' '}
          <code className="font-mono text-cinema-text-muted">{error.digest}</code>
          <span className="block">
            Serve a noi per ritrovarlo nei registri: se ce lo riporti, sappiamo dove
            guardare.
          </span>
        </p>
      )}
    </main>
  );
}
