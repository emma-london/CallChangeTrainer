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
          : `"${selectedBell} to …" — tap the second bell`}
      </div>
      <div className="bell-pad-buttons">
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
