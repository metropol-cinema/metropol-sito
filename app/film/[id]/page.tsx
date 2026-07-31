import { Clapperboard } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { PriceLegend, Showtimes } from '@/components/showtimes';
import {
  fetchProgrammazione,
  formatDayIt,
  relativeDayIt,
  romeDayKey,
  type PublicFilm,
} from '@/lib/programmazione-client';
import { SITE } from '@/lib/site';
import { fetchTmdbMedia } from '@/lib/tmdb';

export const revalidate = 600;

/** La sala "di casa": la mostriamo solo quando la proiezione è altrove. */
const DEFAULT_VENUE = 'Cinema Metropol';

async function findFilm(id: string): Promise<PublicFilm | null> {
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) return null;
  const films = await fetchProgrammazione({ days: 180 });
  return films.find((f) => f.id === numericId) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const film = await findFilm(id).catch(() => null);
  if (!film) return { title: 'Film non trovato' };
  return {
    title: film.title,
    description: film.description ?? `${film.title} al Cinema Metropol di Villafranca di Verona.`,
  };
}

export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let film: PublicFilm | null = null;
  try {
    film = await findFilm(id);
  } catch {
    film = null;
  }
  if (!film) notFound();

  const media = await fetchTmdbMedia(film.tmdbId);
  const poster = media?.posterUrl ?? film.poster;

  // Proiezioni raggruppate per giorno.
  const byDay = new Map<string, typeof film.showtimes>();
  for (const s of film.showtimes) {
    const key = romeDayKey(s.startsAt);
    const list = byDay.get(key);
    if (list) list.push(s);
    else byDay.set(key, [s]);
  }
  const days = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b));

  // Dati strutturati schema.org: aiutano assistenti vocali e motori di ricerca
  // a capire film, date e prezzi senza interpretare il layout.
  const theaterJsonLd = {
    '@type': 'MovieTheater',
    name: `${SITE.name} — ${SITE.venueName}`,
    address: SITE.venueAddress,
  };
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      name: film.title,
      ...(film.director ? { director: { '@type': 'Person', name: film.director } } : {}),
      ...(film.durationMinutes ? { duration: `PT${film.durationMinutes}M` } : {}),
      ...(film.description ? { description: film.description } : {}),
    },
    ...film.showtimes.map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'ScreeningEvent',
      name: `${film.title} al ${SITE.name}`,
      startDate: s.startsAt,
      workPresented: { '@type': 'Movie', name: film.title },
      location: s.venue && s.venue !== DEFAULT_VENUE ? { '@type': 'Place', name: s.venue } : theaterJsonLd,
      ...(s.prices.length > 0
        ? {
            offers: s.prices.map((p) => ({
              '@type': 'Offer',
              name: p.label,
              price: p.amount,
              priceCurrency: 'EUR',
            })),
          }
        : {}),
    })),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Testata con backdrop */}
      <section className="relative overflow-hidden border-b border-cinema-border">
        <div className="absolute inset-0">
          {media?.backdropUrl ? (
            <Image
              src={media.backdropUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-cinema-accent/15 via-cinema-bg to-cinema-bg" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/70 to-cinema-bg/40" />
        </div>

        <div className="container relative flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:gap-8 sm:py-14">
          <div className="w-40 shrink-0 self-center overflow-hidden rounded-xl border border-white/10 shadow-2xl sm:w-56 sm:self-auto">
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt={`Locandina di ${film.title}`} className="w-full" />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center bg-cinema-surface-2 text-cinema-text-subtle">
                <Clapperboard className="h-10 w-10" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {film.title}
            </h1>
            <p className="mt-3 text-sm text-cinema-text-muted">
              {[
                film.director ? `Regia di ${film.director}` : null,
                film.durationMinutes ? `${film.durationMinutes} minuti` : null,
                film.distributor,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
            {film.description && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-cinema-text-muted">
                {film.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Proiezioni */}
      <section className="container py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-xl font-bold tracking-tight text-cinema-text sm:text-2xl">
            Date e orari
          </h2>
          <PriceLegend showtimes={film.showtimes} className="text-sm" />
        </div>
        {days.length === 0 ? (
          <p className="mt-4 text-sm text-cinema-text-subtle">
            Non ci sono proiezioni in calendario al momento.
          </p>
        ) : (
          <div className="mt-6 space-y-7">
            {days.map(([dayKey, showtimes]) => {
              const relative = relativeDayIt(showtimes[0].startsAt);
              return (
                <div key={dayKey}>
                  <h3 className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-semibold capitalize text-cinema-text">
                    {relative && (
                      <span className="rounded-md bg-cinema-ticket/15 px-2 py-0.5 text-sm font-semibold not-italic text-cinema-ticket">
                        {relative}
                      </span>
                    )}
                    {formatDayIt(showtimes[0].startsAt)}
                  </h3>
                  <Showtimes
                    film={film}
                    showtimes={showtimes}
                    size="lg"
                    showVenue
                    withDayInLabel
                    perfBg="#0D1117"
                    className="mt-3"
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
