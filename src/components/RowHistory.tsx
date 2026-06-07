import { useEffect, useRef } from 'react';
import type { HistoryEntry } from '../types';
import { directionLabel } from '../logic/callChanges';
import { getNamedChange } from '../logic/namedChanges';
import { rowDisplay } from '../logic/bellDisplay';

interface Props {
  history: HistoryEntry[];
  initialRow: number[];
  sequenceActive: boolean;
}

export function RowHistory({ history, initialRow, sequenceActive }: Props) {
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
          <span className="history-row">{rowDisplay(initialRow)}</span>
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
            className={[
              'history-entry',
              entry.isMixed ? 'history-entry--mixed' : '',
              name ? 'history-entry--named' : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="history-call">
              {entry.call}
              <span className={`history-direction history-direction--${entry.direction}`}>
                {' '}{directionLabel(entry.direction)}
                {entry.isMixed && <span className="mixed-warning"> ⚠ mixed</span>}
              </span>
            </span>
            <span className="history-right">
              <span className="history-row-line">
                {sequenceActive && entry.sequenceMatch !== undefined && (
                  <span className={`sequence-indicator sequence-indicator--${entry.sequenceMatch ? 'ok' : 'wrong'}`}>
                    {entry.sequenceMatch ? '✓' : '✗'}
                  </span>
                )}
                <span className="history-row">{rowDisplay(entry.row)}</span>
              </span>
              {name && <span className="history-name-badge">{name}</span>}
            </span>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
