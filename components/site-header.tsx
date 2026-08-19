import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { visibleNavLinks } from '@/lib/nav';
import { SITE } from '@/lib/site';

/** Header sticky con nav. Su mobile il menu è un <details> CSS-only (niente JS). */
export async function SiteHeader() {
  const navLinks = await visibleNavLinks();

  return (
    <header className="sticky top-0 z-40 border-b border-cinema-border bg-cinema-bg/90 backdrop-blur-md">
      {/* Filo "marquee" dorato: richiamo all'insegna luminosa del cinema. */}
      <div className="h-0.5 w-full marquee-rule" aria-hidden="true" />
      <div className="container flex h-[4.5rem] items-center justify-between gap-4">
        {/* Il marchio dell'associazione, nella versione monocromatica bianca:
            sul nero della sala è quella giusta, e porta già il nome per esteso. */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/loghi/metropol-marchio-bianco.png"
            alt={`${SITE.association} — home`}
            width={631}
            height={196}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigazione principale" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
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
            {navLinks.map((link) => (
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
