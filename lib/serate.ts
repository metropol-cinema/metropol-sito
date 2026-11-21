/**
 * Serate speciali (film o concerti): appuntamenti che NON passano da Cinebot e quindi non
 * arrivano con la read-API. Il sito non ha un database, quindi stanno qui,
 * scritti a mano, come le condizioni di CineCompleanni in `lib/cinecompleanni.ts`.
 *
 * Una serata si chiude da sola: finita la giornata (ora di Roma) la fascia in
 * home sparisce, e la pagina resta raggiungibile ma parla al passato.
 */

import { IN_PRODUZIONE } from '@/lib/ambiente';

export type FilmSerata = {
  /** Ancora della scheda nella pagina, e chiave React. */
  id: string;
  titolo: string;
  /** «Mediometraggio», «Cortometraggio»… */
  formato: string;
  anno?: number;
  durataMinuti?: number;
  /** Festival, selezioni: una riga sopra il titolo. */
  riconoscimento?: string;
  /** Locandina in `public/`, con le sue misure vere (servono a next/image). */
  locandina?: { src: string; width: number; height: number };
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

/** Quello che ogni serata ha, film o concerto: basta alla fascia in home e alla sitemap. */
export type SerataBase = {
  slug: string;
  titolo: string;
  /** «Serata speciale», «Evento speciale»: apre la fascia in home e l'occhiello della pagina. */
  etichetta: string;
  /** La frase della fascia in home, dopo data e ora. */
  fascia: string;
  /** Il bottone della fascia: «Scopri la serata», «Scopri l’evento». */
  bottone: string;
  /** Riga d'apertura della pagina. */
  presentazione: string[];
  /**
   * Prima di questo istante, in produzione, la serata non esiste: pagina 404,
   * niente fascia, niente sitemap. Così si pubblica in anticipo e compare da
   * sola. L'anteprima la mostra sempre, per poterla controllare.
   * Le pagine sono ISR a 10 minuti: dopo l'ora indicata può servire qualche
   * minuto (e una visita) perché compaia.
   */
  pubblicaDal: string;
  /** Inizio, con fuso esplicito: da novembre a marzo è ora solare (+01:00). */
  inizio: string;
  /** Da qui la serata è passata: la fascia in home sparisce. */
  fine: string;
  ingresso: string;
};

/** Una serata di film. */
export type Serata = SerataBase & {
  films: FilmSerata[];
};

/** Un brano (o un tema) della scaletta di un concerto. */
export type BranoScaletta = {
  /** Il titolo del brano; assente quando si suona «il tema di» un film. */
  brano?: string;
  film: string;
  anno: number;
  /** Il riconoscimento, scritto per intero. Solo se certo. */
  premio?: string;
};

/** Un concerto: musicisti, scaletta, un video. */
export type Concerto = SerataBase & {
  /** Il nome dello spettacolo, sotto il titolo. */
  spettacolo: string;
  /** Il sottotitolo dello spettacolo, come sulla locandina. */
  sottotitolo: string;
  locandina: { src: string; width: number; height: number };
  musicisti: { nome: string; strumento: string }[];
  /** Raggruppata per autore, nell'ordine della locandina. */
  scaletta: { autore: string; brani: BranoScaletta[] }[];
  video: {
    youtubeId: string;
    titolo: string;
    /** Fotogramma salvato in `public/`: la pagina non contatta YouTube prima del clic. */
    fotogramma: string;
  };
};

export const SERATA_21_NOVEMBRE: Serata = {
  slug: '21-novembre',
  titolo: 'Nulla è successo · Il disappunto',
  etichetta: 'Serata speciale',
  fascia: 'due film girati da ragazzi di Villafranca, «Nulla è successo» e «Il disappunto».',
  bottone: 'Scopri la serata',
  presentazione: [
    'Cristian Levantino ed Edoardo Rossi, due ragazzi di Villafranca, hanno girato un mediometraggio, e sabato 21 novembre lo presentano in sala insieme al cortometraggio del loro amico Davide Ronzio.',
    'La serata non è organizzata dall’Associazione: il Metropol la sostiene e le apre la sala, perché il cinema fatto qui merita di essere visto qui.',
  ],
  pubblicaDal: '2026-11-16T00:00:00+01:00',
  inizio: '2026-11-21T21:00:00+01:00',
  fine: '2026-11-22T00:00:00+01:00',
  ingresso: 'Ingresso libero',
  films: [
    {
      id: 'nulla-e-successo',
      titolo: 'Nulla è successo',
      formato: 'Mediometraggio',
      anno: 2026,
      durataMinuti: 29,
      locandina: { src: '/serate/21-novembre/locandina-nulla-e-successo.webp', width: 971, height: 1197 },
      testo: [
        'Una notte. Una strada di montagna. Due sconosciuti.',
        'A volte basta un istante perché tutto cambi.',
      ],
      crediti: [
        { ruolo: 'Regia', nomi: 'Cristian Levantino ed Edoardo Rossi' },
        { ruolo: 'Con', nomi: 'Jacopo Iebba, Claudio Gasperini e Gaia Marangoni' },
        { ruolo: 'Sceneggiatura', nomi: 'Cristian Levantino, Edoardo Rossi e Mattia Rosolen' },
        { ruolo: 'Fotografia', nomi: 'Chiara Coghi' },
        { ruolo: 'Operatori', nomi: 'Alessio Fornasier ed Enea Rovaglia' },
        { ruolo: 'Montaggio', nomi: 'Cristian Levantino ed Edoardo Rossi' },
        { ruolo: 'Suono', nomi: 'Leonardo Campioni e Marco Santoro' },
        { ruolo: 'Colorist', nomi: 'Pietro Della Giustina' },
        { ruolo: 'Trucco', nomi: 'Gaia Marangoni' },
        { ruolo: 'Backstage', nomi: 'Nicola Maccarini' },
        { ruolo: 'Produzione', nomi: 'way2DREAM' },
      ],
      youtubeId: '5xuqCpidbUY',
      fotogramma: '/serate/21-novembre/nulla-e-successo.webp',
      instagram: { account: 'way2dream.prod', url: 'https://www.instagram.com/way2dream.prod/' },
    },
    {
      id: 'il-disappunto',
      titolo: 'Il disappunto',
      formato: 'Cortometraggio',
      anno: 2026,
      riconoscimento: 'Selezione ufficiale Underground Film Festival',
      locandina: { src: '/serate/21-novembre/locandina-il-disappunto.webp', width: 862, height: 1078 },
      testo: [
        'Un asteroide è in rotta di collisione con la Terra. Nell’ultimo giorno sul pianeta Eva, una donna con una lunga carriera politica alle spalle, aspetta un servizio esclusivo che le promette una morte «dignitosa» prima dell’impatto.',
        'Ma l’arrivo di una sconosciuta in fuga trasforma gli ultimi momenti di vita in uno scontro sul diritto di scegliere.',
      ],
      crediti: [
        { ruolo: 'Scritto e diretto da', nomi: 'Davide Ronzio' },
        { ruolo: 'Con', nomi: 'Valentina Econimo, Giorgia Ciavardini e Mario Volpe' },
        { ruolo: 'Soggetto', nomi: 'Davide Ronzio, Federico Ferri e Roberto Bocchi' },
        { ruolo: 'Aiuto regia', nomi: 'Roberto Bocchi' },
        { ruolo: 'Fotografia', nomi: 'Davide Ronzio, con Roberto Bocchi' },
        { ruolo: 'Operatori', nomi: 'Chiara Goffi, Giuseppe Sanzeri e Nicolò Saran' },
        { ruolo: 'Scenografia', nomi: 'Federico Ferri' },
        { ruolo: 'Segretario di edizione', nomi: 'Federico Ferri' },
        { ruolo: 'Fonico', nomi: 'Cristian Levantino' },
        { ruolo: 'Effetti visivi', nomi: 'Alice Pancari' },
      ],
      youtubeId: 'plZp1Mw-dHs',
      fotogramma: '/serate/21-novembre/il-disappunto.webp',
      instagram: { account: 'davide.ronzio', url: 'https://www.instagram.com/davide.ronzio/' },
    },
  ],
};

export const SERATA_8_DICEMBRE: Concerto = {
  slug: '8-dicembre',
  titolo: 'Movie Trio in concerto',
  etichetta: 'Evento speciale',
  fascia: 'il Movie Trio in concerto con «Cinema Story», le grandi colonne sonore da Chaplin a Morricone.',
  bottone: 'Scopri l’evento',
  spettacolo: 'Cinema Story',
  sottotitolo:
    'La storia del cinema dal 1895 a oggi, raccontata dalle immagini e dalle grandi colonne sonore.',
  presentazione: [
    'Il giorno dell’Immacolata la sala del Metropol si accende di musica: il Movie Trio porta in concerto «Cinema Story», un viaggio nella storia del cinema raccontato dalle immagini e dalle colonne sonore che tutti abbiamo nelle orecchie.',
    'Chitarre, voce e tromba, da Charlie Chaplin a Ennio Morricone, passando per Hollywood, Fellini e i premi Oscar italiani.',
  ],
  pubblicaDal: '2026-11-23T00:00:00+01:00',
  inizio: '2026-12-08T18:00:00+01:00',
  fine: '2026-12-09T00:00:00+01:00',
  ingresso: 'Ingresso libero',
  locandina: { src: '/serate/8-dicembre/locandina-movie-trio.webp', width: 1414, height: 1999 },
  musicisti: [
    { nome: 'Alessandro Modenese', strumento: 'Chitarre' },
    { nome: 'Laura Pirri', strumento: 'Voce' },
    { nome: 'Fabiano Maniero', strumento: 'Tromba' },
  ],
  // Dalla locandina. «Louis Bacalov» lì è un refuso: il nome è Luis.
  scaletta: [
    {
      autore: 'Charlie Chaplin',
      brani: [
        {
          brano: 'Eternamente',
          film: 'Luci della ribalta',
          anno: 1952,
          premio: 'Oscar per la colonna sonora, arrivato nel 1973',
        },
        { brano: 'Smile', film: 'Tempi moderni', anno: 1936 },
      ],
    },
    {
      autore: 'Harold Arlen',
      brani: [
        {
          brano: 'Somewhere over the rainbow',
          film: 'Il mago di Oz',
          anno: 1939,
          premio: 'Oscar per la migliore canzone',
        },
      ],
    },
    {
      autore: 'Herman Hupfeld',
      brani: [{ brano: 'As time goes by', film: 'Casablanca', anno: 1942 }],
    },
    {
      autore: 'Henry Mancini',
      brani: [
        {
          brano: 'Moon river',
          film: 'Colazione da Tiffany',
          anno: 1961,
          premio: 'Oscar per la migliore canzone',
        },
      ],
    },
    {
      autore: 'Nino Rota',
      brani: [
        { film: 'Il padrino', anno: 1972 },
        { film: 'Amarcord', anno: 1973 },
      ],
    },
    {
      autore: 'James Horner',
      brani: [
        {
          brano: 'My heart will go on',
          film: 'Titanic',
          anno: 1997,
          premio: 'Oscar per la migliore canzone',
        },
      ],
    },
    {
      autore: 'Luis Bacalov',
      brani: [
        { film: 'Il postino', anno: 1994, premio: 'Oscar per la colonna sonora' },
      ],
    },
    {
      autore: 'Ennio Morricone',
      brani: [
        { film: 'Per un pugno di dollari', anno: 1964 },
        { film: 'C’era una volta il West', anno: 1968 },
        { film: 'Giù la testa', anno: 1971 },
        { brano: 'Here’s to you', film: 'Sacco e Vanzetti', anno: 1971 },
        { brano: 'The Mission Suite', film: 'Mission', anno: 1986 },
        { film: 'Nuovo Cinema Paradiso', anno: 1988 },
      ],
    },
    {
      autore: 'Nicola Piovani',
      brani: [
        { film: 'La vita è bella', anno: 1997, premio: 'Oscar per la colonna sonora' },
      ],
    },
  ],
  video: {
    youtubeId: 'YP0k3Hwlq7o',
    titolo: 'Cinema Story',
    // Ritaglio della locandina: la miniatura di YouTube è la locandina di Titanic.
    fotogramma: '/serate/8-dicembre/cinema-story.webp',
  },
};

/** Tutte le serate, per la fascia in home e la sitemap. */
export const SERATE: SerataBase[] = [SERATA_21_NOVEMBRE, SERATA_8_DICEMBRE];

/** In produzione la serata si vede solo da `pubblicaDal`; altrove sempre. */
export function serataPubblicata(serata: SerataBase, adesso = new Date()): boolean {
  if (!IN_PRODUZIONE) return true;
  return adesso.getTime() >= new Date(serata.pubblicaDal).getTime();
}

/** La fascia in home: pubblicata e non ancora passata. */
export function serataInEvidenza(serata: SerataBase, adesso = new Date()): boolean {
  return serataPubblicata(serata, adesso) && !serataPassata(serata, adesso);
}

export function serataPassata(serata: SerataBase, adesso = new Date()): boolean {
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
export function dataSerata(serata: SerataBase): string {
  return DATA.format(new Date(serata.inizio));
}

/** «21:00» */
export function oraSerata(serata: SerataBase): string {
  return ORA.format(new Date(serata.inizio));
}
