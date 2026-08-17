import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Testata di pagina: occhiello d'oro, titolo da manifesto, testo d'apertura.
 * Un solo posto per la gerarchia tipografica delle pagine interne, così non
 * ricomincia da capo ogni volta.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('mb-10', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black leading-[0.95] text-cinema-text sm:text-6xl">
        {title}
      </h1>
      {lead && (
        <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-cinema-text-muted">
          {lead}
        </div>
      )}
    </header>
  );
}

/**
 * Riquadro per quando non c'è niente da mostrare. Non si limita a constatare
 * il vuoto: dice cosa fare adesso.
 */
export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-cinema-border bg-cinema-surface/40 p-10 text-center leading-relaxed text-cinema-text-subtle">
      {children}
    </div>
  );
}

/** Riquadro d'errore del caricamento programmazione, uguale in tutte le pagine. */
export function LoadError({ error }: { error: string }) {
  return (
    <div className="rounded-2xl border border-cinema-danger/40 bg-cinema-danger/10 p-6 text-sm text-cinema-text-muted">
      Impossibile caricare la programmazione.{' '}
      <span className="text-cinema-text-subtle">({error})</span>
    </div>
  );
}
