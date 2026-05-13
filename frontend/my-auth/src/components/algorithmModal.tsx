import "../pages/home/mainapp.css";
import Controls from "./controls";
import CodePanel from "./codepanel";
import { Algorithm } from "../types/algorithm";
import { useTreeAnimation } from "../hooks/useTreeAnimation";
import { useAnimation } from "../hooks/useAnimation";
import { useEffect } from "react";
import VisualRender from "./VisualRender";
import { useSearchAlgorithm } from "../hooks/useSearchAlgorithm";
import { useSortAlgorithm } from "../hooks/useSortAlgorithm";
import ExerciseDetail from "../pages/practice/ExerciseDetail";


type Props = {
  algorithm: Algorithm;
  onClose: () => void;
};

const AlgorithmModal = ({ algorithm, onClose }: Props) => {
const sortHook = useSortAlgorithm();
const searchHook = useSearchAlgorithm();

const isSearching = algorithm.category === "Searching";

const visualizer = isSearching ? searchHook : sortHook;
const {
  values,
  treeData,
  activeNode,
  visitedNodes,
  pathNodes,
  active,

  steps = [],
  step=0,

  isPlaying,
  loadAlgorithm,
  next,
  prev,
  play,
  pause,
  reset
} = visualizer as any;

useEffect(() => {

  if (
    algorithm.category === "Searching"
  ) {

    searchHook.loadAlgorithm();

  } else {

    sortHook.loadAlgorithm(
      algorithm.id
    );

  }

}, [
  algorithm.id,
  algorithm.category
]);

const currentStep = steps?.[step] || null;

useAnimation(!isSearching ? currentStep : null);     // Sort
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
          <VisualRender
            algorithm={algorithm}
            values={values}
            treeData={treeData}
            activeNode={activeNode}
            visitedNodes={visitedNodes}
            pathNodes={pathNodes}
            step={currentStep}
          />
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
        <ExerciseDetail slug={algorithm.id} difficulty="easy" />

      </div>
    </div>
  </div>
);
};

export default AlgorithmModal;