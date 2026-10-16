/**
 * Il contatore d'uso dell'app: «questo telefono ha aperto l'app oggi».
 *
 * Parte SOLO quando il sito è aperto dall'icona sulla schermata Home, e al più
 * una volta al giorno. Il gestionale ne ricava quanti usano l'app (Sito Web →
 * App), cosa che Google Analytics non sa dire: vede solo chi ha accettato i
 * cookie, e su iPhone l'installazione non la vede affatto.
 *
 * Il telefono si dà da solo un codice casuale e lo tiene nell'archivio locale.
 * È l'unica cosa che parte: niente pagine visitate, niente dati della persona.
 * Statistica di prima parte, aggregata e senza incroci — vedi /privacy.
 */

import { inApp } from '@/lib/avvisi-push';

const API = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ?? 'https://app.cinemametropol.it';
const CHIAVE_CODICE = 'metropol:app-codice';
const CHIAVE_GIORNO = 'metropol:app-ultimo-giorno';

/** iPhone e iPad (l'iPad recente si presenta come un Mac: lo tradisce il touch). */
function piattaforma(): 'ios' | 'android' | 'altro' {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  return /Android/.test(ua) ? 'android' : 'altro';
}

/** Il giorno a Villafranca, lo stesso con cui conta il gestionale. */
function oggi(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date());
}

let fatto = false;

export async function segnaAperturaApp(): Promise<void> {
  if (fatto || typeof window === 'undefined' || !inApp()) return;
  fatto = true;

  let codice: string | null;
  try {
    if (localStorage.getItem(CHIAVE_GIORNO) === oggi()) return;
    codice = localStorage.getItem(CHIAVE_CODICE);
    if (!codice) {
      codice = crypto.randomUUID();
      localStorage.setItem(CHIAVE_CODICE, codice);
    }
  } catch {
    // Archivio bloccato: senza un codice che resti, ogni apertura sembrerebbe
    // un telefono nuovo. Meglio non contare che contare male.
    return;
  }

  try {
    const res = await fetch(`${API}/api/public/app-uso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: codice, piattaforma: piattaforma() }),
      keepalive: true,
    });
    // Il giorno si segna solo se il gestionale l'ha preso: altrimenti si
    // riprova alla prossima apertura.
    if (res.ok) localStorage.setItem(CHIAVE_GIORNO, oggi());
  } catch {
    // Offline o gestionale giù: si riprova alla prossima apertura.
  }
}
