import { bubbleSortSteps } from "./bubble";
import { binarySearchTree } from "./binary";
import { linearSearchTree } from "./linear";

export const algorithmMap: Record<string, Function> = {
  "bubble-sort": bubbleSortSteps,
  // "selection-sort": selectionSortSteps,
  "binary-search": binarySearchTree,
  "linear-search": linearSearchTree,
};