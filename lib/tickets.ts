/**
 * Deep-link di acquisto biglietti sulla piattaforma di vendita online (Cinebot).
 * SOLO server-side (legge process.env).
 *
 * Env: TICKET_URL_TEMPLATE — URL con segnaposto `{eventId}`, sostituito con il
 * sourceId (id evento Cinebot) della proiezione. Esempio:
 *   https://vendita.example.com/acquista?evento={eventId}
 * Finché la env non è configurata, i bottoni "Acquista" non compaiono.
 */
export function ticketUrlFor(sourceId: number): string | null {
  const template = process.env.TICKET_URL_TEMPLATE;
  if (!template || !template.includes('{eventId}')) return null;
  return template.replaceAll('{eventId}', String(sourceId));
}
