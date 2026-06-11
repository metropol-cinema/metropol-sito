/**
 * Deep-link di acquisto biglietti sulla piattaforma di vendita online (Cinebot).
 * SOLO server-side (legge process.env).
 *
 * Env: TICKET_URL_TEMPLATE — URL con segnaposto:
 *   {eventId} → sourceId (id evento Cinebot) della proiezione [obbligatorio]
 *   {titolo}  → titolo del film in forma slug (es. "super-mario-galaxy-il-film")
 * Formato configurato in Cinebot (Opzioni → Web Service → URL vendita online):
 *   https://ticket.cinebot.it/metropol/{eventId}/{titolo}
 * Finché la env non è configurata, i bottoni "Acquista" non compaiono.
 */
export function ticketUrlFor(sourceId: number, title?: string): string | null {
  const template = process.env.TICKET_URL_TEMPLATE;
  if (!template || !template.includes('{eventId}')) return null;
  return template
    .replaceAll('{eventId}', String(sourceId))
    .replaceAll('{titolo}', slugify(title ?? ''));
}

/** "Super Mario Galaxy - Il Film" → "super-mario-galaxy-il-film". */
function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // via gli accenti
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
