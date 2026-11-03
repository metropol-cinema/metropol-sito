/**
 * «Oggi» / «Domani» a partire dalla chiave del giorno (`YYYY-MM-DD`, Europe/Rome).
 *
 * Sta in un file suo perché serve anche nel browser: la pagina è in cache, e su
 * un sito con poche visite la prima del mattino riceve la copia di ieri sera,
 * dove «Oggi» vuol dire ieri. `lib/programmazione-client.ts` non si può importare
 * da un componente client: è solo server-side.
 */
export function relativeDayOfKey(dayKey: string, reference: Date = new Date()): 'Oggi' | 'Domani' | null {
  // en-CA produce direttamente il formato YYYY-MM-DD.
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(reference);
  if (dayKey === today) return 'Oggi';
  // Mezzogiorno UTC: nessun cambio d'ora può far scivolare il giorno.
  const tomorrow = new Date(`${today}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return dayKey === tomorrow.toISOString().slice(0, 10) ? 'Domani' : null;
}
