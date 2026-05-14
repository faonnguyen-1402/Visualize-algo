import { useState, useEffect, useRef } from "react";
import { Step } from "../types/treestep";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export function useSearchAlgorithm() {

  const [steps, setSteps] = useState<Step[]>([]);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [treeData, setTreeData] =
    useState<TreeNode | null>(null);

  const [activeNode, setActiveNode] =
    useState("");

  const [visitedNodes, setVisitedNodes] =
    useState<string[]>([]);

  const [pathNodes, setPathNodes] =
    useState<string[]>([]);

  const playRef = useRef(false);

  // =========================
  // RANDOM TREE
  // =========================
  function generateRandomTree(
    depth = 3
  ): TreeNode {

    if (depth === 0) {
      return {
        name: Math.floor(
          Math.random() * 100
        ).toString()
      };
    }

    return {
      name: Math.floor(
        Math.random() * 100
      ).toString(),

      children: Array.from(
        { length: 2 },
        () => generateRandomTree(depth - 1)
      )
    };
  }

  // =========================
  // DFS STEPS
  // =========================
  function generateTreeSteps(
    root: TreeNode
  ): Step[] {

    const result: Step[] = [];

    function dfs(
      node: TreeNode,
      visited: string[] = [],
      path: string[] = []
    ) {

      const newVisited = [
        ...visited,
        node.name
      ];

      const newPath = [
        ...path,
        node.name
      ];

      result.push({
        type: "visit",
        activeNode: node.name,
        visitedNodes: newVisited,
        path: newPath
      });

      node.children?.forEach(child =>
        dfs(
          child,
          newVisited,
          newPath
        )
      );
    }

    dfs(root);

    result.push({
      type: "done"
    });

    return result;
  }

  // =========================
  // LOAD
  // =========================
  async function loadAlgorithm(slug: string) {

    const randomTree = generateRandomTree();
    setTreeData(randomTree);

    const treeSteps = generateTreeSteps(randomTree);
    setSteps(treeSteps);

    /*
    const res = await axios.post(`/algorithms/${slug}/tree`, { tree: randomTree });
    setSteps(res.data.steps);
    */

    // TREE chỉ set 1 lần

    setStep(0);

    setActiveNode("");
    setVisitedNodes([]);
    setPathNodes([]);
  }

  // =========================
  // CONTROLS
  // =========================
  function next() {
    setStep(s =>
      Math.min(
        s + 1,
        steps.length - 1
      )
    );
  }

  function prev() {
    setStep(s =>
      Math.max(s - 1, 0)
    );
  }

  async function play() {

    setIsPlaying(true);

    playRef.current = true;

    let i = step;

    while (
      i < steps.length &&
      playRef.current
    ) {

      setStep(i);

      await new Promise(res =>
        setTimeout(res, 500)
      );

      i++;
    }

    setIsPlaying(false);
  }

  function pause() {
    setIsPlaying(false);
    playRef.current = false;
  }

  function reset() {

    setStep(0);

    setActiveNode("");
    setVisitedNodes([]);
    setPathNodes([]);

    setIsPlaying(false);

    playRef.current = false;
  }

  // =========================
  // STEP SYNC
  // =========================
  useEffect(() => {

    const current =
      steps[step];

    if (!current) return;

    // KHÔNG setTreeData ở đây nữa

    setActiveNode(
      current.activeNode || ""
    );

    setVisitedNodes(
      current.visitedNodes || []
    );

    setPathNodes(
      current.path || []
    );

  }, [step, steps]);

  return {

    treeData,

    activeNode,
    visitedNodes,
    pathNodes,

    step,
    steps,

    isPlaying,

    loadAlgorithm,

    next,
    prev,

    play,
    pause,
    reset
  };
}