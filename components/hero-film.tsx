import { ArrowRight, Clapperboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PriceLegend, Showtimes } from '@/components/showtimes';
import type { PublicFilm } from '@/lib/programmazione-client';
import { relativeDayIt } from '@/lib/programmazione-client';
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
  const next = film.showtimes[0];
  const relative = next ? relativeDayIt(next.startsAt) : null;
  // "Stasera in sala" se la prossima proiezione è oggi, altrimenti "In sala".
  const eyebrow = relative === 'Oggi' ? 'Stasera in sala' : 'In sala';

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
        <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-cinema-bg/70 p-5 shadow-2xl backdrop-blur-md sm:p-7">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cinema-ticket">
            <span className="h-px w-6 bg-cinema-ticket/70" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="mt-2 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
            {film.title}
          </h2>
          {(film.director || film.durationMinutes) && (
            <p className="mt-2 text-sm text-cinema-text-muted">
              {[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}

          <Showtimes
            film={film}
            showtimes={nextShowtimes}
            ariaLabel="Prossime proiezioni"
            withDayInLabel
            perfBg="#0D1117"
            className="mt-5"
          />
          <PriceLegend showtimes={nextShowtimes} className="mt-2.5 text-cinema-text-muted" />

          <div className="mt-6">
            <Link
              href={`/film/${film.id}`}
              className="group inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
            >
              Scheda del film<span className="sr-only">: {film.title}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
