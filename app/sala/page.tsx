import { Accessibility, Armchair, Clapperboard, MapPin, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { BOX_OFFICE_NOTE, SITE } from '@/lib/site';
import { FOTO_SALA, SALA } from '@/lib/sala';

export const metadata: Metadata = {
  title: 'La sala',
  description:
    'La Sala "Alida Ferrarini" di Villafranca di Verona: 450 posti più quattro per le carrozzine, cinematografo, teatro e sala conferenze in Piazza Villafranchetta.',
};

/** Intestazione di sezione: icona d'oro + titolo, come nelle altre pagine. */
function Titolo({
  id,
  icona: Icona,
  children,
}: {
  id: string;
  icona: typeof MapPin;
  children: string;
}) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-2xl font-black text-cinema-text">
      <Icona className="h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
      {children}
    </h2>
  );
}

/** Un numero grande con sotto cosa conta. */
function Cifra({ valore, etichetta }: { valore: string; etichetta: string }) {
  return (
    <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-5">
      <p className="text-4xl font-black leading-none text-cinema-ticket-ink">{valore}</p>
      <p className="mt-2 text-sm leading-snug text-cinema-text-muted">{etichetta}</p>
    </div>
  );
}

/**
 * La pagina della sala: dove si entra, quanto è grande, com'è fatta.
 *
 * Serve a due lettori diversi con le stesse informazioni — chi viene a vedere
 * un film e vuole sapere cosa trova, e chi pensa di chiederci la sala per una
 * serata sua. Per questo i numeri stanno in alto e in chiaro.
 */
export default function SalaPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <header className="mb-10">
        <p className="eyebrow">Il luogo</p>
        <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-5xl">
          Sala «Alida Ferrarini»
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted sm:text-lg">
          È la sala del Metropol, in Piazza Villafranchetta, nel centro di Villafranca. Una sola
          sala, grande, che nel corso della settimana cambia mestiere: {SALA.usi[0].toLowerCase()},{' '}
          {SALA.usi[1].toLowerCase()}, {SALA.usi[2].toLowerCase()}. È scritto sopra le porte
          all&apos;ingresso, ed è il modo più breve per dire cos&apos;è questo posto.
        </p>
      </header>

      <div className="space-y-12">
        <section aria-labelledby="in-cifre">
          <Titolo id="in-cifre" icona={Armchair}>
            In cifre
          </Titolo>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Cifra valore={String(SALA.posti)} etichetta="posti a sedere in platea" />
            <Cifra
              valore={String(SALA.postiCarrozzina)}
              etichetta="posti attrezzati per le carrozzine"
            />
            <Cifra
              valore={String(SALA.usi.length)}
              etichetta="usi: cinematografo, teatro, sala conferenze"
            />
          </div>
        </section>

        <section aria-labelledby="com-e-fatta">
          <Titolo id="com-e-fatta" icona={Clapperboard}>
            Com&apos;è fatta
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            La platea sale a gradoni verso il fondo, con una parte rialzata dietro le ultime file.
            Le poltrone sono blu, in file lunghe e continue, e il pavimento è in legno chiaro.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Davanti allo schermo c&apos;è un <strong className="font-semibold text-cinema-text">palco
            vero</strong>, con il sipario e i fari appesi in alto: è quello che permette alla stessa
            sala di ospitare uno spettacolo teatrale, un saggio o una conferenza il giorno dopo una
            proiezione. All&apos;ingresso, prima delle porte, c&apos;è il foyer con il bancone della
            biglietteria.
          </p>
        </section>

        {FOTO_SALA.length > 0 && (
          <section aria-labelledby="foto">
            <Titolo id="foto" icona={Clapperboard}>
              Le fotografie
            </Titolo>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {FOTO_SALA.map((foto) => (
                <figure key={foto.src} className={foto.larga ? 'm-0 sm:col-span-2' : 'm-0'}>
                  {/* Foto nostre, in public/: le dimensioni vere sono in
                      lib/sala.ts, così Next ritaglia i formati per il telefono
                      e la pagina non salta mentre l'immagine arriva. */}
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={foto.larghezza}
                    height={foto.altezza}
                    sizes={foto.larga ? '(min-width: 768px) 48rem, 100vw' : '(min-width: 640px) 24rem, 100vw'}
                    className="w-full rounded-2xl border border-cinema-border object-cover"
                  />
                  {foto.didascalia && (
                    <figcaption className="mt-2 text-sm leading-relaxed text-cinema-text-subtle">
                      {foto.didascalia}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="come-si-entra">
          <Titolo id="come-si-entra" icona={MapPin}>
            Dove si entra
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            {SITE.venueName}
            <br />
            {SITE.venueAddress}
          </p>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" /> Apri in Google Maps
            <span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            D&apos;estate, ad agosto, la rassegna non si tiene qui ma al Castello di Villafranca: il
            luogo è sempre scritto accanto all&apos;orario, nella scheda del film.
          </p>
        </section>

        <section aria-labelledby="accessibilita-sala">
          <Titolo id="accessibilita-sala" icona={Accessibility}>
            Se hai una disabilità
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Un ascensore porta all&apos;ingresso del cinema e in platea ci sono{' '}
            {SALA.postiCarrozzina} posti attrezzati per le carrozzine; i servizi igienici
            accessibili sono aperti a ogni proiezione. Siamo anche una sala CinemAmico: chi non
            sente o non vede può seguire il film con sottotitoli e audiodescrizione sul proprio
            telefono.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/accessibilita"
              className="text-cinema-ticket-ink underline underline-offset-2"
            >
              Accessibilità della sala
            </Link>
            <Link
              href="/accessibilita/sottotitoli-e-audiodescrizione"
              className="text-cinema-ticket-ink underline underline-offset-2"
            >
              Sottotitoli e audiodescrizione
            </Link>
          </p>
        </section>

        <section aria-labelledby="biglietteria">
          <Titolo id="biglietteria" icona={Ticket}>
            Biglietteria
          </Titolo>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            {BOX_OFFICE_NOTE} I prezzi, le riduzioni per i soci e gli orari stanno in{' '}
            <Link href="/info" className="text-cinema-ticket-ink underline underline-offset-2">
              Info e prezzi
            </Link>
            , il calendario in{' '}
            <Link
              href="/programmazione"
              className="text-cinema-ticket-ink underline underline-offset-2"
            >
              Programmazione
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
