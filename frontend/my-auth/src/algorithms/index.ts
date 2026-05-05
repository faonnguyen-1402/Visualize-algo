import { bubbleSortSteps } from "./bubble";
import { binarySearchSteps } from "./binary";

export const algorithmMap: Record<string, Function> = {
  "bubble-sort": bubbleSortSteps,
  "binary-search": binarySearchSteps
};