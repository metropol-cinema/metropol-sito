import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import type { PublicFilm } from '@/lib/programmazione-client';
import { formatDayIt } from '@/lib/programmazione-client';
import { cn } from '@/lib/utils';

/**
 * Card a locandina per i film in arrivo: la locandina fa quasi tutto, sotto
 * restano titolo e giorno d'inizio. `prominent` la ingrandisce per quando
 * "Prossimamente" è la sezione principale della home (settimana senza film).
 */
export function FilmPosterCard({
  film,
  prominent = false,
}: {
  film: PublicFilm;
  prominent?: boolean;
}) {
  const first = film.showtimes[0];

  return (
    <Link href={`/film/${film.id}`} className="group block">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-cinema-border bg-cinema-surface-2 shadow-lg shadow-black/40 transition-colors group-hover:border-cinema-ticket/60">
        {film.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={film.poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
            <Clapperboard className="h-10 w-10" aria-hidden="true" />
          </div>
        )}
        {/* Il fondo della locandina sfuma nel nero della sala. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cinema-bg/80 to-transparent"
        />
      </div>

      <h3
        className={cn(
          'mt-3 line-clamp-2 font-bold leading-tight text-cinema-text transition-colors group-hover:text-cinema-ticket',
          prominent ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
        )}
      >
        {film.title}
      </h3>
      {/* Un film annunciato può non avere ancora orari: meglio dirlo che
          lasciare la riga vuota. */}
      <p className="mt-1 font-utility text-[0.68rem] font-semibold uppercase tracking-wider text-cinema-ticket">
        {first ? `Dal ${formatDayIt(first.startsAt)}` : 'Date in arrivo'}
      </p>
    </Link>
  );
}
