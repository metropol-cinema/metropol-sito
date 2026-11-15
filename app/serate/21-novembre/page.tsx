import { ArrowDown, CalendarPlus, Clock, Instagram, MapPin, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import { Trailer } from '@/components/trailer';
import { URL_SITO } from '@/lib/ambiente';
import { jsonLdScript } from '@/lib/json-ld';
import {
  SERATA_21_NOVEMBRE as SERATA,
  dataSerata,
  oraSerata,
  serataPassata,
  type FilmSerata,
} from '@/lib/serate';
import { SITE } from '@/lib/site';

// Il testo cambia da solo a serata finita: basta rifarla ogni tanto.
export const revalidate = 600;

const DATA = dataSerata(SERATA);
const ORA = oraSerata(SERATA);

export const metadata: Metadata = {
  title: `${SERATA.titolo} — serata speciale`,
  description: `Sabato 21 novembre alle ${ORA} al Cinema Metropol di Villafranca: il mediometraggio «Nulla è successo» e il cortometraggio «Il disappunto». ${SERATA.ingresso}.`,
};

function SchedaFilm({ film }: { film: FilmSerata }) {
  return (
    <article
      id={film.id}
      aria-labelledby={`${film.id}-titolo`}
      className="grid scroll-mt-24 gap-6 rounded-2xl border border-cinema-border bg-cinema-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10"
    >
      <Trailer youtubeId={film.youtubeId} title={film.titolo} posterUrl={film.fotogramma} />

      <div className="min-w-0">
        <p className="eyebrow">
          {film.formato}
          {film.anno ? ` · ${film.anno}` : ''}
        </p>
        <h3
          id={`${film.id}-titolo`}
          className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-5xl"
        >
          {film.titolo}
        </h3>
        <div className="mt-5 space-y-3 text-base leading-relaxed text-cinema-text-muted">
          {film.testo.map((capoverso) => (
            <p key={capoverso}>{capoverso}</p>
          ))}
        </div>

        {film.crediti.length > 0 && (
          <dl className="mt-5 space-y-1 text-sm">
            {film.crediti.map(({ ruolo, nomi }) => (
              <div key={ruolo} className="flex flex-wrap gap-x-2">
                <dt className="font-utility font-semibold uppercase tracking-wider text-cinema-text-subtle">
                  {ruolo}
                </dt>
                <dd className="text-cinema-text">{nomi}</dd>
              </div>
            ))}
          </dl>
        )}

        {film.instagram && (
          <a
            href={film.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-cinema-ticket-ink underline underline-offset-4 hover:text-cinema-text"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />@{film.instagram.account}
            <span className="sr-only"> su Instagram (si apre in una nuova scheda)</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Serata21NovembrePage() {
  const passata = serataPassata(SERATA);
  const url = `${URL_SITO}/serate/${SERATA.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScreeningEvent',
    name: SERATA.titolo,
    description: SERATA.presentazione[0],
    startDate: SERATA.inizio,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    url,
    image: `${URL_SITO}${SERATA.films[0].fotogramma}`,
    location: {
      '@type': 'MovieTheater',
      name: `${SITE.name} — ${SITE.venueName}`,
      address: SITE.venueAddress,
      geo: { '@type': 'GeoCoordinates', latitude: SITE.venueGeo.lat, longitude: SITE.venueGeo.lng },
    },
    workPresented: SERATA.films.map((f) => ({ '@type': 'Movie', name: f.titolo })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* Zona scura: i due fotogrammi restano fotogrammi in tutti i temi. */}
      <section
        data-zona="scura"
        className="grain relative isolate overflow-hidden border-b border-cinema-border bg-cinema-bg"
      >
        <div className="absolute inset-0 -z-10 grid grid-cols-2" data-decor="fondale" aria-hidden="true">
          {SERATA.films.map((f) => (
            <div key={f.id} className="relative">
              <Image src={f.fotogramma} alt="" fill priority sizes="50vw" className="object-cover opacity-45" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/80 to-cinema-bg/30" />
        </div>

        <div className="container py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">Serata speciale · {passata ? 'si è svolta' : DATA}</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[0.95] text-cinema-text sm:text-7xl">
              Nulla è successo
              <span className="mt-2 block text-3xl text-cinema-ticket-ink sm:text-5xl">
                e Il disappunto
              </span>
            </h1>
            <div className="mt-6 max-w-2xl space-y-3 text-base leading-relaxed text-cinema-text-muted sm:text-lg">
              {SERATA.presentazione.map((capoverso) => (
                <p key={capoverso}>{capoverso}</p>
              ))}
            </div>

            {passata ? (
              <p className="mt-8 max-w-2xl rounded-xl border border-cinema-border bg-cinema-bg/70 p-4 text-sm leading-relaxed text-cinema-text-muted">
                La serata si è svolta {DATA}. Grazie a chi è venuto: i trailer restano qui sotto.
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
                    href="#film"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cinema-border-strong bg-cinema-bg/60 px-5 py-2.5 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
                  >
                    Guarda i trailer
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="film" aria-labelledby="film-titolo" className="container scroll-mt-24 py-14">
        <p className="eyebrow">In programma</p>
        <h2 id="film-titolo" className="mt-2 text-3xl font-black leading-none text-cinema-text sm:text-4xl">
          I due film della serata
        </h2>
        <div className="mt-8 space-y-6">
          {SERATA.films.map((film) => (
            <SchedaFilm key={film.id} film={film} />
          ))}
        </div>
      </section>
    </main>
  );
}
