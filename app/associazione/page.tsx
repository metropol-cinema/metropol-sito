import { HandHeart, Heart, ScrollText, Users } from 'lucide-react';
import type { Metadata } from 'next';

import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'L’Associazione',
  description:
    'L’Associazione Culturale Metropol: la storia del cinema di Villafranca di Verona, come associarsi e come diventare volontario.',
};

export default function AssociazionePage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          L&apos;Associazione
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          Il Cinema Metropol è gestito dall&apos;{SITE.association}, una realtà di volontariato che
          tiene viva la sala cinematografica di {SITE.city}: uno spazio di comunità dove il cinema
          si guarda insieme, sul grande schermo.
        </p>
      </header>

      <div className="space-y-10">
        <section id="chi-siamo">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Users className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Chi siamo
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Siamo un gruppo di volontarie e volontari uniti dalla passione per il cinema. Gestiamo
            la {SITE.venueName} in {SITE.venueAddress.split(',')[0]}, nel cuore di Villafranca:
            dalla cassa alla proiezione, dall&apos;accoglienza in sala alla scelta dei film, tutto
            è curato da persone che dedicano il proprio tempo libero a questo progetto.
          </p>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            La stagione cinematografica va indicativamente da ottobre a maggio, con proiezioni nel
            fine settimana e la rassegna d&apos;autore del venerdì. In estate il cinema si sposta
            all&apos;aperto, con la rassegna di agosto al Castello di Villafranca. Durante
            l&apos;anno organizziamo anche corsi di cinema ed eventi speciali.
          </p>
        </section>

        <section id="tesseramento">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <Heart className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Diventare soci
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Associarsi significa sostenere concretamente la vita del cinema e partecipare alle
            attività culturali dell&apos;associazione. I soci hanno diritto al biglietto ridotto
            su tutte le proiezioni. Puoi richiedere la tessera direttamente in cassa, prima di
            ogni proiezione.
          </p>
        </section>

        <section id="volontariato">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <HandHeart className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Diventare volontari
          </h2>
          <p className="mt-3 leading-relaxed text-cinema-text-muted">
            Il Metropol vive del tempo di chi se ne prende cura. Se vuoi dare una mano — in cassa,
            in sala, in cabina di proiezione o nell&apos;organizzazione delle attività — vieni a
            parlarne con noi in cinema, oppure scrivici sui nostri canali social: c&apos;è spazio
            per tutte le disponibilità, anche poche ore al mese.
          </p>
        </section>

        <section id="statuto">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-cinema-text">
            <ScrollText className="h-5 w-5 text-cinema-accent" aria-hidden="true" /> Dati dell&apos;associazione
          </h2>
          <dl className="mt-3 space-y-1.5 text-sm leading-relaxed text-cinema-text-muted">
            <div>
              <dt className="inline font-medium text-cinema-text">Denominazione: </dt>
              <dd className="inline">{SITE.association}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-cinema-text">Sede legale: </dt>
              <dd className="inline">{SITE.legalAddress}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-cinema-text">Partita IVA: </dt>
              <dd className="inline">{SITE.vatNumber}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-cinema-text">PEC: </dt>
              <dd className="inline">
                <a href={`mailto:${SITE.pec}`} className="text-cinema-accent hover:underline">
                  {SITE.pec}
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
