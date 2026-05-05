import "../pages/home/mainapp.css";
import Visualization from "./Visualization";
import Controls from "./controls";
import CodePanel from "./codepanel";
import { Algorithm } from "../types/algorithm";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { useAnimation } from "../hooks/useAnimation";
import { useEffect } from "react";

type Props = {
  algorithm: Algorithm;
  onClose: () => void;
};

const AlgorithmModal = ({ algorithm, onClose }: Props) => {
  const {
    values,
    steps,
    step,
    isPlaying,
    loadAlgorithm,
    next,
    prev,
    play,
    pause,
    reset
  } = useAlgorithm();

  useEffect(() => {
    loadAlgorithm(algorithm.id);
  }, [algorithm]);

  // chạy animation theo step
  useAnimation(steps[step]);

  return (
    <div className="modal-overlay active">
      <div className="modal-content">
        
        <div className="modal-header">
          <h2>{algorithm.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p>{algorithm.description}</p>

          {/* INFO */}
          <div className="algo-info-grid">
            <div className="info-card">
              <div className="info-label">Độ khó</div>
              <div className="info-value">{algorithm.difficulty}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Độ phức tạp thời gian</div>
              <div className="info-value">{algorithm.timeComplexity}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Độ phức tạp không gian</div>
              <div className="info-value">{algorithm.spaceComplexity}</div>
            </div>
          </div>

          {/* VISUAL */}
          <div className="visualization-container">
            <Visualization values={values} />
            <Controls
              step={step}
              total={steps.length}
              isPlaying={isPlaying}
              onNext={next}
              onPrev={prev}
              onPlay={isPlaying ? pause : play}
              onReset={reset}
            />
          </div>

          <CodePanel algorithm={algorithm} />
        </div>
      </div>
    </div>
  );
};

export default AlgorithmModal;