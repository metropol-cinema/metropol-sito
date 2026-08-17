import { Facebook, Instagram, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ASSOCIATION_LINKS, NAV_LINKS, SITE } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-cinema-border bg-cinema-surface/30">
      <div className="h-px w-full marquee-rule" aria-hidden="true" />
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* Il marchio porta già "Associazione Culturale Metropol": è
              l'intestazione di questa colonna, non un logo in più. */}
          <h2>
            <Image
              src="/loghi/metropol-marchio-bianco.png"
              alt={SITE.association}
              width={631}
              height={196}
              className="h-10 w-auto opacity-90"
            />
          </h2>
          <p className="mt-3 flex items-start gap-2 text-sm text-cinema-text-subtle">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cinema-ticket" aria-hidden="true" />
            <span>
              {SITE.venueName}
              <br />
              {SITE.venueAddress}
            </span>
          </p>
          <p className="mt-3 text-xs text-cinema-text-subtle">
            Sede legale: {SITE.legalAddress}
            <br />
            P. IVA {SITE.vatNumber} · PEC{' '}
            <a href={`mailto:${SITE.pec}`} className="transition-colors hover:text-cinema-ticket">
              {SITE.pec}
            </a>
          </p>
        </div>

        <nav aria-label="Mappa del sito">
          <h2 className="font-utility text-[0.68rem] font-semibold uppercase tracking-marquee text-cinema-ticket">Il cinema</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cinema-text-subtle transition-colors hover:text-cinema-ticket"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sezioni dell'associazione">
          <h2 className="font-utility text-[0.68rem] font-semibold uppercase tracking-marquee text-cinema-ticket">L&apos;associazione</h2>
          <ul className="mt-4 space-y-2.5">
            {ASSOCIATION_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cinema-text-subtle transition-colors hover:text-cinema-ticket"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-utility text-[0.68rem] font-semibold uppercase tracking-marquee text-cinema-ticket">Seguici</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-ticket"
              >
                <Facebook className="h-4 w-4 text-cinema-ticket" aria-hidden="true" /> Facebook<span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-ticket"
              >
                <Instagram className="h-4 w-4 text-cinema-ticket" aria-hidden="true" /> Instagram<span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-ticket"
              >
                <MessageCircle className="h-4 w-4 text-cinema-ticket" aria-hidden="true" /> Canale WhatsApp<span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cinema-border py-5 text-center text-xs text-cinema-text-subtle">
        © {new Date().getFullYear()} {SITE.association} · {SITE.city}
      </div>
    </footer>
  );
}
