/**
 * Client tipizzato per la read-API della Programmazione del Cinema Metropol.
 * SOLO server-side: il token non deve mai finire nel bundle client.
 *
 * Env:
 *   PROGRAMMAZIONE_API_URL   = https://app.cinemametropol.it/api/public/programmazione
 *   PROGRAMMAZIONE_API_TOKEN = <stesso valore di CINEBOT_WEBHOOK_TOKEN del gestionale>
 */

export interface PublicPrice {
  label: string;
  type: string;
  amount: number;
}

export interface PublicShowtime {
  /** Id evento Cinebot: serve per il deep-link di acquisto biglietti. */
  sourceId: number;
  /** Inizio in ISO 8601 UTC. Converti a Europe/Rome per la visualizzazione. */
  startsAt: string;
  /** Sala/luogo della proiezione (es. il Castello per la rassegna estiva). */
  venue: string | null;
  prices: PublicPrice[];
}

export interface PublicFilm {
  id: number;
  title: string;
  director: string | null;
  distributor: string | null;
  description: string | null;
  durationMinutes: number | null;
  tmdbId: string | null;
  /** Locandina come data-URI `data:image/jpeg;base64,…`, o null. */
  poster: string | null;
  showtimes: PublicShowtime[];
}

export interface ProgrammazioneResponse {
  ok: boolean;
  count?: number;
  films?: PublicFilm[];
  error?: string;
}

export interface FetchProgrammazioneOptions {
  from?: string;
  to?: string;
  days?: number;
  posters?: boolean;
  signal?: AbortSignal;
  /** Secondi di cache ISR (Next.js). Default 600. */
  revalidate?: number;
}

function config(): { baseUrl: string; token: string } {
  const baseUrl = process.env.PROGRAMMAZIONE_API_URL;
  const token = process.env.PROGRAMMAZIONE_API_TOKEN;
  if (!baseUrl) throw new Error('PROGRAMMAZIONE_API_URL non impostata');
  if (!token) throw new Error('PROGRAMMAZIONE_API_TOKEN non impostata');
  return { baseUrl, token };
}

export async function fetchProgrammazione(
  opts: FetchProgrammazioneOptions = {}
): Promise<PublicFilm[]> {
  const { baseUrl, token } = config();
  const url = new URL(baseUrl);
  url.searchParams.set('token', token);
  if (opts.from) url.searchParams.set('from', opts.from);
  if (opts.to) url.searchParams.set('to', opts.to);
  if (opts.days != null) url.searchParams.set('days', String(opts.days));
  if (opts.posters === false) url.searchParams.set('posters', 'false');

  const res = await fetch(url, {
    method: 'GET',
    headers: { accept: 'application/json' },
    signal: opts.signal,
    next: { revalidate: opts.revalidate ?? 600 },
  });

  const json = (await res.json().catch(() => null)) as ProgrammazioneResponse | null;
  if (!res.ok || !json?.ok) {
    throw new Error(json?.error ?? `Programmazione API: HTTP ${res.status}`);
  }
  return json.films ?? [];
}

export async function fetchProgrammazioneWeek(
  reference: Date = new Date(),
  opts: Omit<FetchProgrammazioneOptions, 'from' | 'to' | 'days'> = {}
): Promise<PublicFilm[]> {
  const { sunday } = currentWeekRange(reference);
  // Niente `from`: l'API parte da adesso, così le proiezioni già passate
  // della settimana non compaiono (né come hero né nelle card).
  return fetchProgrammazione({ ...opts, to: sunday });
}

export function currentWeekRange(d: Date): { monday: string; sunday: string } {
  const day = d.getDay();
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (x: Date) => x.toISOString().slice(0, 10);
  return { monday: fmt(monday), sunday: fmt(sunday) };
}

/** "gio 11 giu · 21:00" in ora italiana. */
export function formatShowtimeIt(startsAtIso: string): string {
  const d = new Date(startsAtIso);
  const date = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(d);
  const time = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
  return `${date} · ${time}`;
}

/** Etichetta giorno per raggruppare, es. "giovedì 11 giugno". */
export function formatDayIt(startsAtIso: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(startsAtIso));
}

/** Solo l'orario in ora italiana, es. "21:00". */
export function formatTimeIt(startsAtIso: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(startsAtIso));
}

/** Giorno in Europe/Rome come "YYYY-MM-DD", per raggruppare le proiezioni. */
export function romeDayKey(startsAtIso: string): string {
  // en-CA produce direttamente il formato YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(startsAtIso));
}

/** True se la proiezione cade di venerdì (in ora italiana). */
export function isFridayRome(startsAtIso: string): boolean {
  return (
    new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Rome', weekday: 'short' }).format(
      new Date(startsAtIso)
    ) === 'Fri'
  );
}
