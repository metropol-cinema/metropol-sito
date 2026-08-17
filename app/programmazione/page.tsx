import type { Metadata } from 'next';

import { DaySchedule, groupByDay } from '@/components/day-schedule';
import { EmptyState, LoadError, PageHeader } from '@/components/page-header';
import { fetchProgrammazione, type PublicFilm } from '@/lib/programmazione-client';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Programmazione',
  description:
    'Tutti i film in programmazione al Cinema Metropol di Villafranca di Verona, giorno per giorno, con orari e prezzi.',
};

export default async function ProgrammazionePage() {
  let films: PublicFilm[] = [];
  let error: string | null = null;
  try {
    // Orizzonte ampio (come home e "Prossimamente"): mostra tutte le proiezioni
    // in calendario, anche a settimane di distanza. Durante la chiusura estiva
    // questo fa comparire la riapertura di settembre invece di una pagina vuota;
    // in stagione la lista resta corta perché Cinebot carica solo il breve termine.
    films = await fetchProgrammazione({ days: 180 });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  const days = groupByDay(films);

  return (
    <main className="container py-10 sm:py-12">
      <PageHeader
        eyebrow="Giorno per giorno"
        title="Programmazione"
        lead={<p>Tutte le proiezioni in calendario, con orari, sala e prezzi.</p>}
      />

      {error ? (
        <LoadError error={error} />
      ) : days.length === 0 ? (
        <EmptyState>
          Nessuna proiezione in calendario nei prossimi giorni. Il nuovo programma esce qui appena
          è pronto.
        </EmptyState>
      ) : (
        <div className="space-y-12">
          {days.map(({ dayKey, entries }) => (
            <DaySchedule key={dayKey} dayKey={dayKey} entries={entries} />
          ))}
        </div>
      )}
    </main>
  );
}
