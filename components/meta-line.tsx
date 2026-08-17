import { Fragment, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Riga di dati del film (regia, durata, anno, generi…) separati da un punto
 * mediano, in Archivo maiuscolo. Le voci vuote spariscono senza lasciare
 * separatori orfani.
 */
export function MetaLine({
  items,
  children,
  className,
}: {
  items: Array<string | null | undefined | false>;
  /** Elementi in coda alla riga, es. il badge dell'età consigliata. */
  children?: ReactNode;
  className?: string;
}) {
  const bits = items.filter((x): x is string => Boolean(x));
  if (bits.length === 0 && !children) return null;

  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-utility text-xs uppercase tracking-wider text-cinema-text-muted',
        className
      )}
    >
      {bits.map((bit, i) => (
        <Fragment key={bit}>
          {i > 0 && (
            <span aria-hidden="true" className="text-cinema-ticket-dim">
              ·
            </span>
          )}
          <span>{bit}</span>
        </Fragment>
      ))}
      {children}
    </p>
  );
}
