import type { Row } from '../types';
import { bellDisplay } from '../logic/bellDisplay';

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
            {bellDisplay(bell)}
          </span>
        ))}
      </div>
    </div>
  );
}
