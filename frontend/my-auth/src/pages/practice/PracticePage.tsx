import React, { useEffect, useState } from 'react';
import './practice.css';
import { Link } from 'react-router-dom';

type Exercise = {
  id: number;
  title: string;
  slug: string;
  difficulty: string;
  algorithm: string;
};

function PracticePage() {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // giả data trước
  useEffect(() => {
    const fakeData: Exercise[] = [
      {
        id: 1,
        title: 'Bubble Sort Basic',
        slug: 'bubble-sort',
        difficulty: 'Easy',
        algorithm: 'Sorting',
      },
      {
        id: 2,
        title: 'Selection Sort',
        slug: 'selection-sort',
        difficulty: 'Easy',
        algorithm: 'Sorting',
      },
      {
        id: 3,
        title: 'Binary Search',
        slug: 'binary-search',
        difficulty: 'Medium',
        algorithm: 'Searching',
      },
      {
        id: 4,
        title: 'DFS Graph',
        slug: 'dfs-graph',
        difficulty: 'Hard',
        algorithm: 'Graph',
      },
    ];

    setAllExercises(fakeData);
    setFilteredExercises(fakeData);
  }, []);

  // filter
  useEffect(() => {
    let data = [...allExercises];

    if (selectedAlgorithm !== 'All') {
      data = data.filter(
        (item) => item.algorithm === selectedAlgorithm
      );
    }

    if (selectedDifficulty !== 'All') {
      data = data.filter(
        (item) => item.difficulty === selectedDifficulty
      );
    }

    setFilteredExercises(data);
  }, [selectedAlgorithm, selectedDifficulty, allExercises]);

  return (
    <div className='practice-page'>
      <h1 className='practice-title'>Practice Algorithms</h1>

      {/* FILTER */}
      <div className='filter-container'>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          <option value='All'>All Algorithms</option>
          <option value='Sorting'>Sorting</option>
          <option value='Searching'>Searching</option>
          <option value='Graph'>Graph</option>
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value='All'>All Difficulty</option>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>
      </div>

      {/* LIST */}
      <div className='exercise-list'>
        {filteredExercises.map((exercise) => (
          <div className='exercise-card' key={exercise.id}>
            <h3>{exercise.title}</h3>

            <p>Algorithm: {exercise.algorithm}</p>

            <p>Difficulty: {exercise.difficulty}</p>

            <Link to={`/practice/${exercise.slug}/${exercise.difficulty}`}>
              <button>Start Practice</button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default PracticePage;

