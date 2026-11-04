import {
  ArrowDown,
  CalendarCheck,
  Clapperboard,
  Gift,
  Mail,
  MessageSquareHeart,
  Ticket,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Coriandoli, Festone } from '@/components/festa-decor';
import { EmptyState } from '@/components/page-header';
import { ScadenzaCineCompleanno } from '@/components/scadenza-cinecompleanno';
import { ShowtimesByDay } from '@/components/showtimes';
import {
  CINECOMPLEANNO,
  euroBreve,
  mailtoPrenotazione,
  proiezioniBambini,
  scadenzeDi,
  testoScadenza,
} from '@/lib/cinecompleanni';
import { fetchProgrammazione, type PublicFilm } from '@/lib/programmazione-client';
import { SITE } from '@/lib/site';
import { fetchTmdbDetails } from '@/lib/tmdb';

export const revalidate = 600;

const PREZZO = euroBreve(CINECOMPLEANNO.prezzoBiglietto);
const MINIMO = CINECOMPLEANNO.bigliettiMinimi;

export const metadata: Metadata = {
  title: 'CineCompleanni',
  description: `Il compleanno al Cinema Metropol di Villafranca: con almeno ${MINIMO} biglietti a ${PREZZO} l'uno il festeggiato entra gratis e c'è un messaggio personalizzato sullo schermo.`,
};

const PASSI = [
  {
    Icona: Clapperboard,
    colore: '#2DD4BF',
    titolo: 'Scegli il film',
    testo: 'Tra i film per bambini del sabato e della domenica pomeriggio, quelli che iniziano fra le 14:00 e le 16:00.',
  },
  {
    Icona: CalendarCheck,
    colore: '#FACC15',
    titolo: 'Prenota entro giovedì',
    testo: "Il CineCompleanno va prenotato entro il giovedì del fine settimana in cui c'è il film.",
  },
  {
    Icona: Ticket,
    colore: '#F97316',
    titolo: `${PREZZO} a biglietto`,
    testo: `Un carnet da almeno ${MINIMO} biglietti paganti a ${PREZZO} l'uno: con ${MINIMO} biglietti sono ${euroBreve(
      MINIMO * CINECOMPLEANNO.prezzoBiglietto
    )}.`,
  },
  {
    Icona: Gift,
    colore: '#EC4899',
    titolo: 'Il festeggiato entra gratis',
    testo: `Non rientra nei ${MINIMO} biglietti paganti: chi compie gli anni è in più, e non paga.`,
  },
  {
    Icona: MessageSquareHeart,
    colore: '#60A5FA',
    titolo: 'Il messaggio sullo schermo',
    testo: 'Prima del film, sullo schermo appare un messaggio personalizzato per chi compie gli anni.',
  },
];

const DA_SCRIVERE = [
  'il film e il giorno che avete scelto',
  `quanti biglietti paganti vi servono (almeno ${MINIMO}, il festeggiato è in più)`,
  'il nome di chi compie gli anni',
  'il messaggio da mostrare sullo schermo',
  'un numero di telefono per ricontattarvi',
];

