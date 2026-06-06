import { LEAD } from '../logic/callChanges';

interface Props {
  numBells: number;
  selectedBell: number | null;
  onBellTap: (bell: number) => void;
}

export function BellPad({ numBells, selectedBell, onBellTap }: Props) {
  return (
    <div className="bell-pad">
      <div className="bell-pad-hint">
        {selectedBell === null
          ? 'Tap the bell to call'
          : `"${selectedBell} to …" — tap the destination`}
      </div>
      <div className="bell-pad-buttons">
        {/* Lead button — destination only, so disabled until a bell is selected */}
        <button
          className={`bell-button bell-button--lead${selectedBell === null ? ' bell-button--disabled' : ''}`}
          onClick={() => onBellTap(LEAD)}
          disabled={selectedBell === null}
          title="Call to lead"
        >
          L
        </button>

        {Array.from({ length: numBells }, (_, i) => i + 1).map((bell) => (
          <button
            key={bell}
            className={`bell-button${selectedBell === bell ? ' bell-button--selected' : ''}`}
            onClick={() => onBellTap(bell)}
          >
            {bell}
          </button>
        ))}
      </div>
    </div>
  );
}
