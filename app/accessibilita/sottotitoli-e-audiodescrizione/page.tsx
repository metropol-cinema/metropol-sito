import { Accessibility, ArrowLeft, Download, Handshake, Info, Smartphone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  CINEMAMICO_URL,
  MOVIEREADING_PASSI,
  MOVIEREADING_URL,
  CONTATTO_ACCESSIBILITA,
} from '@/lib/accessibilita';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sottotitoli e audiodescrizione',
  description:
    'Al Metropol chi non sente o non vede può seguire il film con MovieReading, sul proprio telefono: come funziona, cosa prestiamo in cassa, e cosa vuol dire che siamo una sala CinemAmico.',
};

/** Intestazione di sezione: icona d'oro + titolo, come nelle altre pagine. */
function Titolo({ id, icona: Icona, children }: { id: string; icona: typeof Info; children: string }) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-2xl font-black text-cinema-text">
      <Icona className="h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
      {children}
    </h2>
  );
}

/**
 * La pagina che sta dietro al bollino «accessibile» delle schede film.
 *
 * Spiega una cosa sola, per esteso: come si fa, praticamente, a seguire un film
 * al Metropol se non si sente o non si vede. Il servizio (MovieReading, il
 * circuito CinemAmico) è di altri e vive fuori di qui — quello che possiamo
 * promettere noi è la sala, i dispositivi in cassa e il bollino sul film.
 */
export default function SottotitoliAudiodescrizionePage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <nav aria-label="Torna alla pagina sull'accessibilità" className="mb-6">
        <Link
          href="/accessibilita"
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Accessibilità
        </Link>
      </nav>

      <header className="mb-10">
        <p className="eyebrow">Prima di venire</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Sottotitoli e audiodescrizione
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted sm:text-lg">
          Se non senti, o non vedi, al Metropol il film lo puoi seguire lo stesso: i sottotitoli
          scorrono sul tuo telefono e l&apos;audiodescrizione ti arriva in cuffia, in sala, insieme
          a tutti gli altri. Non è una proiezione a parte in un orario a parte — è la proiezione di
          tutti, in una sala che si è attrezzata per starci dentro.
        </p>
      </header>

      <div className="space-y-12">
        <section aria-labelledby="come-si-fa">
          <Titolo id="come-si-fa" icona={Smartphone}>
            Come si fa
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Serve un&apos;app gratuita che si chiama{' '}
            <a
              href={MOVIEREADING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-ticket-ink underline underline-offset-2"
            >
              MovieReading
              <span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
            . Tre passaggi, e i primi due si fanno a casa con calma.
          </p>

          <ol className="mt-6 space-y-4">
            {MOVIEREADING_PASSI.map((passo, i) => (
              <li
                key={passo.titolo}
                className="flex gap-4 rounded-2xl border border-cinema-border bg-cinema-surface p-5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cinema-ticket-ink/60 font-utility text-sm font-bold text-cinema-ticket-ink"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-snug text-cinema-text">
                    {passo.titolo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cinema-text-muted">
                    {passo.dettaglio}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="in-cassa">
          <Titolo id="in-cassa" icona={Download}>
            Se non vuoi usare il tuo telefono
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            In cassa puoi chiedere un <strong className="font-semibold text-cinema-text">tablet</strong>{' '}
            o delle <strong className="font-semibold text-cinema-text">cuffie</strong>: te li diamo
            noi, senza costi. Avvisarci prima ci aiuta a tenerli pronti — la biglietteria apre
            mezz&apos;ora prima della proiezione, e mezz&apos;ora, se c&apos;è coda, è poco per
            preparare tutto con calma.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Gli occhiali elettronici che MovieReading prevede per i sottotitoli{' '}
            <strong className="font-semibold text-cinema-text">noi non li abbiamo</strong>: lo
            scriviamo perché è una cosa che si legge sul loro sito e sarebbe facile darla per
            scontata anche qui.
          </p>
        </section>

        <section aria-labelledby="dipende-dal-film">
          <Titolo id="dipende-dal-film" icona={Accessibility}>
            Il bollino sulla scheda del film
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Non tutti i film hanno i sottotitoli e l&apos;audiodescrizione: li produce chi
            distribuisce il film, non il cinema. La sala è pronta comunque, ma se per quel titolo i
            file non esistono, non c&apos;è niente da scaricare.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Per questo, quando ci sono, lo scriviamo: sulla scheda del film e negli elenchi della
            programmazione compare il simbolo{' '}
            <span className="inline-flex items-center gap-1.5 rounded border border-cinema-success/60 px-1.5 py-0.5 align-middle font-utility text-xs font-bold uppercase tracking-wide text-cinema-success">
              <Accessibility className="h-3.5 w-3.5" aria-hidden="true" />
              Accessibile
            </span>
            . Se non c&apos;è, non vuol dire che sei di troppo: vuol dire che per quel film non
            abbiamo di che aiutarti, e vale la pena chiedercelo prima di prendere il biglietto.
          </p>
        </section>

        <section aria-labelledby="cinemamico">
          <Titolo id="cinemamico" icona={Handshake}>
            Siamo una sala CinemAmico
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            <a
              href={CINEMAMICO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-ticket-ink underline underline-offset-2"
            >
              CinemAmico
              <span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>{' '}
            è l&apos;elenco delle sale dove chi usa MovieReading è il benvenuto con il proprio
            telefono. Detta così sembra poco, ma è il punto: significa che nessuno ti fermerà
            perché hai lo schermo acceso in sala, che il personale sa cos&apos;è quell&apos;app e
            che, se qualcosa non si sincronizza, c&apos;è qualcuno a cui chiederlo.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Aderirvi è stata una scelta dell&apos;associazione, non un obbligo di legge. Ci è
            sembrato il modo più onesto di dire che il cinema è di tutti: senza serate separate,
            senza doversi annunciare, senza chiedere il permesso.
          </p>
        </section>

        <section aria-labelledby="chiedere">
          <Titolo id="chiedere" icona={Info}>
            Se ti serve altro, chiedi
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Siamo un&apos;associazione di volontari: se ci avvisi prima, ci organizziamo. Vale per
            il tablet e le cuffie, per il posto in carrozzina, per un accompagnatore, per
            qualsiasi cosa ti serva per stare comodo in sala.
          </p>
          {CONTATTO_ACCESSIBILITA ? (
            <a
              href={`mailto:${CONTATTO_ACCESSIBILITA}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
            >
              Scrivici
            </a>
          ) : (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
              Scrivici su{' '}
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cinema-ticket-ink underline underline-offset-2"
              >
                Facebook
                <span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>{' '}
              o{' '}
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cinema-ticket-ink underline underline-offset-2"
              >
                Instagram
                <span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
              , oppure fermaci in cassa.
            </p>
          )}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Come si entra, i posti in carrozzina e i servizi stanno nella{' '}
            <Link
              href="/accessibilita"
              className="text-cinema-ticket-ink underline underline-offset-2"
            >
              pagina sull&apos;accessibilità della sala
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
