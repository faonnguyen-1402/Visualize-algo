import React, { useEffect } from 'react';
import Header from '../../components/header';
import GeometricBackground from '../../components/background/geometricBackground';
import './aboutAlgorithms.css';

type ComplexityRow = {
  caseName: string;
  time: string;
};

type SearchingAlgorithm = {
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

const searchingAlgorithms: SearchingAlgorithm[] = [
  {
    id: 'linear-search',
    index: 'Searching Algorithm 01',
    name: 'Linear Search',
    shortDescription: 'Traverse each element from start to end',
    description:
      'Linear Search is the simplest searching algorithm. It traverses the array sequentially from the first element to the last, comparing each element with the target value. If found, it returns the index; otherwise, it returns -1.',
    complexity: [
      { caseName: 'Best', time: 'O(1)' },
      { caseName: 'Average', time: 'O(n)' },
      { caseName: 'Worst', time: 'O(n)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Simple and easy to implement.',
      'Does not require the array to be sorted.',
      'Suitable for small datasets.',
      'No extra memory usage.',
    ],
    disadvantages: [
      'Slow for large datasets.',
      'Requires scanning the entire array in the worst case.',
      'Cannot take advantage of sorted data.',
    ],
    code: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

const numbers = [5, 3, 8, 4, 2];
console.log(linearSearch(numbers, 8)); // Output: 2`,
  },
  {
    id: 'binary-search',
    index: 'Searching Algorithm 02',
    name: 'Binary Search',
    shortDescription: 'Divide and conquer on a sorted array',
    description:
      'Binary Search is an efficient searching algorithm for sorted arrays. It compares the target value with the middle element. If the target is smaller, it searches the left half; if larger, it searches the right half. This repeats until found or the search range is empty.',
    complexity: [
      { caseName: 'Best', time: 'O(1)' },
      { caseName: 'Average', time: 'O(log n)' },
      { caseName: 'Worst', time: 'O(log n)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Fast search speed for large datasets.',
      'O(log n) complexity is significantly better than Linear Search.',
      'Memory efficient when implemented iteratively.',
    ],
    disadvantages: [
      'Only applicable to sorted data.',
      'Requires careful index management (left, right, mid).',
      'Not suitable if the data changes frequently and remains unsorted.',
    ],
    code: `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const numbers = [2, 4, 6, 8, 10, 12];
console.log(binarySearch(numbers, 8)); // Output: 3`,
  },
];

const SearchingAlgorithms: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 120);
    }
  }, []);

  const scrollToSection = (id: string) => {
    window.history.pushState(null, '', `#${id}`);
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
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

            <h1 className='algorithm-about-title'>🔍 Searching Algorithms</h1>

            <p className='algorithm-about-desc'>
              Searching algorithms help locate data inside arrays or collections
              efficiently. This section explains Linear Search and Binary Search
              with descriptions, complexity analysis, and TypeScript examples.
            </p>
          </div>

          <div className='algorithm-glass-card algorithm-nav'>
            <h2 className='algorithm-nav-title'>
              🔍 Searching Algorithm List
            </h2>

            <div className='algorithm-nav-grid searching'>
              {searchingAlgorithms.map((algorithm) => (
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
                <p>
                  Determine if a value exists in a list; if so, return its position.
                </p>
              </div>

              <div className='algorithm-mini-card'>
                <h3>Applications</h3>
                <p>
                  Searching data in arrays, lists, databases, contacts, products, or information management systems.
                </p>
              </div>

              <div className='algorithm-mini-card'>
                <h3>Key Comparison</h3>
                <p>
                  Linear Search is simple but slow for large data. Binary Search is much faster but requires sorted data.
                </p>
              </div>
            </div>
          </div>

          {searchingAlgorithms.map((algorithm) => (
            <section
              key={algorithm.id}
              id={algorithm.id}
              className='algorithm-glass-card algorithm-detail-card'
            >
              <div className='algorithm-detail-top'>
                <div>
                  <p className='algorithm-index'>{algorithm.index}</p>

                  <h2 className='algorithm-detail-title'>
                    {algorithm.name}
                  </h2>
                </div>

                <button onClick={scrollToTop} className='algorithm-top-button'>
                  ↑ Top
                </button>
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
                      <tr>
                        <th>Case</th>
                        <th>Time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {algorithm.complexity.map((row) => (
                        <tr key={row.caseName}>
                          <td>{row.caseName}</td>
                          <td>{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className='algorithm-two-grid'>
                <div className='algorithm-list-card positive'>
                  <h3>✅ Advantages</h3>

                  <ul>
                    {algorithm.advantages.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className='algorithm-list-card negative'>
                  <h3>⚠️ Disadvantages</h3>

                  <ul>
                    {algorithm.disadvantages.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='algorithm-code-block'>
                <h3>TypeScript Example</h3>

                <pre>
                  <code>{algorithm.code}</code>
                </pre>
              </div>
            </section>
          ))}

          <div className='algorithm-glass-card algorithm-compare'>
            <h2 className='algorithm-section-heading'>
              📊 Comparison: Linear vs Binary Search
            </h2>

            <div className='overflow-x-auto'>
              <table className='algorithm-table'>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Linear Search</th>
                    <th>Binary Search</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Data Requirement</td>
                    <td>Unsorted/Any</td>
                    <td>Must be Sorted</td>
                  </tr>
                  <tr>
                    <td>Best Case</td>
                    <td>O(1)</td>
                    <td>O(1)</td>
                  </tr>
                  <tr>
                    <td>Average Case</td>
                    <td>O(n)</td>
                    <td>O(log n)</td>
                  </tr>
                  <tr>
                    <td>Worst Case</td>
                    <td>O(n)</td>
                    <td>O(log n)</td>
                  </tr>
                  <tr>
                    <td>Best for</td>
                    <td>Small, Unsorted Data</td>
                    <td>Large, Sorted Data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='algorithm-bottom-nav'>
            <button onClick={() => scrollToSection('linear-search')}>
              Linear Search
            </button>

            <button onClick={() => scrollToSection('binary-search')}>
              Binary Search
            </button>

            <button onClick={scrollToTop} className='secondary'>
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchingAlgorithms;