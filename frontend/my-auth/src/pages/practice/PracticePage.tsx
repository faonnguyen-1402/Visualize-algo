import React, { useEffect, useState } from 'react';
import './practice.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { getExercises, Exercise } from '../../services/exerciseService';
import {toast} from 'react-toastify'
import PracticeSkeleton from '../../components/PracticeSkeleton';

import { useTranslation } from "react-i18next";
import Footer from '../../components/Footer';

function PracticePage() {
  const { t } = useTranslation();

  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [loading, setLoading] = useState<boolean>(true);

  const formatAlgoName = (name: string) => {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

  useEffect(() => {

    // const fakeData: Exercise[] = [

    //   {
    //     id: 1,
    //     title: 'Bubble Sort Basic',
    //     slug: 'bubble-sort',
    //     difficulty: 'Easy',
    //     algorithm: 'Sorting',
    //   },

    //   {
    //     id: 2,
    //     title: 'Selection Sort',
    //     slug: 'selection-sort',
    //     difficulty: 'Easy',
    //     algorithm: 'Sorting',
    //   },

    //   {
    //     id: 3,
    //     title: 'Binary Search',
    //     slug: 'binary-search',
    //     difficulty: 'Medium',
    //     algorithm: 'Searching',
    //   },

    //   {
    //     id: 4,
    //     title: 'DFS Graph',
    //     slug: 'dfs-graph',
    //     difficulty: 'Hard',
    //     algorithm: 'Graph',
    //   },

    // ];

    // setAllExercises(fakeData);
    // setFilteredExercises(fakeData);

    const fetchExercises = async () =>{
      try{
        setLoading(true);
        const res = await fetch('http://localhost:3001/exercise', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Unable to download the assignment list from the server');
        }
        const data: Exercise[] = await res.json();
        // console.log("Dữ liệu thực tế từ BE:", data);
        setAllExercises(data);
        setFilteredExercises(data);
      }catch (error) {
        console.error("Error fetching exercise data: ", error);
        toast.error('Failed to connect to the server. Displaying an empty list');
      }finally {
          setLoading(false);
      }
    };
      fetchExercises();
  }, []);

  

  useEffect(() => {

    let data = [...allExercises];

    if (selectedAlgorithm !== 'All') {
      data = data.filter((item) => {
        const categoryName = item.algorithm?.category?.name || ''; 
      return categoryName.toLowerCase() === selectedAlgorithm.toLowerCase();
      });

    }

    if (selectedDifficulty !== 'All') {
      data = data.filter((item) => {
        const diffLevel = item.difficulty || '';
        return diffLevel.toLowerCase() === selectedDifficulty.toLowerCase();
      });
    }

    setFilteredExercises(data);

  }, [selectedAlgorithm, selectedDifficulty, allExercises]);
console.log("Dữ liệu exercise đầu tiên:", allExercises[0]?.algorithm);
  return (

    <>

      <Header />

      <div className='practice-page'>

        <h1 className='practice-title'>
          {/* Practice Algorithms */}
          {t('practice.title')}
        </h1>

        <div className='filter-container'>

          <select
            value={selectedAlgorithm}
            onChange={(e) =>
              setSelectedAlgorithm(e.target.value)
            }
          >

            {/* <option value='All'>
              All Algorithms
            </option>

            <option value='Sorting'>
              Sorting
            </option>

            <option value='Searching'>
              Searching
            </option> */}
            <option value='All'>{t('practice.filters.all_algo')}</option>
            <option value='Sorting'>{t('practice.filters.sorting')}</option>
            <option value='Searching'>{t('practice.filters.searching')}</option>

          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) =>
              setSelectedDifficulty(e.target.value)
            }
          >

            {/* <option value='All'>
              All Difficulty
            </option>

            <option value='Easy'>
              Easy
            </option>

            <option value='Medium'>
              Medium
            </option>

            <option value='Hard'>
              Hard
            </option> */}
            <option value='All'>{t('practice.filters.all_diff')}</option>
            <option value='Easy'>{t('practice.filters.easy')}</option>
            <option value='Medium'>{t('practice.filters.medium')}</option>
            <option value='Hard'>{t('practice.filters.hard')}</option>

          </select>

        </div>

        {loading ?(
          <PracticeSkeleton/>
        ):(
          <div className='exercise-list'>

          {filteredExercises.map((exercise) => (

            <div
              className='exercise-card'
              key={exercise.id}
            >
              <h3>{exercise.title}</h3>

              {/* <p>
                Algorithm: {exercise.algorithm?.name}
              </p>
              <p>
                Difficulty: {exercise.difficulty}
              </p> */}

              <div className="card-info-row">
                {/* <span className="card-info-label">Algorithm:</span> */}
                <span className="card-info-label">{t('practice.algo_label')}:</span>
                <span className="algo-tag">
                  {formatAlgoName(exercise.algorithm?.name || 'N/A')}
                </span>
              </div>

              <div className="card-info-row">
                {/* <span className="card-info-label">Difficulty:</span> */}
                <span className="card-info-label">{t('practice.diff_label')}:</span>
                <span className={`difficulty-tag ${exercise.difficulty?.toLowerCase()}`}>
                  {/* {exercise.difficulty} */}
                  {t(`difficulty.${exercise.difficulty?.toLowerCase()}`)}
                </span>
              </div>

              <Link
                to={`/practice/${exercise.algorithm.slug}/${exercise.difficulty}`}
              >

                {/* <button>
                  Start Practice
                </button> */}
                <button>{t('practice.start_btn')}</button>

              </Link>

            </div>

          ))}

        </div>
        )}

        {/* <div className='exercise-list'>

          {filteredExercises.map((exercise) => (

            <div
              className='exercise-card'
              key={exercise.id}
            >

              <h3>{exercise.title}</h3>

              <p>
                Algorithm: {exercise.algorithm?.name}
              </p>

              <p>
                Difficulty: {exercise.difficulty}
              </p>

              <Link
                to={`/practice/${exercise.algorithm.slug}/${exercise.difficulty}`}
              >

                <button>
                  Start Practice
                </button>

              </Link>

            </div>

          ))}

        </div> */}

      </div>
      <Footer />
    </>

  );
}

export default PracticePage;

