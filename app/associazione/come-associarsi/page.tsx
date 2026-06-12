import { ArrowLeft, CalendarCheck, Download, Heart, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Come associarsi',
  description:
    'Come diventare soci dell’Associazione Culturale Metropol: l’adesione in cassa, il modulo da scaricare e i vantaggi della tessera.',
};

export default function ComeAssociarsiPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <nav aria-label="Torna alla pagina dell'associazione" className="mb-6">
        <Link
          href="/associazione"
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> L&apos;Associazione
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          Come associarsi
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Associarsi significa sostenere concretamente la vita del cinema e partecipare alle
          attività culturali dell&apos;associazione.
        </p>
      </header>

      <div className="space-y-10">
        <section id="adesione">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Heart className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> L&apos;adesione
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            È possibile effettuare la propria adesione all&apos;Associazione Culturale Metropol
            direttamente in cassa, durante i weekend di spettacolo. Per velocizzare le operazioni
            puoi scaricare il modulo qui sotto e portarlo già compilato in tutti i suoi campi.
          </p>
          <a
            href="/docs/modulo-adesione-socio.pdf"
            download
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cinema-accent-strong px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cinema-accent-strong-hover"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Scarica il modulo di adesione (PDF)
          </a>
        </section>

        <section id="vantaggi">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Ticket className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> I vantaggi della
            tessera
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            I soci hanno diritto al biglietto ridotto su tutte le proiezioni e partecipano alla
            vita dell&apos;associazione: l&apos;Assemblea annuale, l&apos;elezione del Consiglio
            Direttivo e le iniziative riservate, come corsi ed eventi speciali.
          </p>
        </section>

        <section id="rinnovo">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <CalendarCheck className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Quota e
            rinnovo
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            La quota associativa è annuale e il suo importo è stabilito dal Consiglio Direttivo; la
            scadenza per il rinnovo è il 30 novembre di ogni anno. I requisiti per
            l&apos;ammissione sono indicati nello{' '}
            <Link href="/associazione/statuto" className="text-cinema-accent hover:underline">
              statuto e nel regolamento interno
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
