import { Facebook, Instagram, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { FOOTER_EXTRA_LINKS, NAV_LINKS, SITE } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-cinema-border bg-cinema-surface/40">
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-cinema-text">{SITE.association}</h2>
          <p className="mt-3 flex items-start gap-2 text-sm text-cinema-text-subtle">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cinema-accent" aria-hidden="true" />
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
            <a href={`mailto:${SITE.pec}`} className="hover:text-cinema-text-muted">
              {SITE.pec}
            </a>
          </p>
        </div>

        <nav aria-label="Mappa del sito">
          <h2 className="text-sm font-semibold text-cinema-text">Il cinema</h2>
          <ul className="mt-3 space-y-2">
            {[...NAV_LINKS, ...FOOTER_EXTRA_LINKS].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cinema-text-subtle hover:text-cinema-text-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-cinema-text">Seguici</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cinema-text-subtle hover:text-cinema-text-muted"
              >
                <Facebook className="h-4 w-4 text-cinema-accent" aria-hidden="true" /> Facebook<span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cinema-text-subtle hover:text-cinema-text-muted"
              >
                <Instagram className="h-4 w-4 text-cinema-accent" aria-hidden="true" /> Instagram<span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cinema-text-subtle hover:text-cinema-text-muted"
              >
                <MessageCircle className="h-4 w-4 text-cinema-accent" aria-hidden="true" /> Canale WhatsApp<span className="sr-only"> (si apre in una nuova scheda)</span>
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
