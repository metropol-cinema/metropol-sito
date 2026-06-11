import type { Metadata } from 'next';

import { FilmPosterCard } from '@/components/film-poster-card';
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
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          Prossimamente
        </h1>
        <p className="mt-1 text-sm text-cinema-text-subtle">
          I film in arrivo dopo questa settimana.
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border border-cinema-danger/40 bg-cinema-danger/10 p-6 text-sm text-cinema-text-muted">
          Impossibile caricare la programmazione.{' '}
          <span className="text-cinema-text-subtle">({error})</span>
        </div>
      ) : upcoming.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cinema-border bg-cinema-surface/50 p-10 text-center text-cinema-text-subtle">
          Le prossime uscite non sono ancora in calendario: torna a trovarci, o seguici sui social
          per gli annunci.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {upcoming.map((film) => (
            <FilmPosterCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </main>
  );
}
