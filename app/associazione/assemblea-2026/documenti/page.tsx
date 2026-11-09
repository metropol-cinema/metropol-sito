import { ArrowLeft, Download } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ASSEMBLEA } from '@/lib/assemblea';
import { SITE } from '@/lib/site';

import type { Article, Block } from '../../statuto/content';
import {
  CORREZIONI_STATUTO,
  MODIFICHE_REGOLAMENTO,
  REGOLAMENTO_BOZZA,
  STATUTO_BOZZA,
  type Modifica,
} from './content';

/* Niente indicizzazione: è una bozza, e non deve comparire nelle ricerche al
   posto dello statuto in vigore. Per lo stesso motivo non sta nella sitemap. */
export const metadata: Metadata = {
  title: 'Nuovo Statuto e Regolamento: le bozze',
  description:
    'Le bozze del nuovo Statuto e del Regolamento Interno dell’Associazione Culturale Metropol, con le modifiche in evidenza, per l’assemblea del 9 novembre 2026.',
  robots: { index: false, follow: true },
};

const linkTesto = 'text-cinema-ticket-ink underline underline-offset-2 hover:no-underline';
const stileAggiunto =
  'rounded-sm bg-cinema-ticket-ink/15 text-cinema-text underline decoration-cinema-ticket-ink decoration-2 underline-offset-2 [box-decoration-break:clone]';
const stileTolto = 'text-cinema-text-muted line-through decoration-2';

/** Il testo con i passaggi segnati: {+ evidenziato +} e {- barrato -}. */
function TestoSegnato({ testo }: { testo: string }) {
  return testo.split(/(\{\+.*?\+\}|\{-.*?-\})/).map((pezzo, i) => {
    if (pezzo.startsWith('{+')) {
      return (
        <ins key={i} className={stileAggiunto}>
          <span className="sr-only">Testo modificato: </span>
          {pezzo.slice(2, -2)}
        </ins>
      );
    }
    if (pezzo.startsWith('{-')) {
      // Il lettore di schermo non annuncia il barrato: senza l'avviso,
      // il testo tolto si ascolterebbe come se fosse ancora lì.
      return (
        <del key={i} className={stileTolto}>
          <span className="sr-only">Testo tolto: </span>
          {pezzo.slice(2, -2)}
        </del>
      );
    }
    return pezzo;
  });
}

const STILE_ELENCO = {
  1: 'list-disc pl-5',
  2: 'list-[circle] pl-5',
  3: 'list-[square] pl-10',
} as const;

function Blocco({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="mt-3 text-base leading-relaxed text-cinema-text-muted">
          <TestoSegnato testo={block.text} />
        </p>
      );
    case 'sub':
      return <p className="mt-5 text-sm font-semibold text-cinema-text">{block.text}</p>;
    case 'list':
      return (
        <ul
          className={`mt-3 space-y-1.5 text-base leading-relaxed text-cinema-text-muted ${STILE_ELENCO[block.level ?? 1]}`}
        >
          {block.items.map((voce) => (
            <li key={voce}>
              <TestoSegnato testo={voce} />
            </li>
          ))}
        </ul>
      );
  }
}

function Articolo({ article, livello }: { article: Article; livello: 3 | 4 }) {
  const Titolo = livello === 3 ? 'h3' : 'h4';
  return (
    <section id={article.id} className="scroll-mt-24">
      <Titolo className="mt-8 font-bold tracking-tight text-cinema-text">{article.title}</Titolo>
      {article.blocks.map((block, i) => (
        <Blocco key={i} block={block} />
      ))}
    </section>
  );
}

