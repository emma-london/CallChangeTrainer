export type Row = number[];
export type CallDirection = 'up' | 'down';

export interface HistoryEntry {
  row: Row;
  call: string;          // e.g. "3 to 4"
  direction: CallDirection;
  isMixed: boolean;      // true if this call breaks the established direction
  sequenceMatch?: boolean; // undefined = no sequence active; true/false = on/off track
  sequenceIndexAfter?: number; // sequence cursor after this move
}

export interface AppState {
  numBells: number;
  currentRow: Row;
  history: HistoryEntry[];
  establishedDirection: CallDirection | null;
  selectedBell: number | null;  // first bell tapped, awaiting second
  sequenceIndex: number;        // current position in the active sequence
}
