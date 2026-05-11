import { Step } from "../types/treestep";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export function linearSearchTree(
  root: TreeNode,
  target: string
): Step[] {

  const steps: Step[] = [];

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
    if (node.name === target) {

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
    // DFS CHILDREN
    // =========================
    for (const child of node.children || []) {

      const found = dfs(
        child,
        newVisited,
        newPath
      );

      if (found) {
        return true;
      }
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