import { useState, useCallback } from 'react';
import type { AppState, HistoryEntry } from './types';
import { makeRounds, applyCall } from './logic/callChanges';
import { CurrentRow } from './components/CurrentRow';
import { RowHistory } from './components/RowHistory';
import { BellPad } from './components/BellPad';
import { CallFeedback } from './components/CallFeedback';
import './App.css';

const DEFAULT_BELLS = 6;

function makeInitialState(numBells: number): AppState {
  return {
    numBells,
    currentRow: makeRounds(numBells),
    history: [],
    establishedDirection: null,
    selectedBell: null,
  };
}

export default function App() {
  const [state, setState] = useState<AppState>(() => makeInitialState(DEFAULT_BELLS));
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [initialRow] = useState(() => makeRounds(DEFAULT_BELLS));
  const [configNumBells, setConfigNumBells] = useState(DEFAULT_BELLS);

  const handleBellTap = useCallback((bell: number) => {
    setState((prev) => {
      if (prev.selectedBell === null) {
        // First tap
        setFeedback(null);
        return { ...prev, selectedBell: bell };
      }

      if (prev.selectedBell === bell) {
        // Tapped same bell twice — cancel selection
        setFeedback(null);
        return { ...prev, selectedBell: null };
      }

      // Second tap — attempt the call
      const result = applyCall(prev.currentRow, prev.selectedBell, bell);

      if (!result.valid) {
        setFeedback({ message: result.error, isError: true });
        return { ...prev, selectedBell: null };
      }

      const isMixed =
        prev.establishedDirection !== null && result.direction !== prev.establishedDirection;

      const entry: HistoryEntry = {
        row: result.newRow,
        call: result.call,
        direction: result.direction,
        isMixed,
      };

      if (isMixed) {
        setFeedback({
          message: `⚠ Mixed direction! You've been calling ${prev.establishedDirection} — this call is ${result.direction}.`,
          isError: true,
        });
      } else {
        setFeedback({ message: `✓ ${result.call} (${result.direction})`, isError: false });
      }

      return {
        ...prev,
        currentRow: result.newRow,
        history: [...prev.history, entry],
        establishedDirection: prev.establishedDirection ?? result.direction,
        selectedBell: null,
      };
    });
  }, []);

  const handleReset = () => {
    setState(makeInitialState(configNumBells));
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
              onChange={(e) => setConfigNumBells(Number(e.target.value))}
            >
              {[4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <button className="reset-button" onClick={handleReset}>
            Reset to rounds
          </button>
        </div>
      </header>

      <CurrentRow row={state.currentRow} />

      <RowHistory history={state.history} initialRow={initialRow} />

      <CallFeedback message={feedback?.message ?? null} isError={feedback?.isError ?? false} />

      <BellPad
        numBells={state.numBells}
        selectedBell={state.selectedBell}
        onBellTap={handleBellTap}
      />
    </div>
  );
}
