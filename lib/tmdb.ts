/**
 * Arricchimento immagini da TMDB (backdrop orizzontale per gli hero, poster
 * ottimizzato). SOLO server-side. Degrada con grazia: senza TMDB_API_KEY o
 * tmdbId ritorna null e il sito usa la locandina data-URI di Cinebot.
 */

export interface TmdbMedia {
  backdropUrl: string | null;
  posterUrl: string | null;
}

export async function fetchTmdbMedia(tmdbId: string | null): Promise<TmdbMedia | null> {
  const key = process.env.TMDB_API_KEY;
  if (!key || !tmdbId) return null;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(tmdbId)}?api_key=${key}`,
      // Le immagini di un film non cambiano: cache lunga (24h).
      { next: { revalidate: 86_400 } }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { backdrop_path?: string | null; poster_path?: string | null };
    return {
      backdropUrl: json.backdrop_path ? `https://image.tmdb.org/t/p/w1280${json.backdrop_path}` : null,
      posterUrl: json.poster_path ? `https://image.tmdb.org/t/p/w500${json.poster_path}` : null,
    };
  } catch {
    return null;
  }
}
