import type { Row, CallDirection } from '../types';

export function makeRounds(numBells: number): Row {
  return Array.from({ length: numBells }, (_, i) => i + 1);
}

export interface CallResult {
  valid: true;
  call: string;
  direction: CallDirection;
  newRow: Row;
}

export interface CallError {
  valid: false;
  error: string;
}

/** Sentinel value for the Lead position (before bell 1). */
export const LEAD = 0;

/**
 * Attempt a call: bellX to bellY.
 *
 * UP call ("X to Y" where X moves later in the row to follow Y):
 *   - Y must be immediately after X (adjacent). posY = posX + 1.
 *   - Example: "2 to 3" from 1 2 3 4 5 6 → 1 3 2 4 5 6
 *
 * DOWN call ("X to Y" where X moves earlier in the row to follow Y):
 *   - Y must be exactly two positions before X. posY = posX - 2.
 *   - After X moves one step earlier, X ends up immediately after Y.
 *   - Example: "3 to 1" from 1 2 3 4 5 6 → 1 3 2 4 5 6
 *
 * LEAD call ("X to Lead", bellY === LEAD):
 *   - X must be the second bell in the row (posX === 1).
 *   - X swaps with the current lead, becoming the new lead.
 *   - Equivalent to a down call where Y is the virtual position before bell 1.
 *   - Example: "2 to Lead" from 1 2 3 4 5 6 → 2 1 3 4 5 6
 */
export function applyCall(
  currentRow: Row,
  bellX: number,
  bellY: number
): CallResult | CallError {
  const posX = currentRow.indexOf(bellX);

  if (posX === -1) {
    return { valid: false, error: 'Bell not found in current row.' };
  }

  // ── Lead call ──────────────────────────────────────────────────────────────
  if (bellY === LEAD) {
    if (posX !== 1) {
      return {
        valid: false,
        error: `Only the second bell in the row can be called to lead. Right now that's ${currentRow[1]}.`,
      };
    }
    const newRow = [...currentRow];
    [newRow[0], newRow[1]] = [newRow[1], newRow[0]];
    return { valid: true, call: `${bellX} to Lead`, direction: 'down', newRow };
  }

  // ── Normal call ────────────────────────────────────────────────────────────
  const posY = currentRow.indexOf(bellY);

  if (posY === -1) {
    return { valid: false, error: 'Bell not found in current row.' };
  }

  if (posX === posY) {
    return { valid: false, error: 'Tap two different bells.' };
  }

  let direction: CallDirection;
  let swapIdx: number;

  if (posX < posY) {
    // UP call: X moves later. Y must be immediately after X.
    if (posY !== posX + 1) {
      const validTarget = currentRow[posX + 1];
      return {
        valid: false,
        error: `Up calls must be adjacent. ${bellX} can only follow ${validTarget} right now.`,
      };
    }
    direction = 'up';
    swapIdx = posX + 1;
  } else {
    // DOWN call: X moves earlier. Y must be exactly two positions before X.
    if (posX - posY !== 2) {
      if (posX - posY === 1) {
        const validTarget = posX - 2 >= 0 ? currentRow[posX - 2] : null;
        return {
          valid: false,
          error: validTarget !== null
            ? `For a down call, ${bellX} must follow a bell two places ahead. Try "${bellX} to ${validTarget}".`
            : `Use "L" to call ${bellX} to lead.`,
        };
      }
      const validTarget = posX - 2 >= 0 ? currentRow[posX - 2] : null;
      return {
        valid: false,
        error: validTarget !== null
          ? `${bellX} can only follow ${validTarget} in a down call right now.`
          : `Use "L" to call ${bellX} to lead.`,
      };
    }
    direction = 'down';
    swapIdx = posX - 1;
  }

  const newRow = [...currentRow];
  [newRow[posX], newRow[swapIdx]] = [newRow[swapIdx], newRow[posX]];

  return {
    valid: true,
    call: `${bellX} to ${bellY}`,
    direction,
    newRow,
  };
}

/** Human-readable label for a direction. */
export function directionLabel(direction: CallDirection): string {
  return direction === 'up' ? '↑ Up' : '↓ Down';
}
