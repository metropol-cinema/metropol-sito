/**
 * Testo integrale dello Statuto e del Regolamento Interno dell'Associazione
 * Culturale Metropol, trascritto dal sito storico (www.cinemametropol.com/statuto).
 */

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  /** Voce evidenziata interna a un articolo (es. nome di un ruolo). */
  | { kind: 'sub'; text: string };

export interface Article {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Chapter {
  id: string;
  title: string;
  articles: Article[];
}

export const STATUTO: Article[] = [
  {
    id: 'art-1',
    title: 'Art. 1',
    blocks: [
      {
        kind: 'p',
        text: 'È costituita l’Associazione culturale denominata “ASSOCIAZIONE CULTURALE METROPOL”, libera Associazione apolitica, con durata illimitata nel tempo e senza scopo di lucro.',
      },
      { kind: 'p', text: 'L’Associazione ha sede nel Comune di Villafranca di Verona (VR).' },
      {
        kind: 'p',
        text: 'Il Consiglio Direttivo, con una sua deliberazione, può trasferire la sede nell’ambito dello stesso Comune, senza modifiche statutarie, fatta salva la comunicazione agli Enti preposti.',
      },
    ],
  },
  {
    id: 'art-2',
    title: 'Art. 2',
    blocks: [
      {
        kind: 'p',
        text: 'L’Associazione ha fini di solidarietà sociale e persegue i seguenti scopi:',
      },
      {
        kind: 'list',
        items: [
          'promuove la cultura in tutte le sue forme, in particolare attraverso il cinema, sia in ambito filmico che documentaristico;',
          'promuove la conoscenza del cinema in tutti i suoi aspetti storici, tecnici, di genere, studi e ricerche su documenti filmici di storia e vissuto locale;',
          'promuove la cultura attraverso il cinema, anche in campo didattico;',
          'promuove le iniziative della sala polifunzionale di Villafranca di Verona, sia in sala che all’esterno o in modo itinerante (cinema d’estate);',
          'promuove il rilancio del cinema in senso ampio come momento di socializzazione e sviluppo di senso di appartenenza della Comunità intesa sia come comprensorio villafranchese sia, in senso assai più ampio, di tutte le persone che, attraverso il cinema, vogliano sviluppare un legame di Comunità quali “cittadini del mondo” inclusi naturalmente anche i cittadini stranieri;',
          'promuove eventi culturali attraverso convegni, mostre, dibattiti e iniziative di informazione pubblica su determinati temi, nonché pubblicizza le iniziative del territorio con appositi spazi (di proiezione, fisici-bacheche, virtuali);',
          'promuove ogni sinergia in stretta collaborazione con tutte le realtà istituzionali e culturali, apportando ulteriore visibilità alle altre iniziative che promuovano le stesse finalità e a favore del territorio;',
          'promuove il dialogo con tutte le altre associazioni culturali, Enti pubblici e privati e istituzioni sia per iniziative congiunte, sia per integrare di contenuti le proprie e le altrui iniziative.',
        ],
      },
    ],
  },
  {
    id: 'art-3',
    title: 'Art. 3',
    blocks: [
      {
        kind: 'p',
        text: 'L’associazione, per il raggiungimento dei suoi fini, intende promuovere varie attività, tra le quali:',
      },
      {
        kind: 'list',
        items: [
          'la conoscenza del cinema attraverso la proiezione di rassegne cinematografiche a tema, l’organizzazione di cineforum, l’integrazione dell’opera filmica attraverso specifiche ricerche del materiale esistente ad essa relativa, la creazione di una biblioteca e videoteca specializzate;',
          'attività culturali: convegni, conferenze, dibattiti, seminari, proiezioni di film e documenti, rappresentazioni teatrali di ogni tipo, concerti, lezioni – corsi didattici per bambini e ragazzi, per giovani ed adulti, concorsi artistici;',
          'la massima diffusione a tutte le iniziative dell’Associazione, attraverso i normali canali di messaggistica, i siti internet, la posta elettronica e i sistemi Twitter, Facebook e simili, carta stampata, volantinaggio, affissioni in luoghi pubblici o presso attività commerciali;',
          'l’incontro pubblico con registi, sceneggiatori, attori, tecnici, produttori e ogni altro soggetto avente parte attiva nella realizzazione di film o documentari;',
          'la ricerca di tutto il materiale esistente sul territorio al fine di coinvolgere i residenti in un processo di rafforzamento delle proprie origini, tradizioni e storia, usi e consuetudini locali, emergenze artistico-naturalistiche e monumentali, aspetti musicali, arte, musei e simili;',
          'attività editoriale: pubblicazione di un bollettino, di atti di convegni, di seminari, nonché degli studi e delle ricerche compiute ed ogni altra iniziativa editoriale;',
          'promozione di convenzioni con le altre realtà esistenti.',
        ],
      },
    ],
  },
  {
    id: 'art-4',
    title: 'Art. 4',
    blocks: [
      {
        kind: 'p',
        text: 'L’associazione è aperta a tutti coloro che, interessati alla realizzazione delle finalità istituzionali, ne condividono lo spirito e gli ideali, è apolitica ed apartitica.',
      },
      { kind: 'p', text: 'I soci dell’Associazione si dividono in:' },
      {
        kind: 'list',
        items: [
          'soci ordinari: possono essere soci ordinari tutti coloro, persone fisiche o giuridiche, associazioni ed enti, che condividono finalità e orientamento dell’Associazione. I soci sono tenuti al versamento del contributo associativo nella misura ordinaria fissata annualmente dal Consiglio Direttivo;',
          'soci fondatori: sono coloro che hanno contribuito fattivamente alla costituzione dell’Associazione; sono soggetti alle regole dei soci ordinari;',
          'soci sostenitori: sono coloro che versano una quota associativa maggiore di quella ordinaria, in base a quanto stabilito annualmente dal Consiglio Direttivo;',
          'soci onorari: possono essere persone, enti o istituzioni che abbiano contribuito in maniera determinante, con la loro opera od il loro sostegno ideale, ovvero economico, alla vita dell’Associazione. Hanno carattere di partner permanenti e sono esonerati dal versamento di quote annuali. Essi non hanno diritto di voto.',
        ],
      },
      {
        kind: 'p',
        text: 'Le quote o il contributo associativo non sono trasmissibili, non sono soggetti a rivalutazione e non sono rimborsabili per nessun motivo.',
      },
    ],
  },
  {
    id: 'art-5',
    title: 'Art. 5',
    blocks: [
      {
        kind: 'p',
        text: 'L’ammissione dei soci ordinari è deliberata, su domanda scritta del richiedente, dal Consiglio Direttivo.',
      },
      {
        kind: 'p',
        text: 'Contro il rifiuto di ammissione è ammesso appello, entro 30 giorni, al Collegio dei Probiviri.',
      },
    ],
  },
  {
    id: 'art-6',
    title: 'Art. 6',
    blocks: [
      {
        kind: 'p',
        text: 'Tutti i soci sono tenuti a rispettare le norme del presente statuto e l’eventuale regolamento interno, secondo le deliberazioni assunte dagli organi preposti.',
      },
      {
        kind: 'p',
        text: 'In caso di comportamento difforme, che rechi pregiudizio agli scopi o al patrimonio dell’Associazione, il Consiglio Direttivo dovrà intervenire ed applicare le seguenti sanzioni con principio di gradualità: richiamo, diffida, espulsione dall’Associazione.',
      },
      {
        kind: 'p',
        text: 'I soci espulsi possono ricorrere per iscritto contro il provvedimento entro trenta giorni al Collegio dei Probiviri.',
      },
    ],
  },
  {
    id: 'art-7',
    title: 'Art. 7',
    blocks: [
      {
        kind: 'p',
        text: 'Tutti i soci maggiorenni hanno diritto di voto per l’approvazione e le modificazioni dello statuto e dei regolamenti, per la nomina degli organi direttivi dell’Associazione e per le altre materie di competenza.',
      },
    ],
  },
  {
    id: 'art-8',
    title: 'Art. 8',
    blocks: [
      { kind: 'p', text: 'Il socio cessa di far parte dell’Associazione:' },
      {
        kind: 'list',
        items: [
          'per dimissioni: il socio può recedere dall’Associazione in qualsiasi momento, dandone comunicazione scritta al Consiglio Direttivo;',
          'per mancato pagamento o rinnovo delle quote sociali così come stabilite dal Consiglio Direttivo;',
          'per esclusione: per decisione del Consiglio Direttivo a causa di violazioni delle norme dello statuto (o da questo richiamate) o qualora il Socio dimostri di non condividere le finalità dell’Associazione e/o risulti di turbamento nello svolgimento dell’attività dell’Associazione stessa;',
          'per decesso: in tal caso la quota non è trasmissibile agli eredi e l’erede non subentrerà nei diritti connessi alla quota Associativa.',
        ],
      },
      {
        kind: 'p',
        text: 'In tutti i casi di interruzione del rapporto associativo le quote associative versate non verranno rimborsate e il Socio perde automaticamente ed immediatamente tutti i diritti, doveri, qualifiche e cariche sociali.',
      },
    ],
  },
  {
    id: 'art-9',
    title: 'Art. 9',
    blocks: [
      { kind: 'p', text: 'Il patrimonio dell’associazione è costituito:' },
      {
        kind: 'list',
        items: [
          'dai beni mobili ed immobili che diverranno di proprietà dell’associazione;',
          'dai fondi derivanti da eventuali eccedenze di bilancio;',
          'da erogazioni, donazioni e lasciti.',
        ],
      },
      {
        kind: 'p',
        text: 'I proventi con cui provvedere all’attività e alla vita dell’associazione sono costituiti:',
      },
      {
        kind: 'list',
        items: [
          'dalle quote associative;',
          'da eventuali altri contributi che pervengano all’associazione a qualsiasi titolo;',
          'dal ricavato derivante da manifestazioni, raccolte fondi ed altre attività organizzate dall’associazione;',
          'da contributi dello Stato, di enti, di istituzioni pubbliche e/o private, di organismi internazionali;',
          'da rimborsi derivanti da convenzioni;',
          'da ogni altra iniziativa consentita dalla legge.',
        ],
      },
      {
        kind: 'p',
        text: 'I contributi degli aderenti sono costituiti dalle quote di associazione annuale, stabilite dal Consiglio Direttivo, e da eventuali contributi straordinari stabiliti dall’assemblea, che ne determina l’ammontare.',
      },
      {
        kind: 'p',
        text: 'Le elargizioni in danaro, le donazioni e i lasciti saranno utilizzati in armonia con le finalità statutarie dell’Associazione.',
      },
    ],
  },
  {
    id: 'art-10',
    title: 'Art. 10',
    blocks: [
      { kind: 'p', text: 'L’anno finanziario inizia il 1° settembre e termina il 31 agosto di ogni anno.' },
      { kind: 'p', text: 'Il Consiglio Direttivo deve redigere il bilancio consuntivo annuale.' },
      {
        kind: 'p',
        text: 'Il bilancio consuntivo deve essere approvato dall’Assemblea ordinaria ogni anno entro quattro mesi dalla chiusura dell’esercizio.',
      },
      {
        kind: 'p',
        text: 'Esso deve essere depositato presso la sede dell’Associazione entro i 15 giorni precedenti la seduta per poter essere consultato da ogni associato.',
      },
      {
        kind: 'p',
        text: 'Gli utili e gli avanzi di gestione dovranno essere obbligatoriamente impiegati per la realizzazione delle attività istituzionali o di quelle ad esse direttamente connesse.',
      },
    ],
  },
  {
    id: 'art-11',
    title: 'Art. 11',
    blocks: [
      { kind: 'p', text: 'Gli organi dell’Associazione sono:' },
      {
        kind: 'list',
        items: [
          'l’Assemblea dei Soci;',
          'il Consiglio Direttivo;',
          'il Presidente;',
          'il Collegio dei Probiviri.',
        ],
      },
    ],
  },
  {
    id: 'art-12',
    title: 'Art. 12',
    blocks: [
      {
        kind: 'p',
        text: 'L’Assemblea dei Soci è il momento fondamentale di confronto, atto ad assicurare una corretta gestione dell’Associazione, ed è composta da tutti i soci, ognuno dei quali ha diritto ad un voto, qualunque sia il valore della quota, con esclusione dei soci onorari. Essa è convocata almeno una volta all’anno in via ordinaria, ed in via straordinaria quando sia necessaria o sia richiesta dal Consiglio Direttivo o da almeno un terzo degli associati.',
      },
      {
        kind: 'p',
        text: 'L’assemblea sia ordinaria che straordinaria è regolarmente costituita in prima convocazione con la presenza della metà degli associati e delibera con il voto favorevole della maggioranza dei presenti. In seconda convocazione l’assemblea sia ordinaria che straordinaria è regolarmente costituita qualunque sia il numero dei presenti e delibera con il voto favorevole della maggioranza dei presenti stessi.',
      },
      {
        kind: 'p',
        text: 'L’assemblea straordinaria delibera lo scioglimento dell’associazione e la devoluzione del patrimonio con il voto favorevole di almeno tre quarti degli associati.',
      },
      {
        kind: 'p',
        text: 'La convocazione va fatta con avviso pubblico affisso presso la sede almeno 15 giorni prima della data dell’assemblea o con avviso effettuato sul sito web dell’Associazione o con mezzo, anche elettronico, che ne garantisca l’avvenuta ricezione.',
      },
      {
        kind: 'p',
        text: 'Delle delibere assembleari deve essere data pubblicità mediante affissione presso la sede.',
      },
    ],
  },
  {
    id: 'art-13',
    title: 'Art. 13',
    blocks: [
      { kind: 'p', text: 'L’Assemblea ordinaria ha i seguenti compiti:' },
      {
        kind: 'list',
        items: [
          'elegge il Consiglio Direttivo e il Collegio dei Probiviri;',
          'approva il bilancio consuntivo;',
          'approva il regolamento interno.',
        ],
      },
      {
        kind: 'p',
        text: 'L’Assemblea straordinaria delibera sulle modifiche dello Statuto e l’eventuale scioglimento dell’Associazione.',
      },
      {
        kind: 'p',
        text: 'All’apertura di ogni seduta l’assemblea elegge un presidente ed un segretario che dovranno sottoscrivere il verbale finale.',
      },
      {
        kind: 'p',
        text: 'L’Assemblea, sia ordinaria che straordinaria, potrà essere convocata oltre che dal Consiglio Direttivo, anche da tanti soci che rappresentino almeno il 20% degli aventi diritto.',
      },
    ],
  },
  {
    id: 'art-14',
    title: 'Art. 14',
    blocks: [
      {
        kind: 'p',
        text: 'Il Consiglio Direttivo è composto da 5 a 9 membri, eletti dall’Assemblea fra i propri componenti.',
      },
      {
        kind: 'p',
        text: 'Il Consiglio Direttivo è validamente costituito quando sono presenti la metà più uno dei suoi membri. I membri del Consiglio Direttivo svolgono la loro attività gratuitamente e durano in carica 3 anni. Il Consiglio Direttivo può essere revocato dall’assemblea con la maggioranza di 2/3 (due terzi) dei soci. Eventuali consiglieri dimissionari possono essere direttamente nominati per cooptazione dal Consiglio Direttivo purché il loro numero sia inferiore alla metà di tutti i consiglieri eletti. In caso contrario dovrà essere convocata entro 15 giorni nuova Assemblea ordinaria che provvederà a nominare un nuovo Consiglio Direttivo.',
      },
    ],
  },
  {
    id: 'art-15',
    title: 'Art. 15',
    blocks: [
      {
        kind: 'p',
        text: 'Il Consiglio Direttivo è l’organo esecutivo dell’Associazione ed è composto da:',
      },
      {
        kind: 'list',
        items: [
          'un Presidente;',
          'un Vicepresidente;',
          'un Segretario;',
          'un Tesoriere;',
          'nonché dai rimanenti Consiglieri, che possono essere dotati di autonome deleghe funzionali.',
        ],
      },
      { kind: 'p', text: 'Esso è convocato da:' },
      {
        kind: 'list',
        items: [
          'il Presidente, o dal Vicepresidente in sua assenza;',
          'da almeno 3 dei componenti, su richiesta motivata.',
        ],
      },
      {
        kind: 'p',
        text: 'Il Consiglio Direttivo ha tutti i poteri di ordinaria e straordinaria amministrazione. Nella gestione ordinaria i suoi compiti sono:',
      },
      {
        kind: 'list',
        items: [
          'nomina il Presidente, il Vice Presidente, il Segretario, il Tesoriere (le funzioni di Segretario e di Tesoriere possono essere assegnate ad un’unica persona) fra i soggetti in precedenza nominati dall’assemblea;',
          'predisporre gli atti da sottoporre all’assemblea;',
          'formalizzare le proposte per la gestione dell’Associazione;',
          'elaborare il bilancio consuntivo che deve contenere le singole voci di spesa e di entrata relative al periodo di un anno;',
          'stabilire gli importi delle quote annuali delle varie categorie di soci.',
        ],
      },
    ],
  },
  {
    id: 'art-16',
    title: 'Art. 16',
    blocks: [
      {
        kind: 'p',
        text: 'Il Presidente dura in carica quanto il Consiglio Direttivo, ed è legale rappresentante dell’Associazione a tutti gli effetti. In sua assenza o impedimento è sostituito dal Vicepresidente.',
      },
      {
        kind: 'p',
        text: 'Egli convoca e presiede il Consiglio Direttivo, sottoscrive tutti gli atti amministrativi compiuti dall’Associazione.',
      },
      {
        kind: 'p',
        text: 'Conferisce ai consiglieri e ai soci deleghe ed eventuali procure speciali per la gestione di attività varie, previa approvazione del Consiglio Direttivo.',
      },
      { kind: 'p', text: 'Il Presidente decade dall’incarico:' },
      {
        kind: 'list',
        items: [
          'per dimissioni;',
          'per decesso;',
          'a seguito di una mozione di sfiducia, per giusta causa, proposta ed approvata da almeno 3/4 dei consiglieri in carica.',
        ],
      },
      {
        kind: 'p',
        text: 'La mozione di sfiducia nei riguardi del Presidente potrà essere presentata, per giusta causa, anche da tanti soci che rappresentino almeno il 20% degli aventi diritto.',
      },
      {
        kind: 'p',
        text: 'Il Presidente decade automaticamente in caso di dimissioni del Consiglio Direttivo.',
      },
    ],
  },
  {
    id: 'art-17',
    title: 'Art. 17',
    blocks: [
      {
        kind: 'p',
        text: 'Il Collegio dei Probiviri è composto da tre soci eletti dall’assemblea. Dura in carica quanto il Consiglio Direttivo e il Presidente. Decide, entro trenta giorni dalla presentazione del ricorso, sulle decisioni di espulsione e sui dinieghi di ammissione o di esclusione soci dall’Associazione.',
      },
    ],
  },
  {
    id: 'art-18',
    title: 'Art. 18',
    blocks: [
      {
        kind: 'p',
        text: 'In caso di scioglimento dell’associazione l’Assemblea nominerà uno o più liquidatori che provvederanno alla liquidazione del patrimonio secondo le norme di legge.',
      },
      {
        kind: 'p',
        text: 'Il patrimonio residuo verrà devoluto ad altra Associazione con finalità analoghe o fini di pubblica utilità.',
      },
    ],
  },
  {
    id: 'art-19',
    title: 'Art. 19',
    blocks: [
      { kind: 'p', text: 'Tutte le cariche elettive sono gratuite.' },
      {
        kind: 'p',
        text: 'Ai soci compete solo il rimborso delle spese regolarmente documentate con le modalità previste dal regolamento, che ne fissa i criteri e ne determina i limiti e, dove previsto, le preventive autorizzazioni.',
      },
    ],
  },
  {
    id: 'art-20',
    title: 'Art. 20',
    blocks: [
      {
        kind: 'p',
        text: 'L’Associazione potrà aderire ad altre Associazioni aventi analoghe finalità, sia locali che nazionali, nonché a circuiti culturali, circoli cinematografici e associazioni legate al settore culturale e cinematografico nonché ad associazioni per la distribuzione di film, documentari, materiale ad essi legato.',
      },
      {
        kind: 'p',
        text: 'Potrà inoltre stipulare convenzioni con Enti, associazioni e istituzioni di ogni tipo, convenzioni finalizzate a conseguire i propri scopi sia diretti che indiretti.',
      },
      {
        kind: 'p',
        text: 'Al solo fine di conseguire i suoi scopi potrà compiere negozi giuridici per l’acquisizione di beni mobili, immobili e mobili registrati, che costituiranno patrimonio dell’associazione; aprire conti correnti e stipulare mutui, finanziamenti e simili e predisporre domande di contributo riferite alla propria attività ed ai propri scopi.',
      },
      {
        kind: 'p',
        text: 'I contributi versati dagli associati e i beni acquistati con questi contributi costituiscono il fondo comune dell’associazione, e pertanto i singoli associati non possono chiederne la divisione, né pretendere la restituzione della quota in caso di recesso.',
      },
      {
        kind: 'p',
        text: 'Quanto versato dagli associati a titolo di quota, di liberalità o di sovvenzione, rimane comunque acquisito al patrimonio dell’Associazione.',
      },
    ],
  },
  {
    id: 'art-21',
    title: 'Art. 21',
    blocks: [
      {
        kind: 'p',
        text: 'Per meglio definire in dettaglio il funzionamento dell’Associazione, è facoltà emanare regolamenti, da esporre nelle bacheche virtuali e presso la sede. Essi impegnano tutti i soci senza distinzione.',
      },
    ],
  },
  {
    id: 'art-22',
    title: 'Art. 22',
    blocks: [
      {
        kind: 'p',
        text: 'Per quanto non previsto dal presente statuto valgono le norme di legge vigenti in materia.',
      },
    ],
  },
];

export const REGOLAMENTO: Chapter[] = [
  {
    id: 'titolo-1',
    title: 'Titolo I – Premessa',
    articles: [
      {
        id: 'reg-art-1',
        title: 'Art. 1',
        blocks: [
          {
            kind: 'p',
            text: 'In base a quanto previsto all’art. 6 dello Statuto Sociale, l’Assemblea dei Soci emana il presente Regolamento Interno per la disciplina e l’organizzazione delle attività dell’Associazione.',
          },
        ],
      },
      {
        id: 'reg-art-2',
        title: 'Art. 2',
        blocks: [
          {
            kind: 'p',
            text: 'Il presente Regolamento disciplina gli aspetti organizzativi interni, così come i diritti e i doveri delle persone che a qualsiasi titolo operano per nome e per conto dell’Associazione. Allo stesso modo, il presente regolamento individua ruoli e compiti del personale volontario e dipendente al fine di delineare nel dettaglio le linee organizzative ed operative non espressamente descritte all’interno dello Statuto Sociale.',
          },
          {
            kind: 'p',
            text: 'Il regolamento interno è proposto dal Consiglio Direttivo all’Assemblea ordinaria o straordinaria dei Soci, riunita secondo le modalità indicate dallo Statuto. Anche in sede di presentazione all’Assemblea dei Soci, è possibile per questi ultimi proporre emendamenti o aggiunte. Gli emendamenti vengono votati all’interno dell’Assemblea ordinaria o straordinaria dei Soci e vengono approvati con maggioranza di almeno 2/3 degli aventi diritto di voto.',
          },
          {
            kind: 'p',
            text: 'Questo regolamento non ha effetto retroattivo. Parimenti dicasi per tutti quegli articoli, emendamenti o aggiunte che verranno effettuati dopo l’approvazione del regolamento stesso.',
          },
          {
            kind: 'p',
            text: 'Il regolamento interno è una fonte subordinata allo Statuto, non può quindi modificarne le disposizioni.',
          },
        ],
      },
    ],
  },
  {
    id: 'titolo-2',
    title: 'Titolo II – Organizzazione interna',
    articles: [
      {
        id: 'reg-art-3',
        title: 'Art. 3 – Assemblea dei Soci',
        blocks: [
          {
            kind: 'list',
            items: [
              'delibera modifiche allo Statuto dell’Associazione;',
              'elegge con cadenza triennale (o in caso di decadenza): il Consiglio Direttivo, i componenti del Collegio dei Revisori dei Conti, i componenti del Collegio dei Probiviri;',
              'esamina e approva i bilanci;',
              'delibera lo scioglimento dell’Associazione;',
              'approva la relazione annuale del Presidente sull’andamento dell’Associazione;',
              'approva il Regolamento Interno (o sue eventuali modifiche) predisposto dal Consiglio Direttivo.',
            ],
          },
        ],
      },
      {
        id: 'reg-art-4',
        title: 'Art. 4 – Consiglio Direttivo',
        blocks: [
          { kind: 'p', text: 'È l’organo decisionale dell’Associazione che è responsabile della:' },
          {
            kind: 'list',
            items: [
              'programmazione e attuazione dei progetti;',
              'direzione tecnica, amministrativa e gestionale dell’Associazione;',
              'gestione ordinaria e straordinaria dell’Associazione;',
              'nomina del Presidente, del Vice Presidente, del Segretario, del Tesoriere;',
              'ammissione e decadenza dei soci;',
              'gestione dei rapporti con l’Amministrazione Comunale per il rinnovo della Convenzione;',
              'redazione del Regolamento Interno contenente le norme per il funzionamento dell’Associazione.',
            ],
          },
          {
            kind: 'p',
            text: 'Le riunioni del Consiglio Direttivo sono presiedute dal Presidente in carica coadiuvato nella redazione dei verbali dal Segretario. Qualora fosse assente il Presidente del Consiglio Direttivo, la riunione verrebbe presieduta dal Vice Presidente.',
          },
          {
            kind: 'p',
            text: 'Tutti i membri del Consiglio Direttivo debbono partecipare alle riunioni e in caso di assenza devono giustificarsi con anticipo di 24 ore; inoltre hanno l’obbligo di partecipare attivamente alle attività intraprese dall’Associazione, come da impegno assunto al momento della candidatura a tale ruolo.',
          },
          {
            kind: 'p',
            text: 'Nei casi di accumulo di più di tre assenze ingiustificate, anche non continuative, o mancata partecipazione attiva alle attività intraprese dall’Associazione si è soggetti a diffida, da parte del Consiglio Direttivo. Il reiterarsi dell’infrazione attribuisce al Consiglio Direttivo la facoltà di procedere alla rimozione dall’incarico.',
          },
          {
            kind: 'p',
            text: 'I membri del Consiglio, consapevoli della serietà delle riunioni, sono tenuti a non divulgare notizie e fatti emersi. Questo divieto vale per tutte le persone eventualmente presenti. La validità della riunione si ha con la presenza di almeno la metà più uno dei Consiglieri, ivi incluso il Presidente (o il Vice Presidente).',
          },
          {
            kind: 'p',
            text: 'Nei casi di impedimento o di impossibilità a partecipare al Consiglio non è possibile delegare un altro Consigliere a fare le sue veci. Un membro facente parte delle cariche sociali dell’Associazione decade se ottiene un incarico politico a qualsiasi livello o per una delle cause elencate nel seguente art. 10 o per quanto esposto nell’art. 8 dello Statuto.',
          },
        ],
      },
      {
        id: 'reg-art-5',
        title: 'Art. 5 – Ruoli primari',
        blocks: [
          {
            kind: 'p',
            text: 'Al fine di consolidare un’organizzazione interna che garantisca continuità, efficacia ed efficienza dei servizi e dei progetti dell’Associazione, il presente regolamento sancisce l’istituzione delle sotto elencate figure definite primarie:',
          },
          { kind: 'list', items: ['Presidente', 'Vice Presidente', 'Segretario', 'Tesoriere'] },
          {
            kind: 'p',
            text: 'Solo i membri del Consiglio Direttivo (come da Statuto Sociale) possono ricoprire i Ruoli Primari e nessun membro può ricoprire più di un ruolo primario.',
          },
        ],
      },
      {
        id: 'reg-art-5-1',
        title: 'Art. 5.1 – Presidente',
        blocks: [
          {
            kind: 'list',
            items: [
              'rappresenta legalmente l’Associazione;',
              'convoca e presiede l’Assemblea dei Soci e il Consiglio Direttivo, firmandone i relativi verbali;',
              'assicura lo svolgimento organico e unitario dell’Associazione;',
              'sovrintende la gestione amministrativa ed economica dell’associazione, di cui firma gli atti;',
              'gestisce i rapporti con la Pubblica Amministrazione e con le altre associazioni del territorio.',
            ],
          },
        ],
      },
      {
        id: 'reg-art-5-2',
        title: 'Art. 5.2 – Vice Presidente',
        blocks: [
          {
            kind: 'list',
            items: [
              'sostituisce il Presidente in caso di sua assenza;',
              'svolge funzioni di Tesoriere (incaricato della gestione contabile e amministrativa) in caso di assenza del Tesoriere.',
            ],
          },
        ],
      },
      {
        id: 'reg-art-5-3',
        title: 'Art. 5.3 – Segretario',
        blocks: [
          { kind: 'p', text: 'Il Segretario coadiuva il Presidente e ha i seguenti compiti:' },
          {
            kind: 'list',
            items: [
              'provvedere alla tenuta e all’aggiornamento del Registro dei soci;',
              'provvedere al disbrigo della corrispondenza;',
              'redigere e conservare i verbali delle riunioni dell’Assemblea dei soci e del Consiglio Direttivo;',
              'provvedere a fornire l’elenco delle tessere associative da stampare.',
            ],
          },
        ],
      },
      {
        id: 'reg-art-5-4',
        title: 'Art. 5.4 – Tesoriere',
        blocks: [
          {
            kind: 'list',
            items: [
              'è incaricato della gestione contabile e amministrativa;',
              'provvede alla tenuta dei registri e della contabilità dell’Associazione, nonché alla conservazione della documentazione relativa, con l’indicazione nominativa dei soggetti eroganti;',
              'provvede alla riscossione delle entrate e al pagamento delle spese in conformità alle decisioni del Consiglio Direttivo;',
              'gestisce i rapporti con la banca e assicura la liquidità della cassa;',
              'tiene i rapporti con la SIAE e provvede al pagamento dei relativi diritti;',
              'predispone le statistiche relativamente ai dati di presenza ed incasso delle proiezioni.',
            ],
          },
        ],
      },
      {
        id: 'reg-art-6',
        title: 'Art. 6 – Ruoli secondari',
        blocks: [
          {
            kind: 'p',
            text: 'All’interno dell’Associazione sono istituite le seguenti cariche definite secondarie, che possono essere coperte (una o più) sia da membri del Consiglio Direttivo che da persone iscritte all’Associazione e individuate dal Consiglio Direttivo per dimostrate capacità nell’ambito di assegnazione.',
          },
          { kind: 'sub', text: 'Responsabile della Programmazione' },
          {
            kind: 'list',
            items: [
              'collabora con il Programmatore esterno per definire i titoli e le condizioni commerciali con le case di distribuzione;',
              'invia gli ordini ai fornitori esterni per il materiale promozionale;',
              'comunica la programmazione settimanale ai vari canali informativi.',
            ],
          },
          { kind: 'sub', text: 'Responsabile Tecnico' },
          {
            kind: 'list',
            items: [
              'coordina il gruppo dei tecnici e si occupa di contattare i fornitori esterni per mantenere in efficienza il materiale tecnico dell’Associazione;',
              'è responsabile della creazione delle playlist, previo settimanale recupero e controllo del corretto funzionamento delle chiavi di sblocco dei film.',
            ],
          },
          { kind: 'sub', text: 'Responsabile Gestione Volontari' },
          {
            kind: 'list',
            items: [
              'gestisce e coordina il calendario dei turni dei volontari;',
              'favorisce iniziative per l’aggregazione dei volontari e si attiva per il coinvolgimento di nuovi volontari;',
              'predispone i cartellini di riconoscimento dei nuovi volontari;',
              'predispone la reportistica delle presenze.',
            ],
          },
          { kind: 'sub', text: 'Responsabile della Comunicazione' },
          {
            kind: 'list',
            items: [
              'definisce e aggiorna il piano della comunicazione dell’associazione;',
              'gestisce la pagina Facebook e gli altri social network;',
              'inserisce e aggiorna costantemente i contenuti sul sito web dell’Associazione;',
              'tiene i rapporti con la stampa;',
              'redige e provvede a trasmettere la newsletter dell’Associazione;',
              'coordina eventi speciali organizzati dall’Associazione;',
              'definisce e si occupa delle iniziative pubblicitarie dell’associazione.',
            ],
          },
          { kind: 'sub', text: 'Responsabile della Logistica' },
          {
            kind: 'list',
            items: [
              'coordina le varie consegne dei corrieri esterni;',
              'provvede a smistare il materiale in arrivo alle persone di riferimento o nei luoghi concordati con il Consiglio Direttivo;',
              'si occupa dell’affissione dei manifesti;',
              'si occupa dell’organizzazione dei volantinaggi.',
            ],
          },
          { kind: 'sub', text: 'Responsabile Corsi / Rapporti con le scuole' },
          {
            kind: 'list',
            items: [
              'definisce con i docenti esterni il programma dei corsi;',
              'si interfaccia con gli Istituti Scolastici per la proposta di iniziative per gli studenti (corsi, proiezioni dedicate o altri eventi).',
            ],
          },
          {
            kind: 'p',
            text: 'Le figure sopra elencate possono individuare dei diretti collaboratori, dandone comunicazione al Consiglio Direttivo, rimanendo comunque i responsabili della funzione specifica.',
          },
        ],
      },
      {
        id: 'reg-art-7',
        title: 'Art. 7 – Cambio di un consigliere del Direttivo',
        blocks: [
          {
            kind: 'p',
            text: 'In caso di dimissioni o rimozione di un consigliere, il Consiglio Direttivo surroga il consigliere uscente con il primo dei non eletti e così di seguito (in base alla graduatoria dell’ultima assemblea elettiva). Il Consigliere così nominato rimarrà in carica fino alla naturale scadenza del Consiglio.',
          },
          {
            kind: 'p',
            text: 'Nel caso che non ci fosse nessun primo “non eletto” o questi non accettasse l’incarico (e così per tutti gli eventuali altri “non eletti” in graduatoria), il Consiglio Direttivo può:',
          },
          {
            kind: 'list',
            items: [
              'decidere di non reintegrare il consigliere uscente, purché sia garantito il numero minimo legale di composizione del Consiglio Direttivo;',
              'convocare un’assemblea straordinaria dei soci in cui verrà votato a maggioranza dei presenti un nuovo consigliere;',
              'nominare per cooptazione il sostituto del consigliere uscente (tale opzione tuttavia è da considerarsi l’ultima perseguibile dopo aver valutato quelle precedentemente elencate, e non può essere utilizzata per più di due volte all’interno di un mandato).',
            ],
          },
        ],
      },
      {
        id: 'reg-art-8',
        title: 'Art. 8 – Elezioni del Consiglio Direttivo',
        blocks: [
          {
            kind: 'p',
            text: 'Per poter eleggere il nuovo Consiglio Direttivo, il Consiglio uscente dovrà inviare ai soci, almeno 30 giorni prima della data fissata per l’Assemblea elettiva, una comunicazione contenente le indicazioni per l’invio delle candidature e le modalità per l’espletazione delle operazioni di voto.',
          },
          {
            kind: 'p',
            text: 'L’eventuale candidatura come consigliere va comunque comunicata per iscritto al Consiglio Direttivo in formato cartaceo o per e-mail alla sede sociale.',
          },
          {
            kind: 'p',
            text: 'Solo in caso di candidature pervenute insufficienti a coprire il numero minimo dei componenti del Direttivo (stabilito dall’art. 14 dello Statuto), vanno accettate eventuali candidature emerse nel corso dell’Assemblea, dalle persone fisicamente presenti, fino al raggiungimento del minimo di candidature a consigliere.',
          },
          {
            kind: 'p',
            text: 'Durante l’Assemblea si procede alla votazione dei candidati e a stilare la relativa graduatoria in funzione dei voti ottenuti dai candidati, in modo da ottenere la lista degli eletti.',
          },
          {
            kind: 'p',
            text: 'Un candidato per essere eletto nel Consiglio Direttivo dovrà ottenere almeno 1 voto durante l’Assemblea elettiva.',
          },
          {
            kind: 'p',
            text: 'Nel caso non si arrivasse al numero minimo di consiglieri, il Consiglio Direttivo uscente verrà riconfermato e provvederà a riconvocare, entro 60 giorni, una nuova Assemblea seguendo le stesse procedure della prima.',
          },
          {
            kind: 'p',
            text: 'Può presentare la candidatura alla carica di Consigliere solamente un socio ORDINARIO che risulta essere iscritto da almeno 1 anno e in regola con il pagamento della quota sociale.',
          },
          {
            kind: 'p',
            text: 'Nelle candidature per le cariche sociali non sono ammessi i soci che non sono in regola con i pagamenti, o che posseggano, al momento dell’invio della candidatura, un incarico politico a qualsiasi livello (visto l’art. 1 comma 1 dello Statuto).',
          },
        ],
      },
      {
        id: 'reg-art-9',
        title: 'Art. 9 – I soci',
        blocks: [
          {
            kind: 'p',
            text: 'I soci dell’Associazione sono definiti all’art. 4 dello Statuto. I requisiti generali per il loro accoglimento sono i seguenti:',
          },
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
          {
            kind: 'p',
            text: 'I soci hanno inoltre l’obbligo di comunicare tempestivamente all’associazione eventuali variazioni dei loro dati anagrafici.',
          },
          {
            kind: 'p',
            text: 'Nel caso che un socio abbia comportamenti difformi dallo statuto e dal regolamento interno, che rechino pregiudizio agli scopi o al patrimonio dell’Associazione, il Consiglio Direttivo dovrà intervenire ed applicare le seguenti sanzioni con principio di gradualità: richiamo, diffida, espulsione dall’Associazione.',
          },
        ],
      },
      {
        id: 'reg-art-9-1',
        title: 'Art. 9.1 – I soci volontari',
        blocks: [
          {
            kind: 'p',
            text: 'È facoltà dei soci di comunicare al Consiglio Direttivo la propria disponibilità a prestare servizio come volontari per l’Associazione.',
          },
          {
            kind: 'p',
            text: 'Il Consiglio Direttivo provvede quindi, alla prima riunione utile, a valutare che i volontari siano idonei all’attività da svolgere.',
          },
          { kind: 'p', text: 'I soci volontari sono tenuti a:' },
          {
            kind: 'list',
            items: [
              'indossare il tesserino di riconoscimento quando sono in servizio;',
              'rispettare i turni in base alle disponibilità date, o comunque comunicare con un idoneo preavviso al responsabile eventuali indisponibilità successive;',
              'rispettare le indicazioni date dai responsabili dei singoli turni di proiezione;',
              'partecipare ad eventuali corsi di formazione che si rendessero necessari per il rispetto di obblighi normativi.',
            ],
          },
          {
            kind: 'p',
            text: 'Durante lo svolgimento della sua attività, il volontario è coperto da una polizza assicurativa per RCT. In caso di sinistro egli deve presentare all’associazione notifica dell’accaduto esibendo la documentazione prevista dal regolamento della polizza.',
          },
        ],
      },
      {
        id: 'reg-art-10',
        title: 'Art. 10 – Perdita della qualità di socio',
        blocks: [
          { kind: 'p', text: 'La qualità di socio si perde per:' },
          {
            kind: 'list',
            items: [
              'dimissioni o decesso;',
              'mancato pagamento della quota sociale entro 30 giorni dalla data di scadenza indicata all’art. 9;',
              'esclusione deliberata dal Consiglio Direttivo per: una condotta palesemente e gravemente contraria ai principi, alle finalità, agli scopi dell’Associazione o alla sua azione; ogni iniziativa locale presa da un socio o un gruppo di soci in nome e per conto dell’Associazione senza aver prima chiesto autorizzazione al Consiglio Direttivo; inottemperanza alle disposizioni Statutarie e al Regolamento Interno dell’Associazione; formare o essere attivamente impegnato in un’altra Associazione con le stesse finalità; raccogliere fondi senza aver chiesto autorizzazione al Consiglio Direttivo.',
            ],
          },
          {
            kind: 'p',
            text: 'Il socio escluso può ricorrere per iscritto contro il provvedimento entro trenta giorni al Collegio dei Probiviri (ai sensi dell’art. 6 dello Statuto).',
          },
        ],
      },
      {
        id: 'reg-art-11',
        title: 'Art. 11 – Altre norme',
        blocks: [
          {
            kind: 'p',
            text: 'Per quanto non espressamente esplicitato in questo Regolamento fa fede lo Statuto dell’Associazione.',
          },
        ],
      },
    ],
  },
];
