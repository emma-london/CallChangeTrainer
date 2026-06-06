import type { Row } from '../types';
import { rowDisplay } from './bellDisplay';

/**
 * Named changes keyed by row string (bells joined, no spaces).
 * Where two names refer to the same change they are combined with " / ".
 * Source: Association of Ringing Teachers "Call Change Sequences" (2021),
 * plus "Keg Meg" from the original project brief.
 */
const NAMED_CHANGES: Record<number, Record<string, string>> = {
  5: {
    '12345': 'Rounds',
    '14235': 'Weasels',
    '14325': 'Jokers',
    '24135': 'Queens',
    '31245': 'Kings',
    '31425': 'Tittums',
    '43215': 'Back Rounds / Roll-up',
  },
  6: {
    '123456': 'Rounds',
    '125463': 'Keg Meg',
    '132546': 'The Intermediate / Priory',
    '135246': 'Queens',
    '142536': 'Tittums',
    '145236': 'Jacks',
    '153426': 'Kennett',
    '154326': 'Jokers',
    '213546': 'Burdette',
    '321456': 'See Saw',
    '341256': 'Hagdyke',
    '342516': 'Exploded Tittums',
    '531246': 'Kings / Whittington\'s',
    '532146': 'Princes',
    '543216': 'Back Rounds / Roll-up',
  },
  8: {
    '12345678': 'Rounds',
    '12563478': 'Hagdyke',
    '12753468': 'Whittington\'s',
    '13245768': 'Bow Bells',
    '13254768': 'The Intermediate / Priory',
    '13527468': 'Princesses',
    '13572468': 'Queens',
    '15263748': 'Tittums',
    '16745238': 'Jacks',
    '17652438': 'St Michael\'s',
    '17654328': 'Jokers',
    '31247568': 'Burdette',
    '43215678': 'See Saw',
    '45362718': 'Exploded Tittums',
    '75312468': 'Kings',
    '75321468': 'Princes',
    '76543218': 'Back Rounds / Roll-up',
  },
};

/** Returns the name of a change, or null if it has no name. */
export function getNamedChange(row: Row): string | null {
  const lookup = NAMED_CHANGES[row.length];
  if (!lookup) return null;
  return lookup[rowDisplay(row)] ?? null;
}
