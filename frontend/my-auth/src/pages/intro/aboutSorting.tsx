import React, { useEffect } from 'react';
import Header from '../../components/header';
import GeometricBackground from '../../components/background/geometricBackground';
import './aboutAlgorithms.css';

type ComplexityRow = {
  caseName: string;
  time: string;
};

type SortingAlgorithm = {
  id: string;
  index: string;
  name: string;
  shortDescription: string;
  description: string;
  complexity: ComplexityRow[];
  advantages: string[];
  disadvantages: string[];
  code: string;
};

const sortingAlgorithms: SortingAlgorithm[] = [
  {
    id: 'bubble-sort',
    index: 'Sorting Algorithm 01',
    name: 'Bubble Sort',
    shortDescription: 'Compare adjacent elements',
    description:
      'Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. After each pass, the largest element "bubbles up" to its correct position at the end of the array.',
    complexity: [
      { caseName: 'Best', time: 'O(n)' },
      { caseName: 'Average / Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Simple and easy to implement.',
      'Good for learning basic sorting logic.',
      'Requires no extra memory.',
    ],
    disadvantages: [
      'Low performance on large datasets.',
      'High number of comparisons and swaps.',
      'Rarely used in production for large data.',
    ],
    code: `function bubbleSort(arr: number[]): number[] {
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
}

console.log(bubbleSort([5, 3, 8, 4, 2]));`,
  },
  {
    id: 'selection-sort',
    index: 'Sorting Algorithm 02',
    name: 'Selection Sort',
    shortDescription: 'Select the smallest element',
    description:
      'Selection Sort divides the array into a sorted and an unsorted region. In each iteration, it finds the smallest element in the unsorted region and moves it to the beginning.',
    complexity: [
      { caseName: 'Best / Average / Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Simple and easy to understand.',
      'Fewer swaps compared to Bubble Sort.',
      'No extra memory required.',
    ],
    disadvantages: [
      'Time complexity is always O(n²).',
      'Not efficient for large datasets.',
      'Does not benefit from partially sorted data.',
    ],
    code: `function selectionSort(arr: number[]): number[] {
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }

    [result[i], result[minIndex]] = [result[minIndex], result[i]];
  }

  return result;
}

console.log(selectionSort([5, 3, 8, 4, 2]));`,
  },
  {
    id: 'insertion-sort',
    index: 'Sorting Algorithm 03',
    name: 'Insertion Sort',
    shortDescription: 'Insert element at correct position',
    description:
      'Insertion Sort builds a sorted list one item at a time. It takes each element from the unsorted portion and inserts it into the correct position within the sorted portion.',
    complexity: [
      { caseName: 'Best', time: 'O(n)' },
      { caseName: 'Average / Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Efficient for small datasets.',
      'Works well with partially sorted arrays.',
      'Simple to implement.',
    ],
    disadvantages: [
      'Inefficient for large datasets.',
      'Worst-case performance remains O(n²).',
      'Requires many element shifts.',
    ],
    code: `function insertionSort(arr: number[]): number[] {
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = current;
  }

  return result;
}

console.log(insertionSort([5, 3, 8, 4, 2]));`,
  },
  {
    id: 'quick-sort',
    index: 'Sorting Algorithm 04',
    name: 'Quick Sort',
    shortDescription: 'Pivot and partition',
    description:
      'Quick Sort picks a pivot element and partitions the array into two subarrays: those smaller than the pivot and those larger. It then recursively sorts the subarrays.',
    complexity: [
      { caseName: 'Average', time: 'O(n log n)' },
      { caseName: 'Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(log n)' },
    ],
    advantages: [
      'Very fast in practice for most cases.',
      'Suitable for large datasets.',
      'Minimal extra memory usage compared to Merge Sort.',
    ],
    disadvantages: [
      'Worst-case performance can reach O(n²).',
      'Performance depends on pivot selection.',
      'Recursive implementation needs careful handling.',
    ],
    code: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([5, 3, 8, 4, 2]));`,
  },
];

const SortingAlgorithms: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, []);

  const scrollToSection = (id: string) => {
    window.history.pushState(null, '', `#${id}`);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

 const scrollToTop = () => {
    const container = document.querySelector('.algorithm-about-page');
    
    if (container) {
      // Ép giá trị scrollTop về 0 trực tiếp
      container.scrollTop = 0; 
      console.log("Forced scroll to top");
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <>
      <GeometricBackground />
      <Header />
      <div className='algorithm-about-page'>
        <div className='algorithm-about-container'>
          <div className='algorithm-about-header'>
            <p className='algorithm-about-tag'>Algorithm Learning</p>
            <h1 className='algorithm-about-title'>📊 Sorting Algorithms</h1>
            <p className='algorithm-about-desc'>
              Sorting algorithms are used to arrange data in a specific order. 
              This section explains common sorting algorithms with descriptions, 
              complexity analysis, and TypeScript examples.
            </p>
          </div>

          <div className='algorithm-glass-card algorithm-nav'>
            <h2 className='algorithm-nav-title'>📚 Sorting Algorithm List</h2>
            <div className='algorithm-nav-grid sorting'>
              {sortingAlgorithms.map((algorithm) => (
                <button
                  key={algorithm.id}
                  onClick={() => scrollToSection(algorithm.id)}
                  className='algorithm-nav-button'
                >
                  <h3>{algorithm.name}</h3>
                  <p>{algorithm.shortDescription}</p>
                </button>
              ))}
            </div>
          </div>

          <div className='algorithm-glass-card algorithm-overview'>
            <h2 className='algorithm-section-heading'>📌 Overview</h2>
            <div className='algorithm-overview-grid'>
              <div className='algorithm-mini-card'>
                <h3>Objective</h3>
                <p>Arrange elements in ascending or descending order for easier data processing.</p>
              </div>
              <div className='algorithm-mini-card'>
                <h3>Applications</h3>
                <p>Ranking scores, organizing products, sorting user data, or managing database results.</p>
              </div>
              <div className='algorithm-mini-card'>
                <h3>Significance</h3>
                <p>Efficient sorting optimizes searching, data analysis, and information organization.</p>
              </div>
            </div>
          </div>

          {sortingAlgorithms.map((algorithm) => (
            <section
              key={algorithm.id}
              id={algorithm.id}
              className='algorithm-glass-card algorithm-detail-card'
            >
              <div className='algorithm-detail-top'>
                <div>
                  <p className='algorithm-index'>{algorithm.index}</p>
                  <h2 className='algorithm-detail-title'>{algorithm.name}</h2>
                </div>
                <button onClick={scrollToTop} className='algorithm-top-button'>↑ Top</button>
              </div>

              <div className='algorithm-content-grid'>
                <div className='algorithm-text-block'>
                  <h3>Description</h3>
                  <p>{algorithm.description}</p>
                </div>
                <div className='algorithm-complexity'>
                  <h3>Complexity</h3>
                  <table className='algorithm-table'>
                    <thead>
                      <tr><th>Case</th><th>Time</th></tr>
                    </thead>
                    <tbody>
                      {algorithm.complexity.map((row) => (
                        <tr key={row.caseName}><td>{row.caseName}</td><td>{row.time}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className='algorithm-two-grid'>
                <div className='algorithm-list-card positive'>
                  <h3>✅ Advantages</h3>
                  <ul>{algorithm.advantages.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className='algorithm-list-card negative'>
                  <h3>⚠️ Disadvantages</h3>
                  <ul>{algorithm.disadvantages.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>

              <div className='algorithm-code-block'>
                <h3>TypeScript Example</h3>
                <pre><code>{algorithm.code}</code></pre>
              </div>
            </section>
          ))}

          <div className='algorithm-bottom-nav'>
            {sortingAlgorithms.map((algo) => (
              <button key={algo.id} onClick={() => scrollToSection(algo.id)}>
                {algo.name}
              </button>
            ))}
            <button onClick={scrollToTop} className='secondary'>Back to Top</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortingAlgorithms;