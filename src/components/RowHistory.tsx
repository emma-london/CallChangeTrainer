import { useEffect, useRef } from 'react';
import type { HistoryEntry } from '../types';
import { directionLabel } from '../logic/callChanges';

interface Props {
  history: HistoryEntry[];
  initialRow: number[];
}

export function RowHistory({ history, initialRow }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history.length]);

  return (
    <div className="row-history">
      {/* Starting row */}
      <div className="history-entry history-entry--initial">
        <span className="history-call">Rounds</span>
        <span className="history-row">
          {initialRow.join(' ')}
        </span>
      </div>

      {history.map((entry, i) => (
        <div
          key={i}
          className={`history-entry${entry.isMixed ? ' history-entry--mixed' : ''}`}
        >
          <span className="history-call">
            {entry.call}
            <span className={`history-direction history-direction--${entry.direction}`}>
              {' '}{directionLabel(entry.direction)}
              {entry.isMixed && <span className="mixed-warning"> ⚠ mixed</span>}
            </span>
          </span>
          <span className="history-row">{entry.row.join(' ')}</span>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
