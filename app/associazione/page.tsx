import {
  ArrowRight,
  Clapperboard,
  HandHeart,
  Heart,
  ScrollText,
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
    description: 'La tessera socio: l’adesione in cassa, il modulo da scaricare e i vantaggi.',
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
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          L&apos;Associazione
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Il Cinema Metropol è gestito dall&apos;{SITE.association}, una realtà di volontariato che
          tiene viva la sala cinematografica di {SITE.city}: uno spazio di comunità dove il cinema
          si guarda insieme, sul grande schermo.
        </p>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          La stagione cinematografica va indicativamente da ottobre a maggio, con proiezioni nel
          fine settimana e la rassegna d&apos;autore del venerdì. In estate il cinema si sposta
          all&apos;aperto, con la rassegna di agosto al Castello di Villafranca. Durante
          l&apos;anno organizziamo anche corsi di cinema ed eventi speciali.
        </p>
      </header>

      <nav aria-label="Sezioni dell'associazione">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <li key={section.href} className="last:sm:col-span-2">
              <Link
                href={section.href}
                className="group flex h-full flex-col rounded-xl border border-cinema-border bg-cinema-surface p-5 transition-colors hover:border-cinema-accent/60 hover:bg-cinema-surface-2"
              >
                <span className="flex items-center gap-2.5 font-bold tracking-tight text-cinema-text">
                  <section.icon className="h-5 w-5 text-cinema-accent" aria-hidden="true" />
                  {section.label}
                  <ArrowRight
                    className="ml-auto h-4 w-4 text-cinema-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-cinema-accent"
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
        <h2 className="text-xl font-bold tracking-tight text-cinema-text">
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
              <a href={`mailto:${SITE.pec}`} className="text-cinema-accent hover:underline">
                {SITE.pec}
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
