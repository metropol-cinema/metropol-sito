import {
  ArrowDown,
  Award,
  CalendarPlus,
  Clock,
  Guitar,
  Info,
  MapPin,
  Mic,
  Music2,
  Ticket,
  type LucideIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Trailer } from '@/components/trailer';
import { URL_SITO } from '@/lib/ambiente';
import { jsonLdScript } from '@/lib/json-ld';
import {
  SERATA_8_DICEMBRE as SERATA,
  dataSerata,
  oraSerata,
  serataPassata,
  serataPubblicata,
  type BranoScaletta,
} from '@/lib/serate';
import { SITE } from '@/lib/site';

// Il testo cambia da solo a serata finita: basta rifarla ogni tanto.
export const revalidate = 600;

const DATA = dataSerata(SERATA);
const ORA = oraSerata(SERATA);

export const metadata: Metadata = {
  title: `${SERATA.titolo} — ${SERATA.spettacolo}`,
  description: `Martedì 8 dicembre alle ${ORA} al Cinema Metropol di Villafranca: il Movie Trio in concerto con «${SERATA.spettacolo}», le grandi colonne sonore del cinema da Chaplin a Morricone. ${SERATA.ingresso}.`,
};

const ICONA_STRUMENTO: Record<string, LucideIcon> = {
  Chitarre: Guitar,
  Voce: Mic,
  Tromba: Music2,
};

function Brano({ brano }: { brano: BranoScaletta }) {
  return (
    <li className="py-2.5">
      <p className="text-cinema-text">
        {brano.brano ? (
          <>
            <span className="font-semibold">{`«${brano.brano}»`}</span>
            <span className="text-cinema-text-muted">{` da ${brano.film}`}</span>
          </>
        ) : (
          <span className="font-semibold">{brano.film}</span>
        )}
        <span className="text-cinema-text-subtle">{` · ${brano.anno}`}</span>
      </p>
      {brano.premio && (
        <p className="mt-1 inline-flex items-center gap-1.5 font-utility text-xs font-semibold uppercase tracking-wide text-cinema-ticket-ink">
          <Award className="h-3.5 w-3.5" aria-hidden="true" />
          {brano.premio}
        </p>
      )}
    </li>
  );
}

