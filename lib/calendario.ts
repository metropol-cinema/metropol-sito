/**
 * Una proiezione come file di calendario (iCalendar, RFC 5545): è il formato che
 * telefono e computer aprono da soli con «Aggiungi al calendario», senza passare
 * dagli account Google o Apple di chi lo tocca.
 */

/** Se manca la durata del film: un evento lungo zero non si vede in agenda. */
const DURATA_DI_RISERVA_MINUTI = 120;

/** Virgole, punti e virgola e a capo hanno un significato nel formato. */
function escapeText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** Da ISO a `20261107T200000Z`. */
function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

/**
 * Righe di massimo 75 byte, le successive iniziano con uno spazio. Si conta in
 * byte e non in caratteri: una lettera accentata ne pesa due, e va tagliata
 * intera.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const pieces: string[] = [];
  let current = '';
  let size = 0;
  for (const char of line) {
    const weight = encoder.encode(char).length;
    if (size + weight > (pieces.length === 0 ? 75 : 74)) {
      pieces.push(current);
      current = '';
      size = 0;
    }
    current += char;
    size += weight;
  }
  pieces.push(current);
  return pieces.join('\r\n ');
}

export function screeningCalendar({
  uid,
  title,
  startsAt,
  durationMinutes,
  location,
  description,
  url,
  now = new Date(),
}: {
  uid: string;
  title: string;
  startsAt: string;
  durationMinutes: number | null;
  location: string;
  description: string;
  url: string;
  now?: Date;
}): string {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + (durationMinutes ?? DURATA_DI_RISERVA_MINUTI) * 60_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cinema Metropol//Sito//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(location)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(foldLine)
    .join('\r\n')
    .concat('\r\n');
}