function Indice({ etichetta, articoli }: { etichetta: string; articoli: Article[] }) {
  return (
    <details className="mt-5 rounded-lg border border-cinema-border bg-cinema-surface p-4 text-sm">
      <summary className="cursor-pointer font-semibold text-cinema-text">{etichetta}</summary>
      <ul className="mt-3 space-y-1.5">
        {articoli.map((articolo) => (
          <li key={articolo.id}>
            <a href={`#${articolo.id}`} className={linkTesto}>
              {articolo.title}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function ElencoModifiche({
  titolo,
  spiegazione,
  voci,
}: {
  titolo: string;
  spiegazione: string;
  voci: Modifica[];
}) {
  return (
    <div className="mt-8">
      <h3 className="font-bold tracking-tight text-cinema-text">{titolo}</h3>
      <p className="mt-1 text-sm leading-relaxed text-cinema-text-subtle">{spiegazione}</p>
      <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-cinema-text-muted">
        {voci.map((voce) => (
          <li key={voce.id}>
            <a
              href={`#${voce.id}`}
              className={`${linkTesto} whitespace-nowrap font-semibold`}
            >
              {voce.articolo}
            </a>{' '}
            – {voce.descrizione}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScaricaPdf({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-lg border border-cinema-border-strong px-4 py-2.5 text-sm font-semibold text-cinema-text transition-colors hover:border-cinema-ticket-ink"
    >
      <Download className="h-4 w-4 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
      {children}
    </a>
  );
}

const titoloSezione = 'border-b border-cinema-border pb-3 text-2xl font-black text-cinema-text';

export default function DocumentiAssembleaPage() {
  const articoliRegolamento = REGOLAMENTO_BOZZA.flatMap((capitolo) => capitolo.articles);

  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <nav aria-label="Torna alla convocazione" className="mb-6">
        <Link
          href={ASSEMBLEA.href}
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> La convocazione
        </Link>
      </nav>

      <header className="mb-8">
        <p className="eyebrow">Assemblea del 9 novembre 2026</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Nuovo Statuto e Regolamento Interno
        </h1>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          Le bozze dei documenti dell&apos;{SITE.association}, con il testo integrale e le modifiche
          in evidenza.
        </p>
      </header>

      <section
        aria-label="Stato dei documenti"
        className="rounded-2xl border border-cinema-ticket-ink/50 bg-cinema-surface p-6 sm:p-7"
      >
        <p className="text-base leading-relaxed text-cinema-text-muted">
          <strong className="font-semibold text-cinema-text">Sono bozze, non ancora in vigore.</strong>{' '}
          Finché l&apos;assemblea non si esprime valgono{' '}
          <Link href="/associazione/statuto" className={linkTesto}>
            lo statuto e il regolamento interno attuali
          </Link>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-cinema-text-muted">
          Come leggere il testo: <span className={stileAggiunto}>questo è un passaggio in evidenza</span>,{' '}
          <span className={stileTolto}>questo è un passaggio tolto</span>.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ScaricaPdf href={ASSEMBLEA.statutoBozzaPdf}>Statuto (PDF)</ScaricaPdf>
          <ScaricaPdf href={ASSEMBLEA.statutoCorrezioniPdf}>
            Statuto con le correzioni (PDF)
          </ScaricaPdf>
          <ScaricaPdf href={ASSEMBLEA.regolamentoModifichePdf}>
            Regolamento con le modifiche (PDF)
          </ScaricaPdf>
        </div>
      </section>

      <section aria-labelledby="modifiche-titolo" className="mt-12">
        <h2 id="modifiche-titolo" className={titoloSezione}>
          Le modifiche in breve
        </h2>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          Una sintesi per orientarsi: fa fede il testo integrale,{' '}
          <a href="#statuto-bozza" className={linkTesto}>
            dello Statuto
          </a>{' '}
          e{' '}
          <a href="#regolamento-bozza" className={linkTesto}>
            del Regolamento
          </a>
          , qui sotto.
        </p>
        <ElencoModifiche
          titolo="Statuto: le ultime correzioni"
          spiegazione="Le correzioni apportate alla bozza, non tutte le differenze rispetto allo statuto attuale."
          voci={CORREZIONI_STATUTO}
        />
        <ElencoModifiche
          titolo="Regolamento Interno"
          spiegazione="Le modifiche rispetto al regolamento in vigore."
          voci={MODIFICHE_REGOLAMENTO}
        />
      </section>

      <section id="statuto-bozza" aria-labelledby="statuto-titolo" className="mt-14 scroll-mt-24">
        <h2 id="statuto-titolo" className={titoloSezione}>
          Statuto – Associazione Culturale Metropol APS
        </h2>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          Il testo sostituisce integralmente lo statuto del 3 dicembre 2018 (
          <a href="#s-art-29" className={linkTesto}>
            art. 29
          </a>
          ). In evidenza le ultime correzioni alla bozza.
        </p>
        <Indice etichetta="Indice dello Statuto" articoli={STATUTO_BOZZA} />
        {STATUTO_BOZZA.map((article) => (
          <Articolo key={article.id} article={article} livello={3} />
        ))}
        <p className="mt-8 text-base leading-relaxed text-cinema-text-muted">
          Villafranca di Verona, lì 9 Novembre 2026.
        </p>
      </section>

      <section
        id="regolamento-bozza"
        aria-labelledby="regolamento-titolo"
        className="mt-14 scroll-mt-24"
      >
        <h2 id="regolamento-titolo" className={titoloSezione}>
          Regolamento Interno
        </h2>
        <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
          In evidenza le modifiche rispetto al regolamento in vigore.
        </p>
        <Indice etichetta="Indice del Regolamento" articoli={articoliRegolamento} />
        {REGOLAMENTO_BOZZA.map((capitolo) => (
          <section key={capitolo.id} id={capitolo.id} className="mt-8 scroll-mt-24">
            <h3 className="font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-ticket-ink">
              {capitolo.title}
            </h3>
            {capitolo.articles.map((article) => (
              <Articolo key={article.id} article={article} livello={4} />
            ))}
          </section>
        ))}
      </section>

      <nav aria-label="Torna alla convocazione" className="mt-14">
        <Link
          href={ASSEMBLEA.href}
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> La convocazione
        </Link>
      </nav>
    </main>
  );
}
