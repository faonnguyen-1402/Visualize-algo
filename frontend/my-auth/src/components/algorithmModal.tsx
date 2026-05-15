import "../pages/home/mainapp.css";
import Controls from "./controls";
import CodePanel from "./codepanel";
import { Algorithm } from "../types/algorithm";
// import { useTreeAnimation } from "../hooks/useTreeAnimation";
import { useAnimation } from "../hooks/useAnimation";
import { useEffect } from "react";
import VisualRender from "./VisualRender";
import { useSearchAlgorithm } from "../hooks/useSearchAlgorithm";
import { useSortAlgorithm } from "../hooks/useSortAlgorithm";
// import TreeVisualization from "./TreeVisualization";
import { InlineMath, BlockMath } from "react-katex";

type Props = {
  algorithm: Algorithm;
  onClose: () => void;
};

const AlgorithmModal = ({ algorithm, onClose }: Props) => {
  const sortHook = useSortAlgorithm();
  const searchHook = useSearchAlgorithm();

  // const isSearching = algorithm.category?.name === "Searching";

  const isTreeAlgo = ["dfs", "bfs"].includes(algorithm.slug);
  const isSearchAlgo = algorithm.slug?.includes("search");

  const visualizer = isTreeAlgo ? searchHook : sortHook;
  const {
    values,
    message,
    // treeData,
    // activeNode,
    // visitedNodes,
    // pathNodes,
    // active,
    // swapping,
    // sorted,

    steps = [],
    step = 0,
    target,
    // slug,
    isPlaying,
    // loadAlgorithm,
    next,
    prev,
    play,
    pause,
    reset,
  } = visualizer as any;

  useEffect(() => {
    if (isTreeAlgo) {
      searchHook.loadAlgorithm(algorithm.slug);
    } else {
      // const defaultData = [23, 72, 36, 77, 27, 35, 76];
      sortHook.loadAlgorithm(algorithm.slug);
    }
  }, [algorithm.slug]);

  // const currentStep = steps?.[step] || null;
  // const targetToFind = (visualizer as any).target;

  useAnimation(!isTreeAlgo ? steps[step] : null, isSearchAlgo ? target : null); // Sort
  return (
    <div className="modal-overlay active">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{algorithm.title || algorithm.name}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p>{algorithm.description}</p>

          {/* INFO */}
          <div className="algo-info-grid">
            <div className="info-card">
              <div className="info-label">Difficulty</div>
              <div className="info-value">{algorithm.difficulty}</div>
            </div>
            <div className="info-card">
              <div className="info-label">timeComplexity</div>
              <div className="info-value">
                <InlineMath math={algorithm.timeComplexity || "N/A"} />
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">spaceComplexity</div>
              <div className="info-value">
                {algorithm.spaceComplexity || "N/A"}
              </div>
            </div>
          </div>

          {/* VISUAL */}
          <div className="visualization-container">
            <div className="visual-left">
              <VisualRender
                algorithm={algorithm}
                // values={!isTreeSearch ? values : []}
                values={sortHook.values}
                active={sortHook.active}
                swapping={sortHook.swapping}
                sorted={sortHook.sorted}
                treeData={searchHook.treeData}
                activeNode={searchHook.activeNode}
                visitedNodes={searchHook.visitedNodes}
                pathNodes={searchHook.pathNodes}
                step={steps[step]}
              />
            </div>
            <div className="visual-right">
              <CodePanel algorithm={algorithm} />
              <Controls
                step={step}
                total={steps.length}
                isPlaying={isPlaying}
                onNext={next}
                onPrev={prev}
                onPlay={isPlaying ? pause : play}
                onReset={reset}
              />

              <div
                style={{
                  height: "40px",
                  color: "#00ff00",
                  fontSize: "18px",
                  textAlign: "center",
                  marginBottom: "10px",
                  fontFamily: "monospace",
                  textShadow: "0 0 10px #00ff00",
                }}
              >
                {message && <strong>{message}</strong>}
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AlgorithmModal;
