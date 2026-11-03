import { ArrowRight, Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { AccessibleBadge } from '@/components/accessible-badge';
import { AgeBadge } from '@/components/age-badge';
import { MetaLine } from '@/components/meta-line';
import { PriceLegend, ShowtimesByDay } from '@/components/showtimes';
import { ageRatingFor } from '@/lib/age-rating';
import { filmGenres, filmYear } from '@/lib/film-facts';
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
  // Nell'elenco va la sinossi, non il «Testo per il sito»: qui il testo è
  // troncato a tre righe, e le prime tre righe di un pezzo scritto per la
  // scheda non sono una presentazione — sono un inizio interrotto.
  const description = film.synopsis ?? film.description ?? details?.overview ?? null;
  const ageRating = ageRatingFor(film.ageRating);

  const meta = [
    film.director,
    film.durationMinutes ? `${film.durationMinutes}′` : null,
    filmYear(film, details)?.toString(),
    filmGenres(film, details),
  ];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-cinema-border bg-cinema-surface transition-colors hover:border-cinema-ticket-ink/45">
      {/* Sul telefono orari e prezzi scendono a tutta larghezza sotto locandina e
          titolo: nella colonna accanto alla locandina andava a capo tutto, anche
          la data, e tre film facevano più di due schermate. */}
      <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 p-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:grid-rows-[auto_1fr] sm:gap-x-6 sm:p-6">
        <Link
          href={`/film/${film.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="h-36 w-24 overflow-hidden rounded-xl bg-cinema-surface-2 shadow-lg shadow-black/40 sm:row-span-2 sm:h-64 sm:w-44"
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

        <div className="min-w-0">
          <h3 className="text-2xl font-black leading-[1.05] sm:text-4xl">
            <Link
              href={`/film/${film.id}`}
              className="text-cinema-text transition-colors hover:text-cinema-ticket-ink"
            >
              {film.title}
            </Link>
          </h3>

          <MetaLine items={meta} className="mt-2.5">
            {ageRating && <AgeBadge rating={ageRating} />}
            {film.isAccessible && <AccessibleBadge />}
          </MetaLine>

          {description && (
            <p className="mt-3 line-clamp-3 hidden max-w-2xl text-sm leading-relaxed text-cinema-text-muted sm:[display:-webkit-box]">
              {description}
            </p>
          )}
        </div>

        <div className="col-span-2 mt-4 self-end sm:col-span-1 sm:mt-0 sm:pt-5">
          <ShowtimesByDay film={film} showVenue perfBg="rgb(var(--c-surface))" size="lg" linkToFilm />
          <PriceLegend showtimes={film.showtimes} className="mt-2.5" />
          <Link
            href={`/film/${film.id}`}
            className="tap-area mt-4 inline-flex items-center gap-1.5 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:text-cinema-ticket-ink"
          >
            Trailer, foto e dettagli
            <span className="sr-only"> di {film.title}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
