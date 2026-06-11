import { Clock, MapPin, Ticket } from 'lucide-react';
import type { Metadata } from 'next';

import { SITE } from '@/lib/site';
import { formatEuro } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Info e prezzi',
  description:
    'Prezzi dei biglietti, orari della biglietteria e come raggiungere il Cinema Metropol di Villafranca di Verona.',
};

const PRICES = [
  { label: 'Intero (sabato, domenica e festivi)', amount: 7.5 },
  { label: 'Intero (venerdì e rassegne)', amount: 6 },
  { label: 'Ridotto Under 18', amount: 6 },
  { label: 'Ridotto soci tesserati', amount: 6 },
];

export default function InfoPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          Info e prezzi
        </h1>
      </header>

      <div className="space-y-10">
        <section id="prezzi">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Ticket className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Biglietti
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-cinema-border">
            <table className="w-full text-sm">
              <caption className="sr-only">Prezzi dei biglietti per tipologia</caption>
              <tbody>
                {PRICES.map((p, i) => (
                  <tr
                    key={p.label}
                    className={i % 2 === 0 ? 'bg-cinema-surface' : 'bg-cinema-surface/40'}
                  >
                    <th scope="row" className="px-4 py-3 text-left font-normal text-cinema-text-muted">
                      {p.label}
                    </th>
                    <td className="px-4 py-3 text-right font-semibold text-cinema-text">
                      {formatEuro(p.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cinema-text-subtle">
            I prezzi possono variare per eventi e proiezioni speciali: fai sempre riferimento a
            quelli indicati accanto a ogni orario nella programmazione.
          </p>
        </section>

        <section id="biglietteria">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Clock className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Biglietteria
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            La biglietteria apre circa 30 minuti prima dell&apos;inizio di ogni proiezione. La
            tessera socio si può richiedere direttamente in cassa.
          </p>
        </section>

        <section id="dove-siamo">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <MapPin className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Dove siamo
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            {SITE.venueName}
            <br />
            {SITE.venueAddress}
          </p>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-cinema-accent-strong px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cinema-accent-strong-hover"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" /> Apri in Google Maps<span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-cinema-text-subtle">
            La rassegna estiva di agosto si svolge invece al Castello di Villafranca: il luogo è
            sempre indicato accanto all&apos;orario nella scheda del film.
          </p>
        </section>
      </div>
    </main>
  );
}
