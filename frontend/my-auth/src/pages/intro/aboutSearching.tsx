import React from 'react';

const SearchingAlgorithms: React.FC = () => {
  return (
    <div className="py-12 bg-[#0f172a] text-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-[#67e8f9] mb-2">
          Searching Algorithms
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Tóm tắt học thuật chi tiết - 2 Thuật toán Tìm kiếm
        </p>

        {/* Linear Search */}
        <div className="bg-[#1e2937] border border-[#334155] rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#67e8f9] mb-4">1. Linear Search (Tìm kiếm tuyến tính)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Mô tả</h3>
              <p className="text-gray-400">Duyệt tuần tự từ đầu đến cuối mảng cho đến khi tìm thấy giá trị cần tìm.</p>
            </div>
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Độ phức tạp</h3>
              <table className="w-full text-sm border border-gray-700">
                <thead>
                  <tr><th className="p-3 text-left">Trường hợp</th><th className="p-3 text-left">Thời gian</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-t border-gray-700">Best / Average / Worst</td><td className="p-3 border-t border-gray-700">O(n)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Space</td><td className="p-3 border-t border-gray-700">O(1)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Binary Search */}
        <div className="bg-[#1e2937] border border-[#334155] rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-[#67e8f9] mb-4">2. Binary Search (Tìm kiếm nhị phân)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Mô tả</h3>
              <p className="text-gray-400">Chỉ áp dụng trên mảng đã sắp xếp. Liên tục chia đôi khoảng tìm kiếm.</p>
            </div>
            <div>
              <h3 className="text-[#cbd5e1] font-medium text-lg mb-2">Độ phức tạp</h3>
              <table className="w-full text-sm border border-gray-700">
                <thead>
                  <tr><th className="p-3 text-left">Trường hợp</th><th className="p-3 text-left">Thời gian</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-t border-gray-700">Best / Average / Worst</td><td className="p-3 border-t border-gray-700">O(log n)</td></tr>
                  <tr><td className="p-3 border-t border-gray-700">Space</td><td className="p-3 border-t border-gray-700">O(1)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingAlgorithms;