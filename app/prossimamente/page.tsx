import { Clapperboard } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  currentWeekRange,
  fetchProgrammazione,
  formatDayIt,
  romeDayKey,
  type PublicFilm,
} from '@/lib/programmazione-client';

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
  const { sunday } = currentWeekRange(new Date());
  const upcoming = films.filter((f) => {
    const first = f.showtimes[0];
    return first && romeDayKey(first.startsAt) > sunday;
  });

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
          {upcoming.map((film) => {
            const first = film.showtimes[0];
            return (
              <Link
                key={film.id}
                href={`/film/${film.id}`}
                className="group overflow-hidden rounded-xl border border-cinema-border bg-cinema-surface transition-colors hover:border-cinema-accent/50"
              >
                <div className="aspect-[2/3] w-full overflow-hidden bg-cinema-surface-2">
                  {film.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={film.poster}
                      alt={`Locandina di ${film.title}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
                      <Clapperboard className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="line-clamp-2 font-semibold leading-tight text-cinema-text">
                    {film.title}
                  </h2>
                  <p className="mt-1 text-xs capitalize text-cinema-accent">
                    Dal {formatDayIt(first.startsAt)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
