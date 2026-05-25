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
  vietnameseName: string;
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
    vietnameseName: 'Sắp xếp nổi bọt',
    shortDescription: 'So sánh các phần tử liền kề',
    description:
      'Bubble Sort liên tục so sánh hai phần tử liền kề và hoán đổi nếu chúng sai thứ tự. Sau mỗi vòng lặp, phần tử lớn nhất sẽ dần nổi lên cuối mảng.',
    complexity: [
      { caseName: 'Best', time: 'O(n)' },
      { caseName: 'Average / Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Dễ hiểu, dễ cài đặt.',
      'Phù hợp để học tư duy sắp xếp cơ bản.',
      'Không cần thêm bộ nhớ phụ lớn.',
    ],
    disadvantages: [
      'Hiệu suất thấp với dữ liệu lớn.',
      'Số lần so sánh và hoán đổi nhiều.',
      'Ít được dùng trong thực tế cho dữ liệu lớn.',
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
    vietnameseName: 'Sắp xếp chọn',
    shortDescription: 'Chọn phần tử nhỏ nhất',
    description:
      'Selection Sort chia mảng thành phần đã sắp xếp và chưa sắp xếp. Ở mỗi lượt, thuật toán tìm phần tử nhỏ nhất trong phần chưa sắp xếp rồi đưa về đầu phần đó.',
    complexity: [
      { caseName: 'Best / Average / Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Dễ hiểu và dễ triển khai.',
      'Số lần hoán đổi ít hơn Bubble Sort.',
      'Không cần thêm bộ nhớ phụ lớn.',
    ],
    disadvantages: [
      'Thời gian chạy luôn là O(n²).',
      'Không hiệu quả với dữ liệu lớn.',
      'Không tận dụng được trường hợp mảng gần như đã sắp xếp.',
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
    vietnameseName: 'Sắp xếp chèn',
    shortDescription: 'Chèn phần tử vào đúng vị trí',
    description:
      'Insertion Sort xây dựng dần một dãy đã sắp xếp. Mỗi phần tử mới sẽ được lấy ra và chèn vào vị trí phù hợp trong phần đã sắp xếp.',
    complexity: [
      { caseName: 'Best', time: 'O(n)' },
      { caseName: 'Average / Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Hiệu quả với dữ liệu nhỏ.',
      'Tốt khi mảng gần như đã sắp xếp.',
      'Cài đặt đơn giản.',
    ],
    disadvantages: [
      'Không hiệu quả với dữ liệu lớn.',
      'Trường hợp xấu nhất vẫn là O(n²).',
      'Cần dịch chuyển nhiều phần tử.',
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
    id: 'merge-sort',
    index: 'Sorting Algorithm 04',
    name: 'Merge Sort',
    vietnameseName: 'Sắp xếp trộn',
    shortDescription: 'Chia để trị',
    description:
      'Merge Sort là thuật toán chia để trị. Thuật toán chia mảng thành các mảng nhỏ hơn, sắp xếp từng phần rồi trộn các phần đã sắp xếp lại với nhau.',
    complexity: [
      { caseName: 'Best / Average / Worst', time: 'O(n log n)' },
      { caseName: 'Space', time: 'O(n)' },
    ],
    advantages: [
      'Hiệu suất ổn định O(n log n).',
      'Phù hợp với dữ liệu lớn.',
      'Dễ phân tích theo tư duy chia để trị.',
    ],
    disadvantages: [
      'Cần thêm bộ nhớ phụ O(n).',
      'Cài đặt dài hơn các thuật toán cơ bản.',
      'Có thể không tối ưu với dữ liệu nhỏ.',
    ],
    code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([5, 3, 8, 4, 2]));`,
  },
  {
    id: 'quick-sort',
    index: 'Sorting Algorithm 05',
    name: 'Quick Sort',
    vietnameseName: 'Sắp xếp nhanh',
    shortDescription: 'Pivot và phân hoạch',
    description:
      'Quick Sort chọn một phần tử làm pivot, sau đó phân hoạch mảng thành hai phần: nhỏ hơn pivot và lớn hơn pivot. Thuật toán tiếp tục đệ quy sắp xếp hai phần này.',
    complexity: [
      { caseName: 'Average', time: 'O(n log n)' },
      { caseName: 'Worst', time: 'O(n²)' },
      { caseName: 'Space', time: 'O(log n)' },
    ],
    advantages: [
      'Nhanh trong hầu hết trường hợp thực tế.',
      'Phù hợp với dữ liệu lớn.',
      'Không cần nhiều bộ nhớ phụ nếu cài đặt tối ưu.',
    ],
    disadvantages: [
      'Trường hợp xấu nhất có thể là O(n²).',
      'Phụ thuộc vào cách chọn pivot.',
      'Cài đặt đệ quy cần xử lý cẩn thận.',
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
    window.history.pushState(null, '', window.location.pathname);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
              Sorting algorithms are used to arrange data in a specific order,
              such as ascending or descending. This section explains common
              sorting algorithms with descriptions, complexity analysis and
              TypeScript examples.
            </p>
          </div>

          <div className='algorithm-glass-card algorithm-nav'>
            <h2 className='algorithm-nav-title'>
              📚 Danh sách thuật toán sắp xếp
            </h2>

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
            <h2 className='algorithm-section-heading'>📌 Tổng quan</h2>

            <div className='algorithm-overview-grid'>
              <div className='algorithm-mini-card'>
                <h3>Mục tiêu</h3>
                <p>
                  Sắp xếp các phần tử theo thứ tự tăng dần hoặc giảm dần để dữ
                  liệu dễ xử lý hơn.
                </p>
              </div>

              <div className='algorithm-mini-card'>
                <h3>Ứng dụng</h3>
                <p>
                  Sắp xếp điểm số, sản phẩm, dữ liệu người dùng, kết quả tìm
                  kiếm hoặc dữ liệu trong hệ thống.
                </p>
              </div>

              <div className='algorithm-mini-card'>
                <h3>Ý nghĩa</h3>
                <p>
                  Sắp xếp giúp tối ưu tìm kiếm, phân tích dữ liệu và tổ chức
                  thông tin hiệu quả hơn.
                </p>
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

                  <h2 className='algorithm-detail-title'>
                    {algorithm.name}
                    <span> — {algorithm.vietnameseName}</span>
                  </h2>
                </div>

                <button onClick={scrollToTop} className='algorithm-top-button'>
                  ↑ Top
                </button>
              </div>

              <div className='algorithm-content-grid'>
                <div className='algorithm-text-block'>
                  <h3>Mô tả</h3>
                  <p>{algorithm.description}</p>
                </div>

                <div className='algorithm-complexity'>
                  <h3>Độ phức tạp</h3>

                  <table className='algorithm-table'>
                    <thead>
                      <tr>
                        <th>Trường hợp</th>
                        <th>Thời gian</th>
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
                  <h3>✅ Ưu điểm</h3>

                  <ul>
                    {algorithm.advantages.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className='algorithm-list-card negative'>
                  <h3>⚠️ Nhược điểm</h3>

                  <ul>
                    {algorithm.disadvantages.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='algorithm-code-block'>
                <h3>Ví dụ TypeScript</h3>

                <pre>
                  <code>{algorithm.code}</code>
                </pre>
              </div>
            </section>
          ))}

          <div className='algorithm-bottom-nav'>
            <button onClick={() => scrollToSection('bubble-sort')}>
              Bubble Sort
            </button>

            <button onClick={() => scrollToSection('merge-sort')}>
              Merge Sort
            </button>

            <button onClick={() => scrollToSection('quick-sort')}>
              Quick Sort
            </button>

            <button onClick={scrollToTop} className='secondary'>
              Lên đầu trang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortingAlgorithms;
