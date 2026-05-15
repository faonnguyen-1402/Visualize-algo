import React from 'react';
import { Exercise } from '../../types/user';

interface ExerciseTabProps {
  exercises: Exercise[];
  activeTab: 'Dễ' | 'Trung bình' | 'Khó';
  onTabChange: (tab: 'Dễ' | 'Trung bình' | 'Khó') => void;
}

const ExerciseTab: React.FC<ExerciseTabProps> = ({ exercises, activeTab, onTabChange }) => {
  const difficulties: Array<'Dễ' | 'Trung bình' | 'Khó'> = ['Dễ', 'Trung bình', 'Khó'];

  const getExercisesByDifficulty = (difficulty: string) =>
    exercises.filter((ex) => ex.difficulty === difficulty);

  const getDifficultyClass = (difficulty: string) => {
    const map: Record<string, string> = { 'Dễ': 'easy', 'Trung bình': 'medium', 'Khó': 'hard' };
    return map[difficulty];
  };

  const getBadgeClass = (difficulty: string) => {
    const map: Record<string, string> = {
      'Dễ': 'badge-easy',
      'Trung bình': 'badge-medium',
      'Khó': 'badge-hard',
    };
    return map[difficulty];
  };

  const currentExercises = getExercisesByDifficulty(activeTab);

  return (
    <div className="exercises-card">
      <h3 className="exercises-title">Bài tập</h3>
      <div className="tabs">
        {difficulties.map((diff) => (
          <button
            key={diff}
            className={`tab-btn ${activeTab === diff ? 'active' : ''}`}
            onClick={() => onTabChange(diff)}
          >
            {diff} ({getExercisesByDifficulty(diff).length})
          </button>
        ))}
      </div>
      <div className="exercise-list">
        {currentExercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`exercise-item ${getDifficultyClass(exercise.difficulty)}`}
          >
            <div className="exercise-info">
              <h3>{exercise.title}</h3>
              <div className="exercise-date">
                {new Date(exercise.completedDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <span className={`exercise-badge ${getBadgeClass(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseTab;