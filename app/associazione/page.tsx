import {
  ArrowRight,
  Clapperboard,
  HandHeart,
  Heart,
  ScrollText,
  Smartphone,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'L’Associazione',
  description:
    'L’Associazione Culturale Metropol: la storia del cinema di Villafranca di Verona, chi siamo, come associarsi e come diventare volontario.',
};

const SECTIONS = [
  {
    href: '/associazione/chi-siamo',
    label: 'Chi siamo',
    description: 'I volontari, i ruoli associativi e i contatti di chi fa vivere il Metropol.',
    icon: Users,
  },
  {
    href: '/associazione/storia',
    label: 'La storia',
    description: 'Dal glorioso cinema di via Pace del 1965 alla rinascita nella sala "Alida Ferrarini".',
    icon: Clapperboard,
  },
  {
    href: '/associazione/come-associarsi',
    label: 'Come associarsi',
    description: 'La tessera socio: l’iscrizione online, l’adesione in cassa e i vantaggi.',
    icon: Heart,
  },
  {
    href: '/associazione/diventa-volontario',
    label: 'Diventa volontario',
    description: 'Cassa, sala, cabina di proiezione: c’è spazio per tutte le disponibilità.',
    icon: HandHeart,
  },
  {
    href: '/associazione/statuto',
    label: 'Statuto e regolamento',
    description: 'I documenti che regolano la vita dell’associazione, in versione integrale.',
    icon: ScrollText,
  },
];

export default function AssociazionePage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <header className="mb-10">
        <p className="eyebrow">Chi tiene aperta la sala</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          L&apos;Associazione
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
          Il Cinema Metropol è gestito dall&apos;{SITE.association}, una realtà di volontariato che
          tiene viva la sala cinematografica di {SITE.city}: uno spazio di comunità dove il cinema
          si guarda insieme, sul grande schermo.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
          La stagione cinematografica va indicativamente da ottobre a maggio, con proiezioni nel
          fine settimana e la rassegna d&apos;autore del venerdì. In estate il cinema si sposta
          all&apos;aperto, con la rassegna di agosto al Castello di Villafranca. Durante
          l&apos;anno organizziamo anche corsi di cinema ed eventi speciali.
        </p>
      </header>

      {/* La domanda più frequente di chi arriva qui è «come faccio a
          diventare socio?»: la risposta sta in cima, prima dell'elenco delle
          sezioni, e non tre clic più in là. Il bottone porta fuori dal sito,
          sul modulo dell'area soci (lo stesso di «Come associarsi»): qui non
          c'è nessun database, e le iscrizioni vivono di là. Stessa scheda e
          non una nuova: a chi ha poca pratica una scheda che si apre da sola
          fa perdere la strada del ritorno. */}
      <section
        aria-labelledby="diventa-socio"
        className="mb-10 rounded-2xl border border-cinema-ticket-ink/50 bg-cinema-surface p-6 sm:p-7"
      >
        <h2 id="diventa-socio" className="flex items-center gap-2.5 text-2xl font-black text-cinema-text">
          <Heart className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
          Diventa socio
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
          Ci si iscrive online in pochi minuti: compili il modulo, paghi la quota con la carta
          oppure in cassa, e appena la domanda è approvata la tessera è nel tuo telefono. Con la
          tessera hai il biglietto ridotto su tutte le proiezioni.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={SITE.sociSignupUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-6 py-3 font-utility text-base font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            <Smartphone className="h-5 w-5" aria-hidden="true" /> Iscriviti online
          </a>
          <Link
            href="/associazione/come-associarsi"
            className="text-sm font-semibold text-cinema-ticket-ink underline underline-offset-2"
          >
            Prima vuoi sapere come funziona?
          </Link>
        </div>
      </section>

      <nav aria-label="Sezioni dell'associazione">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <li key={section.href} className="last:sm:col-span-2">
              <Link
                href={section.href}
                className="group flex h-full flex-col rounded-2xl border border-cinema-border bg-cinema-surface p-6 transition-colors hover:border-cinema-ticket-ink/60 hover:bg-cinema-surface-2"
              >
                <span className="flex items-center gap-2.5 font-bold tracking-tight text-cinema-text">
                  <section.icon className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
                  {section.label}
                  <ArrowRight
                    className="ml-auto h-4 w-4 text-cinema-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-cinema-ticket-ink"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-cinema-text-muted">
                  {section.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section id="dati" className="mt-12">
        <h2 className="text-2xl font-black text-cinema-text">
          Dati dell&apos;associazione
        </h2>
        <dl className="mt-3 space-y-1.5 text-sm leading-relaxed text-cinema-text-muted">
          <div>
            <dt className="inline font-medium text-cinema-text">Denominazione: </dt>
            <dd className="inline">{SITE.association}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-cinema-text">Sede legale: </dt>
            <dd className="inline">{SITE.legalAddress}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-cinema-text">Partita IVA: </dt>
            <dd className="inline">{SITE.vatNumber}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-cinema-text">PEC: </dt>
            <dd className="inline">
              <a href={`mailto:${SITE.pec}`} className="text-cinema-ticket-ink hover:underline">
                {SITE.pec}
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
