/**
 * Arricchimento del film da TMDB: backdrop per gli hero, poster ottimizzato,
 * generi, tagline, anno, età consigliata, fotogallery e trailer di riserva.
 * SOLO server-side. Degrada con grazia: senza TMDB_API_KEY o senza tmdbId
 * ritorna null e il sito resta su locandina e testi di Cinebot.
 *
 * Una sola richiesta per film (`append_to_response`): immagini, classificazioni
 * e video arrivano insieme ai dettagli.
 */

import { resolveAgeRating, type AgeRating } from '@/lib/age-rating';

export interface TmdbImage {
  /** Versione a piena larghezza, per il lightbox. */
  url: string;
  /** Miniatura per lo scroller della gallery. */
  thumbUrl: string;
  width: number;
  height: number;
}

export interface TmdbDetails {
  backdropUrl: string | null;
  posterUrl: string | null;
  tagline: string | null;
  /** Sinossi italiana di TMDB: usata solo se il gestionale non ne ha una. */
  overview: string | null;
  releaseYear: number | null;
  genres: string[];
  ageRating: AgeRating | null;
  /** Fotogrammi di scena, senza testo sovrimpresso quando possibile. */
  gallery: TmdbImage[];
  /** Chiave YouTube del trailer, italiano se disponibile. */
  trailerKey: string | null;
}

const IMG = 'https://image.tmdb.org/t/p';
const MAX_GALLERY = 12;

interface RawImage {
  file_path?: string;
  width?: number;
  height?: number;
  iso_639_1?: string | null;
  vote_average?: number;
}

interface RawVideo {
  key?: string;
  site?: string;
  type?: string;
  official?: boolean;
  iso_639_1?: string;
}

interface RawMovie {
  backdrop_path?: string | null;
  poster_path?: string | null;
  tagline?: string | null;
  overview?: string | null;
  release_date?: string | null;
  genres?: Array<{ name?: string }>;
  images?: { backdrops?: RawImage[] };
  release_dates?: { results?: Array<{ iso_3166_1?: string; release_dates?: Array<{ certification?: string }> }> };
  videos?: { results?: RawVideo[] };
}

/**
 * Trailer di riserva (la fonte principale è il `trailerUrl` del gestionale).
 * Si accettano solo Trailer e Teaser — "Behind the Scenes" e "Featurette" non
 * sono trailer nemmeno in italiano. A parità di tipo vince l'italiano, poi
 * l'ufficiale.
 */
function pickTrailer(videos: RawVideo[]): string | null {
  const usable = videos.filter(
    (v) => v.site === 'YouTube' && v.key && (v.type === 'Trailer' || v.type === 'Teaser')
  );
  const rank = (v: RawVideo) =>
    (v.type === 'Trailer' ? 0 : 4) + (v.iso_639_1 === 'it' ? 0 : 2) + (v.official ? 0 : 1);
  return [...usable].sort((a, b) => rank(a) - rank(b))[0]?.key ?? null;
}

/**
 * Fotogallery: i fotogrammi senza testo sovrimpresso (iso_639_1 null) sono i
 * migliori — le versioni "con titolo" sono locandine orizzontali, non scene.
 * Se non bastano, si completano con le altre.
 */
function pickGallery(backdrops: RawImage[], excludePath: string | null): TmdbImage[] {
  const usable = backdrops.filter((b) => b.file_path && b.file_path !== excludePath);
  const clean = usable.filter((b) => !b.iso_639_1);
  const ordered = [...clean, ...usable.filter((b) => b.iso_639_1)];
  return ordered.slice(0, MAX_GALLERY).map((b) => ({
    url: `${IMG}/w1280${b.file_path}`,
    thumbUrl: `${IMG}/w780${b.file_path}`,
    width: b.width ?? 1280,
    height: b.height ?? 720,
  }));
}

export async function fetchTmdbDetails(tmdbId: string | null): Promise<TmdbDetails | null> {
  const key = process.env.TMDB_API_KEY;
  if (!key || !tmdbId) return null;

  const url = new URL(`https://api.themoviedb.org/3/movie/${encodeURIComponent(tmdbId)}`);
  url.searchParams.set('api_key', key);
  url.searchParams.set('language', 'it-IT');
  url.searchParams.set('append_to_response', 'images,release_dates,videos');
  // Le immagini sono filtrate per lingua: `null` = fotogrammi senza testo.
  url.searchParams.set('include_image_language', 'it,en,null');
  url.searchParams.set('include_video_language', 'it,en');

  try {
    // I dati di un film non cambiano: cache lunga (24h).
    const res = await fetch(url, { next: { revalidate: 86_400 } });
    if (!res.ok) return null;
    const json = (await res.json()) as RawMovie;

    const backdrop = json.backdrop_path ?? null;
    return {
      backdropUrl: backdrop ? `${IMG}/w1280${backdrop}` : null,
      posterUrl: json.poster_path ? `${IMG}/w500${json.poster_path}` : null,
      tagline: json.tagline?.trim() || null,
      overview: json.overview?.trim() || null,
      releaseYear: json.release_date ? Number.parseInt(json.release_date.slice(0, 4), 10) : null,
      genres: (json.genres ?? []).map((g) => g.name).filter((n): n is string => Boolean(n)),
      ageRating: resolveAgeRating(json.release_dates?.results ?? []),
      gallery: pickGallery(json.images?.backdrops ?? [], backdrop),
      trailerKey: pickTrailer(json.videos?.results ?? []),
    };
  } catch {
    return null;
  }
}
