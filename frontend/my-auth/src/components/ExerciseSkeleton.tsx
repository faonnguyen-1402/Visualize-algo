// src/components/ExerciseSkeleton.tsx
import React from 'react';

const ExerciseSkeleton: React.FC = () => {
  // Tạo CSS animation trực tiếp bằng code để không cần cài thêm thư viện
  const injectStyles = `
    @keyframes cyberpunkPulse {
      0% { opacity: 0.3; }
      50% { opacity: 0.7; }
      100% { opacity: 0.3; }
    }
    .sk-pulse {
      animation: cyberpunkPulse 1.5s infinite ease-in-out;
    }
  `;

  return (
    <div style={{ width: '100%', minHeight: '100-vh', backgroundColor: '#1a1a1a', padding: '24px', boxSizing: 'border-box', color: '#fff' }}>
      <style>{injectStyles}</style>
      
      <div className="sk-pulse" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header giả lập */}
        <div style={{ height: '24px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '200px' }}></div>

        {/* Bố cục 2 cột giống trang thật */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* CỘT TRÁI: Đề bài */}
          <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#222222', border: '1px solid #333', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ height: '32px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '70%' }}></div>
            <div style={{ height: '20px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '30%' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <div style={{ height: '14px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '100%' }}></div>
              <div style={{ height: '14px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '95%' }}></div>
              <div style={{ height: '14px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '80%' }}></div>
            </div>
          </div>

          {/* CỘT PHẢI: Code Editor */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Khung Editor giả lập */}
            <div style={{ height: '400px', backgroundColor: '#1e1e1e', border: '1px solid #333', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ height: '20px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '100px' }}></div>
              <div style={{ height: '14px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '60%', opacity: 0.5 }}></div>
              <div style={{ height: '14px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '40%', opacity: 0.5 }}></div>
            </div>

            {/* Khung Testcase giả lập */}
            <div style={{ height: '120px', backgroundColor: '#222222', border: '1px solid #333', borderRadius: '8px', padding: '16px' }}>
              <div style={{ height: '20px', backgroundColor: '#2d2d2d', borderRadius: '4px', width: '80px' }}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExerciseSkeleton;