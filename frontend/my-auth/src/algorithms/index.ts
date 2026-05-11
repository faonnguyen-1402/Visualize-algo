import { bubbleSortSteps } from "./bubble";
import { binarySearchTree } from "./binary";
import { linearSearchTree } from "./linear";

export const algorithmMap: Record<string, Function> = {
  "bubble-sort": bubbleSortSteps,
  "binary-search": binarySearchTree,
  "linear-search": linearSearchTree,
};