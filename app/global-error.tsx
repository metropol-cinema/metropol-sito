'use client';

/**
 * L'ultima rete: si vede solo se va storto il layout stesso, quindi qui non
 * c'è nulla dell'impalcatura del sito — né testata, né temi, né i caratteri
 * caricati da next/font. Va reso il documento per intero, e i colori vanno
 * scritti a mano: le variabili del tema stanno in un CSS che a questo punto
 * potrebbe non esserci.
 *
 * Prima rispondeva la pagina di serie di Next, in inglese e senza `lang`:
 * un lettore di schermo italiano la leggeva con la pronuncia sbagliata.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0B0D',
          color: '#F5F2EC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.6,
        }}
      >
        <main style={{ maxWidth: '32rem', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 1rem' }}>
            Qualcosa si è inceppato
          </h1>
          <p style={{ margin: '0 0 1.75rem', color: '#C8C3BA' }}>
            Il sito non è riuscito a caricare questa pagina. Riprova: quasi sempre basta.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              font: 'inherit',
              fontWeight: 700,
              cursor: 'pointer',
              border: 0,
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: '#F4B740',
              color: '#0B0B0D',
            }}
          >
            Riprova
          </button>
          <p style={{ margin: '1.75rem 0 0', fontSize: '0.875rem' }}>
            {/* Volutamente un <a>, non <Link>: qui l'applicazione è rotta, e
                serve un caricamento vero della pagina, non una navigazione
                dentro lo stesso stato guasto. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ color: '#F4B740' }}>
              Torna alla home
            </a>
          </p>
          {/* Il codice che Next assegna all'errore lato server: lo stesso che
              compare nei registri di Vercel. È l'unico ponte fra "ho visto una
              pagina rotta" e "ecco cosa è successo" — senza, di un guasto
              capitato una volta sola non resta niente da cercare. Gli errori
              nati nel browser non ce l'hanno, e allora la riga non compare. */}
          {error.digest && (
            <p style={{ margin: '2rem 0 0', fontSize: '0.75rem', color: '#8F8A81', lineHeight: 1.5 }}>
              Codice del guasto:{' '}
              <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {error.digest}
              </code>
              <br />
              Serve a noi per ritrovarlo nei registri.
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
