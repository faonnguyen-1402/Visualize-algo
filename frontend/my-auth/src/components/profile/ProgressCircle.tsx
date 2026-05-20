import React from 'react';
import { Exercise } from '../../types/user';

interface ProgressCircleProps {
  exercises: Exercise[];
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ exercises }) => {
  const totalExercises = 40; // Truyền data vào sau
  const completedExercises = exercises.length;
  const percentage = Math.round((completedExercises / totalExercises) * 100);

  return (
    <div className="progress-card">
      <h3 className="progress-title">Tiến độ Tổng Thể</h3>
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
          <div className="progress-stat-label">Hoàn thành</div>
          <div className="progress-stat-value">{completedExercises}/{totalExercises}</div>
        </div>
        <div className="progress-stat">
          <div className="progress-stat-label">Còn lại</div>
          <div className="progress-stat-value">{totalExercises - completedExercises}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;