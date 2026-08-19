import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { MetaLine } from '@/components/meta-line';
import { DayLabel, PriceLegend, Showtimes } from '@/components/showtimes';
import type { PublicFilm, PublicShowtime } from '@/lib/programmazione-client';
import { romeDayKey } from '@/lib/programmazione-client';

interface DayEntry {
  film: PublicFilm;
  showtimes: PublicShowtime[];
}

/** Raggruppa le proiezioni per giorno (Europe/Rome), in ordine cronologico. */
export function groupByDay(films: PublicFilm[]): Array<{ dayKey: string; entries: DayEntry[] }> {
  const days = new Map<string, Map<number, DayEntry>>();
  for (const film of films) {
    for (const s of film.showtimes) {
      const key = romeDayKey(s.startsAt);
      let filmsOfDay = days.get(key);
      if (!filmsOfDay) {
        filmsOfDay = new Map();
        days.set(key, filmsOfDay);
      }
      let entry = filmsOfDay.get(film.id);
      if (!entry) {
        entry = { film, showtimes: [] };
        filmsOfDay.set(film.id, entry);
      }
      entry.showtimes.push(s);
    }
  }
  return [...days.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dayKey, filmsOfDay]) => ({
      dayKey,
      entries: [...filmsOfDay.values()].sort((a, b) =>
        a.showtimes[0].startsAt.localeCompare(b.showtimes[0].startsAt)
      ),
    }));
}

/** Programmazione di un giorno: riga per film con orari, prezzi e acquisto. */
export function DaySchedule({ dayKey, entries }: { dayKey: string; entries: DayEntry[] }) {
  const firstStart = entries[0].showtimes[0].startsAt;

  return (
    // L'id è la chiave giorno: permalink condivisibile a un singolo giorno
    // (es. /programmazione#2026-08-22).
    <section id={dayKey} className="scroll-mt-28">
      <h2>
        <DayLabel startsAt={firstStart} />
      </h2>
      <div className="mt-4 space-y-4">
        {entries.map(({ film, showtimes }) => (
          <article
            key={`${dayKey}-${film.id}`}
            className="group flex gap-5 rounded-2xl border border-cinema-border bg-cinema-surface p-5 transition-colors hover:border-cinema-ticket/45"
          >
            <Link
              href={`/film/${film.id}`}
              tabIndex={-1}
              aria-hidden="true"
              className="h-36 w-24 shrink-0 overflow-hidden rounded-xl bg-cinema-surface-2 shadow-lg shadow-black/40"
            >
              {film.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={film.poster}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
                  <Clapperboard className="h-6 w-6" aria-hidden="true" />
                </div>
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-black leading-tight sm:text-2xl">
                <Link
                  href={`/film/${film.id}`}
                  className="text-cinema-text transition-colors hover:text-cinema-ticket"
                >
                  {film.title}
                </Link>
              </h3>
              <MetaLine
                items={[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null]}
                className="mt-1.5"
              />
              <Showtimes
                film={film}
                showtimes={showtimes}
                showVenue
                className="mt-4"
                perfBg="#131316"
              />
              <PriceLegend showtimes={showtimes} className="mt-2.5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
