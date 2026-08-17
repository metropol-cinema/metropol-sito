'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { TmdbImage } from '@/lib/tmdb';

/**
 * Fotogallery del film: una striscia di fotogrammi che scorre (trascinabile su
 * mobile), e il singolo scatto a schermo intero in un `<dialog>` nativo — che
 * porta in dote focus trap e chiusura con Esc senza scriverli a mano.
 */
export function Gallery({ images, title }: { images: TmdbImage[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [scrollable, setScrollable] = useState({ prev: false, next: false });

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () =>
      setScrollable({ prev: emblaApi.canScrollPrev(), next: emblaApi.canScrollNext() });
    sync();
    emblaApi.on('select', sync).on('reInit', sync).on('scroll', sync);
    return () => {
      emblaApi.off('select', sync).off('reInit', sync).off('scroll', sync);
    };
  }, [emblaApi]);

  const open = useCallback((index: number) => {
    setOpenAt(index);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => setOpenAt((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length]
  );

  // Frecce per sfogliare: dentro il dialog il focus è già confinato, quindi
  // l'ascoltatore non ruba i tasti al resto della pagina.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      }
    };
    dialog.addEventListener('keydown', onKey);
    return () => dialog.removeEventListener('keydown', onKey);
  }, [step]);

  const current = openAt !== null ? images[openAt] : null;

  return (
    <>
      {/* Scorrimento: trascinando, o con questi due comandi (che servono anche
          a chi naviga da tastiera, visto che Embla sposta le slide con una
          trasformazione e non con lo scroll nativo). */}
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!scrollable.prev}
          aria-label="Scorri le foto indietro"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-cinema-border-strong text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket disabled:opacity-30 disabled:hover:border-cinema-border-strong disabled:hover:text-cinema-text-muted"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!scrollable.next}
          aria-label="Scorri le foto avanti"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-cinema-border-strong text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket disabled:opacity-30 disabled:hover:border-cinema-border-strong disabled:hover:text-cinema-text-muted"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-3">
          {images.map((image, i) => (
            <li key={image.url} className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_42%] lg:flex-[0_0_30%]">
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Apri la foto ${i + 1} di ${images.length} di ${title}`}
                className="relative block aspect-video w-full overflow-hidden rounded-xl border border-cinema-border bg-cinema-surface-2 transition-colors hover:border-cinema-ticket/60"
              >
                <Image
                  src={image.thumbUrl}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 30vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenAt(null)}
        aria-label={`Foto di ${title}`}
        className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-cinema-bg-deep/95 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-[100dvh] w-[100vw] flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p
                aria-live="polite"
                className="font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-text-muted"
              >
                {openAt !== null ? openAt + 1 : 0} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Chiudi la foto"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cinema-border-strong text-cinema-text transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <Image
                key={current.url}
                src={current.url}
                alt={`Fotogramma ${openAt !== null ? openAt + 1 : 1} del film ${title}`}
                fill
                sizes="100vw"
                className="animate-reel-in object-contain"
              />
            </div>

            <div className="flex items-center justify-center gap-3 px-4 py-5">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto precedente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cinema-border-strong text-cinema-text transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Foto successiva"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cinema-border-strong text-cinema-text transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
