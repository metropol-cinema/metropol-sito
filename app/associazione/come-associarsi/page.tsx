import { ArrowLeft, CalendarCheck, Download, Heart, Smartphone, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Come associarsi',
  description:
    'Come diventare soci dell’Associazione Culturale Metropol: l’iscrizione online, l’adesione in cassa e i vantaggi della tessera.',
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
        <p className="eyebrow">L&apos;associazione</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Come associarsi
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
          Associarsi significa sostenere concretamente la vita del cinema e partecipare alle
          attività culturali dell&apos;associazione.
        </p>
      </header>

      <div className="space-y-12">
        <section id="adesione">
          <h2 className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Heart className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" /> L&apos;adesione
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Ci si associa <strong>online</strong>, compilando il modulo e pagando la quota con
            carta: la domanda arriva in segreteria e, appena approvata, la tessera è pronta —
            digitale, da tenere nel telefono.
          </p>
          {/* Il pulsante porta fuori dal sito, sul portale soci del gestionale:
              qui non c'e' nessun database, e le iscrizioni vivono di la'. */}
          <a
            href={SITE.sociSignupUrl}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" /> Iscriviti online
          </a>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Preferisci di persona? L&apos;adesione si fa anche <strong>in cassa</strong>, durante i
            weekend di spettacolo: nel modulo online puoi scegliere di pagare lì, oppure scaricare
            il modulo cartaceo e portarlo già compilato.
          </p>
          <a
            href="/docs/modulo-adesione-socio.pdf"
            download
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cinema-border-strong px-5 py-2.5 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Scarica il modulo (PDF)
          </a>
        </section>

        <section id="vantaggi">
          <h2 className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Ticket className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" /> I vantaggi della
            tessera
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            I soci hanno diritto al biglietto ridotto su tutte le proiezioni e partecipano alla
            vita dell&apos;associazione: l&apos;Assemblea annuale, l&apos;elezione del Consiglio
            Direttivo e le iniziative riservate, come corsi ed eventi speciali.
          </p>
        </section>

        <section id="rinnovo">
          <h2 className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <CalendarCheck className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" /> Quota e
            rinnovo
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            La quota associativa è annuale e il suo importo è stabilito dal Consiglio Direttivo; la
            scadenza per il rinnovo è il 30 novembre di ogni anno. Il rinnovo si fa dalla{' '}
            <a href={SITE.sociAreaUrl} className="text-cinema-ticket-ink hover:underline">
              propria area soci
            </a>{' '}
            — dove si trova anche la tessera da aggiungere al telefono — oppure in cassa. I requisiti per
            l&apos;ammissione sono indicati nello{' '}
            <Link href="/associazione/statuto" className="text-cinema-ticket-ink hover:underline">
              statuto e nel regolamento interno
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
