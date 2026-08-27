import Image from 'next/image';
import Link from 'next/link';

import { MobileMenu } from '@/components/mobile-menu';
import { visibleNavLinks } from '@/lib/nav';
import { SITE } from '@/lib/site';

/** Header sticky con nav. Su schermo stretto il menu sta in <MobileMenu>. */
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
            className="marchio h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigazione principale" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border-b-2 border-transparent px-3 py-2 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Nav mobile: tendina nativa con Esc, click fuori e chiusura al
            cambio pagina (components/mobile-menu.tsx). */}
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}
