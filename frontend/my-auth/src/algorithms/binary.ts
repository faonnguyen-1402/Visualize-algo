// algorithms/binary.ts
import { Step } from "../types/step";

export function binarySearchSteps(arr: number[]): Step[] {
  let steps: Step[] = [];
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    steps.push({
      type: "mid",
      index: mid
    });

    if (mid === 5) { // giả lập target
      steps.push({ type: "found", index: mid });
      break;
    }

    if (mid < 5) left = mid + 1;
    else right = mid - 1;
  }

  return steps;
}