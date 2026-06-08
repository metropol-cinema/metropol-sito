import { Film } from 'lucide-react';

import { FilmCard } from '@/components/film-card';
import {
  currentWeekRange,
  fetchProgrammazioneWeek,
  type PublicFilm,
} from '@/lib/programmazione-client';

// Rigenera la pagina al massimo ogni 10 minuti (la programmazione cambia ~1/giorno).
export const revalidate = 600;

function weekLabel(): string {
  const { monday, sunday } = currentWeekRange(new Date());
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long' }).format(
      new Date(`${iso}T12:00:00`)
    );
  return `${fmt(monday)} – ${fmt(sunday)}`;
}

export default async function HomePage() {
  let films: PublicFilm[] = [];
  let error: string | null = null;
  try {
    films = await fetchProgrammazioneWeek();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Errore di caricamento';
  }

  return (
    <main className="container py-8 sm:py-12">
      <header className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cinema-accent/15 text-cinema-accent">
          <Film className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
            Cinema Metropol
          </h1>
          <p className="text-sm text-cinema-text-subtle">
            Programmazione della settimana · {weekLabel()}
          </p>
        </div>
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
      ) : (
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}

      <footer className="mt-12 border-t border-cinema-border pt-6 text-center text-xs text-cinema-text-subtle">
        Associazione Culturale Metropol · Villafranca di Verona
      </footer>
    </main>
  );
}
