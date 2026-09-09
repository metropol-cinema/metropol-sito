/**
 * Cosa la Sala "Alida Ferrarini" offre davvero a chi ha una disabilità, e cosa
 * ancora no.
 *
 * REGOLA: qui dentro va SOLO ciò che qualcuno ha verificato di persona. Chi
 * legge questa pagina non sta scegliendo un film: sta decidendo se mettersi in
 * viaggio. Una voce ottimistica scritta "per non fare brutta figura" è peggio
 * di una voce mancante — quella si può chiedere, un viaggio a vuoto no.
 *
 * Se una cosa non si sa, si toglie la voce. Se cambia in sala, si cambia qui.
 */

export type Stato = 'disponibile' | 'parziale' | 'assente';

export interface VoceAccessibilita {
  stato: Stato;
  titolo: string;
  dettaglio: string;
  /**
   * Di che tipo di barriera parla la voce: `carrozzina` per come si entra e ci
   * si muove, `persona` per chi non sente e chi non vede. La sedia a rotelle
   * messa su una voce di sottotitoli manda fuori strada proprio chi la cerca.
   */
  simbolo: 'carrozzina' | 'persona';
  /** Dove sta scritto per esteso, quando una riga non basta. */
  link?: { href: string; label: string };
}

/** Ultima volta che queste informazioni sono state controllate sul posto. */
export const VERIFICATA_IL = '9 settembre 2026';

export const ACCESSIBILITA_SALA: VoceAccessibilita[] = [
  {
    stato: 'disponibile',
    simbolo: 'carrozzina',
    titolo: 'Accesso in carrozzina',
    dettaglio:
      'Un ascensore porta all’ingresso del cinema, e in platea ci sono quattro posti attrezzati per le carrozzine. Si entra e si raggiunge la sala in autonomia. Se ci scrivi prima ti teniamo il posto migliore.',
  },
  {
    stato: 'disponibile',
    simbolo: 'carrozzina',
    titolo: 'Servizi igienici accessibili',
    dettaglio: 'Disponibili durante tutte le proiezioni.',
  },
  {
    stato: 'disponibile',
    simbolo: 'persona',
    titolo: 'Sottotitoli e audiodescrizione',
    dettaglio:
      'Siamo una sala CinemAmico: chi non sente o non vede può seguire il film con MovieReading, l’app gratuita che porta sottotitoli e audiodescrizione sul telefono. Dipende dal film: il bollino «accessibile» sulla scheda dice quali titoli li hanno.',
    link: { href: '/accessibilita/sottotitoli-e-audiodescrizione', label: 'Come funziona' },
  },
  {
    stato: 'assente',
    simbolo: 'persona',
    titolo: 'Anello magnetico',
    dettaglio:
      'La sala non ha un anello magnetico per apparecchi acustici: chi lo usa non trova qui l’audio in cuffia. I sottotitoli di MovieReading sono la strada che possiamo offrire oggi. Se ti servirebbe, dircelo ci aiuta a metterlo in conto.',
  },
];

// ── MovieReading e CinemAmico ────────────────────────────────────────────────
// Il servizio è di Universal Multimedia Access, non nostro: qui teniamo solo i
// link ufficiali e i passi che valgono per chi viene da noi. Se cambiano le
// loro pagine, cambia un indirizzo — non una promessa.

export const MOVIEREADING_URL = 'https://www.moviereading.com/';
export const CINEMAMICO_URL = 'https://www.moviereading.com/cinemamico/';

/** I tre passi, nell'ordine in cui li fa lo spettatore. */
export const MOVIEREADING_PASSI: Array<{ titolo: string; dettaglio: string }> = [
  {
    titolo: 'Installa l’app, una volta sola',
    dettaglio:
      'MovieReading è gratuita e sta su App Store e Google Play. Non serve registrarsi né pagare nulla, né a noi né a loro.',
  },
  {
    titolo: 'Scarica il film prima di uscire di casa',
    dettaglio:
      'Dentro l’app cerchi il titolo e scarichi i sottotitoli o l’audiodescrizione. Falla col wi‑fi di casa: in sala non serve internet, ma il file sì.',
  },
  {
    titolo: 'In sala, premi «sincronizza»',
    dettaglio:
      'L’app si sincronizza da sola con la proiezione: da lì i sottotitoli scorrono sullo schermo del telefono, o l’audiodescrizione ti arriva in cuffia. Nient’altro da fare, e nessuna connessione richiesta.',
  },
];

/**
 * Indirizzo a cui scrivere per chiedere assistenza o segnalare una barriera.
 *
 * TODO: manca. Finché è null la pagina rimanda ai social e alla cassa — che
 * funzionano, ma un indirizzo scritto è meglio: resta lì, e può rispondere
 * chiunque in associazione. Appena c'è, si mette qui e basta.
 */
export const CONTATTO_ACCESSIBILITA: string | null = null;

/** Cosa abbiamo fatto su questo sito, e cosa sappiamo di non aver ancora fatto. */
export const ACCESSIBILITA_SITO = {
  fatto: [
    'Quattro combinazioni di colori — la sala scura, una chiara su fondo carta e due ad alto contrasto — tutte verificate al livello AA delle linee guida WCAG.',
    'Testo ingrandibile fino al 150% dalla barra, e fino al 400% con lo zoom del browser, senza che il sito si rompa o costringa a scorrere in orizzontale.',
    'Un carattere ad alta leggibilità (Atkinson Hyperlegible), pensato per chi ha poca vista o fatica a distinguere lettere simili.',
    'Più spazio fra righe, lettere e parole, per chi legge meglio con l’aria intorno alle parole.',
    'Tutto il sito si usa con la sola tastiera, con il punto attivo sempre visibile, e un salto diretto al contenuto come primo passaggio.',
    'Niente animazioni per chi le ha disattivate nel proprio dispositivo, e un interruttore per fermarle comunque.',
    'Nessuno script di terzi: le tue preferenze restano nel tuo browser e non arrivano a noi.',
  ],
  daFare: [
    'I filmati dei trailer sono di YouTube: i sottotitoli dipendono da chi li ha caricati, e noi non possiamo aggiungerli.',
    'Le locandine e le fotografie di scena arrivano dagli archivi dei distributori senza una descrizione testuale: le trattiamo come decorazione, e le informazioni che contano le scriviamo accanto.',
  ],
} as const;
