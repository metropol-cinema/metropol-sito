/**
 * Id del video YouTube da un URL. Il gestionale espone il trailer come URL
 * completo (`https://www.youtube.com/watch?v=…`), TMDB come sola chiave: questa
 * funzione accetta entrambe le forme e scarta tutto il resto.
 */
export function youtubeIdFrom(input: string | null | undefined): string | null {
  if (!input) return null;
  const value = input.trim();

  // Già una chiave nuda (11 caratteri dell'alfabeto YouTube).
  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = url.pathname.slice(1);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const v = url.searchParams.get('v');
      if (v && /^[\w-]{11}$/.test(v)) return v;
      // /embed/ID e /v/ID
      const match = url.pathname.match(/^\/(?:embed|v)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {
    // Non è un URL: nessun trailer.
  }
  return null;
}

/**
 * URL di embed senza cookie di profilazione: il player viene montato solo dopo
 * il click dell'utente (vedi `components/trailer.tsx`), così la pagina non
 * contatta YouTube finché non serve.
 *
 * Con `sottotitoli: true` il player parte con i sottotitoli già accesi
 * (`cc_load_policy`), preferendo l'italiano. È un parametro del player e
 * funziona qui, nel video incorporato — sulla pagina di YouTube conterebbero
 * anche le preferenze di chi guarda.
 */
export function youtubeEmbedUrl(id: string, opzioni: { sottotitoli?: boolean } = {}): string {
  const p = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    hl: 'it',
  });
  if (opzioni.sottotitoli) {
    p.set('cc_load_policy', '1');
    p.set('cc_lang_pref', 'it');
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`;
}
