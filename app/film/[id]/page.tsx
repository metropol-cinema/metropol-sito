import { Clapperboard } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { AgeBadge } from '@/components/age-badge';
import { Gallery } from '@/components/gallery';
import { MetaLine } from '@/components/meta-line';
import { PriceLegend, ShowtimesByDay, groupShowtimesByDay } from '@/components/showtimes';
import { Trailer } from '@/components/trailer';
import { ageRatingFor } from '@/lib/age-rating';
import { jsonLdScript } from '@/lib/json-ld';
import { fetchProgrammazione, type PublicFilm } from '@/lib/programmazione-client';
import { SITE, isHomeVenue } from '@/lib/site';
import { fetchTmdbDetails } from '@/lib/tmdb';
import { youtubeIdFrom } from '@/lib/youtube';

export const revalidate = 600;

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

/** Intestazione di sezione della scheda: occhiello d'oro + titolo. */
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black leading-none text-cinema-text sm:text-3xl">{title}</h2>
    </header>
  );
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

  const details = await fetchTmdbDetails(film.tmdbId);
  const poster = details?.posterUrl ?? film.poster;
  const description = film.description ?? details?.overview ?? null;

  // Trailer: comanda quello scelto in dashboard (già preferito in italiano e
  // sovrascrivibile a mano); TMDB è solo la riserva.
  const trailerId = youtubeIdFrom(film.trailerUrl) ?? youtubeIdFrom(details?.trailerKey);
  const gallery = details?.gallery ?? [];
  // L'età consigliata la decide il gestionale (TMDB all'import o a mano in
  // dashboard): qui non si calcola nulla.
  const ageRating = ageRatingFor(film.ageRating);

  const days = groupShowtimesByDay(film.showtimes);

  const meta = [
    film.director ? `Regia di ${film.director}` : null,
    film.durationMinutes ? `${film.durationMinutes} minuti` : null,
    details?.releaseYear ? String(details.releaseYear) : null,
    details?.genres.join(', ') || null,
    film.distributor,
  ];

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
      ...(description ? { description } : {}),
      ...(details?.posterUrl ? { image: details.posterUrl } : {}),
      ...(details?.genres.length ? { genre: details.genres } : {}),
      ...(details?.releaseYear ? { datePublished: String(details.releaseYear) } : {}),
      ...(ageRating ? { contentRating: ageRating.code } : {}),
      ...(trailerId
        ? {
            trailer: {
              '@type': 'VideoObject',
              name: `Trailer di ${film.title}`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${trailerId}`,
              ...(details?.backdropUrl ? { thumbnailUrl: details.backdropUrl } : {}),
            },
          }
        : {}),
    },
    ...film.showtimes.map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'ScreeningEvent',
      name: `${film.title} al ${SITE.name}`,
      startDate: s.startsAt,
      workPresented: { '@type': 'Movie', name: film.title },
      location: s.venue && !isHomeVenue(s.venue) ? { '@type': 'Place', name: s.venue } : theaterJsonLd,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* Testata con il fotogramma del film alle spalle */}
      <section className="grain beam relative isolate overflow-hidden border-b border-cinema-border">
        <div className="absolute inset-0 -z-10">
          {details?.backdropUrl ? (
            <Image
              src={details.backdropUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover object-top opacity-55"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(244,183,64,0.16),transparent_70%)]" />
          )}
          <div className="absolute inset-0 vignette" />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/75 to-cinema-bg/25" />
        </div>

        <div className="container flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:gap-9 sm:py-16">
          <div className="w-36 shrink-0 self-center overflow-hidden rounded-xl border border-cinema-ticket/25 shadow-2xl shadow-black/70 sm:w-56 sm:self-auto">
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
            <h1 className="text-4xl font-black leading-[0.95] text-cinema-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:text-6xl">
              {film.title}
            </h1>

            {details?.tagline && (
              <p className="mt-3 max-w-2xl font-display text-lg italic text-cinema-text-muted">
                {details.tagline}
              </p>
            )}

            <MetaLine items={meta} className="mt-4" />

            {ageRating && (
              <p className="mt-4">
                <AgeBadge rating={ageRating} showLabel />
              </p>
            )}

            {description && (
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-cinema-text-muted">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Proiezioni */}
      <section className="container py-12">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <SectionHeading eyebrow="Quando si vede" title="Date e orari" />
          <PriceLegend showtimes={film.showtimes} className="mb-7 text-sm" />
        </div>

        {days.length === 0 ? (
          <p className="text-sm text-cinema-text-subtle">
            Non ci sono proiezioni in calendario al momento.
          </p>
        ) : (
          <ShowtimesByDay film={film} size="lg" showVenue perfBg="#0B0B0D" className="space-y-8" />
        )}
      </section>

      {/* Trailer — assente se né la dashboard né TMDB ne hanno uno */}
      {trailerId && (
        <section className="container pb-12">
          <SectionHeading eyebrow="In anteprima" title="Trailer" />
          <div className="max-w-4xl">
            <Trailer
              youtubeId={trailerId}
              title={film.title}
              posterUrl={details?.backdropUrl ?? null}
            />
          </div>
        </section>
      )}

      {/* Fotogallery — sotto le due immagini non vale una sezione */}
      {gallery.length >= 2 && (
        <section className="pb-16">
          <div className="container">
            <SectionHeading eyebrow="Dal film" title="Fotogallery" />
          </div>
          {/* A tutta larghezza: la striscia scorre oltre il bordo del contenuto. */}
          <div className="container">
            <Gallery images={gallery} title={film.title} />
          </div>
        </section>
      )}
    </main>
  );
}
