import { FilmPosterCard } from '@/components/film-poster-card';
import type { PublicFilm } from '@/lib/programmazione-client';
import { cn } from '@/lib/utils';

/**
 * Muro di locandine per i film in arrivo.
 *
 * Larghezza fissa oltre il mobile invece di una griglia a colonne: con un film
 * solo in arrivo — capita spesso, questa sala ne tiene pochi per volta — una
 * griglia a sei colonne lascerebbe una locandina sperduta accanto a un vuoto.
 */
export function PosterGrid({
  films,
  prominent = false,
  titleAs,
  className,
}: {
  films: PublicFilm[];
  prominent?: boolean;
  /** Vedi FilmPosterCard. */
  titleAs?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap gap-5', className)}>
      {films.map((film) => (
        <li
          key={film.id}
          className={cn(
            'w-[calc(50%-0.625rem)]',
            prominent ? 'sm:w-52 lg:w-60' : 'sm:w-40 lg:w-44'
          )}
        >
          <FilmPosterCard film={film} prominent={prominent} titleAs={titleAs} />
        </li>
      ))}
    </ul>
  );
}
