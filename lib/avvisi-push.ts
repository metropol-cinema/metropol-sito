/**
 * L'avviso «nuovi film» lato browser: iscrivere e disiscrivere questo
 * telefono, e sapere se lo è.
 *
 * Funziona solo nell'APP, cioè nel sito aperto dalla schermata Home: è così
 * che si è deciso (ottobre 2026), ed è anche l'unico modo su iPhone, dove
 * Safari le notifiche le dà solo ai siti installati. Il gestionale manda un
 * avviso per newsletter con dei film dentro (metropol-cinema, lib/push).
 *
 * L'iscrizione vera sta in due posti: nel browser (`PushManager`) e nel
 * gestionale (`/api/public/push`). A ogni apertura dell'app `allinea()`
 * rimanda quella del browser, così se il gestionale l'ha persa — o il browser
 * l'ha cambiata — si rimettono d'accordo da soli.
 */

const API = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ?? 'https://app.cinemametropol.it';
const ENDPOINT = `${API}/api/public/push`;

export type StatoAvviso =
  /** Non è l'app installata, o il browser non ha le notifiche. */
  | 'non-disponibile'
  /** Permesso negato dalle impostazioni del telefono: da qui non si riapre. */
  | 'bloccato'
  | 'spento'
  | 'acceso';

/** Aperta dalla schermata Home, o installata da Chrome. */
export function inApp(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function supportato(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

let registrazione: Promise<ServiceWorkerRegistration> | null = null;

function serviceWorker(): Promise<ServiceWorkerRegistration> {
  registrazione ??= navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then(() => navigator.serviceWorker.ready);
  return registrazione;
}

export async function statoAttuale(): Promise<StatoAvviso> {
  if (!supportato() || !inApp()) return 'non-disponibile';
  if (Notification.permission === 'denied') return 'bloccato';
  const reg = await serviceWorker();
  const iscrizione = await reg.pushManager.getSubscription();
  return iscrizione && Notification.permission === 'granted' ? 'acceso' : 'spento';
}

async function chiavePubblica(): Promise<Uint8Array<ArrayBuffer>> {
  const res = await fetch(ENDPOINT);
  const dati = (await res.json()) as { ok?: boolean; publicKey?: string };
  if (!res.ok || !dati.publicKey) throw new Error('chiave non disponibile');
  // base64url → byte, come la vuole `subscribe`.
  const b64 = dati.publicKey.replace(/-/g, '+').replace(/_/g, '/');
  const binario = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
  const byte = new Uint8Array(new ArrayBuffer(binario.length));
  for (let i = 0; i < binario.length; i++) byte[i] = binario.charCodeAt(i);
  return byte;
}

async function mandaAlGestionale(iscrizione: PushSubscription): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription: iscrizione.toJSON() }),
  });
  if (!res.ok) throw new Error(`iscrizione rifiutata (${res.status})`);
}

/**
 * Accende. Va chiamata da un tocco dell'utente: su iPhone la richiesta di
 * permesso fuori da un tocco viene ignorata.
 */
export async function attiva(): Promise<StatoAvviso> {
  const permesso = await Notification.requestPermission();
  if (permesso === 'denied') return 'bloccato';
  if (permesso !== 'granted') return 'spento';

  const reg = await serviceWorker();
  let iscrizione = await reg.pushManager.getSubscription();
  if (!iscrizione) {
    iscrizione = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: await chiavePubblica(),
    });
  }
  await mandaAlGestionale(iscrizione);
  return 'acceso';
}

export async function disattiva(): Promise<StatoAvviso> {
  const reg = await serviceWorker();
  const iscrizione = await reg.pushManager.getSubscription();
  if (iscrizione) {
    // Prima il gestionale, poi il browser: al contrario, se la seconda
    // chiamata fallisse, resterebbe un'iscrizione che nessuno sa più togliere.
    await fetch(ENDPOINT, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: iscrizione.endpoint }),
    }).catch(() => {});
    await iscrizione.unsubscribe();
  }
  return 'spento';
}

let allineato = false;

/** Una volta per apertura: ricorda al gestionale che questo telefono c'è. */
export async function allinea(): Promise<void> {
  if (allineato || !supportato() || !inApp()) return;
  allineato = true;
  if (Notification.permission !== 'granted') return;
  try {
    const reg = await serviceWorker();
    const iscrizione = await reg.pushManager.getSubscription();
    if (iscrizione) await mandaAlGestionale(iscrizione);
  } catch {
    // Niente da dire a nessuno: ci si riprova alla prossima apertura.
  }
}
