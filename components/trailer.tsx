'use client';

import { Captions, Play } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

import { istantanea, istantaneaServer, personalizzate, sottoscrivi } from '@/lib/a11y';
import { youtubeEmbedUrl } from '@/lib/youtube';

/**
 * Trailer con facciata: finché non si clicca, la pagina non contatta YouTube —
 * si vede solo un fotogramma e il pulsante di avvio. Al click monta l'iframe
 * su youtube-nocookie e parte.
 *
 * ── IL TRAILER ACCESSIBILE ──────────────────────────────────────────────────
 *
 * Quando il gestionale dichiara che quel trailer si può seguire (sottotitoli
 * attivabili), compare un secondo avvio che accende i sottotitoli dal primo
 * fotogramma. Non è un altro video: è lo stesso, con la traccia già accesa —
 * i distributori italiani una seconda versione non la pubblicano.
 *
 * **Per chi ha impostato le preferenze di accessibilità quello diventa l'avvio
 * principale**, e l'altro il secondario. Chi ha già detto al sito come vuole
 * leggere non deve ripeterlo a ogni video; e chi non ha impostato niente vede
 * comunque che i sottotitoli ci sono, senza ritrovarseli addosso.
 */
export function Trailer({
  youtubeId,
  title,
  posterUrl,
  sottotitoli = false,
}: {
  youtubeId: string;
  title: string;
  posterUrl: string | null;
  /** Il gestionale dichiara che questo trailer ha i sottotitoli attivabili. */
  sottotitoli?: boolean;
}) {
  // `null` = non ancora avviato; poi: con o senza sottotitoli.
  const [avviato, setAvviato] = useState<'normale' | 'sottotitolato' | null>(null);

  const pref = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  // "Modalità accessibile" = il visitatore ha toccato la barra di accessibilità.
  const modalitaAccessibile = personalizzate(pref);
  const predefinito: 'normale' | 'sottotitolato' =
    sottotitoli && modalitaAccessibile ? 'sottotitolato' : 'normale';
  const alternativo = predefinito === 'normale' ? 'sottotitolato' : 'normale';

  if (avviato) {
    return (
      <div className="space-y-2">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-cinema-border bg-black">
          <iframe
            // La chiave rimonta l'iframe quando si cambia variante: i parametri
            // del player si leggono al caricamento, non dopo.
            key={avviato}
            src={youtubeEmbedUrl(youtubeId, { sottotitoli: avviato === 'sottotitolato' })}
            title={
              avviato === 'sottotitolato'
                ? `Trailer di ${title}, con i sottotitoli`
                : `Trailer di ${title}`
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        {sottotitoli && (
          <button
            type="button"
            onClick={() => setAvviato(avviato === 'sottotitolato' ? 'normale' : 'sottotitolato')}
            className="font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-subtle underline underline-offset-4 hover:text-cinema-text"
          >
            {avviato === 'sottotitolato' ? 'Riparti senza sottotitoli' : 'Riparti con i sottotitoli'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setAvviato(predefinito)}
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-cinema-border bg-cinema-surface-2 transition-colors hover:border-cinema-ticket-ink/50"
      >
        {posterUrl && (
          // Fotogramma di riferimento: decorativo, il testo del bottone dice tutto.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-55 transition-opacity duration-500 group-hover:opacity-70"
          />
        )}
        <span aria-hidden="true" className="absolute inset-0 vignette" />

        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cinema-ticket text-cinema-on-ticket shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
          </span>
          <span className="font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-text">
            {predefinito === 'sottotitolato' ? 'Guarda con i sottotitoli' : 'Guarda il trailer'}
            {/* La frase intera per chi ascolta: «con i sottotitoli di X» non
                vuol dire niente, «con i sottotitoli il trailer di X» sì. */}
            <span className="sr-only">
              {predefinito === 'sottotitolato' ? ' il trailer di ' : ' di '}
              {title}
            </span>
          </span>
        </span>
      </button>

      {sottotitoli && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className="inline-flex items-center gap-1.5 rounded border border-cinema-success/60 px-1.5 py-0.5 font-utility text-xs font-bold uppercase tracking-wide text-cinema-success"
            title="Questo trailer si può seguire con i sottotitoli"
          >
            <Captions className="h-3.5 w-3.5" aria-hidden="true" />
            <span aria-hidden="true">Trailer accessibile</span>
            <span className="sr-only">Questo trailer si può seguire con i sottotitoli.</span>
          </span>
          <button
            type="button"
            onClick={() => setAvviato(alternativo)}
            className="font-utility text-xs font-semibold uppercase tracking-wider text-cinema-ticket-ink underline underline-offset-4"
          >
            {alternativo === 'sottotitolato' ? 'Guarda con i sottotitoli' : 'Guarda senza sottotitoli'}
            <span className="sr-only"> il trailer di {title}</span>
          </button>
        </p>
      )}
    </div>
  );
}
