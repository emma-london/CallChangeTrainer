/**
 * Single-character bell identifier, as used in change ringing:
 *   1–9  →  "1"–"9"
 *   10   →  "0"
 *   11   →  "E"
 *   12   →  "T"
 */
export function bellDisplay(bell: number): string {
  if (bell === 10) return '0';
  if (bell === 11) return 'E';
  if (bell === 12) return 'T';
  return String(bell);
}

/** Compact display string for a full row, e.g. [1,3,5,10,2,4] → "13502 4" */
export function rowDisplay(row: number[]): string {
  return row.map(bellDisplay).join('');
}
