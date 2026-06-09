import { useState, useCallback } from 'react';
import type { AppState, HistoryEntry } from './types';
import type { Sequence } from './logic/sequences';
import { makeRounds, applyCall } from './logic/callChanges';
import { SEQUENCES } from './logic/sequences';
import { CurrentRow } from './components/CurrentRow';
import { RowHistory } from './components/RowHistory';
import { BellPad } from './components/BellPad';
import { CallFeedback } from './components/CallFeedback';
import { rowDisplay } from './logic/bellDisplay';
import './App.css';

const DEFAULT_BELLS = 6;

function makeInitialState(numBells: number): AppState {
  return {
    numBells,
    currentRow: makeRounds(numBells),
    history: [],
    establishedDirection: null,
    selectedBell: null,
    sequenceIndex: 0,
  };
}

export default function App() {
  const [state, setState] = useState<AppState>(() => makeInitialState(DEFAULT_BELLS));
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [configNumBells, setConfigNumBells] = useState(DEFAULT_BELLS);
  const [activeSequence, setActiveSequence] = useState<Sequence | null>(null);

  const initialRow = makeRounds(state.numBells);

  // sequenceIndex lives in AppState so the setState functional updater always
  // reads the up-to-date value via `prev` — no stale closure risk.
  const handleBellTap = useCallback((bell: number) => {
    setState((prev) => {
      if (prev.selectedBell === null) {
        setFeedback(null);
        return { ...prev, selectedBell: bell };
      }

      if (prev.selectedBell === bell) {
        setFeedback(null);
        return { ...prev, selectedBell: null };
      }

      const result = applyCall(prev.currentRow, prev.selectedBell, bell);

      if (!result.valid) {
        setFeedback({ message: result.error, isError: true });
        return { ...prev, selectedBell: null };
      }

      const isMixed =
        prev.establishedDirection !== null && result.direction !== prev.establishedDirection;

      if (isMixed) {
        setFeedback({
          message: `⚠ Mixed direction! You've been calling ${prev.establishedDirection} — this call is ${result.direction}.`,
          isError: true,
        });
      } else {
        setFeedback({ message: `✓ ${result.call} (${result.direction})`, isError: false });
      }

      // Sequence tracking — read sequenceIndex from prev (never stale).
      // Each step holds one or more allowed rows; a call is correct if the
      // new row matches any of them.
      let seqMatch: boolean | undefined = undefined;
      let nextSeqIdx = prev.sequenceIndex;
      if (activeSequence && prev.sequenceIndex < activeSequence.rows.length - 1) {
        const newRowStr = rowDisplay(result.newRow);
        const allowedRows = activeSequence.rows[prev.sequenceIndex + 1];
        seqMatch = allowedRows.some(r => rowDisplay(r) === newRowStr);
        nextSeqIdx = seqMatch ? prev.sequenceIndex + 1 : prev.sequenceIndex;
      }

      const entry: HistoryEntry = {
        row: result.newRow,
        call: result.call,
        direction: result.direction,
        isMixed,
        sequenceMatch: seqMatch,
        sequenceIndexAfter: nextSeqIdx,
      };

      return {
        ...prev,
        currentRow: result.newRow,
        history: [...prev.history, entry],
        establishedDirection: prev.establishedDirection ?? result.direction,
        selectedBell: null,
        sequenceIndex: nextSeqIdx,
      };
    });
  }, [activeSequence]); // sequenceIndex no longer needed in deps

  const handleReset = () => {
    setState(makeInitialState(configNumBells));
    setFeedback(null);
  };

  const handleUndo = () => {
    setState((prev) => {
      if (prev.history.length === 0) return prev;
      const newHistory = prev.history.slice(0, -1);
      const prevRow =
        newHistory.length > 0
          ? newHistory[newHistory.length - 1].row
          : makeRounds(prev.numBells);
      const prevDirection = newHistory.length > 0 ? newHistory[0].direction : null;
      const restoredSeqIdx =
        newHistory.length > 0
          ? (newHistory[newHistory.length - 1].sequenceIndexAfter ?? 0)
          : 0;
      return {
        ...prev,
        currentRow: prevRow,
        history: newHistory,
        establishedDirection: prevDirection,
        selectedBell: null,
        sequenceIndex: restoredSeqIdx,
      };
    });
    setFeedback(null);
  };

  const handleSequenceChange = (name: string) => {
    if (name === '') {
      setActiveSequence(null);
      setState(makeInitialState(configNumBells));
      setFeedback(null);
      return;
    }
    const seq = SEQUENCES.find((s) => s.name === name) ?? null;
    setActiveSequence(seq);
    if (seq && seq.numBells !== configNumBells) {
      setConfigNumBells(seq.numBells);
      setState(makeInitialState(seq.numBells));
    } else {
      setState(makeInitialState(configNumBells));
    }
    setFeedback(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Call Change Conductor</h1>
        <div className="app-controls">
          <label>
            Bells:
            <select
              value={configNumBells}
              onChange={(e) => {
                const n = Number(e.target.value);
                setConfigNumBells(n);
                setState(makeInitialState(n));
                setFeedback(null);
                setActiveSequence(null);
              }}
            >
              {[5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <label>
            Sequence:
            <select
              value={activeSequence?.name ?? ''}
              onChange={(e) => handleSequenceChange(e.target.value)}
            >
              <option value=''>None</option>
              {SEQUENCES.filter((s) => s.numBells === configNumBells).map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
          <button
            className="reset-button"
            onClick={handleUndo}
            disabled={state.history.length === 0}
          >
            Undo
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </header>

      <CurrentRow row={state.currentRow} />

      <RowHistory
        history={state.history}
        initialRow={initialRow}
        sequenceActive={activeSequence !== null}
      />

      <CallFeedback message={feedback?.message ?? null} isError={feedback?.isError ?? false} />

      <BellPad
        numBells={state.numBells}
        selectedBell={state.selectedBell}
        onBellTap={handleBellTap}
      />
    </div>
  );
}
