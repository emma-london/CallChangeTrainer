import type { Row } from '../types';

interface Props {
  row: Row;
}

export function CurrentRow({ row }: Props) {
  return (
    <div className="current-row">
      <div className="current-row-label">Current row</div>
      <div className="current-row-bells">
        {row.map((bell, i) => (
          <span key={i} className="current-bell">
            {bell}
          </span>
        ))}
      </div>
    </div>
  );
}
