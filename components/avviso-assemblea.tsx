import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

import { ASSEMBLEA, assembleaInEvidenza } from '@/lib/assemblea';

/**
 * L'avviso che rimanda alla convocazione dell'assemblea.
 *
 * - `fascia` (home): a tutta larghezza, SOPRA l'hero. Sul telefono l'hero
 *   occupa tutto lo schermo, e un avviso che si trova solo scorrendo non lo
 *   legge nessuno.
 * - `riquadro` (pagina dell'associazione): dentro la colonna del testo, come
 *   il riquadro «Diventa socio» che gli sta sotto.
 *
 * Si spegne da solo dopo il giorno dell'assemblea (`assembleaInEvidenza`),
 * senza bisogno di ricordarsi di toglierlo.
 *
 * L'ora è quella della seconda convocazione: è lì che l'assemblea si tiene
 * davvero, e la parentesi lo dice per esteso.
 */
export function AvvisoAssemblea({ variante = 'fascia' }: { variante?: 'fascia' | 'riquadro' }) {
  if (!assembleaInEvidenza()) return null;

  const fascia = variante === 'fascia';
  return (
    <aside
      aria-labelledby={`avviso-assemblea-${variante}`}
      className={
        fascia
          ? 'border-b border-cinema-border bg-cinema-surface'
          : 'mb-10 rounded-2xl border border-cinema-ticket-ink/50 bg-cinema-surface'
      }
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 ${
          fascia ? 'container py-4' : 'p-6 sm:p-7'
        }`}
      >
        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-cinema-text-muted">
            <strong id={`avviso-assemblea-${variante}`} className="font-semibold text-cinema-text">
              Assemblea dei Soci:
            </strong>{' '}
            {ASSEMBLEA.giorno}, ore {ASSEMBLEA.secondaConvocazione} (seconda convocazione), presso
            la {ASSEMBLEA.luogo}.
          </p>
        </div>
        <Link
          href={ASSEMBLEA.href}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-cinema-ticket px-4 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover sm:self-auto"
        >
          Leggi la convocazione
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
