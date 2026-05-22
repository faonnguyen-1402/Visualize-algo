import React from 'react';
import { Exercise } from '../../types/user';
import { generateHeatmapDays } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

interface ActivityHeatmapProps {
  exercises: Exercise[];
}

const months = [
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
];

const weekDays = ['Mon', 'Wed', 'Fri'];

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  exercises,
}) => {

  const { t } = useTranslation();

  const heatmapDays = generateHeatmapDays(exercises);

  const getLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 2) return 2;
    if (count <= 3) return 3;
    return 4;
  };

  return (
    <div className='heatmap-card'>

      <div className='heatmap-months'>

        {months.map((month, index) => (
          <span key={index}>
            {month}
          </span>
        ))}

      </div>

      <div className='heatmap-wrapper'>

        <div className='heatmap-weekdays'>

          {weekDays.map((day) => (
            <span key={day}>
              {day}
            </span>
          ))}

        </div>

        <div className='heatmap-grid'>

          {heatmapDays.map((day, idx) => (

            <div
              key={idx}
              className={`heatmap-cell heatmap-level-${getLevel(day.count)}`}
              title={`${day.date}: ${day.count} exercises`}
            />

          ))}

        </div>

      </div>

      <div className='heatmap-footer'>

        <div className='heatmap-legend'>

          <span>Less</span>

          <div className='legend-cell level-0'></div>
          <div className='legend-cell level-1'></div>
          <div className='legend-cell level-2'></div>
          <div className='legend-cell level-3'></div>
          <div className='legend-cell level-4'></div>

          <span>More</span>

        </div>

      </div>

    </div>
  );
};

export default ActivityHeatmap;