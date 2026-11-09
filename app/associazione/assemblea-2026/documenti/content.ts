/**
 * Le bozze del nuovo Statuto e del Regolamento Interno portate all'assemblea
 * del 9 novembre 2026, generate dai PDF del Direttivo e riportate parola per
 * parola (refusi compresi): sono atti dell'associazione, non testi da
 * riscrivere.
 *
 * Nel testo, {+ … +} è un passaggio evidenziato e {- … -} uno barrato.
 */

import type { Article, Chapter } from '../../statuto/content';

export const STATUTO_BOZZA: Article[] = [
  {
    id: 's-art-1',
    title: 'Art. 1 – Denominazione, sede e durata',
    blocks: [
      { kind: 'p', text: 'L’associazione “Associazione Culturale Metropol” adegua il proprio statuto al Codice del Terzo settore (decreto legislativo 3 luglio 2017, n. 117) e assume la denominazione “Associazione Culturale Metropol APS”, in forma abbreviata “Metropol APS”, di seguito denominata anche “Associazione”.' },
      { kind: 'p', text: 'L’Associazione è apartitica, apolitica, indipendente, non ha scopo di lucro e persegue finalità civiche, solidaristiche e di utilità sociale.' },
      { kind: 'p', text: 'L’Associazione ha sede legale nel Comune di Villafranca di Verona (VR), attualmente in via Tione n. 25.' },
      { kind: 'p', text: 'Il trasferimento della sede legale all’interno del medesimo Comune non comporta modifica del presente statuto ed è deliberato dal Consiglio direttivo, con obbligo di comunicazione agli enti competenti. Il trasferimento della sede in altro Comune è deliberato dall’assemblea secondo le modalità previste per le modifiche statutarie.' },
      { kind: 'p', text: 'La durata dell’Associazione è illimitata.' },
      { kind: 'p', text: 'L’uso della denominazione “Associazione di Promozione Sociale”, dell’acronimo “APS” e dei relativi segni distintivi è subordinato all’iscrizione dell’Associazione nella sezione “Associazioni di promozione sociale” del Registro unico nazionale del Terzo settore, ove previsto dalla normativa vigente.' },
    ],
  },
  {
    id: 's-art-2',
    title: 'Art. 2 – Finalità',
    blocks: [
      { kind: 'p', text: 'L’Associazione persegue finalità civiche, solidaristiche e di utilità sociale mediante la promozione e la diffusione della cultura, con particolare riferimento alla cultura cinematografica, audiovisiva, documentaristica e alle espressioni artistiche e culturali connesse.' },
      { kind: 'p', text: 'In particolare, l’Associazione si propone di:' },
      {
        kind: 'list',
        items: [
          'promuovere la cultura in tutte le sue forme, con particolare riferimento al cinema, al settore filmico e documentaristico;',
          'favorire la conoscenza del cinema sotto il profilo storico, tecnico, artistico, sociale e culturale;',
          'promuovere la cultura cinematografica anche attraverso attività educative e didattiche rivolte a bambini, ragazzi, giovani e adulti;',
          'favorire la partecipazione culturale, la socializzazione, il dialogo interculturale e il senso di appartenenza alla comunità;',
          'valorizzare la storia, le tradizioni, gli usi, i costumi, il patrimonio artistico, naturalistico e monumentale del territorio;',
          'promuovere il confronto pubblico sui temi culturali e sociali attraverso iniziative informative e divulgative;',
          'sostenere la collaborazione tra persone, associazioni, enti pubblici, enti privati e istituzioni che perseguano finalità compatibili;',
          'favorire l’accesso della comunità alla cultura, all’informazione e alla conoscenza, anche attraverso strumenti digitali e forme di comunicazione innovative;',
          'promuovere la partecipazione dei cittadini, inclusi i cittadini stranieri, a iniziative culturali aperte e inclusive;',
          'diffondere la cultura della solidarietà, della cittadinanza attiva, della partecipazione e della valorizzazione delle diversità.',
        ],
      },
    ],
  },
  {
    id: 's-art-3',
    title: 'Art. 3 – Attività di interesse generale',
    blocks: [
      { kind: 'p', text: 'Per il perseguimento delle proprie finalità, l’Associazione esercita, in favore dei propri associati e di terzi, in via esclusiva o principale le seguenti attività di interesse generale ai sensi dell’articolo 5, comma 1, del decreto legislativo 3 luglio 2017, n. 117, e successive modificazioni e integrazioni:' },
      {
        kind: 'list',
        items: [
          'organizzazione e gestione di attività culturali, artistiche o ricreative di interesse sociale, con particolare riferimento alla cultura cinematografica e audiovisiva, incluse attività, anche editoriali, di promozione e diffusione della cultura e della pratica del volontariato e delle attività di interesse generale (lett. i);',
          'attività culturali di interesse sociale con finalità educativa (lett. d);',
          'interventi di tutela e valorizzazione del patrimonio culturale e del paesaggio, ai sensi del decreto legislativo 22 gennaio 2004, n. 42, con particolare riferimento al patrimonio cinematografico e alla storia del territorio (lett. f);',
          'promozione della cultura della legalità, della pace tra i popoli, della nonviolenza e della difesa non armata (lett. v);',
          'promozione e tutela dei diritti umani, civili, sociali e politici, nonché promozione delle pari opportunità e delle iniziative di aiuto reciproco, anche attraverso iniziative che rendano le attività culturali accessibili alle persone con disabilità (lett. w).',
          'Attività di promozione culturale, divulgazione, ricerca e documentazione connesse alle finalità istituzionali.',
        ],
      },
      { kind: 'p', text: 'L’Associazione svolge le proprie attività avvalendosi in modo prevalente dell’attività di volontariato dei propri associati.' },
    ],
  },
  {
    id: 's-art-4',
    title: 'Art. 4 – Attività diverse, strumentali e secondarie',
    blocks: [
      { kind: 'p', text: 'L’Associazione può esercitare attività diverse da quelle di interesse generale indicate nel presente statuto, purché siano secondarie e strumentali rispetto alle attività di interesse generale, nei limiti e alle condizioni previsti dalla normativa vigente.' },
      { kind: 'p', text: 'Le attività diverse sono individuate dal Consiglio direttivo, che ne documenta il carattere secondario e strumentale nei documenti di bilancio o di rendicontazione previsti dalla legge.' },
      { kind: 'p', text: 'L’Associazione può inoltre svolgere attività di raccolta fondi, anche in forma organizzata e continuativa, nel rispetto dei principi di verità, trasparenza e correttezza nei rapporti con i sostenitori e con il pubblico.' },
    ],
  },
  {
    id: 's-art-5',
    title: 'Art. 5 – Attività concretamente esercitabili',
    blocks: [
      { kind: 'p', text: 'Per il raggiungimento delle finalità istituzionali, l’Associazione può, a titolo esemplificativo:' },
      {
        kind: 'list',
        items: [
          'organizzare proiezioni cinematografiche, rassegne, cineforum, festival, incontri e manifestazioni culturali;',
          'organizzare proiezioni di film, documentari e altri contenuti audiovisivi in luoghi pubblici, privati, all’aperto o in forma itinerante;',
          'promuovere attività cinematografiche e audiovisive rivolte alla comunità e ai soci;',
          'organizzare convegni, conferenze, dibattiti, seminari, lezioni, corsi, eventi musicali, laboratori e attività formative;',
          'realizzare incontri con registi, sceneggiatori, attori, tecnici, produttori, studiosi e altri soggetti operanti nel settore cinematografico e culturale;',
          'effettuare studi, ricerche e attività di documentazione sul cinema, sulla storia locale, sulle tradizioni e sul patrimonio culturale del territorio;',
          'costituire e gestire biblioteche, videoteche, archivi e raccolte documentali, nel rispetto della normativa applicabile;',
          'realizzare mostre, esposizioni, concorsi artistici e iniziative di divulgazione culturale;',
          'svolgere attività editoriale, mediante pubblicazione di bollettini, atti di convegni, studi, ricerche, materiali informativi e altre pubblicazioni coerenti con le finalità dell’Associazione;',
          'utilizzare strumenti di comunicazione tradizionali e digitali, inclusi siti internet, posta elettronica, social network, piattaforme telematiche, stampa, volantinaggio e affissioni;',
          'promuovere convenzioni e collaborazioni con enti pubblici, enti privati, istituzioni, scuole, associazioni e altri soggetti;',
          'partecipare a reti, coordinamenti, circuiti culturali, cinematografici e associativi;',
          'acquisire, detenere, utilizzare e amministrare beni mobili, beni mobili registrati e beni immobili necessari o utili al perseguimento delle finalità associative;',
          'compiere ogni ulteriore attività lecita e coerente con le finalità dell’Associazione, purché non in contrasto con la natura non lucrativa e con la disciplina degli enti del Terzo settore.',
        ],
      },
      { kind: 'p', text: 'Le proiezioni cinematografiche, la vendita di titoli di accesso, le attività editoriali, i corsi, le manifestazioni e ogni altra attività eventualmente commerciale sono svolte nel rispetto della normativa fiscale, amministrativa e di settore applicabile. {+La natura commerciale o non commerciale delle singole attività è determinata in base alla normativa vigente e alle concrete modalità di svolgimento delle attività medesime.+}' },
    ],
  },
  {
    id: 's-art-6',
    title: 'Art. 6 – Associati',
    blocks: [
      { kind: 'p', text: 'Possono essere associati dell’Associazione le persone fisiche maggiorenni che condividono le finalità associative e intendono contribuire al loro perseguimento.' },
      { kind: 'p', text: 'Possono altresì essere ammessi, nei limiti e alle condizioni previsti dalla normativa vigente, altri enti del Terzo settore o enti senza scopo di lucro, mediante il proprio rappresentante legale o persona delegata.' },
      { kind: 'p', text: 'Il numero degli enti associati non può essere superiore al limite previsto dalla normativa vigente rispetto al numero delle associazioni di promozione sociale associate.' },
      { kind: 'p', text: 'L’Associazione garantisce parità di trattamento tra gli associati e non pone discriminazioni fondate su sesso, genere, origine etnica, nazionalità, lingua, religione, convinzioni personali, condizioni sociali, disabilità, orientamento sessuale o ogni altra condizione personale o sociale non incompatibile con le finalità dell’Associazione.' },
      { kind: 'p', text: 'Sono previste le seguenti qualifiche associative:' },
      {
        kind: 'list',
        items: [
          'associati fondatori, ossia coloro che hanno partecipato alla costituzione dell’Associazione o ne hanno promosso la costituzione;',
          'associati ordinari, ossia coloro che sono ammessi successivamente alla costituzione secondo la procedura prevista dal presente statuto;',
          'associati sostenitori, ossia coloro che contribuiscono in misura superiore alla quota ordinaria, senza acquisire diritti amministrativi ulteriori rispetto agli altri associati.',
        ],
      },
      { kind: 'p', text: 'Le qualifiche di fondatore, ordinario e sostenitore non determinano differenze nei diritti associativi. Tutti gli associati hanno pari diritti e pari obblighi, salvo quanto previsto dalla legge per la diversa natura del soggetto associato.' },
      { kind: 'p', text: 'L’Associazione può conferire riconoscimenti o titoli onorifici a persone o enti che abbiano contribuito alla vita dell’Associazione. Tali riconoscimenti non attribuiscono la qualità di associato né diritti amministrativi, salvo che il soggetto sia formalmente ammesso come associato ai sensi del presente statuto.' },
      { kind: 'p', text: 'La quota o il contributo associativo è determinato annualmente dal Consiglio direttivo, è intrasmissibile, non è rivalutabile e non è rimborsabile.' },
    ],
  },
  {
    id: 's-art-7',
    title: 'Art. 7 – Ammissione degli associati',
    blocks: [
      { kind: 'p', text: 'Chiunque condivida le finalità dell’Associazione può chiedere di essere ammesso come associato mediante domanda scritta, anche in formato elettronico, contenente i dati identificativi richiesti dall’Associazione e la dichiarazione di accettazione del presente statuto.' },
      { kind: 'p', text: 'L’ammissione è deliberata dal Consiglio direttivo secondo criteri non discriminatori, coerenti con le finalità perseguite e nel rispetto delle disposizioni di legge.' },
      { kind: 'p', text: 'Il Consiglio direttivo delibera sulla domanda entro il termine stabilito dall’eventuale regolamento interno e, in mancanza, entro sessanta giorni dalla ricezione. L’eventuale rigetto deve essere motivato e comunicato all’interessato.' },
      { kind: 'p', text: 'L’interessato può chiedere il riesame della decisione entro trenta giorni dalla comunicazione del rigetto. Sulla richiesta decide il Collegio dei probiviri entro sessanta giorni o, se il Collegio non è istituito, l’assemblea nella prima riunione utile, in entrambi i casi previa audizione dell’interessato e nel rispetto del contraddittorio. {+La decisione esaurisce il procedimento associativo interno, fatta salva ogni tutela prevista dalla legge.+}' },
      { kind: 'p', text: 'L’ammissione risulta dal libro degli associati, tenuto secondo le modalità previste dalla legge.' },
    ],
  },
  {
    id: 's-art-8',
    title: 'Art. 8 – Diritti e obblighi degli associati',
    blocks: [
      { kind: 'p', text: 'Gli associati hanno diritto di:' },
      {
        kind: 'list',
        items: [
          'partecipare alla vita associativa;',
          'partecipare alle assemblee;',
          'votare in assemblea, purché iscritti nel libro degli associati da almeno un mese;',
          'eleggere gli organi sociali e concorrere alla loro elezione;',
          'esaminare i libri sociali secondo le modalità stabilite dal presente statuto e dall’eventuale regolamento;',
          'partecipare alle attività e alle iniziative dell’Associazione;',
          'recedere dall’Associazione in qualsiasi momento mediante comunicazione scritta;',
          '{+proporre argomenti da inserire nell’ordine del giorno dell’assemblea secondo le modalità stabilite dal presente statuto o dal regolamento interno.+}',
        ],
      },
      { kind: 'p', text: 'Gli associati sono tenuti a:' },
      {
        kind: 'list',
        items: [
          'rispettare il presente statuto, gli eventuali regolamenti e le deliberazioni degli organi associativi;',
          'versare la quota associativa annuale eventualmente stabilita;',
          'contribuire, secondo le proprie possibilità, al perseguimento delle finalità associative;',
          'mantenere comportamenti coerenti con i principi e le finalità dell’Associazione;',
          'non utilizzare la denominazione, il patrimonio o le risorse dell’Associazione per finalità personali o estranee agli scopi associativi.',
        ],
      },
      { kind: 'p', text: 'La partecipazione alle attività associative non attribuisce diritti individuali sul patrimonio dell’Associazione.' },
    ],
  },
  {
    id: 's-art-9',
    title: 'Art. 9 – Perdita della qualità di associato',
    blocks: [
      { kind: 'p', text: 'La qualità di associato si perde per:' },
      {
        kind: 'list',
        items: [
          'recesso volontario;',
          'decesso della persona fisica o estinzione dell’ente associato;',
          'mancato pagamento della quota associativa, e decorso il termine stabilito dal Consiglio direttivo;',
          'esclusione per gravi e comprovati motivi.',
        ],
      },
      { kind: 'p', text: 'L’esclusione può essere deliberata dal Consiglio direttivo esclusivamente in caso di:' },
      {
        kind: 'list',
        items: [
          'grave violazione dello statuto, dei regolamenti o delle deliberazioni degli organi associativi;',
          'compimento di atti gravemente lesivi degli interessi, del patrimonio o dell’immagine dell’Associazione, e degli associati;',
          'comportamento incompatibile con le finalità dell’Associazione;',
          'utilizzo improprio della denominazione, dei beni o delle risorse dell’Associazione;',
          '{+mancato pagamento della quota associativa dopo formale sollecito;+}',
          'ulteriori gravi motivi previsti dalla legge.',
        ],
      },
      { kind: 'p', text: 'Prima dell’adozione del provvedimento, il Consiglio direttivo contesta per iscritto gli addebiti all’interessato, assegnandogli un termine non inferiore a quindici giorni per presentare osservazioni e difese.' },
      { kind: 'p', text: 'Il provvedimento di esclusione deve essere motivato e comunicato all’interessato. L’associato può chiedere il riesame della decisione entro trenta giorni dalla comunicazione; il riesame si svolge con le modalità previste dall’articolo 7. Fino alla scadenza del termine per chiedere il riesame e, se richiesto, fino alla decisione, l’associato è sospeso dai diritti associativi.' },
      { kind: 'p', text: 'La perdita della qualità di associato non dà diritto alla restituzione della quota o dei contributi versati e non attribuisce alcun diritto sul patrimonio dell’Associazione.' },
    ],
  },
  {
    id: 's-art-10',
    title: 'Art. 10 – Volontari',
    blocks: [
      { kind: 'p', text: 'L’Associazione si avvale in modo prevalente dell’attività di volontariato dei propri associati.' },
      { kind: 'p', text: 'È volontario colui che, per sua libera scelta, svolge attività in favore dell’Associazione o della comunità in modo personale, spontaneo e gratuito, senza fini di lucro, neppure indiretti.' },
      { kind: 'p', text: 'L’attività del volontario non può essere retribuita in alcun modo. Sono ammessi esclusivamente rimborsi delle spese effettivamente sostenute e documentate per l’attività prestata, entro i limiti e secondo le modalità stabiliti dalla legge e dall’eventuale regolamento interno.' },
      { kind: 'p', text: 'La qualità di volontario è incompatibile con qualsiasi rapporto di lavoro subordinato o autonomo e con ogni altro rapporto a contenuto patrimoniale con l’Associazione. {-salvo i casi consentiti dalla normativa vigente per lo svolgimento di attività diverse da quelle di volontariato.-}' },
      { kind: 'p', text: 'L’Associazione iscrive i volontari che svolgono attività in modo non occasionale nell’apposito registro, ove previsto dalla legge, e provvede agli obblighi assicurativi previsti dalla normativa vigente.' },
      { kind: 'p', text: 'L’Associazione può avvalersi di lavoratori dipendenti o autonomi nei limiti e alle condizioni previsti dalla legge, quando ciò sia necessario allo svolgimento dell’attività di interesse generale e al perseguimento delle finalità istituzionali.' },
    ],
  },
  {
    id: 's-art-11',
    title: 'Art. 11 – Patrimonio e risorse economiche',
    blocks: [
      { kind: 'p', text: 'Il patrimonio dell’Associazione è costituito da:' },
      {
        kind: 'list',
        items: [
          'beni mobili e immobili di proprietà;',
          'beni mobili registrati;',
          'fondi e disponibilità liquide;',
          'eventuali fondi di riserva;',
          'erogazioni liberali, donazioni e lasciti;',
          'ogni altro bene o diritto acquisito legittimamente.',
        ],
      },
      { kind: 'p', text: 'Le risorse economiche dell’Associazione possono derivare da:' },
      {
        kind: 'list',
        items: [
          'quote e contributi associativi;',
          'contributi pubblici e privati;',
          'erogazioni liberali, donazioni e lasciti testamentari;',
          'contributi dell’Unione europea e di organismi nazionali o internazionali;',
          'entrate derivanti da attività di interesse generale;',
          'entrate derivanti da attività diverse, purché secondarie e strumentali;',
          'proventi da raccolte fondi;',
          'rimborsi derivanti da convenzioni;',
          'rendite patrimoniali;',
          'ogni altra entrata consentita dalla legge.',
        ],
      },
      { kind: 'p', text: 'Le quote e i contributi associativi sono intrasmissibili e non rivalutabili. In caso di recesso, esclusione o perdita della qualità di associato, non è ammessa la restituzione della quota o dei contributi versati.' },
    ],
  },
  {
    id: 's-art-12',
    title: 'Art. 12 – Divieto di distribuzione degli utili',
    blocks: [
      { kind: 'p', text: 'È vietata la distribuzione, anche indiretta, di utili e avanzi di gestione, fondi e riserve comunque denominati, durante la vita dell’Associazione, a fondatori, associati, lavoratori, collaboratori, amministratori e altri componenti degli organi associativi, anche nel caso in cui la distribuzione sia realizzata mediante operazioni o modalità non direttamente riconducibili alla corresponsione di utili.' },
      { kind: 'p', text: 'Gli utili e gli avanzi di gestione sono destinati esclusivamente allo svolgimento delle attività statutarie o all’incremento del patrimonio dell’Associazione.' },
      { kind: 'p', text: 'È vietata la corresponsione a componenti degli organi sociali di compensi individuali non proporzionati all’attività svolta, alle responsabilità assunte e alle specifiche competenze, o comunque superiori a quelli previsti per analoghe attività e condizioni.' },
    ],
  },
  {
    id: 's-art-13',
    title: 'Art. 13 – Esercizio sociale e bilancio',
    blocks: [
      { kind: 'p', text: 'L’esercizio sociale ha inizio il 1° settembre e termina il 31 agosto di ogni anno.' },
      { kind: 'p', text: 'Il Consiglio direttivo redige il bilancio di esercizio nelle forme previste dalla normativa vigente, tenendo conto delle dimensioni dell’Associazione, dei ricavi, delle entrate e della natura delle attività esercitate.' },
      { kind: 'p', text: 'Il bilancio è sottoposto all’approvazione dell’assemblea entro il termine previsto dalla legge e, in ogni caso, entro quattro mesi dalla chiusura dell’esercizio, salvo il maggior termine consentito dalla normativa vigente in presenza di particolari esigenze.' },
      { kind: 'p', text: 'Il bilancio approvato è depositato presso il Registro unico nazionale del Terzo settore nei termini stabiliti dalla legge, ove previsto.' },
      { kind: 'p', text: 'Il bilancio e gli ulteriori documenti contabili sono messi a disposizione degli associati secondo modalità idonee a garantirne la conoscibilità e la consultazione.' },
    ],
  },
  {
    id: 's-art-14',
    title: 'Art. 14 – Libri sociali e diritto di esame',
    blocks: [
      { kind: 'p', text: 'L’Associazione tiene i libri sociali e i registri previsti dalla legge, tra cui:' },
      {
        kind: 'list',
        items: [
          'il libro degli associati;',
          'il libro delle adunanze e delle deliberazioni dell’assemblea;',
          'il libro delle adunanze e delle deliberazioni del Consiglio direttivo;',
          'il libro delle adunanze e delle deliberazioni del Collegio dei probiviri e dell’organo di controllo, se istituiti;',
          'il registro dei volontari non occasionali, ove previsto.',
        ],
      },
      { kind: 'p', text: 'Gli associati hanno diritto di esaminare i libri sociali mediante richiesta scritta al Consiglio direttivo. La consultazione avviene presso la sede dell’Associazione o con modalità telematiche idonee {+entro quindici giorni dalla richiesta, salvo comprovate esigenze organizzative,+} e nel rispetto della normativa sulla protezione dei dati personali.' },
    ],
  },
  {
    id: 's-art-15',
    title: 'Art. 15 – Organi dell’Associazione',
    blocks: [
      { kind: 'p', text: 'Sono organi dell’Associazione:' },
      {
        kind: 'list',
        items: [
          'l’assemblea degli associati;',
          'il Consiglio direttivo;',
          'il presidente;',
          'il vicepresidente, se nominato;',
          'il collegio dei probiviri, se istituito;',
          'l’organo di controllo e il revisore legale, quando la nomina sia obbligatoria ai sensi di legge o quando l’assemblea deliberi di istituirli.',
        ],
      },
      { kind: 'p', text: 'Le cariche sociali sono elettive, hanno durata determinata e sono svolte gratuitamente, salvo quanto previsto dall’articolo 24 per l’organo di controllo e il revisore legale e salvo il rimborso delle spese effettivamente sostenute e documentate per l’attività prestata, secondo criteri e limiti stabiliti dalla legge e dall’eventuale regolamento interno.' },
    ],
  },
  {
    id: 's-art-16',
    title: 'Art. 16 – Assemblea degli associati',
    blocks: [
      { kind: 'p', text: 'L’assemblea è l’organo sovrano dell’Associazione ed è composta da tutti gli associati; il diritto di voto spetta agli associati in possesso dei requisiti di cui all’articolo 8.' },
      { kind: 'p', text: 'Ogni associato persona fisica ha un voto. Gli enti associati partecipano mediante il proprio rappresentante legale o un delegato munito di delega scritta.' },
      { kind: 'p', text: 'L’assemblea è convocata dal presidente su deliberazione del Consiglio direttivo almeno una volta l’anno per l’approvazione del bilancio e ogniqualvolta sia necessario.' },
      { kind: 'p', text: 'La convocazione deve essere effettuata con avviso contenente giorno, ora, luogo e ordine del giorno, inviato almeno quindici giorni prima della riunione mediante strumenti idonei a garantire la conoscibilità da parte degli associati, inclusi posta elettronica, posta elettronica certificata, comunicazione scritta, pubblicazione sul sito internet o affissione presso la sede.' },
      { kind: 'p', text: 'L’assemblea deve essere convocata anche quando ne faccia richiesta motivata almeno il {+dieci+} per cento degli associati aventi diritto di voto. In tal caso il presidente provvede alla convocazione entro trenta giorni dalla richiesta. Decorso inutilmente tale termine, l’assemblea può essere convocata direttamente dai richiedenti, con le modalità previste dal presente articolo.' },
      { kind: 'p', text: 'L’assemblea può svolgersi anche mediante mezzi di telecomunicazione, purché sia possibile identificare i partecipanti, consentire loro di intervenire in tempo reale e garantire l’esercizio del diritto di voto.' },
      { kind: 'p', text: 'L’assemblea ordinaria:' },
      {
        kind: 'list',
        items: [
          'approva il bilancio di esercizio e gli eventuali bilanci o rendiconti previsti dalla legge;',
          'nomina e revoca i componenti del Consiglio direttivo;',
          'nomina e revoca, quando previsto, i componenti dell’organo di controllo e il revisore legale;',
          'approva gli indirizzi generali dell’attività dell’Associazione;',
          'approva gli eventuali regolamenti;',
          'decide sui ricorsi in materia di ammissione ed esclusione degli associati, quando il Collegio dei probiviri non è istituito;',
          'delibera sugli altri argomenti attribuiti alla sua competenza dalla legge o dal presente statuto.',
        ],
      },
      { kind: 'p', text: 'L’assemblea straordinaria delibera sulle modifiche dello statuto, sulla trasformazione, fusione, scissione, scioglimento e devoluzione del patrimonio, nonché sugli altri argomenti attribuiti alla sua competenza dalla legge o dal presente statuto.' },
    ],
  },
  {
    id: 's-art-17',
    title: 'Art. 17 – Costituzione e deliberazioni dell’assemblea',
    blocks: [
      { kind: 'p', text: 'In prima convocazione l’assemblea ordinaria è validamente costituita con la presenza della metà degli associati aventi diritto di voto e delibera a maggioranza dei voti espressi.' },
      { kind: 'p', text: '{+In seconda convocazione l’assemblea ordinaria è validamente costituita qualunque sia il numero degli associati presenti e delibera a maggioranza dei voti espressi.+}' },
      { kind: 'p', text: 'Per le modifiche dello statuto e per le deliberazioni di trasformazione, fusione e scissione, l’assemblea straordinaria è validamente costituita in prima convocazione con la presenza, in proprio o per delega, di almeno la metà degli associati aventi diritto di voto e delibera con il voto favorevole della maggioranza dei presenti; in seconda convocazione è validamente costituita qualunque sia il numero dei presenti e delibera con il voto favorevole della maggioranza dei presenti.' },
      { kind: 'p', text: 'Lo scioglimento dell’Associazione e la devoluzione del patrimonio sono deliberati con il voto favorevole di almeno tre quarti degli associati, salvo le diverse maggioranze inderogabili previste dalla legge.' },
      { kind: 'p', text: 'Non possono votare gli associati che si trovino in situazione di conflitto di interessi rispetto alla deliberazione.' },
      { kind: 'p', text: 'Ogni associato può farsi rappresentare in assemblea da un altro associato mediante delega scritta, nei limiti e alle condizioni previsti dalla legge. Nessun associato può ricevere un numero di deleghe superiore a tre.' },
      { kind: 'p', text: 'L’assemblea nomina, all’inizio di ogni riunione, il presidente e il segretario della seduta, salvo che la funzione sia svolta dal presidente dell’Associazione e dal segretario del Consiglio direttivo.' },
      { kind: 'p', text: 'Delle riunioni è redatto verbale sottoscritto dal presidente e dal segretario della seduta e conservato nel libro delle adunanze e delle deliberazioni dell’assemblea.' },
    ],
  },
  {
    id: 's-art-18',
    title: 'Art. 18 – Consiglio direttivo',
    blocks: [
      { kind: 'p', text: 'Il Consiglio direttivo è composto da un numero di membri non inferiore a cinque e non superiore a nove, eletti dall’assemblea tra gli associati persone fisiche.' },
      { kind: 'p', text: 'I consiglieri durano in carica tre anni e sono rieleggibili. Restano in carica fino alla nomina dei nuovi componenti.' },
      { kind: 'p', text: 'Non può essere eletto consigliere, e se eletto decade, chi si trova nelle condizioni previste dall’articolo 2382 del codice civile. Il consigliere che non partecipa senza giustificato motivo a tre riunioni consecutive del Consiglio direttivo decade dalla carica.' },
      { kind: 'p', text: 'Il Consiglio direttivo è validamente costituito con la presenza della maggioranza dei suoi componenti e delibera a maggioranza dei presenti. In caso di parità prevale il voto del presidente.' },
      { kind: 'p', text: 'Il Consiglio direttivo può cooptare nuovi consiglieri in sostituzione di componenti cessati, purché la maggioranza dei consiglieri rimanga di nomina assembleare e fino alla prima assemblea utile, che provvede alla conferma o alla sostituzione dei cooptati.' },
      { kind: 'p', text: 'Qualora venga meno la maggioranza dei consiglieri eletti dall’assemblea, il presidente convoca senza indugio l’assemblea per il rinnovo dell’organo.' },
      { kind: 'p', text: 'Il Consiglio direttivo è convocato dal presidente, oppure su richiesta motivata di almeno un terzo dei suoi componenti, con preavviso adeguato e indicazione dell’ordine del giorno.' },
    ],
  },
  {
    id: 's-art-19',
    title: 'Art. 19 – Competenze del Consiglio direttivo',
    blocks: [
      { kind: 'p', text: 'Il Consiglio direttivo:' },
      {
        kind: 'list',
        items: [
          'cura l’amministrazione ordinaria e straordinaria dell’Associazione;',
          'attua le deliberazioni dell’assemblea;',
          'predispone il bilancio e gli altri documenti da sottoporre all’assemblea;',
          'delibera sulle domande di ammissione degli associati;',
          'delibera sull’esclusione degli associati nel rispetto del presente statuto;',
          'determina annualmente la quota associativa;',
          'delibera l’esercizio delle attività diverse nei limiti previsti dalla legge;',
          'predispone i programmi annuali e pluriennali dell’Associazione;',
          'delibera sull’apertura e gestione di conti correnti e rapporti bancari;',
          'delibera sulla stipula di convenzioni, contratti e accordi coerenti con le finalità associative;',
          'può conferire deleghe operative ai propri componenti;',
          'cura la tenuta dei libri sociali e dei registri;',
          'adotta ogni provvedimento necessario per il buon funzionamento dell’Associazione, salvo quanto riservato all’assemblea dalla legge o dal presente statuto.',
        ],
      },
    ],
  },
  {
    id: 's-art-20',
    title: 'Art. 20 – Presidente e vicepresidente',
    blocks: [
      { kind: 'p', text: 'Il presidente è eletto dal Consiglio direttivo tra i propri componenti eletti dall’assemblea, dura in carica quanto il Consiglio direttivo ed è rieleggibile.' },
      { kind: 'p', text: 'Il presidente ha la rappresentanza legale dell’Associazione di fronte ai terzi e in giudizio.' },
      { kind: 'p', text: 'Il presidente:' },
      {
        kind: 'list',
        items: [
          'convoca e presiede l’assemblea e il Consiglio direttivo;',
          'cura l’esecuzione delle deliberazioni degli organi sociali;',
          'sottoscrive gli atti dell’Associazione;',
          'sovrintende al funzionamento generale dell’Associazione;',
          'adotta, in caso di urgenza, i provvedimenti necessari, sottoponendoli alla ratifica del Consiglio direttivo nella prima riunione utile.',
        ],
      },
      { kind: 'p', text: 'In caso di assenza o impedimento, il presidente è sostituito dal vicepresidente, se nominato, o dal consigliere più anziano per età.' },
      { kind: 'p', text: 'Il presidente cessa dalla carica per scadenza, dimissioni, revoca, decadenza o perdita della qualità di associato. La revoca deve essere motivata e deliberata dal Consiglio direttivo, nel rispetto del diritto di difesa dell’interessato. Resta ferma la competenza dell’assemblea a revocare i componenti del Consiglio direttivo.' },
    ],
  },
  {
    id: 's-art-21',
    title: 'Art. 21 – Segretario e tesoriere',
    blocks: [
      { kind: 'p', text: 'Il Consiglio direttivo può nominare tra i propri componenti un segretario e un tesoriere. Le due funzioni possono essere attribuite alla stessa persona.' },
      { kind: 'p', text: 'Il segretario cura la redazione dei verbali, la tenuta dei libri sociali e gli adempimenti amministrativi dell’Associazione.' },
      { kind: 'p', text: 'Il tesoriere cura la gestione contabile e finanziaria, predispone la documentazione necessaria alla redazione del bilancio e opera secondo le direttive del Consiglio direttivo.' },
    ],
  },
  {
    id: 's-art-22',
    title: 'Art. 22 – Collegio dei probiviri',
    blocks: [
      { kind: 'p', text: 'L’assemblea può istituire un collegio dei probiviri composto da tre membri scelti tra gli associati, che durano in carica quanto il Consiglio direttivo e sono rieleggibili.' },
      { kind: 'p', text: 'La carica di componente del Collegio dei probiviri è incompatibile con quella di consigliere. Il Collegio elegge al proprio interno il presidente. In caso di cessazione di un componente subentra il primo dei non eletti o, in mancanza, provvede l’assemblea nella prima riunione utile.' },
      { kind: 'p', text: 'Il Collegio delibera con la presenza di tutti i suoi componenti e a maggioranza; le decisioni sono motivate, comunicate per iscritto agli interessati e trascritte nel libro delle adunanze del Collegio.' },
      { kind: 'p', text: 'Il collegio dei probiviri può svolgere funzioni di conciliazione e di garanzia interna e decide sulle richieste di riesame dei provvedimenti di rigetto della domanda di ammissione e di esclusione, secondo quanto previsto dagli articoli 7 e 9 del presente Statuto.' },
      { kind: 'p', text: 'Il procedimento deve garantire l’imparzialità, la contestazione degli addebiti, il diritto di difesa e la motivazione della decisione.' },
      { kind: 'p', text: 'La competenza del collegio dei probiviri non esclude i diritti e le tutele riconosciuti dalla legge agli associati.' },
    ],
  },
  {
    id: 's-art-23',
    title: 'Art. 23 – Organo di controllo e revisione legale',
    blocks: [
      { kind: 'p', text: 'La nomina dell’organo di controllo e del revisore legale dei conti è effettuata quando ricorrono i presupposti previsti dalla normativa vigente o quando l’assemblea lo ritenga opportuno.' },
      { kind: 'p', text: 'L’organo di controllo e il revisore legale esercitano le funzioni e possiedono i requisiti previsti dalla legge.' },
    ],
  },
  {
    id: 's-art-24',
    title: 'Art. 24 – Rimborsi e gratuità delle cariche',
    blocks: [
      { kind: 'p', text: 'Tutte le cariche associative sono gratuite, ad eccezione di quelle di componente dell’organo di controllo e di revisore legale, se nominati, per le quali può essere previsto un compenso nel rispetto dei limiti di cui all’articolo 12.' },
      { kind: 'p', text: 'Ai componenti degli organi sociali, agli associati e ai volontari possono essere rimborsate esclusivamente le spese effettivamente sostenute, documentate e autorizzate, secondo criteri e limiti stabiliti dalla legge e dall’eventuale regolamento interno.' },
      { kind: 'p', text: 'Non sono ammessi rimborsi forfetari, salvo i casi espressamente consentiti dalla normativa vigente.' },
    ],
  },
  {
    id: 's-art-25',
    title: 'Art. 25 – Rapporti con altri enti e convenzioni',
    blocks: [
      { kind: 'p', text: 'L’Associazione può aderire ad altre associazioni, reti, federazioni, coordinamenti, circuiti culturali e cinematografici e altri enti compatibili con le proprie finalità.' },
      { kind: 'p', text: 'Può stipulare convenzioni e accordi con enti pubblici, enti privati, istituzioni, associazioni, fondazioni e altri soggetti, purché tali rapporti siano coerenti con le finalità associative e rispettino la normativa vigente.' },
    ],
  },
  {
    id: 's-art-26',
    title: 'Art. 26 – Scioglimento e devoluzione del patrimonio',
    blocks: [
      { kind: 'p', text: 'Lo scioglimento dell’Associazione è deliberato dall’assemblea straordinaria con le maggioranze previste dal presente statuto e dalla legge.' },
      { kind: 'p', text: 'In caso di estinzione o scioglimento, l’assemblea nomina uno o più liquidatori e determina le modalità della liquidazione.' },
      { kind: 'p', text: 'Il patrimonio residuo, esaurita la liquidazione, è devoluto, previo parere positivo dell’ufficio competente del Registro unico nazionale del Terzo settore e salva diversa destinazione imposta dalla legge, ad altro ente del Terzo settore individuato dall’assemblea, preferibilmente avente finalità analoghe o comunque coerenti con quelle dell’Associazione.' },
      { kind: 'p', text: 'È vietata qualsiasi attribuzione del patrimonio residuo agli associati, agli amministratori, ai fondatori o ad altri soggetti privati.' },
    ],
  },
  {
    id: 's-art-27',
    title: 'Art. 27 – Regolamenti',
    blocks: [
      { kind: 'p', text: 'Per disciplinare il funzionamento dell’Associazione e lo svolgimento delle attività, l’assemblea può approvare regolamenti interni.' },
      { kind: 'p', text: 'Il Consiglio direttivo può adottare disposizioni organizzative interne, purché non contrastino con la legge, il presente statuto e i regolamenti approvati dall’assemblea.' },
    ],
  },
  {
    id: 's-art-28',
    title: 'Art. 28 – Rinvio',
    blocks: [
      { kind: 'p', text: 'Per quanto non previsto dal presente statuto si applicano le disposizioni del decreto legislativo 3 luglio 2017, n. 117, del codice civile e della normativa vigente in materia di enti del Terzo settore, associazioni di promozione sociale, volontariato, attività culturali e spettacolo.' },
    ],
  },
  {
    id: 's-art-29',
    title: 'Art. 29 – Norme transitorie',
    blocks: [
      { kind: 'p', text: 'Il presente statuto sostituisce integralmente lo statuto approvato dall’assemblea del 3 dicembre 2018.' },
      { kind: 'p', text: 'Fino all’iscrizione nella sezione “Associazioni di promozione sociale” del Registro unico nazionale del Terzo settore, l’Associazione utilizza la denominazione “Associazione Culturale Metropol”. Dopo l’iscrizione, assume la denominazione “Associazione Culturale Metropol APS” e può utilizzare l’acronimo “APS”, nei limiti previsti dalla legge.' },
      { kind: 'p', text: 'Gli organi sociali in carica alla data di approvazione del presente statuto restano in carica fino alla scadenza naturale del mandato, salvo dimissioni, revoca, decadenza o diversa deliberazione dell’assemblea adottata nel rispetto della legge e del presente statuto.' },
      { kind: 'p', text: 'Il Collegio dei probiviri, ove già nominato e in carica, continua a svolgere le proprie funzioni fino alla scadenza del mandato, nel rispetto del presente statuto. La composizione del Consiglio direttivo prevista dall’articolo 18 si applica dal primo rinnovo successivo.' },
      { kind: 'p', text: 'Gli associati iscritti alla data di approvazione del presente statuto conservano la qualità di associato e l’anzianità di iscrizione maturata, purché risultino in possesso dei requisiti previsti dal presente statuto e dalla normativa vigente.' },
    ],
  },
];

