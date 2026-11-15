import { ArrowRight, Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { dataSerata, oraSerata, type Serata } from '@/lib/serate';

/**
 * Fascia in home per una serata speciale, sotto l'hero. Chi la mostra decide
 * anche fino a quando (`serataPassata`): finita la giornata sparisce da sola.
 */
export function FasciaSerata({ serata }: { serata: Serata }) {
  return (
    <aside aria-labelledby="fascia-serata" className="border-b border-cinema-border bg-cinema-surface-2">
      <div className="container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-start gap-3">
          <Clapperboard className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-cinema-text-muted">
            <strong id="fascia-serata" className="font-semibold text-cinema-text">
              {`Serata speciale, ${dataSerata(serata)} alle ${oraSerata(serata)}:`}
            </strong>{' '}
            due film girati da ragazzi di Villafranca, «Nulla è successo» e «Il disappunto».{' '}
            {`${serata.ingresso}.`}
          </p>
        </div>
        <Link
          href={`/serate/${serata.slug}`}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-cinema-ticket-ink px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-ticket-ink transition-colors hover:bg-cinema-ticket hover:text-cinema-on-ticket sm:self-auto"
        >
          Scopri la serata
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
