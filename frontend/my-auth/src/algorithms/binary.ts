import { Step } from "../types/treestep";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export function binarySearchTree(
  root: TreeNode,
  target: string
): Step[] {

  const steps: Step[] = [];

  function dfs(
    node: TreeNode | undefined,
    visited: string[] = [],
    path: string[] = []
  ): boolean {

    if (!node) return false;

    const currentValue = Number(node.name);
    const targetValue = Number(target);

    const newVisited = [
      ...visited,
      node.name
    ];

    const newPath = [
      ...path,
      node.name
    ];

    // =========================
    // VISIT NODE
    // =========================
    steps.push({
      type: "visit",
      activeNode: node.name,
      visitedNodes: newVisited,
      path: newPath,
      tree: structuredClone(root)
    });

    // =========================
    // FOUND
    // =========================
    if (currentValue === targetValue) {

      steps.push({
        type: "found",
        activeNode: node.name,
        visitedNodes: newVisited,
        path: newPath,
        tree: structuredClone(root)
      });

      return true;
    }

    // =========================
    // LEFT
    // =========================
    if (
      targetValue < currentValue &&
      node.children?.[0]
    ) {

      return dfs(
        node.children[0],
        newVisited,
        newPath
      );
    }

    // =========================
    // RIGHT
    // =========================
    if (
      targetValue > currentValue &&
      node.children?.[1]
    ) {

      return dfs(
        node.children[1],
        newVisited,
        newPath
      );
    }

    return false;
  }

  dfs(root);

  // =========================
  // DONE
  // =========================
  steps.push({
    type: "done",
    tree: structuredClone(root)
  });

  return steps;
}