import { useMemo } from 'react';
import React from 'react';
import { Exercise } from '../../types/user';
import { useTranslation } from 'react-i18next';


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
  const { t } = useTranslation();

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
      <h3 className="exercises-title">{t('profile.exercises')}</h3>
      <div className="tabs">
        {difficulties.map((diff) => (
          <button
            key={diff}
            className={`tab-btn ${activeTab === diff ? 'active' : ''}`}
            onClick={() => onTabChange(diff)}
          >
            {/* {diff} ({getExercisesByDifficulty(diff).length}) */}
            {t(`profile.tabs.${diff.toLowerCase()}`)} ({getExercisesByDifficulty(diff).length})
          </button>
        ))}
      </div>
      <div className="exercise-list">
        {currentExercises.length > 0 ? (
          currentExercises.map((sub) => (
            <div
              key={sub.id}
              className={`exercise-item ${getDifficultyClass(sub.exercise.difficulty)}`}
            >
              <div className="exercise-info">
                <h3>{sub.exercise.title}</h3>
                <div className="exercise-date">
                  {new Date().toLocaleDateString('vi-VN')} 
                </div>
              </div>
              <span className={`exercise-badge ${getBadgeClass(sub.exercise.difficulty)}`}>
                {/* {sub.exercise.difficulty} */}
                {t(`profile.tabs.${sub.exercise.difficulty.toLowerCase()}`)}
              </span>
            </div>
          ))
        ) : (
          // <div className="no-exercises">There are no exercises at this level yet!</div>
          <div className="no-exercises">{t('profile.no_exercises')}</div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTab;