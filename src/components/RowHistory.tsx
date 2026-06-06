import { useEffect, useRef } from 'react';
import type { HistoryEntry } from '../types';
import { directionLabel } from '../logic/callChanges';
import { getNamedChange } from '../logic/namedChanges';

interface Props {
  history: HistoryEntry[];
  initialRow: number[];
}

export function RowHistory({ history, initialRow }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history.length]);

  const initialName = getNamedChange(initialRow);

  return (
    <div className="row-history">
      {/* Starting row */}
      <div className={`history-entry history-entry--initial${initialName ? ' history-entry--named' : ''}`}>
        <span className="history-call">Start</span>
        <span className="history-right">
          <span className="history-row">{initialRow.join('')}</span>
          {initialName && (
            <span className="history-name-badge">{initialName}</span>
          )}
        </span>
      </div>

      {history.map((entry, i) => {
        const name = getNamedChange(entry.row);
        return (
          <div
            key={i}
            className={`history-entry${entry.isMixed ? ' history-entry--mixed' : ''}${name ? ' history-entry--named' : ''}`}
          >
            <span className="history-call">
              {entry.call}
              <span className={`history-direction history-direction--${entry.direction}`}>
                {' '}{directionLabel(entry.direction)}
                {entry.isMixed && <span className="mixed-warning"> ⚠ mixed</span>}
              </span>
            </span>
            <span className="history-right">
              <span className="history-row">{entry.row.join('')}</span>
              {name && <span className="history-name-badge">{name}</span>}
            </span>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
