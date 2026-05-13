import TreeVisualization from "./TreeVisualization";
import Visualization from "./Visualization";

type Props = {
  algorithm: any;
  values?: number[];
  treeData?: any;
  activeNode?: string;
  visitedNodes?: string[];
  pathNodes?: string[];
  currentIndex?: number | null;
  step?: any;
};

const VisualRender = ({
  algorithm,
  values = [],
  treeData,
  activeNode,
  visitedNodes = [],
  pathNodes = [],
  currentIndex,
  step,
}: Props) => {

  if (algorithm.category === "Searching") {
    return (
      <TreeVisualization
        key={algorithm.id}
        data={treeData}
        activeNode={activeNode}
        visitedNodes={visitedNodes}
        pathNodes={pathNodes}
        step={step}
      />
    );
  }
  return (
    <Visualization values={values} />
  );
};

export default VisualRender;