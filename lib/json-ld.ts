/**
 * Serializzazione sicura dei dati strutturati schema.org da iniettare in un
 * `<script type="application/ld+json">`.
 *
 * `JSON.stringify` NON fa escape di `<`, `>` e `&`: un valore che contiene
 * `</script>` chiude il tag e tutto ciò che segue viene interpretato come HTML.
 * Nel JSON-LD delle pagine film finiscono titolo, regista, descrizione, sala e
 * etichette di prezzo, che arrivano dal gestionale (payload Cinebot, import
 * TMDB, inserimenti manuali): dati di cui il sito non è la fonte, quindi da
 * trattare come non fidati.
 *
 * Gli escape `<` / `>` / `&` sono JSON valido e vengono
 * interpretati correttamente dai parser di dati strutturati.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
