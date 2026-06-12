import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'La storia',
  description:
    'La storia del Cinema Metropol di Villafranca di Verona: dall’inaugurazione del 1965 in via Pace alla rinascita come Associazione Culturale nella sala "Alida Ferrarini".',
};

const MILESTONES = [
  {
    date: '1965-12-22',
    year: '1965',
    text: 'Il 22 dicembre viene inaugurato il cinema Metropol in via Pace, con la proiezione di "Sette uomini d’oro" di Marco Vicario.',
  },
  {
    date: '2003-01-27',
    year: '2003',
    text: 'Il 27 gennaio, dopo 37 anni di attività, il Metropol chiude definitivamente: l’ultima proiezione è "Il Signore degli Anelli".',
  },
  {
    date: '2014-07-29',
    year: '2014',
    text: 'Il 29 luglio una quindicina di appassionati cinefili fonda l’Associazione Culturale Metropol.',
  },
  {
    date: '2017-03-01',
    year: '2017',
    text: 'In primavera le proiezioni riprendono con regolarità nella sala "Alida Ferrarini", riportando il cinema a Villafranca.',
  },
];

export default function StoriaPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <nav aria-label="Torna alla pagina dell'associazione" className="mb-6">
        <Link
          href="/associazione"
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> L&apos;Associazione
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          La storia del Cinema Metropol
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Sessant&apos;anni di grande schermo a Villafranca di Verona: dal glorioso cinema di via
          Pace alla rinascita come associazione di volontariato.
        </p>
      </header>

      <ol className="mb-12 space-y-0">
        {MILESTONES.map((m, i) => (
          <li key={m.year} className="relative flex gap-4 pb-8 last:pb-0">
            {i < MILESTONES.length - 1 && (
              <span
                className="absolute left-[27px] top-10 h-[calc(100%-2.5rem)] w-px bg-cinema-border"
                aria-hidden="true"
              />
            )}
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cinema-accent/15 text-sm font-bold text-cinema-accent-hover">
              <time dateTime={m.date}>{m.year}</time>
            </span>
            <p className="pt-1 text-sm leading-relaxed text-cinema-text-muted">{m.text}</p>
          </li>
        ))}
      </ol>

      <div className="space-y-10">
        <section id="il-metropol-di-via-pace">
          <h2 className="text-xl font-bold tracking-tight text-cinema-text">
            Il glorioso Metropol di via Pace
          </h2>
          <figure className="mt-4 rounded-xl border border-cinema-border bg-cinema-surface p-5 sm:p-6">
            <blockquote className="space-y-3 text-sm leading-relaxed text-cinema-text-muted">
              <p>
                «Era il 22 dicembre 1965 quando, con la proiezione del film &ldquo;Sette uomini
                d&apos;oro&rdquo; di Marco Vicario, veniva inaugurato il cinema Metropol, in via
                Pace, vicino allo storico palazzo Bottagisio. Con i suoi 1.250 posti a sedere al
                chiuso e i 2.050 all&apos;aperto, era uno dei cinema più capienti d&apos;Italia. E,
                come tutti i cinema, in quasi mezzo secolo di vita, ha conosciuto i momenti
                esaltanti degli anni Sessanta e Settanta, quando la gente faceva la coda per
                entrare&hellip; Poi sono arrivati i momenti difficili, la sala semivuota,
                soprattutto per la concorrenza spietata della televisione&hellip; Poi
                l&apos;ultima crisi con l&apos;avvento delle multisale e la chiusura definitiva il
                27 gennaio 2003 (ultima proiezione &ldquo;Il Signore degli Anelli&rdquo;, ndr),
                dopo 37 anni di attività e tanti ricordi.
              </p>
              <p>
                L&apos;epopea del cinema a Villafranca è stata segnata dalla famiglia Vezza. Era il
                1930 quando Luigi Vezza, padre di Giorgio proprietario del Metropol, proiettò il
                primo film muto al cinema Comunale, in piazza. La colonna sonora era di un pianista
                sistemato sotto il palco&hellip; Con la chiusura del Metropol non chiude solo un
                cinema, chiude un&apos;epopea».
              </p>
            </blockquote>
            <figcaption className="mt-4 text-xs text-cinema-text-subtle">
              Fiorenza Gallina, da <cite>L&apos;Arena</cite> del 9 febbraio 2003
            </figcaption>
          </figure>
        </section>

        <section id="la-rinascita">
          <h2 className="text-xl font-bold tracking-tight text-cinema-text">La rinascita</h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            La storia del Cinema Metropol, inteso come luogo dove godere dei film sul grande
            schermo, non terminò però quel giorno, come riportano le cronache.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Il 29 luglio del 2014, con atto notarile, una quindicina di appassionati cinefili dà
            vita all&apos;Associazione Culturale Metropol (in ricordo del glorioso cinema), senza
            scopo di lucro, con l&apos;intento primario di trovare un luogo dove riportare una sala
            cinematografica funzionante a Villafranca, ma anche offrire corsi per divulgare
            l&apos;arte del cinema con docenti universitari e proporre incontri con registi e
            attori. A presidente dell&apos;Associazione fu eletto Mauro Sorio, che ricoprì la
            carica fino a settembre del 2022.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Il luogo, grazie a un accordo con l&apos;Amministrazione comunale di quel tempo guidata
            da Mario Faccioli, fu individuato nella nuova sala polifunzionale &ldquo;Alida
            Ferrarini&rdquo; in piazzetta Villafranchetta, che può ospitare sino a 450 persone.
            Riportando così, dopo 14 anni, il cinema a Villafranca.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Dopo un breve esperimento nel Natale del 2016, le proiezioni iniziarono con regolarità
            nei fine settimana della primavera del 2017, per poi continuare sino a oggi, da ottobre
            ad aprile, con una appendice estiva al Castello scaligero.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Da allora molta strada è stata fatta grazie al prezioso lavoro di circa 40 volontari
            (biglietteria, proiezionisti, servizio in sala) che si alternano nei sette spettacoli
            che ogni fine settimana offre il Cinema Metropol, rinunciando al loro tempo libero per
            metterlo al servizio della comunità. Un sostegno forte all&apos;Associazione Culturale
            Metropol viene anche dagli attuali 460 soci (dato del gennaio 2023).
          </p>
          <p className="mt-5 font-semibold text-cinema-text">La storia continua!</p>
        </section>
      </div>
    </main>
  );
}
