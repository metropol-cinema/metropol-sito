import type { Metadata } from 'next';

import { DaySchedule, groupByDay } from '@/components/day-schedule';
import { fetchProgrammazione, isFridayRome, type PublicFilm } from '@/lib/programmazione-client';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'I Venerdì del Metropol',
  description:
    'La rassegna del venerdì sera del Cinema Metropol: cinema d’autore, film di qualità e biglietto ridotto.',
};

export default async function VenerdiPage() {
  let films: PublicFilm[] = [];
  let error: string | null = null;
  try {
    films = await fetchProgrammazione({ days: 120 });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  // Solo le proiezioni del venerdì (in ora italiana).
  const fridayFilms = films
    .map((f) => ({ ...f, showtimes: f.showtimes.filter((s) => isFridayRome(s.startsAt)) }))
    .filter((f) => f.showtimes.length > 0);
  const days = groupByDay(fridayFilms);

  return (
    <main className="container py-10 sm:py-12">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          I Venerdì del Metropol
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Il venerdì sera è il nostro appuntamento con il cinema d&apos;autore: film di qualità,
          storie da scoprire e titoli che difficilmente trovano spazio nei grandi circuiti.
          Una rassegna pensata per chi ama il cinema, con biglietto a prezzo ridotto.
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border border-cinema-danger/40 bg-cinema-danger/10 p-6 text-sm text-cinema-text-muted">
          Impossibile caricare la programmazione.{' '}
          <span className="text-cinema-text-subtle">({error})</span>
        </div>
      ) : days.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cinema-border bg-cinema-surface/50 p-10 text-center text-cinema-text-subtle">
          I prossimi venerdì non sono ancora in calendario: seguici sui social per gli annunci
          della rassegna.
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
