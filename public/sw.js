/*
 * Il service worker dell'app del sito: riceve l'avviso «nuovi film» e, al
 * tocco, apre la pagina giusta.
 *
 * FA SOLO QUESTO. Niente cache, niente lavoro offline, nessun gestore `fetch`:
 * un service worker che intercetta le richieste può servire per settimane una
 * versione vecchia del sito, e qui la programmazione cambia ogni giorno. Senza
 * `fetch` il sito si carica esattamente come senza service worker.
 *
 * Il messaggio lo prepara il gestionale (lib/push/testo.ts):
 *   { title, body, url, tag }
 */

self.addEventListener('install', () => {
  // Una versione nuova di questo file prende il posto della vecchia subito,
  // invece di aspettare che tutte le schede siano chiuse.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let dati = {};
  try {
    dati = event.data ? event.data.json() : {};
  } catch {
    dati = { body: event.data ? event.data.text() : '' };
  }

  const titolo = dati.title || 'Cinema Metropol';
  event.waitUntil(
    self.registration.showNotification(titolo, {
      body: dati.body || '',
      icon: '/favicon_io/android-chrome-192x192.png',
      tag: dati.tag || 'nuovi-film',
      // Con lo stesso tag la notifica nuova sostituisce la vecchia: si fa
      // comunque sentire, invece di aggiornarsi in silenzio.
      renotify: true,
      data: { url: dati.url || '/programmazione' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Solo percorsi di questo sito: un indirizzo assoluto nel messaggio non deve
  // poter portare altrove.
  const destinazione = new URL(event.notification.data?.url || '/', self.location.origin);
  if (destinazione.origin !== self.location.origin) destinazione.href = self.location.origin + '/';

  event.waitUntil(
    (async () => {
      const finestre = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      // Se l'app è già aperta si riusa quella finestra, invece di aprirne una
      // seconda sopra.
      for (const finestra of finestre) {
        if (new URL(finestra.url).origin === self.location.origin && 'focus' in finestra) {
          await finestra.focus();
          if ('navigate' in finestra) await finestra.navigate(destinazione.href);
          return;
        }
      }
      await self.clients.openWindow(destinazione.href);
    })(),
  );
});
