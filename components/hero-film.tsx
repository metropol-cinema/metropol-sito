import { ArrowRight, Clapperboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AgeBadge } from '@/components/age-badge';
import { MetaLine } from '@/components/meta-line';
import { PriceLegend, Showtimes } from '@/components/showtimes';
import { ageRatingFor } from '@/lib/age-rating';
import type { PublicFilm } from '@/lib/programmazione-client';
import { formatDayIt, relativeDayIt } from '@/lib/programmazione-client';
import { fetchTmdbDetails } from '@/lib/tmdb';

/**
 * L'hero: il film proiettato a tutta parete, come lo si vede dalla platea.
 * Backdrop full-bleed con grana e vignettatura, locandina appesa di lato,
 * titolo enorme e i biglietti delle prossime proiezioni.
 *
 * Il titolo è un h2: l'h1 della home è quello (sr-only) della pagina.
 * `priority` va passato solo alla prima slide del carosello, per non mettere in
 * coda quattro backdrop a piena larghezza al primo caricamento.
 */
export async function HeroFilm({ film, priority = false }: { film: PublicFilm; priority?: boolean }) {
  const details = await fetchTmdbDetails(film.tmdbId);
  const poster = details?.posterUrl ?? film.poster;
  const ageRating = ageRatingFor(film.ageRating);
  const next = film.showtimes[0];
  const relative = next ? relativeDayIt(next.startsAt) : null;

  // Quando si può vedere: "Stasera" / "Domani", altrimenti il giorno per esteso.
  const when = next
    ? relative === 'Oggi'
      ? 'Stasera in sala'
      : relative === 'Domani'
        ? 'Domani in sala'
        : formatDayIt(next.startsAt)
    : 'In programmazione';

  const meta = [
    film.director ? `Regia di ${film.director}` : null,
    film.durationMinutes ? `${film.durationMinutes}′` : null,
    details?.genres.slice(0, 2).join(', ') || null,
  ];

  return (
    <section
      aria-label={`In evidenza: ${film.title}`}
      className="grain beam relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden sm:min-h-[36rem]"
    >
      {/* Il fotogramma proiettato dietro a tutto */}
      <div className="absolute inset-0 -z-10">
        {details?.backdropUrl ? (
          <Image
            src={details.backdropUrl}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className="scale-105 object-cover object-top opacity-60"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(244,183,64,0.18),transparent_70%)]" />
        )}
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/85 to-cinema-bg/25" />
      </div>

      <div className="container flex flex-col gap-6 pb-10 pt-24 sm:flex-row sm:items-end sm:gap-9 sm:pb-14 sm:pt-32">
        {/* Locandina appesa: filo d'oro come la cornice in atrio */}
        <div className="w-32 shrink-0 overflow-hidden rounded-xl border border-cinema-ticket/25 shadow-2xl shadow-black/70 sm:w-56">
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

        <div className="min-w-0 flex-1 animate-rise-in">
          <p className="eyebrow">{when}</p>

          <h2 className="mt-3 text-[2.75rem] font-black leading-[0.95] text-cinema-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:text-7xl">
            {film.title}
          </h2>

          {details?.tagline && (
            <p className="mt-3 max-w-xl font-display text-base italic text-cinema-text-muted sm:text-lg">
              {details.tagline}
            </p>
          )}

          <MetaLine items={meta} className="mt-4">
            {ageRating && <AgeBadge rating={ageRating} />}
          </MetaLine>

          <Showtimes
            film={film}
            showtimes={film.showtimes.slice(0, 3)}
            ariaLabel={`Prossime proiezioni di ${film.title}`}
            size="lg"
            showVenue
            withDayInLabel
            perfBg="#0B0B0D"
            className="mt-7"
          />
          <PriceLegend showtimes={film.showtimes.slice(0, 3)} className="mt-3 text-cinema-text-muted" />

          <Link
            href={`/film/${film.id}`}
            className="group mt-7 inline-flex items-center gap-2 border-b border-cinema-ticket/40 pb-1 font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-ticket transition-colors hover:border-cinema-ticket"
          >
            Scheda del film<span className="sr-only">: {film.title}</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
