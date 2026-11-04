/**
 * Il CineCompleanno: il pacchetto di biglietti a prezzo scontato per festeggiare
 * un compleanno al cinema con uno dei film per bambini del fine settimana.
 *
 * Le condizioni e la regola che riconosce quei film stanno qui, in un posto solo:
 * le usano la pagina e il banner nei film. Si importa anche dal browser, quindi
 * niente `lib/programmazione-client.ts` (è solo server-side), se non per i tipi.
 */

import { relativeDayOfKey } from '@/lib/giorno-relativo';
import type { PublicShowtime } from '@/lib/programmazione-client';
import { SITE } from '@/lib/site';

export const CINECOMPLEANNO = {
  href: '/cinecompleanni',
  prezzoBiglietto: 5,
  bigliettiMinimi: 10,
} as const;

/**
 * La proiezione per bambini non è un dato del gestionale: è l'orario. Sabato o
 * domenica fra le 14:00 e le 16:00, **estremi compresi** (Il Gatto col Cappello,
 * novembre 2026, è di sabato alle 16:00).
 */
const INIZIO_FASCIA = 14 * 60;
const FINE_FASCIA = 16 * 60;

/** Giorno della settimana e minuti dalla mezzanotte, in ora italiana. */
function oraDiRoma(startsAtIso: string): { giorno: string; minuti: number } {
  const parti = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(startsAtIso));
  const valore = (tipo: Intl.DateTimeFormatPartTypes) =>
    parti.find((p) => p.type === tipo)?.value ?? '';
  return {
    giorno: valore('weekday'),
    minuti: Number(valore('hour')) * 60 + Number(valore('minute')),
  };
}

export function isProiezioneBambini(startsAtIso: string): boolean {
  const { giorno, minuti } = oraDiRoma(startsAtIso);
  return (giorno === 'Sat' || giorno === 'Sun') && minuti >= INIZIO_FASCIA && minuti <= FINE_FASCIA;
}

/** Le proiezioni di un film che si possono scegliere per un CineCompleanno. */
export function proiezioniBambini(showtimes: PublicShowtime[]): PublicShowtime[] {
  return showtimes.filter((s) => isProiezioneBambini(s.startsAt));
}

/** Giorno in Europe/Rome come `YYYY-MM-DD`. */
function chiaveDiRoma(data: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(data);
}

/**
 * L'ultimo giorno per prenotare: il giovedì di quel fine settimana, come chiave
 * `YYYY-MM-DD`. Vale per tutto il giovedì, ora italiana.
 */
export function scadenzaPrenotazione(startsAtIso: string): string {
  const giorniDalGiovedi = oraDiRoma(startsAtIso).giorno === 'Sun' ? 3 : 2;
  // Mezzogiorno UTC: nessun cambio d'ora può far scivolare il giorno.
  const giovedi = new Date(`${chiaveDiRoma(new Date(startsAtIso))}T12:00:00Z`);
  giovedi.setUTCDate(giovedi.getUTCDate() - giorniDalGiovedi);
  return giovedi.toISOString().slice(0, 10);
}

/** Le scadenze delle proiezioni date, senza doppioni e dalla più vicina. */
export function scadenzeDi(showtimes: PublicShowtime[]): string[] {
  return [...new Set(proiezioniBambini(showtimes).map((s) => scadenzaPrenotazione(s.startsAt)))].sort();
}

/** "giovedì 5 novembre", da una chiave `YYYY-MM-DD` già sul calendario di Roma. */
export function formatScadenza(chiave: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${chiave}T12:00:00Z`));
}

/**
 * La prima scadenza ancora aperta, già in parole: "giovedì 5 novembre", oppure
 * "domani, giovedì 5 novembre" quando stringe. null = per queste date non si fa
 * più in tempo.
 */
export function testoScadenza(scadenze: string[], adesso: Date = new Date()): string | null {
  const oggi = chiaveDiRoma(adesso);
  const prossima = scadenze.find((s) => s >= oggi);
  if (!prossima) return null;
  const relativo = relativeDayOfKey(prossima, adesso);
  const data = formatScadenza(prossima);
  return relativo ? `${relativo.toLowerCase()}, ${data}` : data;
}

/**
 * Il prezzo più basso a cui il film si vede di solito, se è più alto di quello del
 * CineCompleanno. Si confronta col più basso apposta: un risparmio calcolato
 * sull'intero sarebbe vero solo per qualcuno.
 */
export function prezzoNormale(showtimes: PublicShowtime[]): number | null {
  const prezzi = proiezioniBambini(showtimes)
    .flatMap((s) => s.prices.map((p) => p.amount))
    .filter((importo) => importo > 0);
  if (prezzi.length === 0) return null;
  const minimo = Math.min(...prezzi);
  return minimo > CINECOMPLEANNO.prezzoBiglietto ? minimo : null;
}

/** "5 €", "7,50 €": niente decimali quando non servono, è un testo promozionale. */
export function euroBreve(importo: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(importo) ? 0 : 2,
  }).format(importo);
}

/**
 * Il sito non ha un database suo, quindi la prenotazione è un'email: già
 * impostata con quello che serve sapere, così non ci si scrive due volte.
 */
export function mailtoPrenotazione(filmTitle?: string): string {
  const oggetto = filmTitle
    ? `Prenotazione CineCompleanno: ${filmTitle}`
    : 'Prenotazione CineCompleanno';
  const corpo = [
    'Buongiorno,',
    'vorrei prenotare un CineCompleanno.',
    '',
    `Film e giorno: ${filmTitle ?? ''}`,
    `Numero di biglietti (almeno ${CINECOMPLEANNO.bigliettiMinimi}): `,
    'Nome di chi compie gli anni: ',
    'Messaggio personalizzato: ',
    'Un numero di telefono per ricontattarmi: ',
    '',
    'Grazie!',
  ].join('\n');
  return `mailto:${SITE.email}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(corpo)}`;
}
