import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import VisualRender from './VisualRender';
import CodePanel from './codepanel';
import Controls from './controls';
import { fetchAlgorithmBySlug } from '../services/algoService';
import { Algorithm } from '../types/algorithm';
import "../pages/home/mainapp.css"; // Dùng chung style với mainapp

const AlgorithmDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [algo, setAlgo] = useState<Algorithm | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Logic điều khiển giả lập (Để fix lỗi Controls) ---
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalSteps = 15; // Giả lập tổng số bước chạy

  useEffect(() => {
    const getDetail = async () => {
      if (slug) {
        console.log("Đang tìm thuật toán với slug:", slug);
        try {
          setLoading(true);
          const data = await fetchAlgorithmBySlug(slug);
          setAlgo(data);
        } catch (error) {
          console.error("Lỗi khi tải chi tiết thuật toán:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getDetail();
  }, [slug]);

  if (loading) return <div className="loading-screen">INITIALIZING ALGORITHM MODULE...</div>;
  if (!algo) return <div className="error-screen">ALGORITHM NOT FOUND</div>;

  return (
  <div className="is-detail-page-full"> {/* Class định danh mới */}
    <Header />
    
    <div className="modal-overlay active standalone"> {/* Thêm standalone */}
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="glitch-text" data-text={algo.title}>
            {algo.title || algo.name}
          </h2>
          {/* Không cần nút Close vì đây là trang riêng */}
        </div>

        <div className="modal-body">
          <p className="algo-description">{algo.description}</p>

          {/* INFO GRID - Giữ nguyên class của Modal */}
          <div className="algo-info-grid">
            <div className="info-card">
              <div className="info-label">Difficulty</div>
              <div className="info-value">{algo.difficulty}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Time Complexity</div>
              <div className="info-value">
                {/* Dùng Latex như cũ */}
                $$O({algo.timeComplexity || 'n^2'})$$
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">Space Complexity</div>
              <div className="info-value">
                $$O({algo.spaceComplexity || '1'})$$
              </div>
            </div>
          </div>

          {/* VISUAL - Layout chia 2 bên */}
          <div className="visualization-container cyberpunk-panel">
            <VisualRender algorithm={algo} />
            
            <Controls 
              step={step}
              total={totalSteps}
              isPlaying={isPlaying}
              onNext={() => setStep(prev => Math.min(prev + 1, totalSteps))}
              onPrev={() => setStep(prev => Math.max(prev - 1, 0))}
              onPlay={() => setIsPlaying(!isPlaying)}
              onReset={() => { setStep(0); setIsPlaying(false); }}
            />
          </div>

          {/* CODE PANEL */}
          <div className="code-panel-wrapper">
             <CodePanel algorithm={algo} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default AlgorithmDetail;