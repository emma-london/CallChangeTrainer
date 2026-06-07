import type { Row } from '../types';

export interface Sequence {
  name: string;
  numBells: number;
  /** All rows in order, including the starting row at index 0. */
  rows: Row[];
}

/**
 * "60 on 3rds" for 6 bells.
 * Source: https://ringingteachers.org/application/files/3816/4812/6549/Sixty_on_Thirds.pdf
 *
 * Layout: left column (changes 1–33, Rounds → Half way) then right column
 * (changes 34–66, Half way → Rounds). The "Brings it round" annotation on
 * the PDF (row 34 of the left column = 123456) is a side-note only; the
 * sequence continues from the Half way row into the right column.
 *
 * Sequence: Rounds → (3 changes to Queens) → (60 changes) → Queens → (3 changes to Rounds)
 */
const SIXTY_ON_THIRDS: Sequence = {
  name: '60 on 3rds',
  numBells: 6,
  rows: [
    [1,2,3,4,5,6], //  0: Rounds (start)
    [1,2,3,5,4,6], //  1
    [1,3,2,5,4,6], //  2
    [1,3,5,2,4,6], //  3: Queens
    [3,1,5,2,4,6], //  4
    [3,5,1,2,4,6], //  5
    [3,5,2,1,4,6], //  6
    [3,5,2,4,1,6], //  7
    [5,3,2,4,1,6], //  8
    [5,3,2,1,4,6], //  9
    [5,3,1,2,4,6], // 10
    [5,1,3,2,4,6], // 11
    [1,5,3,2,4,6], // 12
    [1,5,2,3,4,6], // 13
    [5,1,2,3,4,6], // 14
    [5,2,1,3,4,6], // 15
    [5,2,3,1,4,6], // 16
    [5,2,3,4,1,6], // 17
    [5,2,4,3,1,6], // 18
    [5,2,4,1,3,6], // 19
    [5,2,1,4,3,6], // 20
    [5,1,2,4,3,6], // 21
    [1,5,2,4,3,6], // 22
    [1,2,5,4,3,6], // 23
    [2,1,5,4,3,6], // 24
    [2,5,1,4,3,6], // 25
    [2,5,4,1,3,6], // 26
    [2,5,4,3,1,6], // 27
    [2,4,5,3,1,6], // 28
    [2,4,5,1,3,6], // 29
    [2,4,1,5,3,6], // 30
    [2,1,4,5,3,6], // 31
    [1,2,4,5,3,6], // 32
    [1,2,4,3,5,6], // 33: Half way
    [2,1,4,3,5,6], // 34 — right column begins
    [2,4,1,3,5,6], // 35
    [2,4,3,1,5,6], // 36: Queens
    [2,4,3,5,1,6], // 37
    [4,2,3,5,1,6], // 38
    [4,2,3,1,5,6], // 39
    [4,2,1,3,5,6], // 40
    [4,1,2,3,5,6], // 41
    [1,4,2,3,5,6], // 42: Princes
    [1,4,3,2,5,6], // 43: Kings
    [4,1,3,2,5,6], // 44
    [4,3,1,2,5,6], // 45
    [4,3,2,1,5,6], // 46
    [4,3,2,5,1,6], // 47
    [4,3,5,2,1,6], // 48
    [4,3,5,1,2,6], // 49
    [4,3,1,5,2,6], // 50
    [4,1,3,5,2,6], // 51
    [1,4,3,5,2,6], // 52
    [1,3,4,5,2,6], // 53
    [3,1,4,5,2,6], // 54
    [3,4,1,5,2,6], // 55
    [3,4,5,1,2,6], // 56
    [3,4,5,2,1,6], // 57
    [3,5,4,2,1,6], // 58
    [3,5,4,1,2,6], // 59
    [3,5,1,4,2,6], // 60
    [3,1,5,4,2,6], // 61
    [1,3,5,4,2,6], // 62
    [1,3,5,2,4,6], // 63: Queens
    [1,3,2,5,4,6], // 64
    [1,2,3,5,4,6], // 65
    [1,2,3,4,5,6], // 66: Rounds (end)
  ],
};

export const SEQUENCES: Sequence[] = [SIXTY_ON_THIRDS];
