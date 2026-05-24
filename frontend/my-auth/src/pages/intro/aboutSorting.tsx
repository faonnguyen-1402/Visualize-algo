import React from 'react';

const SortingAlgorithms: React.FC = () => {
  return (
    <div className="py-12 bg-[#0f172a] text-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-[#67e8f9] mb-2">
          Sorting Algorithms
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Tóm tắt học thuật chi tiết - 4 Thuật toán Sắp xếp
        </p>

        {/* Bubble Sort */}
        <div className="bg-[#1e2937] border border-[#334155] rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#67e8f9] mb-4">1. Bubble Sort (Sắp xếp nổi bọt)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Mô tả</h3>
              <p className="text-gray-400">Thuật toán cơ bản nhất, liên tục so sánh các phần tử liền kề và hoán đổi nếu sai thứ tự. Phần tử lớn nhất sẽ nổi lên cuối mảng sau mỗi lượt.</p>
            </div>
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Độ phức tạp</h3>
              <table className="w-full text-sm border border-gray-700">
                <thead>
                  <tr><th className="p-3 text-left">Trường hợp</th><th className="p-3 text-left">Thời gian</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-t border-gray-700">Best</td><td className="p-3 border-t border-gray-700">O(n)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Average / Worst</td><td className="p-3 border-t border-gray-700">O(n²)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Space</td><td className="p-3 border-t border-gray-700">O(1)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selection Sort */}
        <div className="bg-[#1e2937] border border-[#334155] rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#67e8f9] mb-4">2. Selection Sort (Sắp xếp chọn)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Mô tả</h3>
              <p className="text-gray-400">Mỗi lượt tìm phần tử nhỏ nhất trong phần chưa sắp xếp và đưa về đầu phần đó.</p>
            </div>
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Độ phức tạp</h3>
              <table className="w-full text-sm border border-gray-700">
                <thead>
                  <tr><th className="p-3 text-left">Trường hợp</th><th className="p-3 text-left">Thời gian</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-t border-gray-700">Best / Average / Worst</td><td className="p-3 border-t border-gray-700">O(n²)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Space</td><td className="p-3 border-t border-gray-700">O(1)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insertion Sort */}
        <div className="bg-[#1e2937] border border-[#334155] rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#67e8f9] mb-4">3. Insertion Sort (Sắp xếp chèn)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Mô tả</h3>
              <p className="text-gray-400">Xây dựng dần dãy đã sắp xếp bằng cách chèn từng phần tử vào đúng vị trí.</p>
            </div>
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Độ phức tạp</h3>
              <table className="w-full text-sm border border-gray-700">
                <thead>
                  <tr><th className="p-3 text-left">Trường hợp</th><th className="p-3 text-left">Thời gian</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-t border-gray-700">Best</td><td className="p-3 border-t border-gray-700">O(n)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Average / Worst</td><td className="p-3 border-t border-gray-700">O(n²)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Space</td><td className="p-3 border-t border-gray-700">O(1)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Sort */}
        <div className="bg-[#1e2937] border border-[#334155] rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-[#67e8f9] mb-4">4. Quick Sort (Sắp xếp nhanh)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Mô tả</h3>
              <p className="text-gray-400">Chọn pivot, phân hoạch mảng và đệ quy sắp xếp hai phần.</p>
            </div>
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Độ phức tạp</h3>
              <table className="w-full text-sm border border-gray-700">
                <thead>
                  <tr><th className="p-3 text-left">Trường hợp</th><th className="p-3 text-left">Thời gian</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-t border-gray-700">Average</td><td className="p-3 border-t border-gray-700">O(n log n)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Worst</td><td className="p-3 border-t border-gray-700">O(n²)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Space</td><td className="p-3 border-t border-gray-700">O(log n)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingAlgorithms;