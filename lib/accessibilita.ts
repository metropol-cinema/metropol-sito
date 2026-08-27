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
}

/** Ultima volta che queste informazioni sono state controllate sul posto. */
export const VERIFICATA_IL = '27 agosto 2026';

export const ACCESSIBILITA_SALA: VoceAccessibilita[] = [
  {
    stato: 'disponibile',
    titolo: 'Accesso in carrozzina',
    dettaglio:
      'Si entra e si raggiunge la sala in autonomia, e in platea ci sono posti previsti per le carrozzine. Se ci scrivi prima ti teniamo il posto migliore.',
  },
  {
    stato: 'disponibile',
    titolo: 'Servizi igienici accessibili',
    dettaglio: 'Disponibili durante tutte le proiezioni.',
  },
  {
    stato: 'assente',
    titolo: 'Ausili per l’udito',
    dettaglio:
      'La sala non ha ancora un anello magnetico, e non programmiamo proiezioni sottotitolate in modo regolare. Lo scriviamo per non far fare viaggi a vuoto: se ti servirebbe, dircelo ci aiuta a metterlo in conto.',
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
