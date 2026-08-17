import { CalendarDays, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { FilmRow } from '@/components/film-row';
import { HeroCarousel } from '@/components/hero-carousel';
import { HeroClosed } from '@/components/hero-closed';
import { HeroFilm } from '@/components/hero-film';
import { HeroUpcoming } from '@/components/hero-upcoming';
import { MediaSlide } from '@/components/media-slide';
import { LoadError } from '@/components/page-header';
import { PosterGrid } from '@/components/poster-grid';
import { WeekRail } from '@/components/week-rail';
import {
  currentWeekRange,
  fetchProgrammazione,
  splitWeekUpcoming,
  type PublicFilm,
} from '@/lib/programmazione-client';
import { SITE } from '@/lib/site';
import { fetchSlideshow, type SlideshowItem } from '@/lib/slideshow-client';

// Rigenera la pagina al massimo ogni 10 minuti (la programmazione cambia ~1/giorno).
export const revalidate = 600;

/** Quante slide al massimo nell'hero: oltre, il carosello smette di essere leggibile. */
const MAX_HERO_SLIDES = 5;

interface Slide {
  node: ReactNode;
  duration: number;
}

function weekLabel(): string {
  const { monday, sunday } = currentWeekRange();
  const day = (key: string, withMonth: boolean) =>
    new Intl.DateTimeFormat('it-IT', {
      timeZone: 'UTC',
      day: 'numeric',
      ...(withMonth ? { month: 'long' } : {}),
    }).format(new Date(`${key}T12:00:00Z`));
  return `${day(monday, false)} — ${day(sunday, true)}`;
}

/**
 * Le slide dell'hero, secondo una regola sola:
 *
 * - se questa settimana si proietta, l'hero sono **i film della settimana**,
 *   uno per slide, in ordine di proiezione più vicina;
 * - se la settimana è vuota si passa alle riserve, in quest'ordine: i video e
 *   le immagini caricati in dashboard (Sito Web → Slideshow), poi i film in
 *   arrivo, poi il pannello "la sala riposa".
 *
 * Il flag `fallbackOnly` delle slide media non serve più a decidere: la regola
 * la applica il sito, così un video caricato una volta non copre mai il film in
 * programmazione per dimenticanza.
 */
function buildHeroSlides(
  weekFilms: PublicFilm[],
  upcomingFilms: PublicFilm[],
  timeline: SlideshowItem[]
): Slide[] {
  if (weekFilms.length > 0) {
    return weekFilms.slice(0, MAX_HERO_SLIDES).map((film, i) => ({
      node: <HeroFilm key={film.id} film={film} priority={i === 0} />,
      duration: 12,
    }));
  }

  const media = timeline
    .filter((item) => (item.kind === 'video' || item.kind === 'image') && item.mediaUrl)
    .map((item) => ({
      node: (
        <MediaSlide
          key={item.id}
          kind={item.kind as 'video' | 'image'}
          src={item.mediaUrl as string}
          caption={item.caption}
        />
      ),
      duration: item.durationSeconds,
    }));
  if (media.length > 0) return media.slice(0, MAX_HERO_SLIDES);

  if (upcomingFilms.length > 0) {
    return [{ node: <HeroUpcoming films={upcomingFilms} />, duration: 15 }];
  }

  return [{ node: <HeroClosed />, duration: 15 }];
}

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-4xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 border-b border-cinema-border-strong pb-1 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
        >
          {action.label}
        </Link>
      )}
    </header>
  );
}

export default async function HomePage() {
  let films: PublicFilm[] = [];
  let error: string | null = null;
  try {
    // Una sola chiamata per tutta la home: settimana + film in arrivo.
    films = await fetchProgrammazione({ days: 180 });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  const { weekFilms, upcomingFilms } = splitWeekUpcoming(films);
  const timeline = (await fetchSlideshow()) ?? [];
  const slides = buildHeroSlides(weekFilms, upcomingFilms, timeline);

  return (
    <main>
      {/* h1 della pagina per screen reader: le slide mostrano i titoli come h2. */}
      <h1 className="sr-only">
        Cinema Metropol — film in programmazione a Villafranca di Verona
      </h1>

      {slides.length === 1 ? (
        slides[0].node
      ) : (
        <HeroCarousel
          slides={slides.map((s) => s.node)}
          durations={slides.map((s) => s.duration)}
        />
      )}

      {weekFilms.length > 0 && <WeekRail films={weekFilms} />}

      <div className="container py-12 sm:py-16">
        {error ? (
          <LoadError error={error} />
        ) : weekFilms.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow={weekLabel()}
              title="Questa settimana"
              action={{ href: '/programmazione', label: 'Giorno per giorno' }}
            />
            <div className="space-y-5">
              {weekFilms.map((film) => (
                <FilmRow key={film.id} film={film} />
              ))}
            </div>
          </section>
        ) : null}

        {/* "Prossimamente": i film oltre la domenica. Quando la settimana è
            vuota è già l'hero, quindi qui non si ripete. */}
        {upcomingFilms.length > 0 && weekFilms.length > 0 && (
          <section className="mt-16">
            <SectionHeading
              eyebrow="In arrivo al Metropol"
              title="Prossimamente"
              action={{ href: '/prossimamente', label: 'Vedi tutti' }}
            />
            <PosterGrid films={upcomingFilms.slice(0, 6)} />
          </section>
        )}

        {/* Sezioni di rimando */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/venerdi"
            className="group rounded-2xl border border-cinema-border bg-cinema-surface p-6 transition-colors hover:border-cinema-ticket/50"
          >
            <CalendarDays className="h-6 w-6 text-cinema-ticket" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-cinema-text transition-colors group-hover:text-cinema-ticket">
              I Venerdì del Metropol
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-cinema-text-subtle">
              La rassegna del venerdì sera: cinema d&apos;autore a 6&nbsp;€.
            </p>
          </Link>
          <Link
            href="/info"
            className="group rounded-2xl border border-cinema-border bg-cinema-surface p-6 transition-colors hover:border-cinema-ticket/50"
          >
            <MapPin className="h-6 w-6 text-cinema-ticket" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-cinema-text transition-colors group-hover:text-cinema-ticket">
              Dove siamo e prezzi
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-cinema-text-subtle">
              {SITE.venueName} · {SITE.city}. Biglietteria e info pratiche.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
