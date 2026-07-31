import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { PriceLegend, Showtimes } from '@/components/showtimes';
import type { PublicFilm, PublicShowtime } from '@/lib/programmazione-client';
import { formatDayIt, relativeDayIt, romeDayKey } from '@/lib/programmazione-client';

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
  const relative = relativeDayIt(firstStart);

  return (
    <section>
      <h2 className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-lg font-bold capitalize tracking-tight text-cinema-text sm:text-xl">
        {relative && (
          <span className="rounded-md bg-cinema-ticket/15 px-2 py-0.5 text-sm font-semibold not-italic text-cinema-ticket sm:text-base">
            {relative}
          </span>
        )}
        {formatDayIt(firstStart)}
      </h2>
      <div className="mt-3 space-y-3">
        {entries.map(({ film, showtimes }) => (
          <article
            key={`${dayKey}-${film.id}`}
            className="flex gap-4 rounded-2xl border border-cinema-border bg-cinema-surface p-4 transition-colors hover:border-cinema-ticket/40"
          >
            <Link
              href={`/film/${film.id}`}
              className="h-28 w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-cinema-surface-2"
            >
              {film.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={film.poster}
                  alt={`Locandina di ${film.title}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
                  <Clapperboard className="h-6 w-6" aria-hidden="true" />
                </div>
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold leading-tight">
                <Link href={`/film/${film.id}`} className="text-cinema-text hover:text-cinema-ticket">
                  {film.title}
                </Link>
              </h3>
              <p className="mt-0.5 text-xs text-cinema-text-subtle">
                {[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <Showtimes film={film} showtimes={showtimes} showVenue className="mt-2.5" perfBg="#161B22" />
              <PriceLegend showtimes={showtimes} className="mt-2" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
