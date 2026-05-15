import React from 'react';
import { Exercise } from '../../types/user';
import { generateHeatmapDays } from '../../utils/helpers';

interface ActivityHeatmapProps {
  exercises: Exercise[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ exercises }) => {
  const heatmapDays = generateHeatmapDays(exercises);

  const getLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    return 4;
  };

  return (
    <div className="heatmap-card">
      <h3 className="heatmap-title">Hoạt động (365 ngày)</h3>
      <div className="heatmap">
        {heatmapDays.map((day, idx) => (
          <div
            key={idx}
            className={`heatmap-cell heatmap-level-${getLevel(day.count)}`}
            title={`${day.date}: ${day.count} bài tập`}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityHeatmap;