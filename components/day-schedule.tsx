import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { AccessibleBadge } from '@/components/accessible-badge';
import { MetaLine } from '@/components/meta-line';
import { DayLabel, PriceLegend, Showtimes } from '@/components/showtimes';
import type { PublicFilm, PublicShowtime } from '@/lib/programmazione-client';
import { formatDayShortIt, romeDayKey } from '@/lib/programmazione-client';

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

/**
 * I giorni in cima alla pagina: un tocco porta alla `<section>` di quel giorno.
 * Con un giorno solo non c'è dove saltare.
 */
export function DayJump({ days }: { days: Array<{ dayKey: string; entries: DayEntry[] }> }) {
  if (days.length < 2) return null;
  return (
    <nav aria-label="Vai al giorno" className="mb-8 flex flex-wrap gap-2">
      {days.map(({ dayKey, entries }) => (
        <a
          key={dayKey}
          href={`#${dayKey}`}
          className="inline-flex min-h-11 items-center rounded-lg border border-cinema-border-strong bg-cinema-surface px-3 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
        >
          {formatDayShortIt(entries[0].showtimes[0].startsAt)}
        </a>
      ))}
    </nav>
  );
}

/** Programmazione di un giorno: riga per film con orari, prezzi e acquisto. */
export function DaySchedule({ dayKey, entries }: { dayKey: string; entries: DayEntry[] }) {
  const firstStart = entries[0].showtimes[0].startsAt;

  return (
    // L'id è la chiave giorno: permalink condivisibile a un singolo giorno
    // (es. /programmazione#2026-08-22).
    <section id={dayKey} className="scroll-mt-28">
      {/* La data resta in vista sotto la testata mentre si scorre: i film si
          somigliano tutti, e a metà pagina non si sa più di che giorno sono. */}
      <h2 className="sticky top-[calc(4.5rem+3px)] z-20 -mx-6 bg-cinema-bg/95 px-6 py-2 backdrop-blur-sm">
        <DayLabel startsAt={firstStart} />
      </h2>
      <div className="mt-2 space-y-4">
        {entries.map(({ film, showtimes }) => (
          <article
            key={`${dayKey}-${film.id}`}
            className="group flex gap-5 rounded-2xl border border-cinema-border bg-cinema-surface p-5 transition-colors hover:border-cinema-ticket-ink/45"
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
                  className="text-cinema-text transition-colors hover:text-cinema-ticket-ink"
                >
                  {film.title}
                </Link>
              </h3>
              <MetaLine
                items={[film.director, film.durationMinutes ? `${film.durationMinutes}′` : null]}
                className="mt-1.5"
              >
                {film.isAccessible && <AccessibleBadge />}
              </MetaLine>
              <Showtimes
                film={film}
                showtimes={showtimes}
                showVenue
                linkToFilm
                className="mt-4"
                perfBg="rgb(var(--c-surface))"
              />
              <PriceLegend showtimes={showtimes} className="mt-2.5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
