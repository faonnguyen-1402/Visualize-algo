import React from 'react';
import { Exercise } from '../../types/user';

interface ProgressCircleProps {
  exercises: Exercise[];
  total?: number;
  completed?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ exercises, total=0, completed = 0 }) => {
  // const totalExercises = 40; 
  // const completedExercises = exercises.length;
  const percentage = total > 0 ? Math.min(Math.round((completed / total) * 100), 100) : 0;

  return (
    <div className="progress-card">
      <h3 className="progress-title">Overall Progress</h3>
      <div className="progress-container">
        <svg width="150" height="150" viewBox="0 0 150 150">
          {/* Background circle */}
          <circle 
            cx="75" 
            cy="75" 
            r="70" 
            fill="none" 
            stroke="#333" 
            strokeWidth="8" 
          />
          {/* Progress circle */}
          <circle
            cx="75"
            cy="75"
            r="70"
            fill="none"
            stroke="#00f3ff"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 70 * (percentage / 100)} ${2 * Math.PI * 70}`}
            strokeLinecap="round"
            transform="rotate(-90 75 75)"
          />
          {/* Text */}
          <text
            x="75"
            y="75"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="28"
            fontWeight="700"
            fill="#fff"
          >
            {percentage}%
          </text>
        </svg>
      </div>
      <div className="progress-stats">
        <div className="progress-stat">
          <div className="progress-stat-label">Completed Exercises</div>
          <div className="progress-stat-value">{completed}/{total}</div>
        </div>
        <div className="progress-stat">
          <div className="progress-stat-label">Left</div>
          <div className="progress-stat-value">{total - completed}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;