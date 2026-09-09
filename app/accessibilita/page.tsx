import { Accessibility, ArrowRight, Check, Info, Minus, Monitor, Smartphone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  ACCESSIBILITA_SALA,
  ACCESSIBILITA_SITO,
  CONTATTO_ACCESSIBILITA,
  VERIFICATA_IL,
  type Stato,
} from '@/lib/accessibilita';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accessibilità',
  description:
    'Come si entra e si sta in Sala "Alida Ferrarini": accesso in carrozzina, servizi, ausili per l\'udito. E cosa abbiamo fatto perché questo sito si possa leggere in tutti i modi.',
};

const SEGNI: Record<Stato, { icona: typeof Check; classe: string; etichetta: string }> = {
  disponibile: { icona: Check, classe: 'text-cinema-success', etichetta: 'Disponibile' },
  parziale: { icona: Info, classe: 'text-cinema-warning', etichetta: 'In parte' },
  assente: { icona: Minus, classe: 'text-cinema-text-subtle', etichetta: 'Non disponibile' },
};

export default function AccessibilitaPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <header className="mb-10">
        <p className="eyebrow">Prima di venire</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Accessibilità
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted sm:text-lg">
          Questa pagina risponde a una domanda pratica: <em>posso venire al Metropol?</em> Qui
          trovi come si entra e si sta in sala, senza giri di parole — comprese le cose che
          ancora non abbiamo.
        </p>
      </header>

      <div className="space-y-12">
        <section aria-labelledby="la-sala">
          <h2
            id="la-sala"
            className="flex items-center gap-3 text-2xl font-black text-cinema-text"
          >
            <Accessibility className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            La sala
          </h2>
          <p className="mt-2 text-sm text-cinema-text-subtle">
            {SITE.venueName}, {SITE.venueAddress} —{' '}
            <Link href="/sala" className="text-cinema-ticket-ink underline underline-offset-2">
              com&apos;è fatta
            </Link>
          </p>

          <ul className="mt-6 space-y-3">
            {ACCESSIBILITA_SALA.map((voce) => {
              const segno = SEGNI[voce.stato];
              const Icona = segno.icona;
              return (
                <li
                  key={voce.titolo}
                  className="flex gap-4 rounded-2xl border border-cinema-border bg-cinema-surface p-5"
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current ${segno.classe}`}
                  >
                    <Icona className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-cinema-text">
                      {voce.titolo}
                      {/* Lo stato è un colore e un simbolo: da solo non basta,
                          va anche detto (WCAG 1.4.1). */}
                      <span className="sr-only"> — {segno.etichetta}</span>
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cinema-text-muted">
                      {voce.dettaglio}
                    </p>
                    {voce.link && (
                      <Link
                        href={voce.link.href}
                        className="mt-2 inline-flex items-center gap-1.5 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-ticket-ink underline underline-offset-2"
                      >
                        {voce.link.label}
                        <span className="sr-only"> — {voce.titolo.toLowerCase()}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-cinema-text-subtle">
            Informazioni verificate sul posto il {VERIFICATA_IL}. Se trovi che qualcosa non
            corrisponde, diccelo: è il modo più veloce perché venga corretto.
          </p>
        </section>

        {/* Non è una voce in più dell'elenco: è la cosa che al Metropol si può
            fare da subito, e va trovata senza doverla cercare. */}
        <section aria-labelledby="in-sala-col-telefono">
          <h2
            id="in-sala-col-telefono"
            className="flex items-center gap-3 text-2xl font-black text-cinema-text"
          >
            <Smartphone className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Seguire il film con il telefono
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Siamo una sala <strong className="font-semibold text-cinema-text">CinemAmico</strong>:
            chi non sente o non vede può seguire la proiezione con MovieReading, l&apos;app
            gratuita che porta i sottotitoli sullo schermo del telefono e l&apos;audiodescrizione
            in cuffia. In cassa prestiamo un tablet o delle cuffie a chi preferisce non usare il
            proprio. Dipende dal film: sulle schede dei film che li hanno c&apos;è il bollino
            «accessibile».
          </p>
          <Link
            href="/accessibilita/sottotitoli-e-audiodescrizione"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            Come funziona
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section aria-labelledby="chiedere">
          <h2 id="chiedere" className="text-2xl font-black text-cinema-text">
            Chiedere una mano, o segnalarci una barriera
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Siamo un&apos;associazione di volontari: se ci avvisi prima, ci organizziamo. Vale per
            il posto in carrozzina, per un accompagnatore, per qualsiasi cosa ti serva per stare
            comodo in sala.
          </p>
          {CONTATTO_ACCESSIBILITA ? (
            <a
              href={`mailto:${CONTATTO_ACCESSIBILITA}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
            >
              Scrivici
            </a>
          ) : (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
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
              , oppure fermaci in cassa: la biglietteria apre mezz&apos;ora prima di ogni
              proiezione.
            </p>
          )}
        </section>

        <section aria-labelledby="il-sito">
          <h2
            id="il-sito"
            className="flex items-center gap-3 text-2xl font-black text-cinema-text"
          >
            <Monitor className="h-5 w-5 text-cinema-ticket-ink" aria-hidden="true" />
            Questo sito
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            In basso a sinistra, su ogni pagina, c&apos;è il bottone{' '}
            <strong className="font-semibold text-cinema-text">
              «Strumenti di lettura e accessibilità»
            </strong>
            : da lì si cambiano colori e dimensione del testo, si accende un carattere ad alta
            leggibilità e si fermano le animazioni. Le scelte restano sul tuo browser e valgono
            anche la volta dopo.
          </p>

          <h3 className="mt-8 text-lg font-bold text-cinema-text">Cosa abbiamo fatto</h3>
          <ul className="mt-3 space-y-2.5">
            {ACCESSIBILITA_SITO.fatto.map((riga) => (
              <li key={riga} className="flex gap-3 text-sm leading-relaxed text-cinema-text-muted">
                <Check
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-cinema-success"
                  aria-hidden="true"
                />
                {riga}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-bold text-cinema-text">Cosa ancora non va</h3>
          <p className="mt-2 text-sm leading-relaxed text-cinema-text-subtle">
            Elencare i propri limiti serve più che vantarsi dei propri pregi: così sai cosa
            aspettarti.
          </p>
          <ul className="mt-3 space-y-2.5">
            {ACCESSIBILITA_SITO.daFare.map((riga) => (
              <li key={riga} className="flex gap-3 text-sm leading-relaxed text-cinema-text-muted">
                <Minus
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-cinema-text-subtle"
                  aria-hidden="true"
                />
                {riga}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="altro">
          <h2 id="altro" className="text-2xl font-black text-cinema-text">
            Altre informazioni pratiche
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cinema-text-muted">
            Prezzi, orari della biglietteria e come raggiungerci stanno in{' '}
            <Link href="/info" className="text-cinema-ticket-ink underline underline-offset-2">
              Info e prezzi
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
