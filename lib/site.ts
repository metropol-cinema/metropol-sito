/** Dati anagrafici e link dell'Associazione, usati in footer e pagine statiche. */

export const SITE = {
  name: 'Cinema Metropol',
  association: 'Associazione Culturale Metropol',
  city: 'Villafranca di Verona',
  /** Sala cinematografica. */
  venueAddress: 'Piazza Villafranchetta 1, 37069 Villafranca di Verona (VR)',
  venueName: 'Sala "Alida Ferrarini"',
  /** Sede legale dell'associazione. */
  legalAddress: 'Via Tione 25, 37069 Villafranca di Verona (VR)',
  vatNumber: '04274550237',
  pec: 'pec@pec.cinemametropol.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Piazza+Villafranchetta+1,+37069+Villafranca+di+Verona',
  social: {
    facebook: 'https://www.facebook.com/metropol.cinema',
    instagram: 'https://instagram.com/metropol.cinema',
    whatsapp: 'https://whatsapp.com/channel/0029VanDDMFJJhzdUcuRoU3x',
  },
} as const;

/**
 * Listino di riferimento, mostrato in home e in /info. I prezzi VERI di una
 * singola proiezione arrivano dalla read-API (`prices` è per proiezione e può
 * variare): questo è il prezzario generale, non una promessa sul singolo
 * spettacolo.
 */
export const TICKET_PRICES = [
  { label: 'Intero (sabato, domenica e festivi)', amount: 7.5 },
  { label: 'Intero (venerdì e rassegne)', amount: 6 },
  { label: 'Ridotto Under 18', amount: 6 },
  { label: 'Ridotto soci tesserati', amount: 6 },
] as const;

/** Quanto prima dell'inizio apre la cassa. */
export const BOX_OFFICE_NOTE =
  'La biglietteria apre circa 30 minuti prima dell\'inizio di ogni proiezione.';

export const NAV_LINKS = [
  { href: '/programmazione', label: 'Programmazione' },
  { href: '/prossimamente', label: 'Prossimamente' },
  { href: '/venerdi', label: 'I Venerdì' },
  // Compare solo dentro la finestra di date scelta in dashboard: vedi lib/nav.ts.
  { href: '/corsi', label: 'Corsi' },
  { href: '/associazione', label: 'Associazione' },
  { href: '/info', label: 'Info e prezzi' },
] as const;

/** Sottopagine dell'associazione: linkate da /associazione e nel footer, non nel menu principale. */
export const ASSOCIATION_LINKS = [
  { href: '/associazione/chi-siamo', label: 'Chi siamo' },
  { href: '/associazione/storia', label: 'La storia' },
  { href: '/associazione/come-associarsi', label: 'Come associarsi' },
  { href: '/associazione/diventa-volontario', label: 'Diventa volontario' },
  { href: '/associazione/statuto', label: 'Statuto e regolamento' },
] as const;

/**
 * True se la proiezione è nella sala di casa. Cinebot scrive il nome in modi
 * diversi ("Sala Ferrarini", "Sala Alida Ferrarini", "Cinema Metropol"): il
 * luogo va detto SOLO quando si proietta altrove — d'estate al Castello —
 * altrimenti il segnale che conta si perde tra le ripetizioni.
 */
export function isHomeVenue(venue: string | null | undefined): boolean {
  if (!venue) return true;
  const v = venue.toLowerCase();
  return v.includes('metropol') || v.includes('ferrarini');
}
