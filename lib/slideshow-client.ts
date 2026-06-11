/**
 * Client per la timeline dello slideshow della home, gestita dalla Dashboard
 * del gestionale (sezione "Sito Web → Slideshow") ed esposta dalla read-API
 * `/api/public/sito-slideshow`. SOLO server-side.
 *
 * L'endpoint vive accanto a quello della programmazione: l'URL si deriva da
 * PROGRAMMAZIONE_API_URL sostituendo l'ultimo segmento. Stesso token.
 *
 * Contratto (vedi gestionale, docs/specs/sito-web-slideshow.md):
 *   { ok: true, items: [{ id, kind, durationSeconds, mediaUrl, caption, fallbackOnly }] }
 *
 * Se l'endpoint non esiste ancora, è vuoto o errato → null: la home usa la
 * timeline di default (solo programmazione corrente, il comportamento storico).
 */

export type SlideshowKind = 'current_programming' | 'future_programming' | 'video' | 'image';

export interface SlideshowItem {
  id: number;
  kind: SlideshowKind;
  /** Permanenza della slide a video, in secondi. */
  durationSeconds: number;
  /** URL del media per kind video/image; null per le slide di programmazione. */
  mediaUrl: string | null;
  /** Didascalia opzionale sovrimpressa al media. */
  caption: string | null;
  /** Se true, la slide compare SOLO quando nessuna slide di programmazione ha contenuto. */
  fallbackOnly: boolean;
}

const KINDS: SlideshowKind[] = ['current_programming', 'future_programming', 'video', 'image'];

export async function fetchSlideshow(): Promise<SlideshowItem[] | null> {
  const base = process.env.PROGRAMMAZIONE_API_URL;
  const token = process.env.PROGRAMMAZIONE_API_TOKEN;
  if (!base || !token) return null;

  const endpoint = base.replace(/\/programmazione\/?$/, '/sito-slideshow');
  if (endpoint === base) return null;

  const url = new URL(endpoint);
  url.searchParams.set('token', token);

  try {
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const json = (await res.json().catch(() => null)) as {
      ok?: boolean;
      items?: unknown[];
    } | null;
    if (!json?.ok || !Array.isArray(json.items)) return null;

    const items: SlideshowItem[] = [];
    for (const raw of json.items) {
      const it = raw as Partial<SlideshowItem>;
      if (typeof it.id !== 'number' || !KINDS.includes(it.kind as SlideshowKind)) continue;
      items.push({
        id: it.id,
        kind: it.kind as SlideshowKind,
        durationSeconds:
          typeof it.durationSeconds === 'number' && it.durationSeconds >= 3
            ? it.durationSeconds
            : 10,
        mediaUrl: typeof it.mediaUrl === 'string' && it.mediaUrl ? it.mediaUrl : null,
        caption: typeof it.caption === 'string' && it.caption ? it.caption : null,
        fallbackOnly: it.fallbackOnly === true,
      });
    }
    return items;
  } catch {
    return null;
  }
}
