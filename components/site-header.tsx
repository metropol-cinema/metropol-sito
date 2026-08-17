import { Menu } from 'lucide-react';
import Link from 'next/link';

import { NAV_LINKS, SITE } from '@/lib/site';

/** Header sticky con nav. Su mobile il menu è un <details> CSS-only (niente JS). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cinema-border bg-cinema-bg/90 backdrop-blur-md">
      {/* Filo "marquee" dorato: richiamo all'insegna luminosa del cinema. */}
      <div className="h-0.5 w-full marquee-rule" aria-hidden="true" />
      <div className="container flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          {/* La targa dell'insegna: una M d'oro, come sopra la biglietteria. */}
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-md bg-cinema-ticket font-display text-2xl font-black leading-none text-cinema-bg shadow-lg shadow-cinema-ticket/20"
          >
            M
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-black tracking-tight text-cinema-text">
              {SITE.name}
            </span>
            <span className="mt-1 hidden font-utility text-[0.6rem] font-semibold uppercase tracking-marquee text-cinema-text-subtle sm:block">
              {SITE.city}
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigazione principale" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border-b-2 border-transparent px-3 py-2 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Nav mobile */}
        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md text-cinema-text-muted hover:bg-cinema-surface [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Apri il menu di navigazione</span>
          </summary>
          <nav
            aria-label="Navigazione principale"
            className="absolute right-0 top-12 z-50 w-60 rounded-xl border border-cinema-border bg-cinema-surface p-2 shadow-2xl shadow-black/60"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted hover:bg-cinema-surface-2 hover:text-cinema-ticket"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
