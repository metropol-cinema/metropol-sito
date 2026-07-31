import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { PriceLegend, Showtimes } from '@/components/showtimes';
import type { PublicFilm } from '@/lib/programmazione-client';

/** Scheda di un film in programmazione: locandina, dati, orari + prezzi. */
export function FilmCard({ film }: { film: PublicFilm }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-cinema-border bg-cinema-surface shadow-sm transition-colors hover:border-cinema-ticket/40">
      <div className="flex gap-4 p-4 sm:gap-5 sm:p-5">
        {/* Locandina */}
        <Link
          href={`/film/${film.id}`}
          className="h-44 w-28 shrink-0 overflow-hidden rounded-lg bg-cinema-surface-2 sm:h-52 sm:w-36"
        >
          {film.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={film.poster}
              alt={`Locandina di ${film.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
              <Clapperboard className="h-8 w-8" aria-hidden="true" />
            </div>
          )}
        </Link>

        {/* Dettagli */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="text-lg font-semibold leading-tight sm:text-xl">
            <Link href={`/film/${film.id}`} className="text-cinema-text hover:text-cinema-ticket">
              {film.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-cinema-text-subtle">
            {[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null, film.distributor]
              .filter(Boolean)
              .join(' · ')}
          </p>

          {film.description && (
            <p className="mt-2 line-clamp-2 text-sm text-cinema-text-muted">{film.description}</p>
          )}

          {/* Proiezioni acquistabili + legenda prezzi (una volta per film) */}
          <div className="mt-auto pt-3">
            <Showtimes film={film} perfBg="#161B22" />
            <PriceLegend showtimes={film.showtimes} className="mt-2" />
          </div>
        </div>
      </div>
    </article>
  );
}
