import { ArrowRight, Heart } from 'lucide-react';

import { SITE } from '@/lib/site';

/**
 * La fascia «Diventa socio» della home, sotto l'hero.
 *
 * Prima il bottone stava solo in `HeroClosed`, cioè quando non c'erano film in
 * calendario: appena arrivava la programmazione, dalla home spariva ogni modo
 * di associarsi — proprio nei mesi in cui si proietta e la gente passa dal
 * sito. Qui c'è sempre, a campagna aperta: chi la chiama decide anche quando
 * no (campagna chiusa, o `HeroClosed` che il bottone lo porta già).
 *
 * Sotto l'hero e non sopra come l'avviso dell'assemblea: quello scade fra
 * qualche giorno e va letto subito, questo resta tutta la stagione e non deve
 * spingere giù il cartellone.
 *
 * Il bottone porta dritto al modulo, come quello di `HeroClosed`: chi lo preme
 * ha già deciso. Le spiegazioni restano a un link di distanza.
 */
export function InvitoSoci() {
  return (
    <aside aria-labelledby="invito-soci" className="border-b border-cinema-border bg-cinema-surface">
      <div className="container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-start gap-3">
          <Heart className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
          <div className="text-sm leading-relaxed text-cinema-text-muted">
            <p>
              <strong id="invito-soci" className="font-semibold text-cinema-text">
                Diventa socio del Metropol:
              </strong>{' '}
              associarsi significa sostenere concretamente la vita del cinema. Ti iscrivi online in
              pochi minuti, e la tessera è digitale, da tenere nel telefono.
            </p>
            <p className="mt-1.5">
              Sei già socio?{' '}
              <a
                href={SITE.sociAreaUrl}
                className="text-cinema-ticket-ink underline underline-offset-2 hover:text-cinema-text"
              >
                Rinnova dalla tua area soci
              </a>
              .
            </p>
          </div>
        </div>
        <a
          href={SITE.sociSignupUrl}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover sm:self-auto"
        >
          Diventa socio
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
