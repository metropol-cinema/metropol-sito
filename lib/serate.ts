/**
 * Serate speciali: appuntamenti che NON passano da Cinebot e quindi non
 * arrivano con la read-API. Il sito non ha un database, quindi stanno qui,
 * scritti a mano, come le condizioni di CineCompleanni in `lib/cinecompleanni.ts`.
 *
 * Una serata si chiude da sola: finita la giornata (ora di Roma) la fascia in
 * home sparisce, e la pagina resta raggiungibile ma parla al passato.
 */

export type FilmSerata = {
  /** Ancora della scheda nella pagina, e chiave React. */
  id: string;
  titolo: string;
  /** «Mediometraggio», «Cortometraggio»… */
  formato: string;
  anno?: number;
  /** Capoversi della scheda, nell'ordine. */
  testo: string[];
  /**
   * Regia, interpreti e il resto dei titoli. Vuoto = la riga non compare:
   * meglio niente che un nome sbagliato.
   */
  crediti: { ruolo: string; nomi: string }[];
  youtubeId: string;
  /** Fotogramma del trailer salvato in `public/`: la pagina non contatta YouTube prima del clic. */
  fotogramma: string;
  instagram?: { account: string; url: string };
};

export type Serata = {
  slug: string;
  titolo: string;
  /** Riga d'apertura, prima dei film. */
  presentazione: string[];
  /** Inizio, con fuso esplicito: il 21 novembre è ora solare (+01:00). */
  inizio: string;
  /** Da qui la serata è passata: la fascia in home sparisce. */
  fine: string;
  ingresso: string;
  films: FilmSerata[];
};

export const SERATA_21_NOVEMBRE: Serata = {
  slug: '21-novembre',
  titolo: 'Nulla è successo · Il disappunto',
  presentazione: [
    'Due ragazzi di Villafranca hanno girato un mediometraggio, e sabato 21 novembre lo presentano in sala insieme al cortometraggio di un loro amico.',
    'La serata non è organizzata dall’Associazione: il Metropol la sostiene e le apre la sala, perché il cinema fatto qui merita di essere visto qui.',
  ],
  inizio: '2026-11-21T21:00:00+01:00',
  fine: '2026-11-22T00:00:00+01:00',
  ingresso: 'Ingresso libero',
  films: [
    {
      id: 'nulla-e-successo',
      titolo: 'Nulla è successo',
      formato: 'Mediometraggio',
      testo: [
        'Una notte. Una strada di montagna. Due sconosciuti.',
        'A volte basta un istante perché tutto cambi.',
      ],
      crediti: [],
      youtubeId: '5xuqCpidbUY',
      fotogramma: '/serate/21-novembre/nulla-e-successo.webp',
      instagram: { account: 'way2dream.prod', url: 'https://www.instagram.com/way2dream.prod/' },
    },
    {
      id: 'il-disappunto',
      titolo: 'Il disappunto',
      formato: 'Cortometraggio',
      anno: 2026,
      testo: [
        'Un asteroide è in rotta di collisione con la Terra. Nell’ultimo giorno sul pianeta Eva, una donna con una lunga carriera politica alle spalle, aspetta un servizio esclusivo che le promette una morte «dignitosa» prima dell’impatto.',
        'Ma l’arrivo di una sconosciuta in fuga trasforma gli ultimi momenti di vita in uno scontro sul diritto di scegliere.',
      ],
      crediti: [],
      youtubeId: 'plZp1Mw-dHs',
      fotogramma: '/serate/21-novembre/il-disappunto.webp',
      instagram: { account: 'davide.ronzio', url: 'https://www.instagram.com/davide.ronzio/' },
    },
  ],
};

export function serataPassata(serata: Serata, adesso = new Date()): boolean {
  return adesso.getTime() >= new Date(serata.fine).getTime();
}

const DATA = new Intl.DateTimeFormat('it-IT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Rome',
});
const ORA = new Intl.DateTimeFormat('it-IT', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Rome',
});

/** «sabato 21 novembre» */
export function dataSerata(serata: Serata): string {
  return DATA.format(new Date(serata.inizio));
}

/** «21:00» */
export function oraSerata(serata: Serata): string {
  return ORA.format(new Date(serata.inizio));
}
