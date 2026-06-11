import { FilmPosterCard } from '@/components/film-poster-card';
import type { PublicFilm } from '@/lib/programmazione-client';

/** Slide "Prossimamente" dello slideshow: locandine dei film in arrivo. */
export function HeroUpcoming({ films }: { films: PublicFilm[] }) {
  return (
    <div className="border-b border-cinema-border bg-gradient-to-br from-cinema-accent/10 via-cinema-bg to-cinema-bg">
      <div className="container py-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-cinema-accent-hover">
          Prossimamente
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-cinema-text sm:text-3xl">
          In arrivo al Metropol
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {films.slice(0, 4).map((film) => (
            <FilmPosterCard key={film.id} film={film} />
          ))}
        </div>
      </div>
    </div>
  );
}
