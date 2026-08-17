/**
 * Età consigliata di un film, dalla classificazione TMDB.
 *
 * Si preferisce sempre la classificazione **italiana** (dal 2021: T, 6+, 14+,
 * 18+; nei dati più vecchi compare ancora la forma VM6/VM14/VM18). Se manca si
 * ripiega su quella statunitense, dichiarandolo: un "PG-13" non è un divieto
 * italiano e non va spacciato per tale.
 */

export interface AgeRating {
  /** Sigla breve da mettere nel badge, es. "T", "14+". */
  code: string;
  /** Etichetta estesa, es. "Vietato ai minori di 14 anni". */
  label: string;
  /** Nota sulla fonte quando non è la classificazione italiana. */
  note: string | null;
}

const IT_RATINGS: Record<string, { code: string; label: string }> = {
  T: { code: 'T', label: 'Per tutti' },
  '6+': { code: '6+', label: 'Non adatto ai minori di 6 anni' },
  VM6: { code: '6+', label: 'Non adatto ai minori di 6 anni' },
  '12+': { code: '12+', label: 'Non adatto ai minori di 12 anni' },
  VM12: { code: '12+', label: 'Non adatto ai minori di 12 anni' },
  '14+': { code: '14+', label: 'Non adatto ai minori di 14 anni' },
  VM14: { code: '14+', label: 'Non adatto ai minori di 14 anni' },
  '18+': { code: '18+', label: 'Vietato ai minori di 18 anni' },
  VM18: { code: '18+', label: 'Vietato ai minori di 18 anni' },
};

const US_RATINGS: Record<string, { code: string; label: string }> = {
  G: { code: 'G', label: 'Per tutti' },
  PG: { code: 'PG', label: 'Visione con un adulto consigliata' },
  'PG-13': { code: 'PG-13', label: 'Non adatto sotto i 13 anni' },
  R: { code: 'R', label: 'Sotto i 17 anni solo con un adulto' },
  'NC-17': { code: 'NC-17', label: 'Vietato ai minori di 18 anni' },
};

const US_NOTE = 'classificazione statunitense';

/**
 * Prima certificazione utile tra quelle di un Paese: TMDB elenca più uscite
 * (cinema, home video…) e per alcune la certificazione è la stringa vuota.
 */
function firstCertification(codes: string[]): string | null {
  for (const raw of codes) {
    const code = raw.trim();
    if (code) return code;
  }
  return null;
}

/**
 * Risolve l'età consigliata dai `release_dates` di TMDB.
 * Ritorna null se nessuna classificazione è disponibile: in quel caso il badge
 * non va mostrato affatto, meglio il silenzio di un dato inventato.
 */
export function resolveAgeRating(
  releaseDates: Array<{ iso_3166_1?: string; release_dates?: Array<{ certification?: string }> }>
): AgeRating | null {
  const byCountry = (iso: string) =>
    firstCertification(
      releaseDates
        .filter((r) => r.iso_3166_1 === iso)
        .flatMap((r) => (r.release_dates ?? []).map((d) => d.certification ?? ''))
    );

  const it = byCountry('IT');
  if (it) {
    const known = IT_RATINGS[it.toUpperCase()];
    // Sigla italiana non in tabella: la mostriamo com'è, senza inventare la glossa.
    return known
      ? { ...known, note: null }
      : { code: it, label: 'Classificazione italiana', note: null };
  }

  const us = byCountry('US');
  if (us) {
    const known = US_RATINGS[us.toUpperCase()];
    if (known) return { ...known, note: US_NOTE };
  }

  return null;
}
