import { ArrowLeft, HandHeart, Mail, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Diventa volontario',
  description:
    'Come diventare volontari dell’Associazione Culturale Metropol: cassa, sala, cabina di proiezione e organizzazione delle attività.',
};

const VOLUNTEER_CONTACTS = [
  { name: 'Marzia Marangoni', email: 'marzia.marangoni@cinemametropol.com' },
  { name: 'Consuelo Congiu', email: 'consuelo.congiu@cinemametropol.com' },
];

export default function DiventaVolontarioPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <nav aria-label="Torna alla pagina dell'associazione" className="mb-6">
        <Link
          href="/associazione"
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> L&apos;Associazione
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          Diventa volontario
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Qui all&apos;Associazione Culturale Metropol siamo tutti volontari, che prestano
          gratuitamente il loro tempo per ogni iniziativa. Il Metropol vive del tempo di chi se ne
          prende cura.
        </p>
      </header>

      <div className="space-y-10">
        <section id="cosa-puoi-fare">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <HandHeart className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Cosa puoi fare
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            C&apos;è spazio per tutte le disponibilità, anche poche ore al mese:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-cinema-text-muted">
            <li>la cassa e l&apos;accoglienza del pubblico;</li>
            <li>il servizio in sala durante le proiezioni;</li>
            <li>la cabina di proiezione;</li>
            <li>l&apos;organizzazione di corsi, eventi e attività dell&apos;associazione.</li>
          </ul>
        </section>

        <section id="come-fare">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Mail className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Vuoi essere dei
            nostri?
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Vieni a parlarne con noi in cinema prima di una proiezione, scrivici sui nostri{' '}
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-accent hover:underline"
            >
              canali social<span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>{' '}
            oppure contatta direttamente le responsabili della gestione volontari: ti
            racconteremo cosa facciamo e come puoi esserci d&apos;aiuto!
          </p>
          <ul className="mt-4 space-y-3">
            {VOLUNTEER_CONTACTS.map((contact) => (
              <li
                key={contact.email}
                className="rounded-xl border border-cinema-border bg-cinema-surface p-4"
              >
                <p className="font-semibold text-cinema-text">{contact.name}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 flex items-center gap-1.5 break-all text-sm text-cinema-accent hover:underline"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="tutele">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <ShieldCheck className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Le tutele
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Durante lo svolgimento della propria attività ogni volontario è coperto da una polizza
            assicurativa per responsabilità civile. Ruoli e doveri dei soci volontari sono
            descritti nel{' '}
            <Link href="/associazione/statuto" className="text-cinema-accent hover:underline">
              regolamento interno
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
