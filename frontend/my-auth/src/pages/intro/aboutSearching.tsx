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
  vietnameseName: string;
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
    vietnameseName: 'Tìm kiếm tuyến tính',
    shortDescription: 'Duyệt từng phần tử từ đầu đến cuối mảng',
    description:
      'Linear Search là thuật toán tìm kiếm đơn giản nhất. Thuật toán duyệt lần lượt từng phần tử trong mảng từ trái sang phải và so sánh với giá trị cần tìm. Nếu tìm thấy, thuật toán trả về vị trí của phần tử. Nếu duyệt hết mảng mà không thấy, kết quả là không tồn tại.',
    complexity: [
      { caseName: 'Best', time: 'O(1)' },
      { caseName: 'Average', time: 'O(n)' },
      { caseName: 'Worst', time: 'O(n)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Dễ hiểu, dễ cài đặt.',
      'Không yêu cầu mảng phải được sắp xếp.',
      'Phù hợp với dữ liệu nhỏ.',
      'Không cần thêm bộ nhớ phụ.',
    ],
    disadvantages: [
      'Chậm khi dữ liệu lớn.',
      'Trong trường hợp xấu nhất phải duyệt toàn bộ mảng.',
      'Không tận dụng được dữ liệu đã sắp xếp.',
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
    vietnameseName: 'Tìm kiếm nhị phân',
    shortDescription: 'Chia đôi phạm vi tìm kiếm trên mảng đã sắp xếp',
    description:
      'Binary Search là thuật toán tìm kiếm hiệu quả trên mảng đã được sắp xếp. Thuật toán so sánh giá trị cần tìm với phần tử ở giữa mảng. Nếu target nhỏ hơn phần tử giữa, tiếp tục tìm ở nửa trái. Nếu target lớn hơn, tiếp tục tìm ở nửa phải. Quá trình này lặp lại cho đến khi tìm thấy phần tử hoặc phạm vi tìm kiếm rỗng.',
    complexity: [
      { caseName: 'Best', time: 'O(1)' },
      { caseName: 'Average', time: 'O(log n)' },
      { caseName: 'Worst', time: 'O(log n)' },
      { caseName: 'Space', time: 'O(1)' },
    ],
    advantages: [
      'Tốc độ tìm kiếm nhanh với dữ liệu lớn.',
      'Độ phức tạp O(log n) tốt hơn Linear Search.',
      'Không cần thêm bộ nhớ phụ nếu dùng vòng lặp.',
    ],
    disadvantages: [
      'Chỉ áp dụng được khi dữ liệu đã sắp xếp.',
      'Cần xử lý chỉ số left, right, mid cẩn thận.',
      'Không phù hợp nếu dữ liệu thay đổi liên tục và chưa được sắp xếp.',
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

            <h1 className='algorithm-about-title'>🔍 Searching Algorithms</h1>

            <p className='algorithm-about-desc'>
              Searching algorithms help locate data inside arrays or collections
              efficiently. This section explains Linear Search and Binary Search
              with descriptions, complexity analysis and TypeScript examples.
            </p>
          </div>

          <div className='algorithm-glass-card algorithm-nav'>
            <h2 className='algorithm-nav-title'>
              🔍 Danh sách thuật toán tìm kiếm
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
            <h2 className='algorithm-section-heading'>📌 Tổng quan</h2>

            <div className='algorithm-overview-grid'>
              <div className='algorithm-mini-card'>
                <h3>Mục tiêu</h3>
                <p>
                  Xác định xem một giá trị có tồn tại trong danh sách hay không,
                  nếu có thì trả về vị trí của giá trị đó.
                </p>
              </div>

              <div className='algorithm-mini-card'>
                <h3>Ứng dụng</h3>
                <p>
                  Tìm kiếm dữ liệu trong mảng, danh sách, cơ sở dữ liệu, danh
                  bạ, sản phẩm hoặc hệ thống quản lý thông tin.
                </p>
              </div>

              <div className='algorithm-mini-card'>
                <h3>So sánh chính</h3>
                <p>
                  Linear Search dễ hiểu nhưng chậm với dữ liệu lớn. Binary
                  Search nhanh hơn nhưng yêu cầu dữ liệu đã sắp xếp.
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

          <div className='algorithm-glass-card algorithm-compare'>
            <h2 className='algorithm-section-heading'>
              📊 So sánh Linear Search và Binary Search
            </h2>

            <div className='overflow-x-auto'>
              <table className='algorithm-table'>
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>Linear Search</th>
                    <th>Binary Search</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Yêu cầu dữ liệu</td>
                    <td>Không cần sắp xếp</td>
                    <td>Cần sắp xếp</td>
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
                    <td>Phù hợp với</td>
                    <td>Dữ liệu nhỏ, chưa sắp xếp</td>
                    <td>Dữ liệu lớn, đã sắp xếp</td>
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
              Lên đầu trang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchingAlgorithms;
