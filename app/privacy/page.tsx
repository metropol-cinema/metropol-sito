import { BarChart3, Cookie, FileText, Mail, Newspaper, Server, ShieldCheck, Ticket, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PreferenzeCookie } from '@/components/preferenze-cookie';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy e cookie',
  description:
    'Quali dati raccoglie questo sito, perché, a chi passano e come cancellarli. Più la scelta sui cookie di statistica, che puoi cambiare quando vuoi.',
};

/** Ultima revisione del testo. Va aggiornata quando cambia qualcosa di sostanziale. */
const AGGIORNATA_IL = '9 settembre 2026';

/**
 * Cosa resta sul dispositivo di chi legge. Sono quattro voci in croce perché il
 * sito è quasi tutto pubblico e di sola lettura: nessun login, nessun carrello,
 * nessuna pubblicità.
 */
const ARCHIVIO = [
  {
    nome: 'metropol-accessibilita',
    tipo: 'Archivio locale (non è un cookie)',
    chi: 'Il sito stesso',
    durata: 'Finché non cancelli i dati del sito',
    perche: 'Ricorda tema, dimensione del testo e le altre preferenze della barra di accessibilità.',
  },
  {
    nome: 'metropol-consenso-cookie',
    tipo: 'Archivio locale (non è un cookie)',
    chi: 'Il sito stesso',
    durata: 'Fino alla revoca; se rifiuti, sei mesi',
    perche: 'Ricorda se hai accettato o rifiutato le statistiche, per non richiedertelo a ogni pagina.',
  },
  {
    nome: '_ga, _ga_*',
    tipo: 'Cookie',
    chi: 'Google Analytics',
    durata: 'Due anni',
    perche:
      'Distinguono un dispositivo dall’altro, così una persona che torna non viene contata due volte. Esistono solo se hai accettato.',
  },
  {
    nome: 'Cookie di YouTube',
    tipo: 'Cookie di terza parte',
    chi: 'Google (youtube-nocookie.com)',
    durata: 'Decisa da Google',
    perche:
      'Arrivano solo se avvii un trailer: finché non premi play la pagina non contatta YouTube.',
  },
] as const;

/** I fornitori che, per far funzionare qualcosa, vedono dei dati. */
const FORNITORI = [
  { nome: 'Vercel', ruolo: 'Ospita il sito e ne registra i log tecnici', dove: 'Stati Uniti (clausole contrattuali standard)' },
  { nome: 'Supabase', ruolo: 'Banca dati del gestionale, dove finiscono le iscrizioni', dove: 'Unione Europea' },
  { nome: 'Brevo', ruolo: 'Spedisce la newsletter e ne gestisce le iscrizioni', dove: 'Francia' },
  { nome: 'Stripe', ruolo: 'Incassa i pagamenti dei corsi e le quote associative', dove: 'Stati Uniti (Data Privacy Framework)' },
  { nome: 'Google Ireland', ruolo: 'Statistiche di visita e trailer da YouTube', dove: 'Irlanda, con trasferimenti negli Stati Uniti (Data Privacy Framework)' },
  { nome: 'Microsoft', ruolo: 'Caselle di posta dell’associazione', dove: 'Unione Europea' },
  { nome: 'TMDB', ruolo: 'Fornisce alcune immagini dei film', dove: 'Stati Uniti' },
] as const;

