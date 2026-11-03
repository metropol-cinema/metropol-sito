import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Riga di dati del film (regia, durata, anno, generi…) separati da un punto
 * mediano, in Archivo maiuscolo. Le voci vuote spariscono senza lasciare
 * separatori orfani.
 *
 * Il punto sta PRIMA di ogni voce e la fila è spostata a sinistra di quanto
 * serve per nasconderlo: così anche quando la riga va a capo nessuna riga inizia
 * o finisce con un punto da solo, e non serve sapere dove cade l'a capo.
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
        'overflow-hidden font-utility text-xs uppercase tracking-wider text-cinema-text-muted',
        className
      )}
    >
      <span className="-ml-5 flex flex-wrap items-center gap-y-1.5">
        {bits.map((bit) => (
          <span key={bit} className="relative pl-5">
            <span aria-hidden="true" className="absolute left-2 text-cinema-ticket-dim">
              ·
            </span>
            {bit}
          </span>
        ))}
        {children && <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pl-5">{children}</span>}
      </span>
    </p>
  );
}