export default function Serata8DicembrePage() {
  if (!serataPubblicata(SERATA)) notFound();
  const passata = serataPassata(SERATA);
  const url = `${URL_SITO}/serate/${SERATA.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${SERATA.titolo}: ${SERATA.spettacolo}`,
    description: SERATA.sottotitolo,
    startDate: SERATA.inizio,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    url,
    image: `${URL_SITO}${SERATA.locandina.src}`,
    location: {
      '@type': 'MovieTheater',
      name: `${SITE.name} — ${SITE.venueName}`,
      address: SITE.venueAddress,
      geo: { '@type': 'GeoCoordinates', latitude: SITE.venueGeo.lat, longitude: SITE.venueGeo.lng },
    },
    organizer: { '@type': 'Organization', name: SITE.association, url: URL_SITO },
    performer: {
      '@type': 'MusicGroup',
      name: 'Movie Trio',
      member: SERATA.musicisti.map((m) => ({ '@type': 'Person', name: m.nome })),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* Zona scura: la locandina e il suo fondale restano scuri in tutti i temi. */}
      <section
        data-zona="scura"
        className="grain relative isolate overflow-hidden border-b border-cinema-border bg-cinema-bg"
      >
        <div className="absolute inset-0 -z-10" data-decor="fondale" aria-hidden="true">
          {/* Sfocato di proposito: le scritte della locandina dietro al titolo farebbero rumore. */}
          <Image
            src="/serate/8-dicembre/fondale.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/85 to-cinema-bg/40" />
        </div>

        <div className="container grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-14">
          <div className="max-w-3xl">
            <p className="eyebrow">
              {SERATA.etichetta} · {passata ? 'si è svolto' : DATA}
            </p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[0.95] text-cinema-text sm:text-7xl">
              Movie Trio
              <span className="mt-2 block text-3xl text-cinema-ticket-ink sm:text-5xl">
                in concerto: {SERATA.spettacolo}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl font-display text-xl italic leading-snug text-cinema-text sm:text-2xl">
              {SERATA.sottotitolo}
            </p>
            <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-cinema-text-muted sm:text-lg">
              {SERATA.presentazione.map((capoverso) => (
                <p key={capoverso}>{capoverso}</p>
              ))}
            </div>

            {passata ? (
              <p className="mt-8 max-w-2xl rounded-xl border border-cinema-border bg-cinema-bg/70 p-4 text-sm leading-relaxed text-cinema-text-muted">
                Il concerto si è svolto {DATA}. Grazie a chi è venuto: il video resta qui sotto.
              </p>
            ) : (
              <>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  <li className="flex items-start gap-3 rounded-xl border border-cinema-border bg-cinema-bg/70 p-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
                    <span>
                      <span className="block font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
                        Quando
                      </span>
                      <span className="block text-cinema-text first-letter:uppercase">
                        {`${DATA}, ore ${ORA}`}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 rounded-xl border border-cinema-border bg-cinema-bg/70 p-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
                    <span>
                      <span className="block font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
                        Dove
                      </span>
                      <a
                        href={SITE.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cinema-text underline decoration-cinema-border-strong underline-offset-4 hover:text-cinema-ticket-ink"
                      >
                        {`Cinema Metropol, ${SITE.venueName}`}
                        <span className="sr-only"> (mappa, si apre in una nuova scheda)</span>
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 rounded-xl border border-cinema-border bg-cinema-bg/70 p-4">
                    <Ticket className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
                    <span>
                      <span className="block font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
                        Ingresso
                      </span>
                      <span className="text-cinema-text">{SERATA.ingresso}</span>
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`/serate/${SERATA.slug}/calendario`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
                  >
                    <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                    Aggiungi al calendario
                  </a>
                  <a
                    href="#scaletta"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cinema-border-strong bg-cinema-bg/60 px-5 py-2.5 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
                  >
                    La scaletta
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </>
            )}
          </div>

          <a
            href={SERATA.locandina.src}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-3/5 max-w-[20rem] justify-self-center rounded-xl shadow-2xl shadow-black/60 transition-transform hover:-translate-y-1 sm:w-1/2 lg:w-full"
          >
            <Image
              src={SERATA.locandina.src}
              alt={`Locandina: ${SERATA.titolo}, «${SERATA.spettacolo}», ${DATA} ore ${ORA}, Sala Ferrarini, ingresso libero. Con ${SERATA.musicisti.map((m) => `${m.nome} (${m.strumento.toLowerCase()})`).join(', ')}.`}
              width={SERATA.locandina.width}
              height={SERATA.locandina.height}
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 60vw"
              className="h-auto w-full rounded-xl"
            />
            <span className="sr-only"> (apre la locandina a grandezza piena in una nuova scheda)</span>
          </a>
        </div>
      </section>

      <section aria-labelledby="trio-titolo" className="container py-14">
        <p className="eyebrow">Sul palco</p>
        <h2 id="trio-titolo" className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-4xl">
          Il Movie Trio
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <Trailer
            youtubeId={SERATA.video.youtubeId}
            title={SERATA.video.titolo}
            posterUrl={SERATA.video.fotogramma}
          />
          <ul className="grid content-start gap-3">
            {SERATA.musicisti.map(({ nome, strumento }) => {
              const Icona = ICONA_STRUMENTO[strumento] ?? Music2;
              return (
                <li
                  key={nome}
                  className="flex items-center gap-4 rounded-xl border border-cinema-border bg-cinema-surface p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cinema-ticket-ink/60 text-cinema-ticket-ink">
                    <Icona className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-cinema-text">{nome}</span>
                    <span className="block font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle">
                      {strumento}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="scaletta"
        aria-labelledby="scaletta-titolo"
        className="scroll-mt-24 border-t border-cinema-border bg-cinema-surface-2"
      >
        <div className="container py-14">
          <p className="eyebrow">In programma</p>
          <h2 id="scaletta-titolo" className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-4xl">
            La scaletta
          </h2>
          <p className="mt-5 flex max-w-2xl items-start gap-3 rounded-xl border border-cinema-border bg-cinema-surface p-4 text-sm leading-relaxed text-cinema-text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
            <span>
              È indicativa: la sera del concerto qualche brano potrebbe cambiare, e qualche film
              aggiungersi. L’ordine è quello della locandina.
            </span>
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERATA.scaletta.map(({ autore, brani }) => (
              <li
                key={autore}
                className="rounded-2xl border border-cinema-border bg-cinema-surface p-5"
              >
                <h3 className="font-utility text-xs font-bold uppercase tracking-widest text-cinema-ticket-ink">
                  {autore}
                </h3>
                <ul className="mt-2 divide-y divide-cinema-border">
                  {brani.map((brano) => (
                    <Brano key={`${brano.film}-${brano.brano ?? ''}`} brano={brano} />
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
