import Link from 'next/link';

import {
  formatTimeIt,
  romeDayKey,
  weekDays,
  type PublicFilm,
} from '@/lib/programmazione-client';
import { cn } from '@/lib/utils';

/**
 * Il quadro della settimana: lunedì → domenica, i giorni con proiezione accesi
 * in oro con gli orari, quelli di chiusura spenti.
 *
 * È la firma del sito perché dice una cosa vera di questa sala: uno schermo
 * solo, e una settimana che si legge in un colpo d'occhio. Fa anche da
 * navigazione verso il giorno corrispondente in /programmazione.
 */
export function WeekRail({ films, className }: { films: PublicFilm[]; className?: string }) {
  const days = weekDays();
  const today = romeDayKey(new Date().toISOString());

  // Orari per giorno, in ordine, senza duplicati (più film nello stesso giorno).
  const timesByDay = new Map<string, string[]>();
  for (const film of films) {
    for (const s of film.showtimes) {
      const key = romeDayKey(s.startsAt);
      const list = timesByDay.get(key) ?? [];
      list.push(s.startsAt);
      timesByDay.set(key, list);
    }
  }

  const dayName = (key: string) =>
    new Intl.DateTimeFormat('it-IT', { timeZone: 'UTC', weekday: 'short' })
      .format(new Date(`${key}T12:00:00Z`))
      .replace('.', '');
  const dayNumber = (key: string) => Number.parseInt(key.slice(8), 10);

  return (
    <section aria-labelledby="settimana-titolo" className={cn('border-y border-cinema-border', className)}>
      <div className="marquee-rule h-px w-full" aria-hidden="true" />
      <div className="container py-5">
        <h2 id="settimana-titolo" className="eyebrow font-utility">
          La settimana in sala
        </h2>
        <ul className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {days.map((key) => {
            const times = (timesByDay.get(key) ?? []).sort();
            const open = times.length > 0;
            const isToday = key === today;
            const past = key < today;

            const cell = (
              <>
                <span
                  className={cn(
                    'font-utility text-[0.6rem] font-semibold uppercase tracking-marquee sm:text-[0.68rem]',
                    open ? 'text-cinema-ticket' : 'text-cinema-text-subtle'
                  )}
                >
                  {dayName(key)}
                </span>
                <span
                  className={cn(
                    'mt-0.5 font-display text-xl font-black leading-none tabular-nums sm:text-2xl',
                    open ? 'text-cinema-text' : 'text-cinema-text-subtle'
                  )}
                >
                  {dayNumber(key)}
                </span>

                {open ? (
                  <>
                    {/* Mobile: un punto d'oro. Da sm in su: gli orari veri. */}
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-cinema-ticket sm:hidden"
                    />
                    <span className="mt-1.5 hidden flex-col gap-0.5 sm:flex">
                      {times.slice(0, 3).map((iso) => (
                        <time
                          key={iso}
                          dateTime={iso}
                          className="font-utility text-xs font-semibold tabular-nums text-cinema-ticket"
                        >
                          {formatTimeIt(iso)}
                        </time>
                      ))}
                    </span>
                  </>
                ) : (
                  <span className="mt-2 text-cinema-text-subtle/50" aria-hidden="true">
                    ·
                  </span>
                )}
              </>
            );

            const shellClass = cn(
              'flex h-full flex-col items-center rounded-xl border px-1 py-3 text-center transition-colors sm:px-2',
              open
                ? 'border-cinema-ticket/35 bg-cinema-ticket/[0.06]'
                : 'border-cinema-border bg-cinema-surface/40',
              isToday && 'ring-1 ring-cinema-ticket',
              past && 'opacity-45'
            );

            return (
              <li key={key} className="min-w-0">
                {open ? (
                  <Link
                    href={`/programmazione#${key}`}
                    className={cn(shellClass, 'hover:border-cinema-ticket hover:bg-cinema-ticket/10')}
                  >
                    {cell}
                    <span className="sr-only">
                      {isToday ? 'Oggi, ' : ''}
                      {times.length} {times.length === 1 ? 'proiezione' : 'proiezioni'} — vai al
                      programma del giorno
                    </span>
                  </Link>
                ) : (
                  <div className={shellClass}>
                    {cell}
                    <span className="sr-only">
                      {isToday ? 'Oggi, ' : ''}sala chiusa, nessuna proiezione
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
