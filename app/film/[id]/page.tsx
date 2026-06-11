import { Clapperboard, MapPin, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import {
  fetchProgrammazione,
  formatDayIt,
  formatTimeIt,
  romeDayKey,
  type PublicFilm,
} from '@/lib/programmazione-client';
import { SITE } from '@/lib/site';
import { ticketUrlFor } from '@/lib/tickets';
import { fetchTmdbMedia } from '@/lib/tmdb';
import { formatEuro } from '@/lib/utils';

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
        <h2 className="text-xl font-bold tracking-tight text-cinema-text sm:text-2xl">
          Date e orari
        </h2>
        {days.length === 0 ? (
          <p className="mt-4 text-sm text-cinema-text-subtle">
            Non ci sono proiezioni in calendario al momento.
          </p>
        ) : (
          <div className="mt-5 space-y-6">
            {days.map(([dayKey, showtimes]) => (
              <div key={dayKey}>
                <h3 className="font-semibold capitalize text-cinema-text">
                  {formatDayIt(showtimes[0].startsAt)}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {showtimes.map((s) => {
                    const buyUrl = ticketUrlFor(s.sourceId);
                    return (
                      <li
                        key={s.sourceId}
                        className="rounded-xl border border-cinema-border bg-cinema-surface px-4 py-3"
                      >
                        <div className="flex items-center gap-2">
                          <time dateTime={s.startsAt} className="text-lg font-bold text-cinema-text">
                            {formatTimeIt(s.startsAt)}
                          </time>
                          {s.venue && s.venue !== DEFAULT_VENUE && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-cinema-warning/15 px-2 py-0.5 text-xs font-medium text-cinema-warning">
                              <MapPin className="h-3 w-3" aria-hidden="true" /> {s.venue}
                            </span>
                          )}
                          {buyUrl && (
                            <a
                              href={buyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Acquista biglietti per ${film.title}, ${formatDayIt(s.startsAt)} ore ${formatTimeIt(s.startsAt)} (si apre in una nuova scheda)`}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-cinema-accent-strong px-3 py-1.5 text-sm font-semibold text-white hover:bg-cinema-accent-strong-hover"
                            >
                              <Ticket className="h-4 w-4" aria-hidden="true" /> Acquista
                            </a>
                          )}
                        </div>
                        {s.prices.length > 0 && (
                          <div className="mt-1.5 text-xs text-cinema-text-subtle">
                            {s.prices.map((p) => `${p.label} ${formatEuro(p.amount)}`).join(' · ')}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
