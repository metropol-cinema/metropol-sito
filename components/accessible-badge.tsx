import { PersonStanding } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * "Proiezione accessibile": il film si può seguire con i dispositivi per
 * persone con disabilità (audiodescrizione, sottotitoli). Lo decide il
 * gestionale film per film — qui non si deduce niente da altri campi.
 *
 * Il simbolo è la figura umana a braccia aperte, non la carrozzina: qui non si
 * sta parlando di come si entra in sala — quella è la carrozzina, e resta sulle
 * pagine della sala — ma di sottotitoli e audiodescrizione, che servono a chi
 * non sente e a chi non vede. Metterci una carrozzina manderebbe fuori strada
 * proprio le persone a cui il bollino parla.
 *
 * Il simbolo da solo non basta: accanto c'è sempre la parola, perché è quella
 * che si cerca scorrendo il cartellone, e la frase intera resta per chi legge
 * con uno screen reader. Nelle liste fitte la parola può sparire
 * (`showLabel={false}`), ma il testo per lo screen reader no.
 */
export function AccessibleBadge({
  showLabel = true,
  className,
}: {
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border border-cinema-success/60 px-1.5 py-0.5 font-utility text-xs font-bold uppercase tracking-wide text-cinema-success',
        className
      )}
      title="Proiezione accessibile: il film si può seguire con i dispositivi per persone con disabilità"
    >
      <PersonStanding className="h-3.5 w-3.5" aria-hidden="true" />
      {showLabel && <span aria-hidden="true">Accessibile</span>}
      <span className="sr-only">
        Proiezione accessibile: il film si può seguire con i dispositivi per persone con
        disabilità.
      </span>
    </span>
  );
}
