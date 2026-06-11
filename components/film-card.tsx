import { Clapperboard, Clock, Ticket } from 'lucide-react';
import Link from 'next/link';

import type { PublicFilm } from '@/lib/programmazione-client';
import { formatShowtimeIt } from '@/lib/programmazione-client';
import { ticketUrlFor } from '@/lib/tickets';
import { formatEuro } from '@/lib/utils';

/** Scheda di un film in programmazione: locandina, dati, orari + prezzi. */
export function FilmCard({ film }: { film: PublicFilm }) {
  return (
    <article className="overflow-hidden rounded-xl border border-cinema-border bg-cinema-surface shadow-sm">
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
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
              <Clapperboard className="h-8 w-8" />
            </div>
          )}
        </Link>

        {/* Dettagli */}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-tight sm:text-xl">
            <Link href={`/film/${film.id}`} className="text-cinema-text hover:text-cinema-accent-hover">
              {film.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-cinema-text-subtle">
            {[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null, film.distributor]
              .filter(Boolean)
              .join(' · ')}
          </p>

          {film.description && (
            <p className="mt-2 line-clamp-3 text-sm text-cinema-text-muted">{film.description}</p>
          )}

          {/* Proiezioni */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {film.showtimes.map((s) => {
              const buyUrl = ticketUrlFor(s.sourceId);
              return (
                <li
                  key={s.sourceId}
                  className="rounded-lg border border-cinema-border bg-cinema-bg px-3 py-2"
                >
                  <div className="flex items-center gap-1.5 text-sm font-medium text-cinema-text">
                    <Clock className="h-3.5 w-3.5 text-cinema-accent" />
                    {formatShowtimeIt(s.startsAt)}
                    {buyUrl && (
                      <a
                        href={buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 inline-flex items-center gap-1 rounded-md bg-cinema-accent/15 px-2 py-0.5 text-xs font-semibold text-cinema-accent hover:bg-cinema-accent/25"
                      >
                        <Ticket className="h-3 w-3" /> Acquista
                      </a>
                    )}
                  </div>
                  {s.prices.length > 0 && (
                    <div className="mt-1 text-xs text-cinema-text-subtle">
                      {s.prices.map((p) => `${p.label} ${formatEuro(p.amount)}`).join(' · ')}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
