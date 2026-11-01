import { ArrowLeft, CalendarDays, Clock, Download, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ASSEMBLEA } from '@/lib/assemblea';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Convocazione dell’Assemblea dei Soci',
  description:
    'Assemblea straordinaria e ordinaria dei Soci dell’Associazione Culturale Metropol: lunedì 9 novembre 2026 alla Biblioteca di Villafranca di Verona. Ordine del giorno e modulo di delega.',
};

/* Il testo è quello della convocazione firmata dal Presidente il 24 ottobre
   2026, riportato com'è: è un atto dell'associazione, non una pagina da
   riscrivere. Le sole aggiunte sono i link (articoli dello statuto, modulo di
   delega) e il riquadro coi dati essenziali in cima. */

const ODG_STRAORDINARIA = [
  'Cambio forma e denominazione dell’Associazione;',
  'Presentazione ed approvazione nuovo Statuto;',
  'Relazione sull’iter per l’iscrizione al RUNTS e conferimento al Presidente del mandato ad apportare al nuovo Statuto le modifiche non sostanziali eventualmente richieste dall’Ufficio del RUNTS.',
];

const ODG_ORDINARIA = [
  'Relazione del Presidente del Consiglio Direttivo sull’esercizio sociale anno 2025-26;',
  'Presentazione ed approvazione del bilancio economico-finanziario consuntivo anno 2025-26;',
  'Relazione programmatica per la stagione 2026-27;',
  'Varie ed eventuali.',
];

const linkTesto = 'text-cinema-ticket-ink underline underline-offset-2 hover:no-underline';

/** «2025-26» non si spezza sul trattino: su due righe sembra un'altra cifra. */
function SenzaACapo({ testo }: { testo: string }) {
  return testo.split(/(\d{4}-\d{2,4})/).map((pezzo, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {pezzo}
      </span>
    ) : (
      pezzo
    )
  );
}

function OrdineDelGiorno({ titolo, voci }: { titolo: string; voci: string[] }) {
  return (
    <>
      <h3 className="mt-6 font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-ticket-ink">
        {titolo}
      </h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-cinema-text-muted marker:font-semibold marker:text-cinema-text">
        {voci.map((voce) => (
          <li key={voce}>
            <SenzaACapo testo={voce} />
          </li>
        ))}
      </ol>
    </>
  );
}

