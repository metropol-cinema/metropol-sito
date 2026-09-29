import type { PublicFilm } from './programmazione-client';

/**
 * Anno, generi, paesi e cast di un film.
 *
 * Li decide il gestionale: li legge da TMDB e l'associazione li corregge in
 * dashboard (il genere soprattutto, che TMDB nomina a modo suo). Quindi
 * comanda il valore dell'API, anche quando è `null` — vuol dire «non c'è», e
 * allora non si mostra niente, come per l'età consigliata.
 *
 * TMDB letto dal sito resta la riserva solo quando il campo è ASSENTE, cioè
 * con una risposta dell'API precedente al 29 settembre 2026: così un sito
 * aggiornato prima del gestionale non perde anno e generi che mostrava già.
 */

/** Quello che TMDB dà al sito al volo (`lib/tmdb.ts`), per la riserva. */
interface TmdbLive {
  releaseYear: number | null;
  genres: string[];
}

export function filmYear(film: PublicFilm, details?: TmdbLive | null): number | null {
  if (film.year !== undefined) return film.year;
  return details?.releaseYear ?? null;
}

export function filmGenres(film: PublicFilm, details?: TmdbLive | null): string | null {
  if (film.genres !== undefined) return film.genres;
  const genres = (details?.genres ?? []).slice(0, 2);
  return genres.length > 0 ? genres.join(', ') : null;
}

/** «Stati Uniti, Canada» → ["Stati Uniti", "Canada"], per i dati strutturati. */
export function splitList(value: string | null | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}
