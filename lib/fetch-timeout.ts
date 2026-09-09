/**
 * Il tempo massimo che concediamo a una API esterna, e il segnale che glielo
 * fa rispettare.
 *
 * `fetch` di suo non si arrende mai. Se il gestionale o TMDB accettano la
 * connessione e poi restano zitti, la richiesta resta appesa finché non scade
 * la funzione su Vercel — e a quel punto la pagina non è più una pagina: è un
 * errore, e chi passava di qui si trova la rete di sicurezza
 * (`app/global-error.tsx`) al posto del cartellone. Con un limite nostro, più
 * corto di quello della piattaforma, il guasto lo governiamo noi: la chiamata
 * lancia, e chi l'ha fatta decide cosa mostrare al suo posto.
 *
 * I numeri non sono tondi per caso. Il gestionale con le locandine in base64
 * risponde in un paio di secondi: otto sono larghissimi, scattano solo se
 * qualcosa è davvero fermo. TMDB è un di più — backdrop, generi, fotogallery —
 * e la home ne fa una chiamata per film: lì il limite è più stretto, perché
 * aspettare un ornamento è il modo peggiore di spendere il tempo di chi legge.
 *
 * NOTA: durante una rigenerazione ISR in sottofondo Next toglie il segnale, e
 * fa bene — lì nessuno sta aspettando. Il limite vale per il render bloccante,
 * cioè esattamente quello che qualcuno sta guardando.
 */

/** Le read-API del gestionale (programmazione, slideshow, corsi). */
export const TIMEOUT_GESTIONALE = 8_000;
/** TMDB: arricchimento, non contenuto. Se tarda, se ne fa a meno. */
export const TIMEOUT_TMDB = 4_000;

/**
 * Il segnale da passare a `fetch`. Se chi chiama ne ha già uno suo (una
 * richiesta annullata a metà), valgono tutti e due: si ferma al primo che
 * scatta.
 */
export function withTimeout(ms: number, signal?: AbortSignal): AbortSignal {
  const scadenza = AbortSignal.timeout(ms);
  return signal ? AbortSignal.any([signal, scadenza]) : scadenza;
}

/** Vero se l'errore è il nostro limite di tempo, non un guasto della rete. */
export function isTimeout(e: unknown): boolean {
  return e instanceof Error && e.name === 'TimeoutError';
}
