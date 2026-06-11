import { CalendarDays, Clapperboard, MapPin } from 'lucide-react';
import Link from 'next/link';

import { FilmCard } from '@/components/film-card';
import { HeroFilm } from '@/components/hero-film';
import {
  currentWeekRange,
  fetchProgrammazioneWeek,
  type PublicFilm,
} from '@/lib/programmazione-client';
import { SITE } from '@/lib/site';

// Rigenera la pagina al massimo ogni 10 minuti (la programmazione cambia ~1/giorno).
export const revalidate = 600;

function weekLabel(): string {
  const { sunday } = currentWeekRange(new Date());
  const fmt = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${sunday}T12:00:00`));
  return `fino a ${fmt}`;
}

export default async function HomePage() {
  let films: PublicFilm[] = [];
  let error: string | null = null;
  try {
    films = await fetchProgrammazioneWeek();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  // L'API ordina per prossima proiezione: il primo film è il "film del momento".
  const heroFilm = films[0] ?? null;
  const otherFilms = films.slice(1);

  return (
    <main>
      {heroFilm && <HeroFilm film={heroFilm} />}

      <div className="container py-10 sm:py-12">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-cinema-text sm:text-2xl">
              In programmazione questa settimana
            </h2>
            <p className="mt-1 text-sm text-cinema-text-subtle">{weekLabel()}</p>
          </div>
          <Link
            href="/programmazione"
            className="hidden shrink-0 rounded-lg border border-cinema-border px-3.5 py-2 text-sm font-medium text-cinema-text-muted hover:bg-cinema-surface sm:block"
          >
            Vedi per giorno
          </Link>
        </header>

        {error ? (
          <div className="rounded-xl border border-cinema-danger/40 bg-cinema-danger/10 p-6 text-sm text-cinema-text-muted">
            Impossibile caricare la programmazione.{' '}
            <span className="text-cinema-text-subtle">({error})</span>
          </div>
        ) : films.length === 0 ? (
          <div className="rounded-xl border border-dashed border-cinema-border bg-cinema-surface/50 p-10 text-center text-cinema-text-subtle">
            Nessun film in programmazione questa settimana.
          </div>
        ) : otherFilms.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {otherFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-cinema-text-subtle">
            Tutti gli orari del film in evidenza sono qui sopra — oppure{' '}
            <Link href="/programmazione" className="text-cinema-accent hover:underline">
              guarda la programmazione per giorno
            </Link>
            .
          </p>
        )}

        {/* Sezioni di rimando */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Link
            href="/prossimamente"
            className="rounded-xl border border-cinema-border bg-cinema-surface p-5 transition-colors hover:border-cinema-accent/50"
          >
            <Clapperboard className="h-6 w-6 text-cinema-accent" />
            <h3 className="mt-3 font-semibold text-cinema-text">Prossimamente</h3>
            <p className="mt-1 text-sm text-cinema-text-subtle">
              I film in arrivo nelle prossime settimane.
            </p>
          </Link>
          <Link
            href="/venerdi"
            className="rounded-xl border border-cinema-border bg-cinema-surface p-5 transition-colors hover:border-cinema-accent/50"
          >
            <CalendarDays className="h-6 w-6 text-cinema-accent" />
            <h3 className="mt-3 font-semibold text-cinema-text">I Venerdì del Metropol</h3>
            <p className="mt-1 text-sm text-cinema-text-subtle">
              La rassegna del venerdì sera: cinema d&apos;autore a 6&nbsp;€.
            </p>
          </Link>
          <Link
            href="/info"
            className="rounded-xl border border-cinema-border bg-cinema-surface p-5 transition-colors hover:border-cinema-accent/50"
          >
            <MapPin className="h-6 w-6 text-cinema-accent" />
            <h3 className="mt-3 font-semibold text-cinema-text">Dove siamo e prezzi</h3>
            <p className="mt-1 text-sm text-cinema-text-subtle">
              {SITE.venueName} · {SITE.city}. Biglietteria e info pratiche.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
