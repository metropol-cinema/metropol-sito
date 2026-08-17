import { MapPin } from 'lucide-react';
import Link from 'next/link';

import { SITE } from '@/lib/site';

/**
 * Ultima riserva dell'hero: né film in settimana, né film in arrivo, né video
 * caricati dalla dashboard. Invece di un buco, si dice cosa c'è da sapere e
 * dove seguirci — una schermata vuota è comunque un invito a fare qualcosa.
 */
export function HeroClosed() {
  return (
    <section
      aria-label="La sala in questo momento"
      className="grain relative isolate overflow-hidden border-b border-cinema-border"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(244,183,64,0.12),transparent_70%)]"
      />
      <div className="container py-16 sm:py-24">
        <p className="eyebrow">{SITE.venueName}</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black leading-[0.98] text-cinema-text sm:text-6xl">
          Il proiettore riposa,<br />
          l&apos;associazione no
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-cinema-text-muted sm:text-lg">
          Nessuna proiezione in calendario in questo momento. Il nuovo programma
          esce qui appena è pronto: nel frattempo puoi tesserarti, darci una mano
          come volontario o seguirci sui social.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/associazione/come-associarsi"
            className="rounded-lg bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-bg transition-colors hover:bg-cinema-ticket-hover"
          >
            Diventa socio
          </Link>
          <Link
            href="/info"
            className="inline-flex items-center gap-2 rounded-lg border border-cinema-border-strong px-5 py-2.5 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Dove siamo
          </Link>
        </div>
      </div>
    </section>
  );
}
