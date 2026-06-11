import { Film, Menu } from 'lucide-react';
import Link from 'next/link';

import { NAV_LINKS, SITE } from '@/lib/site';

/** Header sticky con nav. Su mobile il menu è un <details> CSS-only (niente JS). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cinema-border bg-cinema-bg/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cinema-accent/15 text-cinema-accent">
            <Film className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-cinema-text">{SITE.name}</span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigazione principale" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cinema-text-muted transition-colors hover:bg-cinema-surface hover:text-cinema-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Nav mobile */}
        <details className="relative md:hidden">
          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-cinema-text-muted hover:bg-cinema-surface [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Apri il menu di navigazione</span>
          </summary>
          <nav
            aria-label="Navigazione principale"
            className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-cinema-border bg-cinema-surface p-2 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-cinema-text-muted hover:bg-cinema-surface-2 hover:text-cinema-text"
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
