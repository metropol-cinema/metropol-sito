import { URL_SITO } from '@/lib/ambiente';

/**
 * La striscia in cima all'anteprima: chi ci arriva — un tester, un consigliere
 * a cui è stato mandato il link — deve capire subito che non è il sito
 * ufficiale, e che quel che fa qui non è finto.
 *
 * Iscrizioni alla newsletter e pagamenti dei corsi passano dal gestionale vero:
 * sono reali anche da qui. Disattivarli in anteprima vorrebbe dire non poterli
 * provare prima di pubblicarli, quindi restano accesi e lo si dice.
 *
 * Nel flusso della pagina, sopra la testata: non la copre e non la segue.
 * Oro dell'insegna su testo scuro, la coppia dei bottoni principali, già
 * verificata su tutti i temi.
 */
export function AvvisoAnteprima() {
  const sitoUfficiale = URL_SITO.replace(/^https?:\/\//, '');
  return (
    <div className="bg-cinema-ticket text-cinema-on-ticket">
      <p className="container py-2 text-center text-sm leading-snug">
        <strong className="font-semibold">Anteprima del sito</strong>, per le prove: non è il sito
        ufficiale. Iscrizioni e pagamenti fatti qui sono veri.{' '}
        <a href={URL_SITO} className="font-semibold underline underline-offset-2">
          Vai a {sitoUfficiale}
        </a>
      </p>
    </div>
  );
}
