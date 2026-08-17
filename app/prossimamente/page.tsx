import type { Metadata } from 'next';

import { EmptyState, LoadError, PageHeader } from '@/components/page-header';
import { PosterGrid } from '@/components/poster-grid';
import { fetchProgrammazione, splitWeekUpcoming, type PublicFilm } from '@/lib/programmazione-client';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Prossimamente',
  description: 'I film in arrivo nelle prossime settimane al Cinema Metropol di Villafranca di Verona.',
};

export default async function ProssimamentePage() {
  let films: PublicFilm[] = [];
  let error: string | null = null;
  try {
    films = await fetchProgrammazione({ days: 180 });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  // "Prossimamente" = prima proiezione oltre la settimana corrente.
  const { upcomingFilms: upcoming } = splitWeekUpcoming(films);

  return (
    <main className="container py-10 sm:py-12">
      <PageHeader
        eyebrow="In arrivo al Metropol"
        title="Prossimamente"
        lead={<p>I film già in calendario per le settimane dopo questa.</p>}
      />

      {error ? (
        <LoadError error={error} />
      ) : upcoming.length === 0 ? (
        <EmptyState>
          Le prossime uscite non sono ancora in calendario: torna a trovarci, o seguici sui social
          per gli annunci.
        </EmptyState>
      ) : (
        <PosterGrid films={upcoming} prominent />
      )}
    </main>
  );
}
