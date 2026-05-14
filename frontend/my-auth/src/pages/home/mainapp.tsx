import Header from "../../components/header";
import AlgorithmCard from "../../components/algorithmCard";
import AlgorithmModal from "../../components/algorithmModal";
// import { algorithms } from "../../data/algorithm";
// import { useState } from "react";
import { Algorithm } from "../../types/algorithm";

import React, {useState, useEffect} from "react";
import { fetchAlgorithms } from "../../services/algoService";

const Home = () => {
  const [allAlgos, setAllAlgos] = useState<Algorithm[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm | null>(null);

  useEffect(() =>{
    const loadData = async() =>{
      const data = await fetchAlgorithms();
      setAllAlgos(data);
    };
    loadData();
  }, []);

  const sorting = allAlgos.filter((a:any) => a.category?.name === 'Sorting');
  const searching = allAlgos.filter((a:any) => a.category?.name === 'Searching');

  console.log('List algorthims: ', allAlgos);

  // const sorting = algorithms.filter(a => a.category === "Sorting");
  // const searching = algorithms.filter(a => a.category === "Searching");

  return (
    <>
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
          <div className="cards-grid">
            {sorting.map((algo, i) => (
              <AlgorithmCard
                key={algo.id}
                algo={algo}
                index={i}
                onClick={() => setSelectedAlgo(algo)}
              />
            ))}
          </div>
        </section>

        {/* SEARCHING */}
        <section>
          <h2><span>🔍</span> Searching Algorithms</h2>
          <div className="cards-grid">
            {searching.map((algo, i) => (
              <AlgorithmCard
                key={algo.id}
                algo={algo}
                index={i}
                onClick={() => setSelectedAlgo(algo)}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedAlgo && (
        <AlgorithmModal
          algorithm={selectedAlgo}
          onClose={() => setSelectedAlgo(null)}
        />
      )}
    </>
  );
};

export default Home;