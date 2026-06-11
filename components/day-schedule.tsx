import { Clapperboard, Ticket } from 'lucide-react';
import Link from 'next/link';

import type { PublicFilm, PublicShowtime } from '@/lib/programmazione-client';
import { formatDayIt, formatTimeIt, romeDayKey } from '@/lib/programmazione-client';
import { ticketUrlFor } from '@/lib/tickets';
import { formatEuro } from '@/lib/utils';

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
  return (
    <section>
      <h2 className="text-lg font-bold capitalize tracking-tight text-cinema-text sm:text-xl">
        {formatDayIt(entries[0].showtimes[0].startsAt)}
      </h2>
      <div className="mt-3 space-y-3">
        {entries.map(({ film, showtimes }) => (
          <article
            key={`${dayKey}-${film.id}`}
            className="flex gap-4 rounded-xl border border-cinema-border bg-cinema-surface p-4"
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
                <Link href={`/film/${film.id}`} className="text-cinema-text hover:text-cinema-accent-hover">
                  {film.title}
                </Link>
              </h3>
              <p className="mt-0.5 text-xs text-cinema-text-subtle">
                {[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2" aria-label={`Orari di ${film.title}`}>
                {showtimes.map((s) => {
                  const buyUrl = ticketUrlFor(s.sourceId);
                  return (
                    <li
                      key={s.sourceId}
                      className="rounded-lg border border-cinema-border bg-cinema-bg px-3 py-1.5"
                    >
                      <time dateTime={s.startsAt} className="text-sm font-semibold text-cinema-text">
                        {formatTimeIt(s.startsAt)}
                      </time>
                      {s.prices.length > 0 && (
                        <span className="ml-2 text-xs text-cinema-text-subtle">
                          {s.prices.map((p) => `${p.label} ${formatEuro(p.amount)}`).join(' · ')}
                        </span>
                      )}
                      {buyUrl && (
                        <a
                          href={buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Acquista biglietti per ${film.title}, ore ${formatTimeIt(s.startsAt)} (si apre in una nuova scheda)`}
                          className="ml-2 inline-flex items-center gap-1 rounded-md bg-cinema-accent/15 px-2 py-0.5 text-xs font-semibold text-cinema-accent-hover hover:bg-cinema-accent/25"
                        >
                          <Ticket className="h-3 w-3" aria-hidden="true" /> Acquista
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