/** Un film che si può scegliere: locandina, orari per bambini, scadenza, bottone. */
async function FilmDaFesteggiare({ film }: { film: PublicFilm }) {
  const details = await fetchTmdbDetails(film.tmdbId);
  const poster = details?.posterUrl ?? film.poster;
  const showtimes = proiezioniBambini(film.showtimes);
  const scadenze = scadenzeDi(showtimes);

  return (
    <article className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 rounded-2xl border border-cinema-border bg-cinema-surface p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-6 sm:p-6">
      <Link
        href={`/film/${film.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block self-start overflow-hidden rounded-xl bg-cinema-surface-2 shadow-lg shadow-black/40"
      >
        {poster ? (
          // Il poster può essere un data-URI Cinebot: <img> semplice.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="aspect-[2/3] w-full object-cover" />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center text-cinema-text-subtle">
            <Clapperboard className="h-8 w-8" aria-hidden="true" />
          </div>
        )}
      </Link>

      <div className="min-w-0">
        <h3 className="text-2xl font-black leading-tight sm:text-3xl">
          <Link
            href={`/film/${film.id}`}
            className="text-cinema-text transition-colors hover:text-cinema-ticket-ink"
          >
            {film.title}
          </Link>
        </h3>
        <ShowtimesByDay
          film={film}
          showtimes={showtimes}
          showVenue
          linkToFilm
          perfBg="rgb(var(--c-surface))"
          className="mt-3 space-y-3"
        />
        <ScadenzaCineCompleanno
          scadenze={scadenze}
          iniziale={testoScadenza(scadenze)}
          className="mt-4 text-sm leading-relaxed text-cinema-text-muted"
        >
          <a
            href={mailtoPrenotazione(film.title)}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-cinema-ticket px-4 py-2.5 font-utility text-xs font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Prenota<span className="sr-only"> un CineCompleanno con {film.title}</span>
          </a>
        </ScadenzaCineCompleanno>
      </div>
    </article>
  );
}

export default async function CineCompleanniPage() {
  // Se l'API non risponde si perde solo l'elenco: chi è qui per sapere come
  // funziona deve poterlo leggere lo stesso.
  const films = await fetchProgrammazione({ days: 180 }).catch(() => [] as PublicFilm[]);
  const filmBambini = films
    .filter((f) => proiezioniBambini(f.showtimes).length > 0)
    .sort((a, b) =>
      proiezioniBambini(a.showtimes)[0].startsAt.localeCompare(proiezioniBambini(b.showtimes)[0].startsAt)
    );

  return (
    <main>
      {/* Zona scura: titolo e mascotte sono a colori pieni e devono restare
          sullo stesso fondo in tutti i temi. */}
      <section
        data-zona="scura"
        className="grain relative isolate overflow-hidden border-b border-cinema-border bg-cinema-bg"
      >
        <div className="absolute inset-0 -z-10" data-decor="fondale" aria-hidden="true">
          {/* unoptimized: è già piccolissimo e tutto sfocato, ricomprimerlo non dà niente. */}
          <Image src="/cinecompleanni/fondale.jpg" alt="" fill priority unoptimized className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/70 to-cinema-bg/5" />
        </div>
        {/* I coriandoli lasciano libero il centro: dietro al testo sarebbero
            macchie da leggere attraverso. */}
        <Coriandoli className="-z-10 [mask-image:linear-gradient(black,transparent_36%)] lg:[mask-image:radial-gradient(ellipse_50%_60%_at_50%_62%,transparent_75%,black_100%)]" />
        <Festone className="-z-10" />

        <div className="container relative pb-0 pt-20 sm:pt-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h1 className="w-full max-w-xl">
              <Image
                src="/cinecompleanni/titolo.webp"
                alt="CineCompleanni"
                width={779}
                height={318}
                priority
                sizes="(min-width: 640px) 36rem, 90vw"
                className="w-full drop-shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.5)]"
              />
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
              <p className="nastro-festa text-sm sm:text-base">Carnet di biglietti scontati!</p>
              <p className="inline-block rotate-1 rounded-md bg-cinema-ticket px-4 py-2 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket sm:text-base">
                Il festeggiato entra gratis!
              </p>
            </div>
            <p className="mt-7 font-display text-2xl font-black leading-tight text-cinema-text sm:text-4xl">
              Quest&apos;anno il compleanno si festeggia al cinema!
            </p>
            <p className="mt-4 text-base leading-relaxed text-cinema-text-muted sm:text-lg">
              {`Porta gli amici a vedere il film del fine settimana: con almeno ${MINIMO} biglietti a ${PREZZO} l'uno il festeggiato entra gratis e, prima del film, appare sullo schermo un messaggio personalizzato per chi compie gli anni.`}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={mailtoPrenotazione()}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Prenota ora
              </a>
              <a
                href="#film"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cinema-border-strong bg-cinema-bg/60 px-5 py-2.5 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
              >
                Scegli il film
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* `eager`: stanno nella fascia d'apertura, e sono metà della promozione.
              Col caricamento pigro comparivano solo dopo aver mosso la pagina. */}
          <div
            className="pointer-events-none mt-6 flex items-end justify-center gap-2 xl:absolute xl:inset-x-0 xl:bottom-0 xl:mt-0 xl:justify-between"
            aria-hidden="true"
          >
            <Image
              src="/cinecompleanni/mascotte-verde.webp"
              alt=""
              width={758}
              height={580}
              sizes="(min-width: 1280px) 20rem, 48vw"
              loading="eager"
              className="w-[52%] max-w-xs animate-dondolio xl:w-[20rem] xl:max-w-none"
            />
            <Image
              src="/cinecompleanni/mascotte-arancione.webp"
              alt=""
              width={654}
              height={567}
              sizes="(min-width: 1280px) 18rem, 44vw"
              loading="eager"
              className="w-[44%] max-w-[17rem] animate-dondolio [animation-delay:-2.5s] xl:w-[18rem] xl:max-w-none"
            />
          </div>
          {/* Da computer le mascotte stanno ai lati: serve aria sotto il testo. */}
          <div className="hidden h-16 xl:block" />
        </div>
      </section>

      <div className="container space-y-16 py-14">
        <section aria-labelledby="come-funziona">
          <p className="eyebrow">In breve</p>
          <h2 id="come-funziona" className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-4xl">
            Come funziona
          </h2>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PASSI.map(({ Icona, colore, titolo, testo }) => (
              <li
                key={titolo}
                className="relative overflow-hidden rounded-2xl border border-cinema-border bg-cinema-surface p-5"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: colore }}
                  data-decor="fondale"
                  aria-hidden="true"
                />
                <Icona className="h-6 w-6 text-cinema-ticket-ink" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-black leading-tight text-cinema-text">{titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cinema-text-muted">{testo}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* `scroll-mt`: ci si arriva dal bottone in alto, e la testata fissa
            coprirebbe il titolo. */}
        <section id="film" aria-labelledby="film-titolo" className="scroll-mt-24">
          <p className="eyebrow">In programma</p>
          <h2 id="film-titolo" className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-4xl">
            I prossimi film per bambini
          </h2>
          {filmBambini.length > 0 ? (
            <div className="mt-7 space-y-4">
              {filmBambini.map((film) => (
                <FilmDaFesteggiare key={film.id} film={film} />
              ))}
            </div>
          ) : (
            <div className="mt-7">
              <EmptyState>
                Il programma esce di settimana in settimana. Torna a trovarci qui o guarda la{' '}
                <Link
                  href="/programmazione"
                  className="text-cinema-ticket-ink underline underline-offset-2"
                >
                  programmazione
                </Link>
                : il prossimo film per bambini comparirà in questa pagina.
              </EmptyState>
            </div>
          )}
        </section>

        <section
          aria-labelledby="come-prenotare"
          className="rounded-2xl border border-cinema-ticket-ink/50 bg-cinema-surface p-6 sm:p-8"
        >
          <h2 id="come-prenotare" className="text-3xl font-black leading-none text-cinema-text sm:text-4xl">
            Come si prenota
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Scrivici a{' '}
            <a href={mailtoPrenotazione()} className="text-cinema-ticket-ink underline underline-offset-2">
              {SITE.email}
            </a>{' '}
            entro il giovedì del fine settimana del film. Dicci:
          </p>
          <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-5 text-base leading-relaxed text-cinema-text-muted marker:text-cinema-ticket-ink">
            {DA_SCRIVERE.map((voce) => (
              <li key={voce}>{voce}</li>
            ))}
          </ul>
          <a
            href={mailtoPrenotazione()}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Scrivici per prenotare
          </a>
        </section>
      </div>
    </main>
  );
}
