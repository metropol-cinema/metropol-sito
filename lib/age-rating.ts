/**
 * Etichetta per l'età consigliata che arriva dalla read-API (`film.ageRating`).
 *
 * La sigla la decide il gestionale — trovata su TMDB all'import o scelta a mano
 * in dashboard (sezione Programmazione) quando TMDB non ha la classificazione
 * italiana. Qui si fa solo la glossa: nessun calcolo, nessuna fonte alternativa.
 * Se l'API manda `null`, sulla scheda non compare nulla.
 */

export interface AgeRating {
  /** Sigla breve per il badge, es. "T", "14+". */
  code: string;
  /** Etichetta estesa, es. "Non adatto ai minori di 14 anni". */
  label: string;
}

/** Classificazione italiana in vigore dal 2021. */
const LABELS: Record<string, string> = {
  T: 'Per tutti',
  '6+': 'Non adatto ai minori di 6 anni',
  '12+': 'Non adatto ai minori di 12 anni',
  '14+': 'Non adatto ai minori di 14 anni',
  '18+': 'Vietato ai minori di 18 anni',
};

/**
 * Età consigliata pronta da mostrare, o null se il film non ne ha una.
 * Una sigla che non conosciamo viene mostrata così com'è invece di essere
 * scartata: il contratto dell'API è additivo e potrebbe crescere.
 */
export function ageRatingFor(code: string | null | undefined): AgeRating | null {
  if (!code) return null;
  const trimmed = code.trim();
  if (!trimmed) return null;
  return { code: trimmed, label: LABELS[trimmed] ?? 'Classificazione italiana' };
}