export default function PrivacyPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <header className="mb-10">
        <p className="eyebrow">Trasparenza</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Privacy e cookie
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted sm:text-lg">
          Questo è un sito di un cinema di paese, non un servizio che vive di
          dati: si può leggere tutto senza dire chi sei. Qui c&apos;è comunque,
          per intero, cosa raccogliamo quando qualcosa lo raccogliamo, perché, a
          chi passa e come farlo sparire.
        </p>
        <p className="mt-3 text-xs text-cinema-text-subtle">
          Informativa ai sensi degli articoli 13 e 14 del Regolamento (UE)
          2016/679 · Aggiornata al {AGGIORNATA_IL}
        </p>
      </header>

      <div className="space-y-12">
        <section aria-labelledby="titolare">
          <h2 id="titolare" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <ShieldCheck className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Chi decide di questi dati
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Il titolare del trattamento è {SITE.association}, con sede legale in{' '}
            {SITE.legalAddress}, partita IVA {SITE.vatNumber}. Per qualsiasi cosa
            riguardi i tuoi dati — comprese le richieste dell&apos;ultima sezione
            di questa pagina — scrivi a{' '}
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-2 hover:text-cinema-ticket-ink">
              {SITE.email}
            </a>{' '}
            oppure alla PEC{' '}
            <a href={`mailto:${SITE.pec}`} className="underline underline-offset-2 hover:text-cinema-ticket-ink">
              {SITE.pec}
            </a>
            . L&apos;associazione non ha un responsabile della protezione dei
            dati: non rientra nei casi in cui la legge lo impone.
          </p>
        </section>

        <section aria-labelledby="navigazione">
          <h2 id="navigazione" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Server className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Quando apri una pagina
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Come ogni sito, il server annota la richiesta: indirizzo IP, momento,
            pagina chiesta, tipo di browser. Sono i log tecnici di chi ci ospita
            (Vercel), servono a far funzionare il sito e ad accorgersi degli
            attacchi, restano per pochi giorni e non li usiamo per costruire
            profili di nessuno. La base giuridica è il nostro legittimo interesse
            a tenere in piedi il servizio (art. 6.1.f del Regolamento).
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Le locandine di alcuni film arrivano da TMDB: in quel caso il tuo
            browser chiede l&apos;immagine direttamente a loro, che quindi vedono
            il tuo indirizzo IP. I caratteri tipografici, invece, li serviamo noi
            apposta per non farti passare da Google a ogni pagina.
          </p>
        </section>

        <section aria-labelledby="newsletter">
          <h2 id="newsletter" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Newspaper className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Se ti iscrivi alla newsletter
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Chiediamo l&apos;indirizzo email e, se vuoi, il nome — serve solo a
            scriverti «Ciao Mario» invece di «Gentile utente». Ti arriva prima una
            richiesta di conferma: finché non clicchi quel link non ti mandiamo
            niente e l&apos;iscrizione non è valida. La base giuridica è il tuo
            consenso, che puoi ritirare dal link «disiscriviti» in fondo a ogni
            email o scrivendoci: in entrambi i casi l&apos;indirizzo esce dalla
            lista. Lo conserviamo finché resti iscritto, e teniamo traccia di
            quando e come hai dato il consenso perché la legge ci chiede di poterlo
            dimostrare. Le email partono da Brevo, che le spedisce per conto
            nostro e registra se sono arrivate e se sono state aperte.
          </p>
        </section>

        <section aria-labelledby="soci">
          <h2 id="soci" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Users className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Se ti tesseri
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            La domanda di iscrizione non si compila qui: questo sito ti manda al
            portale soci, che è un&apos;altra applicazione dell&apos;associazione.
            Lì ti chiediamo nome, cognome ed email — l&apos;email è anche la
            chiave con cui entrerai nella tua area — e, se vuoi darceli, il
            cellulare e l&apos;indirizzo. La quota si paga con carta su Stripe,
            che custodisce lui i dati della carta, oppure in cassa.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Diventare socio è un contratto, e i dati che servono a gestirlo — il
            libro soci, le quote versate, la tessera — li trattiamo su quella base
            (art. 6.1.b) e per gli obblighi contabili che ne discendono (art.
            6.1.c). Le comunicazioni sulla vita associativa ti arrivano perché sei
            socio; quelle sui film che escono <strong>solo se le chiedi</strong>, e
            puoi smettere quando vuoi dalla tua area soci.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Il dettaglio completo — cosa raccogliamo, per quanto lo teniamo, chi lo
            vede — sta nell&apos;
            <a
              href={SITE.sociPrivacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-cinema-ticket-ink"
            >
              informativa privacy dei soci
              <span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
            , sul portale.
          </p>
        </section>

        <section aria-labelledby="corsi">
          <h2 id="corsi" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Ticket className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Se ti iscrivi a un corso
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Il pagamento avviene sulle pagine di Stripe: nome, email e dati della
            carta li raccoglie e li custodisce Stripe, il sito non li vede e non
            li conserva. A noi torna l&apos;iscrizione — chi sei, a quale corso, se
            hai pagato — e ci serve per organizzare il corso e per gli obblighi
            fiscali e contabili dell&apos;associazione. Le basi giuridiche sono
            l&apos;esecuzione del contratto (art. 6.1.b) e gli obblighi di legge
            (art. 6.1.c); i documenti contabili si conservano dieci anni, come
            impone il codice civile.
          </p>
        </section>

        <section aria-labelledby="posta">
          <h2 id="posta" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Mail className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Se ci scrivi
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Le email che ci mandi arrivano alle caselle dell&apos;associazione e
            restano lì finché serve a risponderti e a tenere memoria della
            pratica. Non le usiamo per iscriverti a niente: se vuoi la newsletter,
            va chiesta dal modulo apposta.
          </p>
        </section>

        <section aria-labelledby="statistiche">
          <h2 id="statistiche" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <BarChart3 className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Le statistiche di visita
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Usiamo Google Analytics per sapere quante persone leggono la
            programmazione, quali pagine tengono banco e da dove arriva chi ci
            trova. Guardiamo numeri complessivi, non le singole persone, e abbiamo
            spento le funzioni che incrociano la visita con il profilo
            pubblicitario di Google.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Parte solo se dici di sì: finché non rispondi, o se rifiuti, il tuo
            browser non manda a Google nemmeno una richiesta. La base giuridica è
            il consenso (art. 6.1.a del Regolamento e art. 122 del Codice
            privacy); i dati restano nella nostra proprietà Analytics non oltre
            quattordici mesi.
          </p>
          <div className="mt-6" id="preferenze">
            <PreferenzeCookie />
          </div>
        </section>

        <section aria-labelledby="cookie-titolo" className="scroll-mt-8" id="cookie">
          <h2 id="cookie-titolo" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <Cookie className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Cookie e memoria del browser
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Il sito, di suo, non usa cookie: le due cose che ricorda — le tue
            preferenze di lettura e la risposta che hai dato qui sopra — stanno
            nell&apos;archivio locale del browser, cioè non vengono spedite a
            nessun server, nemmeno al nostro. Gli unici veri cookie sono quelli di
            Google, e solo dopo un consenso.
          </p>
          <ul className="mt-6 space-y-3">
            {ARCHIVIO.map((voce) => (
              <li
                key={voce.nome}
                className="rounded-2xl border border-cinema-border bg-cinema-surface p-5"
              >
                <h3 className="font-utility text-sm font-bold text-cinema-text">{voce.nome}</h3>
                <p className="mt-1 text-xs uppercase tracking-marquee text-cinema-text-subtle">
                  {voce.tipo} · {voce.chi} · {voce.durata}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cinema-text-muted">{voce.perche}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-cinema-text-subtle">
            Puoi comunque bloccare o cancellare i cookie dalle impostazioni del
            tuo browser. Se cancelli i dati del sito sparisce anche la memoria
            della tua scelta, e te la richiederemo.
          </p>
        </section>

        <section aria-labelledby="fornitori">
          <h2 id="fornitori" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <FileText className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            A chi passano i dati
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Non vendiamo e non cediamo dati a nessuno. Li vedono solo i fornitori
            che ci servono per far funzionare le cose, ciascuno nominato
            responsabile del trattamento e vincolato a usarli solo per quello.
            Quando un fornitore sta fuori dall&apos;Unione Europea, il
            trasferimento è coperto dalle clausole contrattuali standard della
            Commissione o dal Data Privacy Framework.
          </p>
          <ul className="mt-6 space-y-3">
            {FORNITORI.map((f) => (
              <li
                key={f.nome}
                className="rounded-2xl border border-cinema-border bg-cinema-surface p-5"
              >
                <h3 className="text-base font-bold text-cinema-text">{f.nome}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cinema-text-muted">{f.ruolo}</p>
                <p className="mt-1 text-xs text-cinema-text-subtle">{f.dove}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-cinema-text-subtle">
            Oltre a loro, i dati possono essere letti dai volontari
            dell&apos;associazione incaricati di quella specifica attività, e
            comunicati alle autorità quando la legge lo impone.
          </p>
        </section>

        <section aria-labelledby="diritti">
          <h2 id="diritti" className="flex items-center gap-3 text-2xl font-black text-cinema-text">
            <ShieldCheck className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Cosa puoi chiederci
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Puoi chiedere di sapere quali tuoi dati abbiamo, di correggerli, di
            cancellarli, di limitarne l&apos;uso, di riceverli in un formato
            leggibile da una macchina, e di opporti a un trattamento fondato sul
            nostro legittimo interesse. Dove abbiamo chiesto il consenso puoi
            ritirarlo quando vuoi, e resta valido quello che è successo prima.
            Basta una email a{' '}
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-2 hover:text-cinema-ticket-ink">
              {SITE.email}
            </a>
            : rispondiamo entro un mese.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Se pensi che stiamo sbagliando puoi rivolgerti al Garante per la
            protezione dei dati personali (Piazza Venezia 11, 00187 Roma —{' '}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-cinema-ticket-ink"
            >
              garanteprivacy.it
              <span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
            ) o al giudice ordinario.
          </p>
        </section>

        <section aria-labelledby="modifiche">
          <h2 id="modifiche" className="text-2xl font-black text-cinema-text">
            Se questa pagina cambia
          </h2>
          <p className="mt-4 leading-relaxed text-cinema-text-muted">
            Se cambieranno gli strumenti che raccolgono dati, aggiorneremo questo
            testo e torneremo a chiederti il consenso: la risposta che hai dato
            vale per quello che c&apos;è scritto qui oggi, {AGGIORNATA_IL}. Le
            cose pratiche sulla sala — come si entra, cosa c&apos;è in
            programmazione — stanno altrove, in{' '}
            <Link href="/info" className="underline underline-offset-2 hover:text-cinema-ticket-ink">
              Info e prezzi
            </Link>{' '}
            e in{' '}
            <Link href="/accessibilita" className="underline underline-offset-2 hover:text-cinema-ticket-ink">
              Accessibilità
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
