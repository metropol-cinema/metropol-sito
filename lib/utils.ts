import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Unisce classi Tailwind in modo sicuro (merge + dedup). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "7,50 €" — formato euro italiano. */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
}
