// src/components/PracticeSkeleton.tsx
import React from 'react';

const PracticeSkeleton: React.FC = () => {
  // Hiệu ứng nhấp nháy mờ ảo mượt mà cho theme tối sâu (Cyberpunk/Dark UI)
  const injectStyles = `
    @keyframes practicePulse {
      0% { opacity: 0.4; }
      50% { opacity: 0.7; }
      100% { opacity: 0.4; }
    }
    .sk-pulse-card {
      animation: practicePulse 1.6s infinite ease-in-out;
    }
  `;

  // Giả lập hiển thị 8 ô card để lấp đầy khoảng trống Grid lúc đang load
  const skeletonCards = Array(8).fill(0);

  return (
    <>
      <style>{injectStyles}</style>
      
      {/* Cấu trúc Grid đồng bộ khoảng cách thoáng đãng của trang practice */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="sk-pulse-card"
            style={{
              background: '#16171b',       /* Khớp màu card tối sẫm mới của hệ thống */
              border: '1px solid #272930', /* Đường viền mảnh đồng màu */
              padding: '24px',             /* Khớp chuẩn padding 24px giúp card thoáng hơn */
              borderRadius: '8px',         /* Hạ bo góc thô từ 20px xuống 8px phẳng tinh tế */
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '210px'           /* Khớp chiều cao thực tế sau khi giãn khoảng cách */
            }}
          >
            {/* Giả lập Tiêu đề bài tập (Ví dụ: Search Range in Sorted Array) */}
            <div style={{ 
              height: '22px', 
              backgroundColor: '#2d3039', 
              borderRadius: '4px', 
              width: '80%',
              marginBottom: '20px'         /* Tạo độ giãn cách từ tiêu đề xuống info */
            }}></div>
            
            {/* Khối chứa 2 dòng thông tin giả lập (Algorithm & Difficulty) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Giả lập Dòng chữ Thuật toán (Algorithm: binary_search) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '14px', backgroundColor: '#232429', borderRadius: '4px', width: '65px' }}></div>
                <div style={{ height: '20px', backgroundColor: '#2d3039', borderRadius: '4px', width: '90px' }}></div>
              </div>
              
              {/* Giả lập Dòng chữ Độ khó (Difficulty: MEDIUM) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '14px', backgroundColor: '#232429', borderRadius: '4px', width: '55px' }}></div>
                <div style={{ height: '20px', backgroundColor: '#2d3039', borderRadius: '4px', width: '60px' }}></div>
              </div>

            </div>
            
            {/* Giả lập Nút bấm "Start Practice" full-width ép xuống đáy card */}
            <div style={{ 
              height: '38px', 
              backgroundColor: '#2d3039', 
              borderRadius: '6px', 
              width: '100%',               /* Sửa từ 110px thành 100% để kéo dài full card */
              marginTop: 'auto'            /* Đẩy dạt xuống sát đáy hoàn toàn */
            }}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PracticeSkeleton;