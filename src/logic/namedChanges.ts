import type { Row } from '../types';

/**
 * Named changes keyed by row string (bells joined, no spaces).
 * Organised by bell count — extend as needed.
 */
const NAMED_CHANGES: Record<number, Record<string, string>> = {
  6: {
    '123456': 'Rounds',
    '135246': 'Queens',
    '142536': 'Tittums',
    '531246': 'Kings',
    '213546': 'Burdette',
    '341256': 'Hagdyke',
    '145236': 'Jacks',
    '154326': 'Jokers',
    '125463': 'Keg Meg',
    '153426': 'Kennet',
    '532146': 'Princes',
    '543216': 'Back Rounds',
    '321456': 'See Saw',
  },
};

/** Returns the name of a change, or null if it has no name. */
export function getNamedChange(row: Row): string | null {
  const lookup = NAMED_CHANGES[row.length];
  if (!lookup) return null;
  return lookup[row.join('')] ?? null;
}