export const REGOLAMENTO_BOZZA: Chapter[] = [
  {
    id: 'r-titolo-1',
    title: 'TITOLO I – PREMESSA',
    articles: [
      {
        id: 'r-art-1',
        title: 'ART. 1',
        blocks: [
          { kind: 'p', text: 'In base a quanto previsto {+all’art. 27 dello Statuto Sociale+}, l’Assemblea dei Soci emana il presente Regolamento Interno per la disciplina e l’organizzazione delle attività dell’Associazione.' },
        ],
      },
      {
        id: 'r-art-2',
        title: 'ART. 2',
        blocks: [
          { kind: 'p', text: 'Il presente Regolamento disciplina gli aspetti organizzativi interni, così come i diritti e i doveri delle persone che a qualsiasi titolo operano per nome e per conto dell’Associazione. Allo stesso modo, il presente regolamento individua ruoli e compiti del personale volontario e dipendente al fine di delineare nel dettaglio le linee organizzative ed operative non espressamente descritte all’interno dello Statuto Sociale.' },
          { kind: 'p', text: "Il regolamento interno è proposto dal Consiglio Direttivo all'Assemblea ordinaria o straordinaria dei Soci, riunita secondo le modalità indicate dallo Statuto. Anche in sede di presentazione all’Assemblea dei Soci, è possibile per questi ultimi proporre emendamenti o aggiunte. Gli emendamenti vengono votati all'interno dell'Assemblea ordinaria o straordinaria dei Soci e vengono approvati con maggioranza di almeno 2/3 degli aventi diritto di voto." },
          { kind: 'p', text: "Questo regolamento non ha effetto retroattivo. Parimenti dicasi per tutti quegli articoli, emendamenti o aggiunte che verranno effettuati dopo l'approvazione del regolamento stesso." },
          { kind: 'p', text: 'Il regolamento interno è una fonte subordinata allo Statuto, non può quindi modificarne le disposizioni' },
        ],
      },
    ],
  },
  {
    id: 'r-titolo-2',
    title: 'TITOLO II – ORGANIZZAZIONE INTERNA',
    articles: [
      {
        id: 'r-art-3',
        title: 'ART. 3 - ASSEMBLEA DEI SOCI',
        blocks: [
          {
            kind: 'list',
            items: [
              'Delibera modifiche allo Statuto dell’Associazione;',
              'Elegge con cadenza triennale (o in caso di decadenza): il Consiglio Direttivo, i componenti del Collegio dei Revisori dei Conti, i componenti del Collegio dei Probiviri;',
              'Esamina e approva i bilanci;',
              'Delibera lo scioglimento dell’Associazione;',
              'Approva la relazione annuale del Presidente sull’andamento dell’Associazione;',
              'Approva il Regolamento Interno (o sue eventuali modifiche) predisposto dal Consiglio Direttivo.',
            ],
          },
        ],
      },
      {
        id: 'r-art-4',
        title: 'ART. 4 - CONSIGLIO DIRETTIVO',
        blocks: [
          { kind: 'p', text: 'E’ l’organo decisionale dell’Associazione che è responsabile della:' },
          {
            kind: 'list',
            items: [
              'Programmazione e attuazione dei progetti;',
              'Direzione tecnica, amministrativa e gestionale dell’Associazione;',
              'Gestione ordinaria e straordinaria dell’Associazione;',
              'Nomina del Presidente, del Vice Presidente, del Segretario, del Tesoriere;',
              'Ammissione e decadenza dei soci;',
              'Gestione dei rapporti con l’Amministrazione Comunale per il rinnovo della Convenzione;',
              'Redazione del Regolamento Interno contenente le norme per il funzionamento dell’Associazione.',
            ],
          },
          { kind: 'p', text: 'Le riunioni del Consiglio direttivo sono presiedute dal Presidente in carica coadiuvato nella redazione dei verbali dal Segretario. Qualora fosse assente il Presidente del Consiglio direttivo, la riunione verrebbe presieduta dal Vice Presidente.' },
          { kind: 'p', text: 'Tutti i membri del Consiglio Direttivo debbono partecipare alle riunioni e in caso di assenza devono giustificarsi con anticipo di 24 ore, inoltre hanno l’obbligo di partecipare attivamente alle attività intraprese dall’Associazione, come da impegno assunto al momento della candidatura a tale ruolo.' },
          { kind: 'p', text: 'Nei casi di accumulo di più di tre assenze ingiustificate, anche non continuative, o mancata partecipazione attiva alle attività intraprese dall’Associazione si è soggetti a diffida, da parte del Consiglio Direttivo. Il reiterarsi dell’infrazione attribuisce al Consiglio direttivo la facoltà di procedere alla rimozione dall’incarico.' },
          { kind: 'p', text: 'I membri del Consiglio, consapevoli della serietà delle riunioni, sono tenuti a non divulgare notizie e fatti emersi. Questo divieto vale per tutte le persone eventualmente presenti. La validità della riunione si ha con la presenza di almeno la metà più uno dei Consiglieri, ivi incluso il Presidente (o il Vice Presidente).' },
          { kind: 'p', text: 'Nei casi di impedimento o di impossibilità a partecipare al Consiglio non è possibile delegare un altro Consigliere a fare le sue veci. Un membro facente parte delle cariche sociali dell’Associazione decade se ottiene un incarico politico a qualsiasi livello o per una delle cause elencate nel seguente art. 10 o per quanto esposto nel art. 8 dello Statuto.' },
        ],
      },
      {
        id: 'r-art-5',
        title: 'ART. 5 – RUOLI PRIMARI',
        blocks: [
          { kind: 'p', text: 'Al fine di consolidare un’organizzazione interna che garantisca continuità, efficacia ed efficienza dei servizi e dei progetti dell’Associazione, il presente regolamento sancisce l’istituzione delle sotto elencate figure definite primarie.' },
          {
            kind: 'list',
            items: [
              'Presidente',
              'Vice Presidente',
              'Segretario',
              'Tesoriere',
            ],
          },
          { kind: 'p', text: 'Solo i membri del Consiglio Direttivo (come da Statuto Sociale) possono ricoprire i Ruoli Primari. {-e nessun membro può ricoprire più di un ruolo primario.-}' },
        ],
      },
      {
        id: 'r-art-5-1',
        title: 'ART. 5.1 - PRESIDENTE',
        blocks: [
          {
            kind: 'list',
            items: [
              'Rappresenta legalmente l’Associazione;',
              'Convoca e presiede l’Assemblea dei Soci e il Consiglio Direttivo, firmandone i relativi verbali;',
              'Assicura lo svolgimento organico e unitario dell’Associazione;',
              "Sovrintende la gestione amministrativa ed economica dell'associazione, di cui firma gli atti;",
              'Gestisce i rapporti con la Pubblica Amministrazione e con le altre associazioni del territorio.',
            ],
          },
        ],
      },
      {
        id: 'r-art-5-2',
        title: 'ART. 5.2 - VICE PRESIDENTE',
        blocks: [
          {
            kind: 'list',
            items: [
              'Sostituisce il Presidente in caso di sua assenza;',
              "{+Può ricevere deleghe operative o incarichi particolari stabiliti dallo statuto dell'associazione o deliberati dal consiglio direttivo.+} {-Svolge funzioni di Tesoriere (incaricato della gestione contabile e amministrativa) in caso di assenza del tesoriere.-}",
            ],
          },
        ],
      },
      {
        id: 'r-art-5-3',
        title: 'ART. 5.3 – SEGRETARIO',
        blocks: [
          { kind: 'p', text: 'Il segretario coadiuva il Presidente e ha i seguenti compiti:' },
          {
            kind: 'list',
            items: [
              "Provvedere alla tenuta e all'aggiornamento del Registro dei soci;",
              'Provvedere al disbrigo della corrispondenza;',
              "Redigere e conservare i verbali delle riunioni dell'Assemblea dei soci e del Consiglio Direttivo;",
              'Provvedere a fornire l’elenco delle tessere associative da stampare.',
            ],
          },
        ],
      },
      {
        id: 'r-art-5-4',
        title: 'ART. 5.4 – TESORIERE',
        blocks: [
          {
            kind: 'list',
            items: [
              'E’ incaricato della gestione contabile e amministrativa;',
              'Provvede alla tenuta dei registri e della contabilità dell’Associazione, nonché alla conservazione della documentazione relativa, con l’indicazione nominativa dei soggetti eroganti;',
              'Provvede alla riscossione delle entrate e al pagamento delle spese in conformità alle decisioni del Consiglio Direttivo;',
              'Gestisce i rapporti con la banca e assicura la liquidità della cassa;',
              'Tiene i rapporti con la SIAE e provvede al pagamento dei relativi diritti;',
              'Predispone le statistiche relativamente ai dati di presenza ed incasso delle proiezioni.',
            ],
          },
        ],
      },
      {
        id: 'r-art-6',
        title: 'ART. 6 – RUOLI SECONDARI',
        blocks: [
          { kind: 'p', text: 'All’interno dell’Associazione sono istituite le seguenti cariche definite secondarie, che possono essere coperte (una o più) sia da membri del Consiglio Direttivo che da persone iscritte all’Associazione e individuate dal Consiglio Direttivo per dimostrate capacità nell’ambito di assegnazione:' },
          { kind: 'sub', text: 'a) RESPONSABILE DELLA PROGRAMMAZIONE' },
          {
            kind: 'list',
            level: 2,
            items: [
              'Collabora con il Programmatore esterno per definire i titoli e le condizioni commerciali con le case di distribuzione;',
              'Invia gli ordini ai fornitori esterni per il materiale promozionale;',
              'Comunica la programmazione settimanale ai vari canali informativi.',
            ],
          },
          { kind: 'sub', text: 'b) RESPONSABILE TECNICO' },
          {
            kind: 'list',
            level: 2,
            items: [
              'Coordina il gruppo dei tecnici, e si occupa di contattare i fornitori esterni per mantenere in efficienza il materiale tecnico dell’Associazione;',
              'E’ responsabile della creazione delle playlist, previo settimanale recupero e controllo del corretto funzionamento delle chiavi di sblocco dei film.',
            ],
          },
          { kind: 'sub', text: 'c) RESPONSABILE GESTIONE VOLONTARI' },
          {
            kind: 'list',
            level: 2,
            items: [
              'Gestisce e coordina il calendario dei turni dei volontari.',
              'Favorisce iniziative per l’aggregazione dei volontari e si attiva per il coinvolgimento di nuovi volontari.',
              'Predispone i cartellini di riconoscimento dei nuovi volontari.',
              'Predispone la reportistica delle presenze',
            ],
          },
          { kind: 'sub', text: 'd) RESPONSABILE DELLA COMUNICAZIONE' },
          {
            kind: 'list',
            level: 2,
            items: [
              'Definisce e aggiorna il piano della comunicazione dell’associazione;',
              'In funzione del punto precedente, coordina e sovraintende le seguenti attività:',
            ],
          },
          {
            kind: 'list',
            level: 3,
            items: [
              'gestisce la pagina Facebook e gli altri social network;',
              'inserisce e aggiorna costantemente i contenuti sul sito web dell’Associazione;',
              'tiene i rapporti con la stampa;',
              'redige e provvede a trasmettere la newsletter dell’Associazione;',
              'coordina eventi speciali organizzati dall’Associazione;',
              'definisce e si occupa delle iniziative pubblicitarie dell’associazione.',
            ],
          },
          { kind: 'sub', text: 'e) RESPONSABILE DELLA LOGISTICA' },
          {
            kind: 'list',
            level: 2,
            items: [
              'Coordina le varie consegne dei corrieri esterni;',
              'Provvede a smistare il materiale in arrivo alle persone di riferimento o nei luoghi concordati con il Consiglio Direttivo;',
              "Si occupa dell'affissione dei manifesti;",
              'Si occupa dell’organizzazione dei volantinaggi.',
            ],
          },
          { kind: 'sub', text: 'f) RESPONSABILE CORSI / RAPPORTI CON LE SCUOLE' },
          {
            kind: 'list',
            level: 2,
            items: [
              'Definisce con i docenti esterni il programma dei corsi;',
              'Si interfaccia con gli Istituti Scolastici per la proposta di iniziative per gli studenti (corsi, proiezioni dedicate o altri eventi)',
            ],
          },
          { kind: 'p', text: 'Le figure sopra elencate possono individuare dei diretti collaboratori, dandone comunicazione al Consiglio Direttivo, rimanendo comunque i responsabili della funzione specifica.' },
        ],
      },
      {
        id: 'r-art-7',
        title: 'ART. 7 – CAMBIO DI UN CONSIGLIERE DEL DIRETTIVO',
        blocks: [
          { kind: 'p', text: 'In caso di dimissioni o rimozione di un consigliere, il Consiglio Direttivo surroga il consigliere uscente con il primo dei non eletti e così di seguito (in base alla graduatoria dell’ultima assemblea elettiva).' },
          { kind: 'p', text: 'Il Consigliere così nominato rimarrà in carica fino alla naturale scadenza del Consiglio.' },
          { kind: 'p', text: 'Nel caso che non ci fosse nessun primo “non eletto” o questi non accettasse l’incarico (e così per tutti gli eventuali altri “non eletti” in graduatoria), il Consiglio Direttivo può:' },
          {
            kind: 'list',
            items: [
              'Decidere di non reintegrare il consigliere uscente, purché sia garantito il numero minimo legale di composizione del Consiglio Direttivo;',
              'Convocare un’assemblea straordinaria dei soci in cui verrà votato a maggioranza dei presenti un nuovo consigliere;',
              'Nominare per cooptazione il sostituto del consigliere uscente (tale opzione tuttavia è da considerarsi l’ultima perseguibile dopo aver valutato quelle precedentemente elencate, e non può essere utilizzata per più di due volte all’interno di un mandato).',
            ],
          },
        ],
      },
      {
        id: 'r-art-8',
        title: 'ART. 8 - ELEZIONI DEL CONSIGLIO DIRETTIVO',
        blocks: [
          { kind: 'p', text: 'Per poter eleggere il nuovo Consiglio Direttivo, il Consiglio uscente dovrà inviare ai soci, almeno 30 giorni prima della data fissata per l’Assemblea elettiva, una comunicazione contenente le indicazioni per l’invio delle candidature e le modalità per l’espletazione delle operazioni di voto.' },
          { kind: 'p', text: 'L’eventuale candidatura come consigliere va comunque comunicata per iscritto al Consiglio Direttivo in formato cartaceo o per e-mail alla sede sociale.' },
          { kind: 'p', text: 'Solo in caso di candidature pervenute insufficienti a coprire il numero minimo dei componenti del Direttivo ({+stabilito art. 18 dello Statuto+}), vanno accettate eventuali candidature emerse nel corso dell’Assemblea, dalle persone fisicamente presenti, fino al raggiungimento del minimo di candidature a consigliere.' },
          { kind: 'p', text: 'Durante l’Assemblea si procede alla votazione dei canditati e a stilare la relativa graduatoria in funzione dei voti ottenuti dai candidati, in modo da ottenere la lista degli eletti.' },
          { kind: 'p', text: 'Un candidato per essere eletto nel Consiglio Direttivo dovrà ottenere almeno 1 voto durante l’Assemblea elettiva.' },
          { kind: 'p', text: 'Nel caso non si arrivasse al numero minimo di consiglieri, il Consiglio Direttivo uscente verrà riconfermato e provvederà a riconvocare, entro 60 giorni, una nuova Assemblea seguendo le stesse procedure della prima.' },
          { kind: 'p', text: 'Può presentare la candidatura alla carica di Consigliere solamente un socio ORDINARIO che risulta essere iscritto da almeno 1 anno e in regola con il pagamento della quota sociale.' },
          { kind: 'p', text: 'Nelle candidature per le cariche sociali non sono ammessi i soci che non sono in regola con i pagamenti, o che posseggano, al momento dell’invio della candidatura, un incarico politico a qualsiasi livello (visto l’art. 1 comma 1 dello Statuto).' },
        ],
      },
      {
        id: 'r-art-9',
        title: 'ART. 9 – I SOCI',
        blocks: [
          { kind: 'p', text: 'I soci dell’Associazione sono {+definiti all’art. 6 dello+} Statuto. I requisiti generali per il loro accoglimento sono i seguenti:' },
          {
            kind: 'list',
            items: [
              'aver compiuto la maggiore età;',
              'aver compilato e sottoscritto la domanda di adesione;',
              'aver sottoscritto l’autorizzazione al trattamento ed uso dati personali;',
              'aver preso visione, accettato ed essersi impegnato a rispettare lo statuto;',
              'aver preso visione, accettato ed essersi impegnato a rispettare il presente regolamento interno;',
              'aver versato la quota sociale annuale, la cui scadenza per il rinnovo è stata fissata dal Consiglio Direttivo al 30 novembre di ogni anno.',
            ],
          },
          { kind: 'p', text: 'I soci hanno inoltre l’obbligo di comunicare tempestivamente all’associazione eventuali variazioni dei loro dati anagrafici.' },
          { kind: 'p', text: "Nel caso che un socio abbia comportamenti difformi dallo statuto e dal regolamento interno, che rechino pregiudizio agli scopi o al patrimonio dell'Associazione, il Consiglio Direttivo dovrà intervenire ed applicare le seguenti sanzioni con principio di gradualità: richiamo, diffida, espulsione dall’Associazione" },
        ],
      },
      {
        id: 'r-art-9-1',
        title: 'ART. 9.1 – I SOCI VOLONTARI',
        blocks: [
          { kind: 'p', text: 'E’ facoltà dei soci di comunicare al Consiglio Direttivo la propria disponibilità a prestare servizio come volontari per l’Associazione.' },
          { kind: 'p', text: 'Il Consiglio Direttivo provvede quindi, alla prima riunione utile, a valutare che i volontari siano idonei all’attività da svolgere.' },
          { kind: 'p', text: 'I soci volontari sono tenuti a:' },
          {
            kind: 'list',
            items: [
              'indossare il tesserino di riconoscimento quando sono in servizio',
              'rispettare i turni in base alle disponibilità date, o comunque comunicare con un idoneo preavviso al responsabile eventuali indisponibilità successive',
              'rispettare le indicazioni date dai responsabili dei singoli turni di proiezione',
              'partecipare ad eventuali corsi di formazione che si rendessero necessari per il rispetto di obblighi normativi',
            ],
          },
          { kind: 'p', text: 'Durante lo svolgimento della sua attività, il volontario è coperto da una polizza assicurativa per RCT. In caso di sinistro egli deve presentare all’associazione notifica dell’accaduto esibendo la documentazione prevista dal regolamento della polizza.' },
        ],
      },
      {
        id: 'r-art-10',
        title: "Art. 10 - PERDITA DELLA QUALITA' DI SOCIO",
        blocks: [
          { kind: 'p', text: 'La qualità di socio si perde per:' },
          {
            kind: 'list',
            items: [
              'Dimissioni o decesso;',
              'Mancato pagamento della quota sociale entro 30 giorni dalla data di scadenza indicata all’art. 9;',
              'Esclusione deliberata dal Consiglio Direttivo per:',
            ],
          },
          {
            kind: 'list',
            level: 2,
            items: [
              'una condotta palesemente e gravemente contraria ai principi, alle finalità, agli scopi dell’Associazione o alla sua azione;',
              'ogni iniziativa locale presa da un socio o un gruppo di soci in nome e per conto dell’Associazione senza aver prima chiesto autorizzazione al Consiglio Direttivo;',
              'inottemperanza alle disposizioni Statutarie e al Regolamento Interno dell’Associazione.',
              'formare o essere attivamente impegnato in un’altra Associazione con le stesse finalità;',
              'raccogliere fondi senza aver chiesto autorizzazione al Consiglio Direttivo.',
            ],
          },
          { kind: 'p', text: 'Il socio escluso può ricorrere per iscritto contro il provvedimento entro trenta giorni al Collegio dei Probiviri (ai {+sensi dell’art. 7 dello+} Statuto).' },
        ],
      },
      {
        id: 'r-art-11',
        title: 'Art. 11 – ALTRE NORME',
        blocks: [
          { kind: 'p', text: 'Per quanto non espressamente esplicitato in questo Regolamento fa fede lo Statuto dell’Associazione.' },
          { kind: 'p', text: 'Villafranca, {+09/11/2026+}' },
        ],
      },
    ],
  },
];

