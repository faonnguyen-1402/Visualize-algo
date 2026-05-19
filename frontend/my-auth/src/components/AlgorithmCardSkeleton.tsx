// src/components/AlgorithmCardSkeleton.tsx
import React from 'react';

interface SkeletonProps {
  count: number;
}

const AlgorithmCardSkeleton: React.FC<SkeletonProps> = ({ count }) => {
  const injectStyles = `
    @keyframes cardPulse {
      0% { opacity: 0.2; }
      50% { opacity: 0.5; }
      100% { opacity: 0.2; }
    }
    .sk-card-pulse {
      animation: cardPulse 1.5s infinite ease-in-out;
    }
  `;

  const cards = Array(count).fill(0);

  return (
    <>
      <style>{injectStyles}</style>
      {cards.map((_, index) => (
        <div
          key={index}
          className="sk-card-pulse"
          style={{
            position: 'relative',
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)', // Giả lập --bg-secondary
            border: '1px solid rgba(255, 255, 255, 0.1)',   // Giả lập --border-color
            borderRadius: '0.5rem',                         // Khớp chuẩn CSS của bạn
            overflow: 'hidden',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '140px' // Đảm bảo chiều cao tương đương card thật
          }}
        >
          {/* Giả lập Tiêu đề Thuật toán (ví dụ: Bubble Sort) */}
          <div style={{ height: '22px', backgroundColor: '#333', borderRadius: '4px', width: '70%' }}></div>
          
          {/* Giả lập đoạn mô tả ngắn bên trong card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            <div style={{ height: '14px', backgroundColor: '#2a2a2a', borderRadius: '4px', width: '90%' }}></div>
            <div style={{ height: '14px', backgroundColor: '#2a2a2a', borderRadius: '4px', width: '50%' }}></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AlgorithmCardSkeleton;