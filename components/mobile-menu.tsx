'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Il menu di navigazione su schermo stretto.
 *
 * Resta un `<details>`: è una tendina già dal browser — si apre col tasto, il
 * lettore di schermo la annuncia aperta o chiusa, e funziona anche se il
 * JavaScript non arriva mai. Qui sopra ci mettiamo solo le tre cose che il
 * `<details>` da solo non fa e che a tastiera si sentono subito:
 * chiudersi con Esc (restituendo il focus al bottone), chiudersi quando si
 * clicca fuori, e chiudersi quando si è scelta una voce e la pagina cambia.
 */
const VOCE =
  'flex min-h-11 items-center rounded-lg px-3 font-utility text-sm font-semibold uppercase tracking-wider hover:bg-cinema-surface-2 hover:text-cinema-ticket-ink';

export function MobileMenu({
  links,
  sociAreaUrl,
}: {
  links: readonly { href: string; label: string }[];
  sociAreaUrl: string;
}) {
  const tendina = useRef<HTMLDetailsElement>(null);
  const percorso = usePathname();

  // Cambiata pagina, la tendina non ha più motivo di stare aperta.
  useEffect(() => {
    if (tendina.current) tendina.current.open = false;
  }, [percorso]);

  useEffect(() => {
    const nodo = tendina.current;
    if (!nodo) return;

    const suTasto = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !nodo.open) return;
      nodo.open = false;
      // Senza questo il focus resterebbe nel vuoto lasciato dalla tendina.
      nodo.querySelector('summary')?.focus();
    };
    const suClick = (e: MouseEvent) => {
      if (nodo.open && !nodo.contains(e.target as Node)) nodo.open = false;
    };

    document.addEventListener('keydown', suTasto);
    document.addEventListener('mousedown', suClick);
    return () => {
      document.removeEventListener('keydown', suTasto);
      document.removeEventListener('mousedown', suClick);
    };
  }, []);

  return (
    <details ref={tendina} className="relative md:hidden">
      <summary
        aria-label="Menu di navigazione"
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md text-cinema-text-muted hover:bg-cinema-surface [&::-webkit-details-marker]:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </summary>
      <nav
        aria-label="Navigazione principale"
        className="absolute right-0 top-12 z-50 w-60 rounded-xl border border-cinema-border bg-cinema-surface p-2 shadow-2xl shadow-black/60"
      >
        {links.map((link) => {
          const current = percorso === link.href || percorso.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current ? 'page' : undefined}
              className={`${VOCE} ${current ? 'text-cinema-ticket-ink' : 'text-cinema-text-muted'}`}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href={sociAreaUrl}
          className={`${VOCE} mt-1 border-t border-cinema-border text-cinema-text-muted`}
        >
          Area soci
        </a>
      </nav>
    </details>
  );
}
