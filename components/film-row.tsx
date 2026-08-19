import { ArrowRight, Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { AgeBadge } from '@/components/age-badge';
import { MetaLine } from '@/components/meta-line';
import { PriceLegend, ShowtimesByDay } from '@/components/showtimes';
import { ageRatingFor } from '@/lib/age-rating';
import type { PublicFilm } from '@/lib/programmazione-client';
import { fetchTmdbDetails } from '@/lib/tmdb';

/**
 * Il film della settimana disteso su una riga: locandina grande, titolo da
 * manifesto, dati essenziali e tutti gli orari come biglietti.
 * Il titolo è un h3: la sezione che la contiene porta l'h2.
 */
export async function FilmRow({ film }: { film: PublicFilm }) {
  const details = await fetchTmdbDetails(film.tmdbId);
  const poster = details?.posterUrl ?? film.poster;
  const description = film.description ?? details?.overview ?? null;
  const ageRating = ageRatingFor(film.ageRating);

  const meta = [
    film.director,
    film.durationMinutes ? `${film.durationMinutes}′` : null,
    details?.releaseYear ? String(details.releaseYear) : null,
    details?.genres.slice(0, 2).join(', ') || null,
  ];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-cinema-border bg-cinema-surface transition-colors hover:border-cinema-ticket/45">
      <div className="flex gap-4 p-4 sm:gap-6 sm:p-6">
        <Link
          href={`/film/${film.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="h-44 w-[7.5rem] shrink-0 overflow-hidden rounded-xl bg-cinema-surface-2 shadow-lg shadow-black/40 sm:h-64 sm:w-44"
        >
          {poster ? (
            // Il poster può essere un data-URI Cinebot: <img> semplice.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
              <Clapperboard className="h-8 w-8" aria-hidden="true" />
            </div>
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-2xl font-black leading-[1.05] sm:text-4xl">
            <Link
              href={`/film/${film.id}`}
              className="text-cinema-text transition-colors hover:text-cinema-ticket"
            >
              {film.title}
            </Link>
          </h3>

          <MetaLine items={meta} className="mt-2.5">
            {ageRating && <AgeBadge rating={ageRating} />}
          </MetaLine>

          {description && (
            <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-relaxed text-cinema-text-muted">
              {description}
            </p>
          )}

          <div className="mt-auto pt-5">
            <ShowtimesByDay film={film} showVenue perfBg="#131316" size="lg" />
            <PriceLegend showtimes={film.showtimes} className="mt-2.5" />
            <Link
              href={`/film/${film.id}`}
              className="mt-4 inline-flex items-center gap-1.5 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:text-cinema-ticket"
            >
              Trailer, foto e dettagli
              <span className="sr-only"> di {film.title}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
