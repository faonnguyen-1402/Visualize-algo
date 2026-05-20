// src/components/ExerciseSkeleton.tsx
import React from 'react';

const ExerciseSkeleton: React.FC = () => {
  // Hiệu ứng nhấp nháy mờ ảo mượt mà đồng bộ với hệ thống VIZALGO
  const injectStyles = `
    @keyframes cyberpunkPulse {
      0% { opacity: 0.4; }
      50% { opacity: 0.7; }
      100% { opacity: 0.4; }
    }
    .sk-pulse {
      animation: cyberpunkPulse 1.6s infinite ease-in-out;
    }
  `;

  return (
    <div className="leetcode-container sk-pulse" style={{ width: '100%', height: 'calc(100vh - 70px)', backgroundColor: '#0d0e12', overflow: 'hidden' }}>
      <style>{injectStyles}</style>
      
      {/* Khung Flex split layout y hệt trang thực tế */}
      <div className="exercise-detail" style={{ display: 'flex', height: '100%' }}>
        
        {/* ==========================================================================
           --- CỘT TRÁI: GIẢ LẬP ĐỀ BÀI (PROBLEM DESCRIPTION) ---
           ========================================================================== */}
        <div className="exercise-left" style={{ flex: 1, padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'hidden' }}>
          
          {/* Giả lập Nhãn độ khó (Difficulty Tag) */}
          <div style={{ height: '24px', backgroundColor: '#2d3039', borderRadius: '4px', width: '80px', marginBottom: '4px' }}></div>
          
          {/* Giả lập Tiêu đề bài toán */}
          <div style={{ height: '32px', backgroundColor: '#2d3039', borderRadius: '4px', width: '65%' }}></div>
          
          {/* Giả lập các đoạn mô tả đề bài */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <div style={{ height: '15px', backgroundColor: '#16171b', borderRadius: '4px', width: '100%' }}></div>
            <div style={{ height: '15px', backgroundColor: '#16171b', borderRadius: '4px', width: '95%' }}></div>
            <div style={{ height: '15px', backgroundColor: '#16171b', borderRadius: '4px', width: '88%' }}></div>
            <div style={{ height: '15px', backgroundColor: '#16171b', borderRadius: '4px', width: '40%' }}></div>
          </div>

          {/* Giả lập Hộp ví dụ (Example Box) */}
          <div className="example-box" style={{ background: '#16171b', border: '1px solid #272930', padding: '20px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <div style={{ height: '16px', backgroundColor: '#2d3039', borderRadius: '4px', width: '120px' }}></div>
            <div style={{ height: '14px', backgroundColor: '#232429', borderRadius: '4px', width: '85%' }}></div>
            <div style={{ height: '14px', backgroundColor: '#232429', borderRadius: '4px', width: '70%' }}></div>
          </div>
        </div>

        {/* Thanh ngăn cách giữa 2 cột (Gutter giả lập) */}
        <div className="gutter gutter-horizontal" style={{ width: '4px', background: '#111216', borderLeft: '1px solid #232429', borderRight: '1px solid #232429' }}></div>

        {/* ==========================================================================
           --- CỘT PHẢI: GIẢ LẬP TRÌNH SOẠN THẢO & CONSOLE ---
           ========================================================================== */}
        <div className="exercise-right" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* 1. Header Editor giả lập */}
          <div className="editor-header" style={{ height: '52px', background: '#111216', borderBottom: '1px solid #232429', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            {/* Giả lập Select Box chọn ngôn ngữ */}
            <div style={{ height: '30px', backgroundColor: '#16171b', border: '1px solid #2d3039', borderRadius: '6px', width: '110px' }}></div>
            {/* Giả lập cụm nút Run / Submit */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ height: '32px', backgroundColor: '#2d3039', borderRadius: '6px', width: '65px' }}></div>
              <div style={{ height: '32px', backgroundColor: '#2d3039', borderRadius: '6px', width: '80px' }}></div>
            </div>
          </div>

          {/* Cấu trúc chia dọc phần Editor bên phải */}
          <div className="editor-split" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* 2. Khung nhập Code (Editor Container) */}
            <div className="editor-container" style={{ flex: 1, backgroundColor: '#16171b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ height: '14px', backgroundColor: '#2d3039', borderRadius: '4px', width: '40%' }}></div>
              <div style={{ height: '14px', backgroundColor: '#2d3039', borderRadius: '4px', width: '55%', marginLeft: '20px' }}></div>
              <div style={{ height: '14px', backgroundColor: '#2d3039', borderRadius: '4px', width: '30%', marginLeft: '40px' }}></div>
            </div>

            {/* Thanh ngăn cách ngang (Gutter dọc giả lập) */}
            <div className="gutter gutter-vertical" style={{ height: '4px', background: '#111216', borderTop: '1px solid #232429', borderBottom: '1px solid #232429' }}></div>

            {/* 3. Khung Testcase / Console phía dưới */}
            <div className="bottom-panel" style={{ height: '220px', background: '#0d0e12', borderTop: '1px solid #232429', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Giả lập các Tab Testcase */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ height: '28px', backgroundColor: '#16171b', border: '1px solid #2d3039', borderRadius: '6px', width: '70px' }}></div>
                <div style={{ height: '28px', backgroundColor: '#16171b', border: '1px solid #2d3039', borderRadius: '6px', width: '70px' }}></div>
                <div style={{ height: '28px', backgroundColor: '#16171b', border: '1px solid #2d3039', borderRadius: '6px', width: '70px' }}></div>
              </div>
              {/* Giả lập Hộp Console nội dung */}
              <div className="console-box" style={{ flex: 1, background: '#111216', border: '1px solid #232429', borderRadius: '6px', padding: '16px' }}>
                <div style={{ height: '14px', backgroundColor: '#2d3039', borderRadius: '4px', width: '150px' }}></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ExerciseSkeleton;