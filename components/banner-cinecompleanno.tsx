import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Coriandoli } from '@/components/festa-decor';
import { ScadenzaCineCompleanno } from '@/components/scadenza-cinecompleanno';
import {
  CINECOMPLEANNO,
  euroBreve,
  prezzoNormale,
  proiezioniBambini,
  scadenzeDi,
  testoScadenza,
} from '@/lib/cinecompleanni';
import type { PublicShowtime } from '@/lib/programmazione-client';
import { cn } from '@/lib/utils';

/** "almeno 10 biglietti a 5 € l'uno invece di 6 €" */
function offerta(showtimes: PublicShowtime[]): string {
  const normale = prezzoNormale(showtimes);
  const prezzo = euroBreve(CINECOMPLEANNO.prezzoBiglietto);
  return `almeno ${CINECOMPLEANNO.bigliettiMinimi} biglietti a ${prezzo} l'uno${
    normale ? ` invece di ${euroBreve(normale)}` : ''
  }`;
}

/**
 * Il banner del CineCompleanno nella scheda del film. Compare da solo se il film
 * ha una proiezione per bambini (`isProiezioneBambini`): altrimenti non c'è.
 *
 * Zona scura: porta i colori della locandina, che su un fondo chiaro si
 * spegnerebbero, e deve restare uguale in tutti i temi.
 */
export function BannerCineCompleanno({
  showtimes,
  className,
}: {
  showtimes: PublicShowtime[];
  className?: string;
}) {
  if (proiezioniBambini(showtimes).length === 0) return null;
  const scadenze = scadenzeDi(showtimes);

  return (
    <aside
      aria-labelledby="banner-cinecompleanno"
      data-zona="scura"
      className={cn(
        'relative isolate overflow-hidden rounded-2xl border border-cinema-ticket-ink/50 bg-cinema-bg',
        className
      )}
    >
      <div className="absolute inset-0 -z-10" data-decor="fondale" aria-hidden="true">
        <Image src="/cinecompleanni/fondale.jpg" alt="" fill unoptimized className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-bg/90 via-cinema-bg/70 to-cinema-bg/25" />
      </div>
      {/* Solo ai bordi: dietro al testo sarebbero macchie da leggere attraverso. */}
      <Coriandoli
        quanti={26}
        className="-z-10 hidden [mask-image:linear-gradient(90deg,black,transparent_22%,transparent_68%,black_85%)] lg:block"
      />

      <div className="grid items-center gap-5 p-5 sm:p-7 lg:grid-cols-[15rem_minmax(0,1fr)_auto] lg:gap-8">
        <Image
          src="/cinecompleanni/titolo.webp"
          alt=""
          width={779}
          height={318}
          sizes="(min-width: 1024px) 15rem, 13rem"
          className="w-52 lg:w-full"
        />

        <div className="min-w-0">
          <h2
            id="banner-cinecompleanno"
            className="text-2xl font-black leading-tight text-cinema-text sm:text-3xl"
          >
            Festeggia il compleanno con questo film!
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-cinema-text-muted">
            Con il CineCompleanno hai {offerta(showtimes)} e, prima del film, un messaggio
            personalizzato per chi compie gli anni.
          </p>
          <ScadenzaCineCompleanno
            scadenze={scadenze}
            iniziale={testoScadenza(scadenze)}
            className="mt-2 text-base leading-relaxed text-cinema-text-muted"
          />
          <Link
            href={CINECOMPLEANNO.href}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
          >
            Scopri come funziona
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="hidden items-end lg:flex" aria-hidden="true">
          <Image
            src="/cinecompleanni/mascotte-verde.webp"
            alt=""
            width={758}
            height={580}
            sizes="11rem"
            className="relative z-10 -mr-6 w-44 max-w-none"
          />
          <Image
            src="/cinecompleanni/mascotte-arancione.webp"
            alt=""
            width={654}
            height={567}
            sizes="9rem"
            className="w-36 max-w-none"
          />
        </div>
      </div>
    </aside>
  );
}

/**
 * Lo stesso invito in una riga, per gli elenchi di film (home e programmazione):
 * lì il banner intero spingerebbe giù il film successivo. Tutta la riga è il link.
 */
export function InvitoCineCompleanno({
  showtimes,
  className,
}: {
  showtimes: PublicShowtime[];
  className?: string;
}) {
  if (proiezioniBambini(showtimes).length === 0) return null;

  return (
    <Link
      href={CINECOMPLEANNO.href}
      className={cn(
        'flex items-center gap-3 rounded-xl border border-cinema-ticket-ink/40 bg-cinema-surface-2 py-1.5 pl-2 pr-3 transition-colors hover:border-cinema-ticket-ink',
        className
      )}
    >
      <Image
        src="/cinecompleanni/mascotte-verde.webp"
        alt=""
        width={758}
        height={580}
        sizes="4rem"
        className="h-12 w-auto shrink-0"
      />
      <span className="min-w-0 flex-1 text-sm leading-snug text-cinema-text-muted">
        <strong className="font-semibold text-cinema-text">Festeggia qui il compleanno!</strong>{' '}
        Con il CineCompleanno hai {offerta(showtimes)}.
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
    </Link>
  );
}
