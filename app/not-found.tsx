import { Clapperboard } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/page-header';
import { visibleNavLinks } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Pagina non trovata',
};

/**
 * 404. Prima qui rispondeva la pagina di serie di Next: in inglese, senza
 * <main> e senza un modo per ripartire. Un errore è il momento in cui uno ha
 * più bisogno di essere preso per mano, non meno.
 */
export default async function NotFound() {
  // Le stesse voci della testata, non l'elenco completo: se "Prossimamente"
  // è nascosto perché non c'è nessun film marcato, non ha senso proporlo qui.
  const links = await visibleNavLinks();

  return (
    <main className="container max-w-3xl py-16 sm:py-24">
      <PageHeader
        eyebrow="Errore 404"
        title="Questa pagina non c’è"
        lead={
          <p>
            Forse il link è vecchio, o l&apos;abbiamo spostata. Nessun problema: da qui si
            riparte.
          </p>
        }
      />

      <nav aria-label="Da dove ripartire">
        <ul className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-3 rounded-xl border border-cinema-border bg-cinema-surface px-4 py-3.5 text-sm font-semibold text-cinema-text-muted transition-colors hover:border-cinema-ticket-ink/50 hover:text-cinema-ticket-ink"
              >
                <Clapperboard className="h-4 w-4 shrink-0" aria-hidden="true" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
