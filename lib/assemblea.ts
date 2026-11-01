/**
 * La convocazione dell'assemblea dei soci di novembre 2026: i dati in un posto
 * solo, perché li usano la pagina della convocazione e l'avviso in home.
 *
 * Il testo per esteso sta nella pagina (app/associazione/assemblea-2026): è
 * quello firmato dal Presidente, va riportato così com'è e non riscritto.
 */

export const ASSEMBLEA = {
  href: '/associazione/assemblea-2026',
  /** Il modulo da stampare, generato dal testo della delega del documento. */
  delegaPdf: '/docs/delega-assemblea-2026.pdf',
  giorno: 'lunedì 9 novembre 2026',
  primaConvocazione: '8:30',
  secondaConvocazione: '20:45',
  luogo: 'Biblioteca di Villafranca di Verona',
  /**
   * Entro quando il nuovo Statuto sarà pubblicato e mandato ai soci. Nel
   * documento c'è ancora il segnaposto «[data]»: finché resta null la frase
   * esce senza data, invece di inventarne una.
   */
  statutoNuovoEntro: null as string | null,
} as const;

/**
 * Fino a quando l'avviso resta in home: tutto il giorno dell'assemblea, ora di
 * Roma (a novembre è +01:00). Dopo, la pagina resta raggiungibile ma non la si
 * spinge più: un invito a una riunione già fatta è rumore.
 */
const FINE_AVVISO = Date.parse('2026-11-10T00:00:00+01:00');

export function assembleaInEvidenza(adesso: number = Date.now()): boolean {
  return adesso < FINE_AVVISO;
}
