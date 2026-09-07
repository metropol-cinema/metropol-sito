'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useSyncExternalStore } from 'react';

import {
  ID_MISURAZIONE,
  istantanea,
  istantaneaServer,
  sottoscrivi,
  statisticheConfigurate,
} from '@/lib/consenso';

/**
 * Google Analytics, e solo dopo un sì.
 *
 * Non è il "consent mode" di Google, dove lo script parte comunque e si limita
 * a non scrivere cookie: qui, finché non c'è consenso, il browser di chi legge
 * non manda proprio nessuna richiesta a Google. È la scelta più semplice da
 * spiegare in un'informativa, ed è l'unica che si può verificare guardando la
 * scheda Rete degli strumenti per sviluppatori.
 *
 * L'ordine dei comandi conta: `js` e `config` devono stare in coda PRIMA del
 * primo `page_view`, altrimenti la visita arriva senza proprietà a cui
 * attaccarsi. Per questo la configurazione non sta in uno <Script> inline (che
 * React inserisce quando gli pare, dopo l'idratazione) ma in un effetto: gli
 * effetti di un componente girano in ordine, quindi la coda si riempie giusta a
 * prescindere da quando gtag.js finisce di scaricarsi.
 */

type ComandoGtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: ComandoGtag;
  }
}

function codaGtag(): ComandoGtag {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // La funzione DEVE spingere `arguments` così com'è: gtag.js si aspetta
    // oggetti-argomenti, non array. Con una rest e uno spread i comandi
    // arrivano deformati e vengono ignorati in silenzio.
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    } as ComandoGtag;
  }
  return window.gtag;
}

export function Analytics() {
  const scelta = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  const pathname = usePathname();
  const configurato = useRef(false);

  const attivo = statisticheConfigurate && scelta === 'accettato';

  // 1. Apertura: identità della proprietà e regole della casa.
  useEffect(() => {
    if (!attivo || configurato.current) return;
    configurato.current = true;
    const gtag = codaGtag();
    gtag('js', new Date());
    gtag('config', ID_MISURAZIONE, {
      // Le visite le mandiamo noi, qui sotto: lasciandolo fare a gtag, la
      // prima pagina verrebbe contata due volte.
      send_page_view: false,
      // Niente incroci con il profilo pubblicitario di chi naviga: al cinema
      // interessa quante persone leggono la programmazione, non chi sono.
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }, [attivo]);

  // 2. Ogni pagina, compresa la prima e quelle raggiunte senza ricaricare.
  useEffect(() => {
    if (!attivo) return;
    // Un giro di attesa prima di mandarla: cambiando pagina senza ricaricare,
    // il <title> nuovo lo scrive Next subito DOPO questo effetto, e la visita
    // partirebbe con il titolo della pagina precedente (o vuoto).
    const attesa = window.setTimeout(() => {
      codaGtag()('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
    return () => window.clearTimeout(attesa);
  }, [attivo, pathname]);

  if (!attivo) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${ID_MISURAZIONE}`}
      strategy="afterInteractive"
    />
  );
}
