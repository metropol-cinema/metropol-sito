import Link from 'next/link';

import { PosterGrid } from '@/components/poster-grid';
import type { PublicFilm } from '@/lib/programmazione-client';
import { formatDayIt } from '@/lib/programmazione-client';

/**
 * Hero di riserva quando in settimana non si proietta: invece di una sala
 * vuota, le locandine di quello che arriva e la data della prima proiezione.
 */
export function HeroUpcoming({ films }: { films: PublicFilm[] }) {
  const first = films[0]?.showtimes[0];

  return (
    <section
      aria-label="Prossimi film in arrivo"
      className="grain relative isolate overflow-hidden border-b border-cinema-border"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(244,183,64,0.14),transparent_70%)]"
      />
      <div className="container py-12 sm:py-16">
        <p className="eyebrow">Prossimamente al Metropol</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black leading-[0.98] text-cinema-text sm:text-6xl">
          Questa settimana lo schermo riposa
        </h2>
        {first && (
          <p className="mt-4 text-base text-cinema-text-muted sm:text-lg">
            Si ricomincia <span className="text-cinema-ticket">{formatDayIt(first.startsAt)}</span>.
          </p>
        )}

        <PosterGrid films={films.slice(0, 4)} prominent className="mt-9" />

        <Link
          href="/prossimamente"
          className="group mt-8 inline-flex items-center gap-2 border-b border-cinema-ticket/40 pb-1 font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-ticket transition-colors hover:border-cinema-ticket"
        >
          Tutti i film in arrivo
        </Link>
      </div>
    </section>
  );
}
