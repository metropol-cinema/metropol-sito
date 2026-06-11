import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import type { PublicFilm } from '@/lib/programmazione-client';
import { formatDayIt } from '@/lib/programmazione-client';

/** Card a locandina per i film in arrivo: poster, titolo, "Dal <giorno>". */
export function FilmPosterCard({ film }: { film: PublicFilm }) {
  const first = film.showtimes[0];
  return (
    <Link
      href={`/film/${film.id}`}
      className="group overflow-hidden rounded-xl border border-cinema-border bg-cinema-surface transition-colors hover:border-cinema-accent/50"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-cinema-surface-2">
        {film.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={film.poster}
            alt={`Locandina di ${film.title}`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-cinema-text-subtle">
            <Clapperboard className="h-10 w-10" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 font-semibold leading-tight text-cinema-text">{film.title}</h3>
        {first && (
          <p className="mt-1 text-xs capitalize text-cinema-accent">
            Dal {formatDayIt(first.startsAt)}
          </p>
        )}
      </div>
    </Link>
  );
}