export default function AssembleaPage() {
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

      <header className="mb-8">
        <p className="eyebrow">Convocazione</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Assemblea straordinaria e ordinaria dei Soci
        </h1>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          Ai Soci dell&apos;{SITE.association}
        </p>
      </header>

      <section
        aria-label="Quando e dove"
        className="rounded-2xl border border-cinema-ticket-ink/50 bg-cinema-surface p-6 sm:p-7"
      >
        <dl className="grid gap-5 sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-2 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
              <CalendarDays className="h-4 w-4 text-cinema-ticket-ink" aria-hidden="true" />
              Quando
            </dt>
            <dd className="mt-2 font-bold text-cinema-text">{ASSEMBLEA.giorno}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
              <Clock className="h-4 w-4 text-cinema-ticket-ink" aria-hidden="true" />
              Orario
            </dt>
            <dd className="mt-2 text-cinema-text-muted">
              <span className="block">
                <span className="font-bold text-cinema-text">ore {ASSEMBLEA.secondaConvocazione}</span>{' '}
                in seconda convocazione
              </span>
              <span className="block text-sm">
                (prima convocazione ore {ASSEMBLEA.primaConvocazione})
              </span>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
              <MapPin className="h-4 w-4 text-cinema-ticket-ink" aria-hidden="true" />
              Dove
            </dt>
            <dd className="mt-2 font-bold text-cinema-text">{ASSEMBLEA.luogo}</dd>
          </div>
        </dl>
        <a
          href={ASSEMBLEA.delegaPdf}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Modulo di delega (PDF)
        </a>
      </section>

      <section aria-labelledby="convocazione-titolo" className="mt-12">
        <h2
          id="convocazione-titolo"
          className="border-b border-cinema-border pb-3 text-2xl font-black text-cinema-text"
        >
          Il testo della convocazione
        </h2>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          I Soci dell&apos;{SITE.association} sono convocati in assemblea straordinaria e ordinaria
          in prima convocazione, presso la {ASSEMBLEA.luogo}, il giorno lunedì 09/11/2026, alle ore
          08:30, ed eventualmente in seconda convocazione il giorno{' '}
          <strong className="font-semibold text-cinema-text">lunedì 09/11/2026, alle ore 20:45</strong>{' '}
          sempre nel medesimo luogo, per esaminare il seguente ordine del giorno:
        </p>

        <OrdineDelGiorno titolo="Assemblea straordinaria" voci={ODG_STRAORDINARIA} />
        <OrdineDelGiorno titolo="Assemblea ordinaria" voci={ODG_ORDINARIA} />

        <div className="mt-8 space-y-4 text-base leading-relaxed text-cinema-text-muted">
          <p>L&apos;assemblea sarà validamente costituita secondo le norme statutarie vigenti.</p>
          <p>
            Si precisa che tutti i soci iscritti della stagione{' '}
            <span className="whitespace-nowrap">2025-2026</span> possono partecipare
            all&apos;Assemblea e hanno facoltà di rinnovare la loro quota associativa entro il 30
            novembre 2026.
          </p>
          <p>
            Ai sensi dell&apos;
            <Link href="/associazione/statuto#art-12" className={linkTesto}>
              Art. 12
            </Link>{' '}
            e{' '}
            <Link href="/associazione/statuto#art-13" className={linkTesto}>
              13
            </Link>{' '}
            dello Statuto vigente dell&apos;Associazione, tutti i Soci in regola con gli obblighi di
            cui all&apos;
            <Link href="/associazione/statuto#art-8" className={linkTesto}>
              Art. 8
            </Link>
            , hanno diritto di intervento e di voto nell&apos;Assemblea. Ricordiamo che ogni socio
            può delegare un altro socio per essere rappresentato (
            <a href="#delega" className={linkTesto}>
              modulo per delega qui sotto
            </a>
            ).
          </p>
          <p>
            Il testo del nuovo Statuto sarà pubblicato sul sito dell&apos;Associazione e inviato ai
            Soci{ASSEMBLEA.statutoNuovoEntro ? ` entro il ${ASSEMBLEA.statutoNuovoEntro}` : ''}.
          </p>
          <p>
            Per ulteriori informazioni sugli organi dell&apos;Associazione e sulle relative
            competenze vi invitiamo a esaminare:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <Link href="/associazione/statuto#statuto" className={linkTesto}>
                lo statuto
              </Link>
            </li>
            <li>
              <Link href="/associazione/statuto#regolamento" className={linkTesto}>
                il regolamento interno
              </Link>
            </li>
          </ul>
        </div>

        <footer className="mt-10 text-base leading-relaxed text-cinema-text-muted">
          <p>Villafranca di Verona, 24/10/2026</p>
          <p className="mt-4 text-right">
            Il Presidente
            <br />
            <span className="font-semibold text-cinema-text">Andrea Perrotta</span>
          </p>
        </footer>
      </section>

      <section id="delega" aria-labelledby="delega-titolo" className="mt-14 scroll-mt-24">
        <h2
          id="delega-titolo"
          className="border-b border-cinema-border pb-3 text-2xl font-black text-cinema-text"
        >
          Delega
        </h2>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          Ogni Socio avente diritto al voto, nel rispetto dell&apos;
          <Link href="/associazione/statuto#art-8" className={linkTesto}>
            art. 8
          </Link>{' '}
          e dei disposti dello Statuto Sociale, potrà farsi rappresentare in Assemblea da altro Socio
          avente diritto al voto mediante delega, contenente l&apos;indicazione del Socio delegato,
          che dovrà essere rilasciata esclusivamente sul modello predisposto dall&apos;Associazione
          e di seguito riportato, debitamente compilato e firmato negli appositi spazi.
        </p>

        {/* Il modulo com'è sul foglio, per leggerlo prima di stamparlo. Si
            compila sulla carta: qui non ci sono campi, perché la delega vale
            solo firmata a mano sul modello dell'associazione. */}
        <figure className="mt-6 rounded-2xl border border-dashed border-cinema-border-strong p-6 text-sm leading-relaxed text-cinema-text-muted sm:p-7">
          <figcaption className="sr-only">Il testo del modulo di delega</figcaption>
          <p>
            Il/La sottoscritto/a sig./sig.ra ……………………, socio dell&apos;{SITE.association}{' '}
            tessera n. ……………, con la presente
          </p>
          <p className="my-3 text-center font-bold tracking-wider text-cinema-text">DELEGA</p>
          <p>
            il sig./sig.ra …………………… tessera n. …………… per essere rappresentato all&apos;assemblea
            dei soci, fissata per il giorno 09/11/2026, e dichiara sin d&apos;ora di approvare
            anticipatamente senza alcuna riserva il suo operato.
          </p>
          <p className="mt-4">Luogo e Data, ……………………</p>
          <p className="mt-2">Firma ……………………</p>
        </figure>

        <a
          href={ASSEMBLEA.delegaPdf}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Scarica il modulo da stampare (PDF)
        </a>
      </section>
    </main>
  );
}
