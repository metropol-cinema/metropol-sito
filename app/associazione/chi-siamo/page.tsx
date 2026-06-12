import { ArrowLeft, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chi siamo',
  description:
    'I volontari e i ruoli associativi dell’Associazione Culturale Metropol di Villafranca di Verona.',
};

const ROLES = [
  {
    role: 'Presidente · Tesoriere',
    name: 'Andrea Perrotta',
    email: 'presidente@cinemametropol.com',
  },
  {
    role: 'Vicepresidente · Responsabile gestione volontari',
    name: 'Consuelo Congiu',
    email: 'consuelo.congiu@cinemametropol.com',
  },
  {
    role: 'Segretario · Gestione dei corsi',
    name: 'Marina Guerra',
    email: 'marina.guerra@cinemametropol.com',
  },
  {
    role: 'Responsabile della programmazione',
    name: 'Alessandra Isalberti',
    email: 'alessandra.isalberti@cinemametropol.com',
  },
  {
    role: 'Responsabile della programmazione',
    name: 'Elisa Fratton',
    email: 'elisa.fratton@cinemametropol.com',
  },
  {
    role: 'Responsabile Area Tecnica',
    name: 'Mauro Sorio',
    email: 'mauro.sorio@cinemametropol.com',
  },
  {
    role: 'Responsabile gestione volontari',
    name: 'Marzia Marangoni',
    email: 'marzia.marangoni@cinemametropol.com',
  },
  {
    role: 'Responsabile della comunicazione',
    name: 'Alessia Martari',
    email: 'alessia.martari@cinemametropol.com',
  },
  {
    role: 'Gestione della comunicazione',
    name: 'Vittoria Cordioli',
    email: 'vittoria.cordioli@cinemametropol.com',
  },
];

const PROBIVIRI = {
  role: 'Collegio dei Probiviri',
  names: 'Nicolò Sorio, Alessandro Branetti, Marco Munari',
  email: 'probiviri@cinemametropol.com',
};

export default function ChiSiamoPage() {
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
          Chi siamo
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Siamo un gruppo di volontari animati dalla passione per il cinema. Il nostro intento è
          creare un luogo ideale dove ognuno possa condividere la propria conoscenza
          cinematografica, partecipare attivamente alle iniziative o anche, più semplicemente,
          godersi un buon film.
        </p>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          L&apos;Associazione, senza scopo di lucro, è aperta a tutte le persone che vogliono
          dedicare parte del proprio tempo per trasmettere la loro passione agli altri.
        </p>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Al fine di sviluppare iniziative che promuovano il cinema come mezzo espressivo,
          l&apos;Associazione Metropol auspica e incoraggia la collaborazione con altre
          associazioni o enti, sia pubblici che privati.
        </p>
      </header>

      <section id="ruoli-associativi">
        <h2 className="text-xl font-bold tracking-tight text-cinema-text">Ruoli associativi</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {ROLES.map((person) => (
            <li
              key={person.email}
              className="rounded-xl border border-cinema-border bg-cinema-surface p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-cinema-text-subtle">
                {person.role}
              </p>
              <p className="mt-1.5 font-semibold text-cinema-text">{person.name}</p>
              <a
                href={`mailto:${person.email}`}
                className="mt-1.5 flex items-center gap-1.5 break-all text-sm text-cinema-accent hover:underline"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {person.email}
              </a>
            </li>
          ))}
          <li className="rounded-xl border border-cinema-border bg-cinema-surface p-4 sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-cinema-text-subtle">
              {PROBIVIRI.role}
            </p>
            <p className="mt-1.5 font-semibold text-cinema-text">{PROBIVIRI.names}</p>
            <a
              href={`mailto:${PROBIVIRI.email}`}
              className="mt-1.5 flex items-center gap-1.5 break-all text-sm text-cinema-accent hover:underline"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {PROBIVIRI.email}
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
