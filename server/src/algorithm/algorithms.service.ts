import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface AnimationStep {
  type: 'COMPARE' | 'SWAP' | 'SORTED' | 'FOUND' | 'NOT_FOUND';
  indices: number[];
  array?: number[];
  message?: string;
}

@Injectable()
export class AlgorithmsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.algorithm.findMany({
      include: {
        category: true,
        exercises: true,
      },
    });
  }

  findOne(slug: string) {
    return this.prisma.algorithm.findUnique({
      where: { slug },
      include: {
        category: true,
        exercises: true,
      },
    });
  }

  simulateBubbleSort(numbers: number[]) {
    // const steps: any[] = [];
    const steps: AnimationStep[] = [];
    const arr = [...numbers];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          type: 'COMPARE',
          indices: [j, j + 1],
          message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          steps.push({
            type: 'SWAP',
            indices: [j, j + 1],
            array: [...arr],
            message: `Swapping ${arr[j + 1]} and ${arr[j]}`,
          });
        }
      }

      steps.push({
        type: 'SORTED',
        indices: [n - 1 - i],
      });
    }

    steps.push({ type: 'SORTED', indices: [0] });

    return {
      finalArray: arr,
      steps,
    };
  }
  // algorithm.service.ts
  // simulateBubbleSort(arr: number[]) {
  //   const steps = [];
  //   const n = arr.length;
  //   const tempArray = [...arr];

  //   for (let i = 0; i < n - 1; i++) {
  //     for (let j = 0; j < n - i - 1; j++) {
  //       steps.push({
  //         type: 'compare',
  //         indices: [j, j + 1],
  //       });

  //       if (tempArray[j] > tempArray[j + 1]) {
  //         [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];

  //         steps.push({
  //           type: 'swap',
  //           indices: [j, j + 1],
  //           array: [...tempArray],
  //         });
  //       }
  //     }

  //     steps.push({
  //       type: 'sorted',
  //       index: n - 1 - i,
  //     });
  //   }

  //   // Đánh dấu phần tử cuối cùng cũng đã xong
  //   steps.push({ type: 'sorted', index: 0 });

  //   return { steps, finalArray: tempArray };
  // }

  simulateSelectionSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      steps.push({
        type: 'COMPARE',
        indices: [i],
        message: `Start searching for the minimum value from ${i}`,
      });

      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'COMPARE',
          indices: [minIdx, j],
          message: `Compare the current minimum value with ${j}`,
        });
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({
            type: 'COMPARE',
            indices: [minIdx],
            message: `Found a smaller value at ${minIdx}`,
          });
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push({
          type: 'SWAP',
          indices: [i, minIdx],
          array: [...arr],
          message: `Swap ${arr[minIdx]} to ${arr[i]}`,
        });
      }
      steps.push({ type: 'SORTED', indices: [i] });
    }
    steps.push({ type: 'SORTED', indices: [n - 1] });
    return { finalArray: arr, steps };
  }

  simulateInsertionSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      steps.push({
        type: 'COMPARE',
        indices: [i],
        message: `Select value ${key} to insert`,
      });

      while (j >= 0 && arr[j] > key) {
        steps.push({
          type: 'COMPARE',
          indices: [j, j + 1],
          message: `${arr[j]} > ${key}, move to the right`,
        });
        arr[j + 1] = arr[j];
        steps.push({ type: 'SWAP', indices: [j, j + 1], array: [...arr] });
        j = j - 1;
      }
      arr[j + 1] = key;
      steps.push({
        type: 'SWAP',
        indices: [j + 1],
        array: [...arr],
        message: `Insert ${key} into ${j + 1}`,
      });
    }
    for (let i = 0; i < n; i++) steps.push({ type: 'SORTED', indices: [i] });
    return { finalArray: arr, steps };
  }

  simulateQuickSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];

    const partition = (low: number, high: number) => {
      let pivot = arr[high];
      steps.push({
        type: 'COMPARE',
        indices: [high],
        message: `Select pivot is ${pivot}`,
      });
      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({
          type: 'COMPARE',
          indices: [j, high],
          message: `Compare ${arr[j]} with pivot`,
        });
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({ type: 'SWAP', indices: [i, j], array: [...arr] });
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({
        type: 'SWAP',
        indices: [i + 1, high],
        array: [...arr],
        message: `Move the pivot to the correct position`,
      });
      return i + 1;
    };

    const sort = (low: number, high: number) => {
      if (low < high) {
        let pi = partition(low, high);
        steps.push({ type: 'SORTED', indices: [pi] });
        sort(low, pi - 1);
        sort(pi + 1, high);
      } else if (low === high) {
        steps.push({ type: 'SORTED', indices: [low] });
      }
    };

    sort(0, arr.length - 1);
    return { finalArray: arr, steps };
  }

  simulateLinearSearch(numbers: number[], target: number) {
    const steps: AnimationStep[] = [];
    const n = numbers.length;

    for (let i = 0; i < n; i++) {
      steps.push({
        type: 'COMPARE',
        indices: [i],
        message: `Check index ${i} (value: ${numbers[i]})`,
      });

      if (numbers[i] === target) {
        steps.push({
          type: 'FOUND',
          indices: [i],
          message: `Target ${target} found at index ${i}!`,
        });
        return { found: true, index: i, steps };
      }
    }

    steps.push({
      type: 'NOT_FOUND',
      indices: [],
      message: `Target ${target} not in array.`,
    });
    return { found: false, index: -1, steps };
  }

  simulateBinarySearch(numbers: number[], target: number) {
    const steps: AnimationStep[] = [];

    const arr = [...numbers].sort((a, b) => a - b);
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        type: 'COMPARE',
        indices: [left, mid, right],
        message: `Searching in range ${left}, ${right}. The middle element is ${arr[mid]}`,
      });

      if (arr[mid] === target) {
        steps.push({
          type: 'FOUND',
          indices: [mid],
          message: `Found ${target} at index ${mid}!`,
        });
        return { found: true, index: mid, steps, sortedArray: arr };
      }

      if (arr[mid] < target) {
        // steps.push({
        //   type: 'COMPARE',
        //   indices: [mid],
        //   message: `${arr[mid]} < ${target}, skip the left half`,
        // });
        left = mid + 1;
      } else {
        // steps.push({
        //   type: 'COMPARE',
        //   indices: [mid],
        //   message: `${arr[mid]} > ${target}, skip the right half`,
        // });
        right = mid - 1;
      }
    }

    steps.push({
      type: 'NOT_FOUND',
      indices: [],
      message: `Not found ${target}`,
    });
    return { found: false, index: -1, steps, sortedArray: arr };
  }
}
