/**
 * Slide media dello slideshow in home: video (autoplay muto in loop) o
 * immagine a tutta larghezza, con didascalia opzionale sovrimpressa.
 */
export function MediaSlide({
  kind,
  src,
  caption,
}: {
  kind: 'video' | 'image';
  src: string;
  caption: string | null;
}) {
  return (
    <div className="relative h-[360px] overflow-hidden border-b border-cinema-border sm:h-[480px]">
      {kind === 'video' ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          // Decorativo: l'eventuale messaggio sta nella caption testuale.
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Host arbitrario configurato dalla dashboard: <img> semplice.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption ?? ''}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16 sm:p-8">
          <p className="container text-xl font-bold text-white sm:text-3xl">{caption}</p>
        </div>
      )}
    </div>
  );
}
