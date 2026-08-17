'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

import { youtubeEmbedUrl } from '@/lib/youtube';

/**
 * Trailer con facciata: finché non si clicca, la pagina non contatta YouTube —
 * si vede solo un fotogramma e il pulsante di avvio. Al click monta l'iframe
 * su youtube-nocookie e parte.
 */
export function Trailer({
  youtubeId,
  title,
  posterUrl,
}: {
  youtubeId: string;
  title: string;
  posterUrl: string | null;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-cinema-border bg-black">
        <iframe
          src={youtubeEmbedUrl(youtubeId)}
          title={`Trailer di ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-cinema-border bg-cinema-surface-2 transition-colors hover:border-cinema-ticket/50"
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
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cinema-ticket text-cinema-bg shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
        </span>
        <span className="font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-text">
          Guarda il trailer<span className="sr-only"> di {title}</span>
        </span>
      </span>
    </button>
  );
}