export interface Modifica {
  /** Ancora dell'articolo nella pagina. */
  id: string;
  articolo: string;
  descrizione: string;
}

/** Le ultime correzioni alla bozza dello Statuto (i passaggi segnati nel PDF). */
export const CORREZIONI_STATUTO: Modifica[] = [
  {
    id: 's-art-5',
    articolo: 'Art. 5',
    descrizione:
      'La natura commerciale o non commerciale di ogni attività dipende dalla normativa vigente e da come l’attività si svolge in concreto.',
  },
  {
    id: 's-art-7',
    articolo: 'Art. 7',
    descrizione:
      'La decisione sul riesame di una domanda respinta chiude il procedimento interno, salve le tutele di legge.',
  },
  {
    id: 's-art-8',
    articolo: 'Art. 8',
    descrizione: 'Tra i diritti degli associati, proporre argomenti per l’ordine del giorno dell’assemblea.',
  },
  {
    id: 's-art-9',
    articolo: 'Art. 9',
    descrizione: 'Tra i motivi di esclusione, il mancato pagamento della quota dopo formale sollecito.',
  },
  {
    id: 's-art-10',
    articolo: 'Art. 10',
    descrizione:
      'Tolta l’eccezione per le attività diverse dal volontariato: la qualità di volontario resta incompatibile con ogni rapporto di lavoro o patrimoniale con l’Associazione.',
  },
  {
    id: 's-art-14',
    articolo: 'Art. 14',
    descrizione:
      'I libri sociali si consultano entro quindici giorni dalla richiesta, salvo comprovate esigenze organizzative.',
  },
  {
    id: 's-art-16',
    articolo: 'Art. 16',
    descrizione:
      'L’assemblea va convocata anche su richiesta motivata di almeno il dieci per cento degli associati con diritto di voto.',
  },
  {
    id: 's-art-17',
    articolo: 'Art. 17',
    descrizione:
      'In seconda convocazione l’assemblea ordinaria è valida qualunque sia il numero dei presenti e delibera a maggioranza dei voti espressi.',
  },
];

