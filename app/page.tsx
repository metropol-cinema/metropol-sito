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

/** Timeline usata quando la dashboard non ne ha (ancora) configurata una. */
const DEFAULT_TIMELINE: SlideshowItem[] = [
  { id: -1, kind: 'current_programming', durationSeconds: 12, mediaUrl: null, caption: null, fallbackOnly: false },
  { id: -2, kind: 'future_programming', durationSeconds: 15, mediaUrl: null, caption: null, fallbackOnly: false },
];

/** Cosa mostrerà una slide, prima di diventare JSX. */
type SlideSpec =
  | { kind: 'film'; film: PublicFilm; duration: number }
  | { kind: 'upcoming'; films: PublicFilm[]; duration: number }
  | { kind: 'media'; id: number; media: 'video' | 'image'; src: string; caption: string | null; duration: number };

/**
 * L'hero è la timeline di "Sito Web → Slideshow", nell'ordine deciso in
 * dashboard. Qui ogni riga diventa una o più slide:
 *
 * - `current_programming` si apre a ventaglio in **una slide per film della
 *   settimana** (in ordine di proiezione più vicina), non una sola;
 * - `future_programming` diventa il pannello dei film in arrivo;
 * - `video`/`image` diventano la slide media caricata.
 *
 * Una riga senza contenuto viene saltata (niente film in settimana, nessun
 * media caricato): meglio una slide in meno di una slide vuota.
 *
 * `fallbackOnly` è l'interruttore "solo come riserva": quelle righe compaiono
 * SOLO se nessuna riga di programmazione ha prodotto contenuto — è così che si
 * tiene un video di scorta senza che copra il film in cartellone.
 */
function planHero(
  timeline: SlideshowItem[],
  weekFilms: PublicFilm[],
  upcomingFilms: PublicFilm[]
): { specs: SlideSpec[]; upcomingInHero: boolean } {
  const resolved: Array<{ item: SlideshowItem; specs: SlideSpec[] }> = [];

  for (const item of timeline) {
    const duration = item.durationSeconds;
    let specs: SlideSpec[] = [];

    if (item.kind === 'current_programming') {
      specs = weekFilms.map((film) => ({ kind: 'film', film, duration }));
    } else if (item.kind === 'future_programming' && upcomingFilms.length > 0) {
      specs = [{ kind: 'upcoming', films: upcomingFilms, duration }];
    } else if ((item.kind === 'video' || item.kind === 'image') && item.mediaUrl) {
      specs = [
        { kind: 'media', id: item.id, media: item.kind, src: item.mediaUrl, caption: item.caption, duration },
      ];
    }

    if (specs.length > 0) resolved.push({ item, specs });
  }

  const haProgrammazione = resolved.some(
    (r) => r.item.kind === 'current_programming' || r.item.kind === 'future_programming'
  );
  const visibili = resolved.filter((r) => !r.item.fallbackOnly || !haProgrammazione);

  return {
    specs: visibili.flatMap((r) => r.specs).slice(0, MAX_HERO_SLIDES),
    upcomingInHero: visibili.some((r) => r.item.kind === 'future_programming'),
  };
}

/**
 * La slide vera e propria. `first` vale solo per la prima dell'hero: il
 * backdrop è l'immagine più pesante della pagina, e marcarle tutte prioritarie
 * significa rallentarle tutte.
 */
function renderSlide(spec: SlideSpec, first: boolean): ReactNode {
  // Le slide finiscono in un array passato al carosello: la key va messa qui,
  // dove si sa cosa distingue una slide dall'altra.
  switch (spec.kind) {
    case 'film':
      return <HeroFilm key={`film-${spec.film.id}`} film={spec.film} priority={first} />;
    case 'upcoming':
      return <HeroUpcoming key="upcoming" films={spec.films} />;
    case 'media':
      return (
        <MediaSlide
          key={`media-${spec.id}`}
          kind={spec.media}
          src={spec.src}
          caption={spec.caption}
        />
      );
  }
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
  const timeline = await fetchSlideshow();
  const { specs, upcomingInHero } = planHero(
    timeline && timeline.length > 0 ? timeline : DEFAULT_TIMELINE,
    weekFilms,
    upcomingFilms
  );
  const slides: Slide[] =
    specs.length > 0
      ? specs.map((spec, i) => ({ node: renderSlide(spec, i === 0), duration: spec.duration }))
      : [{ node: <HeroClosed key="closed" />, duration: 15 }];

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

        {/* "Prossimamente": i film oltre la domenica. Se la timeline lo mostra
            già nell'hero, qui non si ripete. */}
        {upcomingFilms.length > 0 && !upcomingInHero && (
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
