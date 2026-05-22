import { useMemo } from 'react';
import React from 'react';
import { Exercise } from '../../types/user';

const difficultyMap: Record<string, string> = { 
  'Easy': 'EASY', 
  'Medium': 'MEDIUM', 
  'Hard': 'HARD' 
};

interface SubmissionWithExercise {
  id: number;
  exercise: {
    id: number;
    title: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  };
  // Thêm các trường khác nếu cần
}

interface ExerciseTabProps {
  exercises: SubmissionWithExercise[];
  activeTab: 'EASY' | 'MEDIUM' | 'HARD';
  onTabChange: (tab: 'EASY' | 'MEDIUM' | 'HARD') => void;
}

const ExerciseTab: React.FC<ExerciseTabProps> = ({ exercises, activeTab, onTabChange }) => {
  const difficulties: Array<'EASY' | 'MEDIUM' | 'HARD'> = ['EASY', 'MEDIUM', 'HARD'];

  const currentExercises = useMemo(() => 
    exercises.filter((sub) => sub.exercise?.difficulty === activeTab),
  [exercises, activeTab]
  );


  const getExercisesByDifficulty = (diff: string) =>
    exercises.filter((sub) => sub.exercise?.difficulty === diff);

  const getDifficultyClass = (difficulty: string) => {
    const map: Record<string, string> = { 'EASY': 'easy', 'MEDIUM': 'medium', 'HARD': 'hard' };
    return map[difficulty];
  };

  const getBadgeClass = (difficulty: string) => {
    const map: Record<string, string> = {
      'EASY': 'badge-easy',
      'MEDIUM': 'badge-medium',
      'HARD': 'badge-hard',
    };
    return map[difficulty];
  };

  // const currentExercises = getExercisesByDifficulty(activeTab);

  return (
    <div className="exercises-card">
      <h3 className="exercises-title">Exercises</h3>
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
      {/* <div className="exercise-list">
        {currentExercises.length > 0}
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
      </div> */}
      <div className="exercise-list">
        {currentExercises.length > 0 ? (
          currentExercises.map((sub) => (
            <div
              key={sub.id}
              className={`exercise-item ${getDifficultyClass(sub.exercise.difficulty)}`}
            >
              <div className="exercise-info">
                <h3>{sub.exercise.title}</h3>
                {/* Lưu ý: Nếu không có trường completedDate trong Submission, 
                    bạn có thể bỏ dòng này hoặc thay bằng sub.createdAt */}
                <div className="exercise-date">
                  {new Date().toLocaleDateString('vi-VN')} 
                </div>
              </div>
              <span className={`exercise-badge ${getBadgeClass(sub.exercise.difficulty)}`}>
                {sub.exercise.difficulty}
              </span>
            </div>
          ))
        ) : (
          <div className="no-exercises">There are no exercises at this level yet!</div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTab;