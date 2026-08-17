import type { Metadata } from 'next';

import { DaySchedule, groupByDay } from '@/components/day-schedule';
import { EmptyState, LoadError, PageHeader } from '@/components/page-header';
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
      <PageHeader
        eyebrow="La rassegna d'autore"
        title="I Venerdì del Metropol"
        lead={
          <p>
            Il venerdì sera è il nostro appuntamento con il cinema d&apos;autore: film di qualità,
            storie da scoprire e titoli che difficilmente trovano spazio nei grandi circuiti. Una
            rassegna pensata per chi ama il cinema, con biglietto a prezzo ridotto.
          </p>
        }
      />

      {error ? (
        <LoadError error={error} />
      ) : days.length === 0 ? (
        <EmptyState>
          I prossimi venerdì non sono ancora in calendario: seguici sui social per gli annunci
          della rassegna.
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
