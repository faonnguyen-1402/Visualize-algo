import Header from "../../components/header";
import AlgorithmCard from "../../components/algorithmCard";
import AlgorithmModal from "../../components/algorithmModal";
// import { algorithms } from "../../data/algorithm";
// import { useState } from "react";
import { Algorithm } from "../../types/algorithm";

import React, {useState, useEffect} from "react";
import { fetchAlgorithms } from "../../services/algoService";
import { useNavigate } from 'react-router-dom';
import AlgorithmCardSkeleton from "../../components/AlgorithmCardSkeleton";
import GeometricBackground from '../../components/background/geometricBackground';


const Home = () => {
  const [allAlgos, setAllAlgos] = useState<Algorithm[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() =>{
    const loadData = async() =>{
      try {
        setLoading(true); 
        const data = await fetchAlgorithms();
        setAllAlgos(data);
      } catch (err) {
        console.error("Error loading algorithms: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const sorting = allAlgos.filter((a:any) => a.category?.name === 'Sorting');
  const searching = allAlgos.filter((a:any) => a.category?.name === 'Searching');

  console.log('List algorthims: ', allAlgos);


  return (
    // <>
     <div className="home-page">
      <GeometricBackground />
      <Header />

      <main>
        {/* HERO */}
        <article className="hero">
          <h1>
            Learn Algorithms <span>Visually</span>
          </h1>
          <p>
            Understand how algorithms work with step-by-step visualizations.
          </p>
        </article>

        {/* SORTING */}
        <section>
          <h2><span>📊</span> Sorting Algorithms</h2>
          <p className="category-intro">
            Sorting algorithms are used to organize data in a specific order, such as ascending, descending, or alphabetical order. Sorting makes data easier to manage and facilitates faster searches. Some common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.
          </p>
          <div className="cards-grid">
            {loading ? (
              <AlgorithmCardSkeleton count={4} />
            ) : (
              sorting.map((algo, i) => (
                <AlgorithmCard
                  key={algo.id}
                  algo={algo}
                  index={i}
                  onClick={() => setSelectedAlgo(algo)}
                />
              ))
            )}
          </div>
        </section>

        {/* SEARCHING */}
        <section>
          <h2><span>🔍</span> Searching Algorithms</h2>
          <p className="category-intro">
            Search algorithms are used to determine the location of an element in a dataset. Depending on how the data is organized, various search methods can be applied. The two most common algorithms are Linear Search and Binary Search.
          </p>
          <div className="cards-grid">
            {loading ? (
              <AlgorithmCardSkeleton count={2} />
            ) : (
              searching.map((algo, i) => (
                <AlgorithmCard
                  key={algo.id}
                  algo={algo}
                  index={i}
                  onClick={() => setSelectedAlgo(algo)}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {selectedAlgo && (
        <AlgorithmModal
          algorithm={selectedAlgo}
          onClose={() => setSelectedAlgo(null)}
        />
      )}
    </div>
  );
};

export default Home;