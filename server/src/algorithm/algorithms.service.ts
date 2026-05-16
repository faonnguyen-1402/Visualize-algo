import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface AnimationStep {
  type: 'COMPARE' | 'SWAP' | 'SORTED' | 'FOUND' | 'NOT_FOUND';
  indices: number[];
  array?: number[];
  message?: string;
  highlightLine?: number;
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

  // simulateBubbleSort(numbers: number[]) {
  //   const steps: AnimationStep[] = [];
  //   const arr = [...numbers];
  //   const n = arr.length;

  //   for (let i = 0; i < n - 1; i++) {
  //     for (let j = 0; j < n - i - 1; j++) {
  //       steps.push({
  //         type: 'COMPARE',
  //         indices: [j, j + 1],
  //         message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
  //       });

  //       if (arr[j] > arr[j + 1]) {
  //         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

  //         steps.push({
  //           type: 'SWAP',
  //           indices: [j, j + 1],
  //           array: [...arr],
  //           message: `Swapping ${arr[j + 1]} and ${arr[j]}`,
  //         });
  //       }
  //     }

  //     steps.push({
  //       type: 'SORTED',
  //       indices: [n - 1 - i],
  //     });
  //   }

  //   steps.push({ type: 'SORTED', indices: [0] });

  //   return {
  //     finalArray: arr,
  //     steps,
  //   };
  // }
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

  simulateBubbleSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];
    const n = arr.length;

    // Bước khởi đầu: Sáng dòng khai báo hàm (Dòng 1 - Index 0)
    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: 'Starting Bubble Sort algorithm...',
    });

    for (let i = 0; i < n - 1; i++) {
      // Bắt đầu vòng lặp ngoài: Sáng dòng for i (Dòng 2 - Index 1)
      steps.push({
        type: 'COMPARE',
        indices: [],
        highlightLine: 1,
        message: `Outer loop: Pass ${i + 1} (i = ${i})`,
      });

      for (let j = 0; j < n - i - 1; j++) {
        // Chuẩn bị so sánh: Sáng dòng kiểm tra điều kiện if (Dòng 4 - Index 3)
        steps.push({
          type: 'COMPARE',
          indices: [j, j + 1],
          highlightLine: 3,
          message: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]})`,
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          // Thỏa mãn điều kiện -> Thực hiện đổi chỗ: Sáng dòng swap (Dòng 5 - Index 4)
          steps.push({
            type: 'SWAP',
            indices: [j, j + 1],
            array: [...arr],
            highlightLine: 4,
            message: `Swapped: ${arr[j + 1]} is greater than ${arr[j]}, shifting right`,
          });
        }
      }

      // Kết thúc 1 lượt quét, phần tử lớn nhất đã về cuối mảng: Quay lại dòng kiểm tra vòng i (Index 1)
      steps.push({
        type: 'SORTED',
        indices: [n - 1 - i],
        highlightLine: 1,
        message: `Element ${arr[n - 1 - i]} is now in its correct final position.`,
      });
    }

    // Phần tử đầu tiên (index 0) tự động ở đúng vị trí sau khi kết thúc vòng lặp ngoài
    steps.push({
      type: 'SORTED',
      indices: [0],
      highlightLine: 0, // Kết thúc toàn bộ thuật toán, trả về dòng gốc ban đầu
      message: 'Array is fully sorted successfully!',
    });

    return {
      finalArray: arr,
      steps,
    };
  }

  simulateSelectionSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];
    const n = arr.length;

    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: 'Starting Selection Sort algorithm...',
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      steps.push({
        type: 'COMPARE',
        indices: [i],
        highlightLine: 2,
        message: `Start searching for the minimum value from ${i}`,
      });

      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'COMPARE',
          indices: [j], // Highlight cột j đang xét để kiểm tra vòng lặp
          highlightLine: 3, // <--- Bật công tắc sáng dòng 3 ở đây!
          message: `Moving inner loop pointer j to index ${j}`,
        });

        steps.push({
          type: 'COMPARE',
          indices: [minIdx, j],
          highlightLine: 4,
          message: `Compare the current minimum value with ${j}`,
        });
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({
            type: 'COMPARE',
            indices: [minIdx],
            highlightLine: 4,
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
          highlightLine: 5,
          message: `Swap ${arr[minIdx]} to ${arr[i]}`,
        });
      } else {
        steps.push({
          type: 'COMPARE',
          indices: [i],
          highlightLine: 5,
          message: `Minimum element is already at index ${i}. No swap needed.`,
        });
      }
      steps.push({ type: 'SORTED', indices: [i], highlightLine: 1 });
    }
    steps.push({
      type: 'SORTED',
      indices: [n - 1],
      highlightLine: 0,
      message: 'Selection Sort completed successfully!',
    });
    return { finalArray: arr, steps };
  }

  simulateInsertionSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];
    const n = arr.length;

    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: 'Starting Insertion Sort algorithm...',
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      steps.push({
        type: 'COMPARE',
        indices: [i],
        highlightLine: 2,
        message: `Picked key = ${key} at index ${i}. Preparing to insert`,
      });

      steps.push({
        type: 'COMPARE',
        indices: j >= 0 ? [j, i] : [i],
        highlightLine: 4,
        message: `Checking while condition: compare element at index j with key`,
      });

      while (j >= 0 && arr[j] > key) {
        steps.push({
          type: 'COMPARE',
          indices: [j, j + 1],
          highlightLine: 5,
          message: `${arr[j]} > ${key}, shifting ${arr[j]} to the right.`,
        });
        arr[j + 1] = arr[j];

        steps.push({
          type: 'SWAP',
          indices: [j, j + 1],
          array: [...arr],
          highlightLine: 5,
        });
        j = j - 1;

        steps.push({
          type: 'COMPARE',
          indices: j >= 0 ? [j, j + 1] : [j + 1],
          highlightLine: 4,
          message: `Looping back: re-checking while condition with j = ${j}`,
        });
      }
      arr[j + 1] = key;
      steps.push({
        type: 'SWAP',
        indices: [j + 1],
        array: [...arr],
        highlightLine: 5,
        message: `Insert key = ${key} into correct position at index ${j + 1}`,
      });

      steps.push({
        type: 'SORTED',
        indices: Array.from({ length: i + 1 }, (_, idx) => idx),
        highlightLine: 1,
        message: `Sub-array from index 0 to ${i} is now sorted.`,
      });
    }
    for (let i = 0; i < n; i++)
      steps.push({ type: 'SORTED', indices: [i], highlightLine: 0 });
    return { finalArray: arr, steps };
  }

  simulateQuickSort(numbers: number[]) {
    const steps: AnimationStep[] = [];
    const arr = [...numbers];

    const partition = (low: number, high: number) => {
      const pivot = arr[high];
      steps.push({
        type: 'COMPARE',
        indices: [high],
        highlightLine: 2,
        message: `Select pivot = ${pivot} at index ${high}`,
      });
      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({
          type: 'COMPARE',
          indices: [j, high],
          highlightLine: 4,
          message: `Compare current element ${arr[j]} with pivot ${pivot}`,
        });
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];

          steps.push({
            type: 'SWAP',
            indices: [i, j],
            array: [...arr],
            highlightLine: 4,
            message: `${arr[i]} < ${pivot}, swap it to the left side (index ${i})`,
          });
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({
        type: 'SWAP',
        indices: [i + 1, high],
        array: [...arr],
        highlightLine: 3,
        message: `Move pivot ${pivot} to its correct position at index ${i + 1}`,
      });
      return i + 1;
    };

    const sort = (low: number, high: number) => {
      steps.push({
        type: 'COMPARE',
        indices: [],
        highlightLine: 1,
        message: `Checking sub-array boundary: low = ${low}, high = ${high}`,
      });

      if (low < high) {
        const pi = partition(low, high);
        steps.push({
          type: 'SORTED',
          indices: [pi],
          highlightLine: 3,
          message: `Pivot at index ${pi} is now locked in its final sorted position.`,
        });

        steps.push({
          type: 'COMPARE',
          indices: [],
          highlightLine: 5,
          message: `Recursively sorting the left sub-array: from index ${low} to ${pi - 1}`,
        });
        sort(low, pi - 1);

        steps.push({
          type: 'COMPARE',
          indices: [],
          highlightLine: 6,
          message: `Recursively sorting the right sub-array: from index ${pi + 1} to ${high}`,
        });
        sort(pi + 1, high);
      } else if (low === high) {
        steps.push({
          type: 'SORTED',
          indices: [low],
          highlightLine: 1,
          message: `Sub-array has 1 element (${arr[low]}), it is automatically sorted.`,
        });
      }
    };

    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: 'Starting Quick Sort algorithm...',
    });

    sort(0, arr.length - 1);
    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: 'Quick Sort completed! Whole array is sorted.',
    });
    return { finalArray: arr, steps };
  }

  simulateLinearSearch(numbers: number[], target: number) {
    const steps: AnimationStep[] = [];
    const n = numbers.length;

    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: `Starting Linear Search for target = ${target}...`,
    });

    for (let i = 0; i < n; i++) {
      steps.push({
        type: 'COMPARE',
        indices: [i],
        highlightLine: 1,
        message: `Moving pointer to index ${i} (value: ${numbers[i]})`,
      });

      steps.push({
        type: 'COMPARE',
        indices: [i],
        highlightLine: 2,
        message: `Comparing element at index ${i} (${numbers[i]}) with target (${target})`,
      });

      if (numbers[i] === target) {
        steps.push({
          type: 'FOUND',
          indices: [i],
          highlightLine: 3,
          message: `Target ${target} found at index ${i}! Returning result.`,
        });
        return { found: true, index: i, steps };
      }
    }

    steps.push({
      type: 'NOT_FOUND',
      indices: [],
      highlightLine: 4,
      message: `Check all elements. Target ${target} not found in the array.`,
    });
    return { found: false, index: -1, steps };
  }

  simulateBinarySearch(numbers: number[], target: number) {
    const steps: AnimationStep[] = [];

    const arr = [...numbers].sort((a, b) => a - b);
    let left = 0;
    let right = arr.length - 1;

    steps.push({
      type: 'COMPARE',
      indices: [],
      highlightLine: 0,
      message: `Starting Binary Search for target = ${target} (Array sorted).`,
    });

    steps.push({
      type: 'COMPARE',
      indices: [left, right],
      highlightLine: 1,
      message: `Checking boundary: left = ${left}, right = ${right}`,
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        type: 'COMPARE',
        indices: [left, mid, right],
        highlightLine: 2,
        message: `Calculated mid = ${mid} (value: ${arr[mid]}) between range [${left}, ${right}].`,
      });

      steps.push({
        type: 'COMPARE',
        indices: [mid],
        highlightLine: 3,
        message: `Comparing mid element ${arr[mid]} with target ${target}`,
      });

      if (arr[mid] === target) {
        steps.push({
          type: 'FOUND',
          indices: [mid],
          highlightLine: 3,
          message: `Target ${target} found at index ${mid}!`,
        });
        return { found: true, index: mid, steps, sortedArray: arr };
      }

      steps.push({
        type: 'COMPARE',
        indices: [mid],
        highlightLine: 4,
        message: `Checking if mid element ${arr[mid]} < target ${target}`,
      });

      if (arr[mid] < target) {
        left = mid + 1;
        steps.push({
          type: 'COMPARE',
          indices: [left, right],
          highlightLine: 5,
          message: `${arr[mid]} < ${target}, target must be in the right half. Shift left pointer to ${left}`,
        });
      } else {
        right = mid - 1;
        steps.push({
          type: 'COMPARE',
          indices: [left, right],
          highlightLine: 6,
          message: `${arr[mid]} > ${target}, target must be in the left half. Shift right pointer to ${right}`,
        });
      }

      steps.push({
        type: 'COMPARE',
        indices: left <= right ? [left, right] : [],
        highlightLine: 1,
        message: `Looping back: re-checking while condition (left <= right)`,
      });
    }

    steps.push({
      type: 'NOT_FOUND',
      indices: [],
      highlightLine: 1,
      message: `Left pointer crossed right pointer. Target ${target} not found in array.`,
    });
    return { found: false, index: -1, steps, sortedArray: arr };
  }
}
