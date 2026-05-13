import { Step } from "../types/step";

export function bubbleSortSteps(arr: number[]): Step[] {
  let a = [...arr];
  let steps: Step[] = [];

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {

      steps.push({
        type: "compare",
        indices: [j, j + 1],
        array: [...a]
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...a]
        });
      }
    }

    steps.push({
      type: "sorted",
      index: a.length - i - 1
    });
  }

  return steps;
}