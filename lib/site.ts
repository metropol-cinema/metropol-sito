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

export const NAV_LINKS = [
  { href: '/programmazione', label: 'Programmazione' },
  { href: '/prossimamente', label: 'Prossimamente' },
  { href: '/venerdi', label: 'I Venerdì' },
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
