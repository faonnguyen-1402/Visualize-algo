// src/components/PracticeSkeleton.tsx
import React from 'react';

const PracticeSkeleton: React.FC = () => {
  // Hiệu ứng nhấp nháy mờ ảo mượt mà cho theme tối
  const injectStyles = `
    @keyframes practicePulse {
      0% { opacity: 0.3; }
      50% { opacity: 0.6; }
      100% { opacity: 0.3; }
    }
    .sk-pulse-card {
      animation: practicePulse 1.5s infinite ease-in-out;
    }
  `;

  // Giả lập hiển thị 8 ô card để lấp đầy khoảng trống Grid lúc đang load
  const skeletonCards = Array(8).fill(0);

  return (
    <>
      <style>{injectStyles}</style>
      
      {/* Sử dụng cấu trúc CSS thuần lặp lại đúng logic Grid của bạn 
        để các ô xương xếp hàng y hệt các ô bài tập thật
      */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="sk-pulse-card"
            style={{
              background: '#1e293b', /* Khớp chuẩn màu nền của .exercise-card */
              padding: '20px',       /* Khớp chuẩn padding của .exercise-card */
              borderRadius: '20px',  /* Khớp chuẩn độ bo góc của .exercise-card */
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: '180px'     /* Chiều cao ước lượng tương đối của card thật */
            }}
          >
            {/* Giả lập Tiêu đề bài tập (Ví dụ: Bubble Sort Basic) */}
            <div style={{ height: '24px', backgroundColor: '#334155', borderRadius: '6px', width: '75%' }}></div>
            
            {/* Giả lập Dòng chữ Thuật toán (Algorithm: ...) */}
            <div style={{ height: '14px', backgroundColor: '#334155', borderRadius: '4px', width: '55%', marginTop: '6px' }}></div>
            
            {/* Giả lập Dòng chữ Độ khó (Difficulty: ...) */}
            <div style={{ height: '14px', backgroundColor: '#334155', borderRadius: '4px', width: '40%' }}></div>
            
            {/* Giả lập Nút bấm "Start Practice" ở dưới cùng */}
            <div style={{ 
              height: '36px', 
              backgroundColor: '#475569', 
              borderRadius: '8px', 
              width: '110px', 
              marginTop: 'auto' /* Đẩy nút bấm xuống sát đáy card */
            }}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PracticeSkeleton;