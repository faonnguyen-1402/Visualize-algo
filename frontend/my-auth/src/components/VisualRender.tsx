import { algorithms } from "../data/algorithm";
import TreeVisualization from "./TreeVisualization";
import Visualization from "./Visualization";

type Props = {
  algorithm: any;
  values?: number[];
  active?: number[]; //
  swapping?: number[]; //
  sorted?: number[]; //
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
  active = [], // Default value
  swapping = [], // Default value
  sorted = [],
  treeData,
  activeNode,
  visitedNodes = [],
  pathNodes = [],
  currentIndex,
  step,
}: Props) => {
  const isTreeSearch = ['dfs', 'bfs'].includes(algorithm.slug);
  if (isTreeSearch) {
    return (
      <TreeVisualization
        // key={algorithm.id}
        data={treeData}
        activeNode={activeNode}
        visitedNodes={visitedNodes}
        pathNodes={pathNodes}
        // step={step}
      />
    );
  }
  return (
    <Visualization
      values={values}
      active={active}
      swapping={swapping}
      sorted={sorted}
    />
  );
};

export default VisualRender;
