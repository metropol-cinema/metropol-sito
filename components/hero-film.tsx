import { Clapperboard, Clock, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { PublicFilm } from '@/lib/programmazione-client';
import { formatShowtimeIt } from '@/lib/programmazione-client';
import { ticketUrlFor } from '@/lib/tickets';
import { fetchTmdbMedia } from '@/lib/tmdb';

/**
 * Hero "stile monitor di sala": backdrop full-bleed del film (TMDB), locandina
 * arrotondata, titolo grande su pannello scuro, prossimi orari e CTA.
 * Il titolo è un h2: l'h1 della home è quello (sr-only) della pagina.
 */
export async function HeroFilm({ film }: { film: PublicFilm }) {
  const media = await fetchTmdbMedia(film.tmdbId);
  const poster = media?.posterUrl ?? film.poster;
  const nextShowtimes = film.showtimes.slice(0, 3);

  return (
    <section aria-label="Film in evidenza" className="relative overflow-hidden border-b border-cinema-border">
      {/* Backdrop full-bleed con gradiente di leggibilità */}
      <div className="absolute inset-0">
        {media?.backdropUrl ? (
          <Image
            src={media.backdropUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-cinema-accent/20 via-cinema-bg to-cinema-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/60 to-cinema-bg/30" />
      </div>

      <div className="container relative flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:gap-8 sm:py-14">
        {/* Locandina */}
        <div className="w-40 shrink-0 self-center overflow-hidden rounded-xl border border-white/10 shadow-2xl sm:w-52 sm:self-auto">
          {poster ? (
            // Il poster può essere un data-URI Cinebot: <img> semplice.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={`Locandina di ${film.title}`} className="w-full" />
          ) : (
            <div className="flex aspect-[2/3] w-full items-center justify-center bg-cinema-surface-2 text-cinema-text-subtle">
              <Clapperboard className="h-10 w-10" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Pannello titolo + orari */}
        <div className="min-w-0 flex-1 rounded-2xl bg-black/45 p-5 backdrop-blur-sm sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-cinema-accent-hover">
            In sala
          </p>
          <h2 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {film.title}
          </h2>
          {(film.director || film.durationMinutes) && (
            <p className="mt-2 text-sm text-cinema-text-muted">
              {[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Prossime proiezioni">
            {nextShowtimes.map((s) => {
              const buyUrl = ticketUrlFor(s.sourceId, film.title);
              return (
                <li
                  key={s.sourceId}
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white"
                >
                  <Clock className="h-4 w-4 text-cinema-accent-hover" aria-hidden="true" />
                  <time dateTime={s.startsAt}>{formatShowtimeIt(s.startsAt)}</time>
                  {buyUrl && (
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Acquista biglietti per ${film.title}, ${formatShowtimeIt(s.startsAt)} (si apre in una nuova scheda)`}
                      className="ml-1 inline-flex items-center gap-1 rounded-md bg-cinema-accent-strong px-2 py-1 text-xs font-semibold text-white hover:bg-cinema-accent-strong-hover"
                    >
                      <Ticket className="h-3.5 w-3.5" aria-hidden="true" /> Acquista
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-5">
            <Link
              href={`/film/${film.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-cinema-accent-strong px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cinema-accent-strong-hover"
            >
              Scheda del film<span className="sr-only">: {film.title}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
