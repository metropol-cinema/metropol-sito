import type { Metadata } from 'next';

import { DaySchedule, groupByDay } from '@/components/day-schedule';
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
    // Orizzonte di 14 giorni: la settimana corrente e un assaggio della prossima.
    films = await fetchProgrammazione({ days: 14 });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  const days = groupByDay(films);

  return (
    <main className="container py-10 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          Programmazione
        </h1>
        <p className="mt-1 text-sm text-cinema-text-subtle">
          Orari e prezzi delle proiezioni dei prossimi giorni.
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border border-cinema-danger/40 bg-cinema-danger/10 p-6 text-sm text-cinema-text-muted">
          Impossibile caricare la programmazione.{' '}
          <span className="text-cinema-text-subtle">({error})</span>
        </div>
      ) : days.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cinema-border bg-cinema-surface/50 p-10 text-center text-cinema-text-subtle">
          Nessuna proiezione in calendario nei prossimi giorni.
        </div>
      ) : (
        <div className="space-y-10">
          {days.map(({ dayKey, entries }) => (
            <DaySchedule key={dayKey} dayKey={dayKey} entries={entries} />
          ))}
        </div>
      )}
    </main>
  );
}