/** Le modifiche al Regolamento rispetto al testo in vigore. */
export const MODIFICHE_REGOLAMENTO: Modifica[] = [
  {
    id: 'r-art-1',
    articolo: 'Art. 1',
    descrizione: 'Il rimando allo Statuto diventa all’art. 27 (prima art. 6).',
  },
  {
    id: 'r-art-5',
    articolo: 'Art. 5',
    descrizione: 'Tolto il divieto di ricoprire più di un ruolo primario.',
  },
  {
    id: 'r-art-5-2',
    articolo: 'Art. 5.2',
    descrizione:
      'Il Vice Presidente può ricevere deleghe operative o incarichi particolari; tolta la sostituzione del Tesoriere in caso di assenza.',
  },
  {
    id: 'r-art-8',
    articolo: 'Art. 8',
    descrizione: 'Il numero minimo del Direttivo rimanda all’art. 18 dello Statuto (prima art. 14).',
  },
  {
    id: 'r-art-9',
    articolo: 'Art. 9',
    descrizione: 'La definizione dei soci rimanda all’art. 6 dello Statuto (prima art. 4).',
  },
  {
    id: 'r-art-10',
    articolo: 'Art. 10',
    descrizione: 'Il ricorso del socio escluso rimanda all’art. 7 dello Statuto (prima art. 6).',
  },
];
