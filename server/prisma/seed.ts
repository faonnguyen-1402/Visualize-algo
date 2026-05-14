import { Difficulty, PrismaClient } from '@prisma/client';
// import { InlineMath, BlockMath } from 'react-katex'

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed data');

  await prisma.testCase.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.algorithm.deleteMany({});
  await prisma.algorithmCategory.deleteMany({});
  console.log('✅ Đã dọn dẹp bảng Exercise');

  const catSorting = await prisma.algorithmCategory.upsert({
    where: { name: 'Sorting' },
    update: {},
    create: { name: 'Sorting', description: 'Sort algorithms' },
  });

  const catSearching = await prisma.algorithmCategory.upsert({
    where: { name: 'Searching' },
    update: {},
    create: { name: 'Searching', description: 'Search algorithms' },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'bubble-sort' },
    update: {},
    create: {
      name: 'bubble_sort',
      title: 'Bubble Sort',
      slug: 'bubble-sort',
      description:
        'Bubble Sort compares adjacent elements and swaps them if they are in the wrong order. This process is repeated until the list is sorted, often called "bubbling" the largest element to the end of the list with each pass.',
      pseudoCode: `procedure bubbleSort(list)
        for i from 0 to n-1
            for j from 0 to n-i-1
                if list[j] > list[j+1]
                    swap(list[j], list[j+1])`,
      timeComplexity: 'O(n^2) (Average/Worst)',
      spaceComplexity: 'O(1) (In-place)',
      categoryId: catSorting.id,
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'selection-sort' },
    update: {},
    create: {
      name: 'selection_sort',
      title: 'Selection Sort',
      slug: 'selection-sort',
      description:
        'This algorithm divides the list into a sorted and unsorted region, continuously scanning the unsorted region to find the smallest element and swapping it to the front of the unsorted section.',
      pseudoCode: `procedure selectionSort(list)
      for i from 0 to n-1
        minIndex = i
        for j from i + 1 to n
          if list[j] < list[minIndex]
          minIndex = j
        swap(list[minIndex], list[i])`,
      timeComplexity: 'O(n^2) (Best/Average/Worst)',
      spaceComplexity: 'O(1) (In-place)',
      categoryId: catSorting.id,
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'insertion-sort' },
    update: {},
    create: {
      name: 'insertion_sort',
      title: 'Insertion Sort',
      slug: 'insertion-sort',
      description:
        'Similar to organizing playing cards, this algorithm builds a sorted sublist one element at a time. It takes an item from the unsorted portion and inserts it into its correct place within the already sorted part, moving larger values to the right.',
      pseudoCode: `procedure insertionSort(list)
      for i from 1 to n
        key = list[i]
        j = i - 1
        while j >= 0 and list[j] > key
          list[j+1] = list[j]
          j = j -1
        list[j+1] = key`,
      timeComplexity: 'O(n^2) (Worst) | O(n) (Best)',
      spaceComplexity: 'O(1) (In-place)',
      categoryId: catSorting.id,
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'quick-sort' },
    update: {},
    create: {
      name: 'quick_sort',
      title: 'Quick Sort',
      slug: 'quick-sort',
      description:
        'Quick sort  is a highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a "pivot" element and partitioning the array so that smaller elements are moved to its left and larger ones to its right.',
      pseudoCode: `procedure quickSort(list, low, high)
      if low < high
        p = partition(list, low, high)
        quickSort(list, low, p - 1)
        quickSort(list, p + 1, high)`,
      timeComplexity: 'O(nlogn) (Average/Best) | O(n^2) (Worst)',
      spaceComplexity: 'O(logn)',
      categoryId: catSorting.id,
      difficulty: 'MEDIUM',
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'binary-search' },
    update: {},
    create: {
      name: 'binary_search',
      title: 'Binary Search',
      slug: 'binary-search',
      description:
        'Binary search is a search algorithm that finds the position of a target value within a sorted array.\n\n A binary search begins by comparing the middle element of the array with the target value. If the target value matches the middle element, its position in the array is returned. If the target value is less or more than the middle element, the search continues the lower or upper half of the array respectively with a new middle element, eliminating the other half from consideration.',
      pseudoCode: `procedure binarySearch(list, target)
        low = 0, high = n-1
        while low <= high
        mid = (low+high)/2
        if list[mid] == target return mid
        else if list[mid] < target low = mid +1
        else high = mid -1`,
      timeComplexity: 'O(log n)',
      categoryId: catSearching.id,
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'linear-search' },
    update: {},
    create: {
      name: 'linear_search',
      title: 'Linear Search',
      slug: 'linear-search',
      description:
        'Perform a sequential search by checking each element of the list one by one until the item is found.',
      pseudoCode: `procedure linearSearch(list, target)
      for each item in list
        if item == target return its index
      return not found`,
      timeComplexity: 'O(n)',
      categoryId: catSearching.id,
    },
  });

  console.log('Seed data completed!');

  const algorithms = await prisma.algorithm.findMany();
  for (const slug of algorithms) {
    const levels = ['EASY', 'MEDIUM', 'HARD'];
    for (const level of levels) {
      const currentSlug = `${slug.slug}-${level.toLowerCase()}`;
      if (currentSlug === 'bubble-sort-easy') continue;

      await prisma.exercise.upsert({
        where: {
          slug: currentSlug,
        },
        update: {
          title: `${slug.name} - Level ${level}`,
          description: `This is an exercise at the level ${level} of ${slug.name}`,
        },
        create: {
          title: `${slug.name} - Level ${level}`,
          slug: currentSlug,
          description: `This is an exercise at the level ${level} of ${slug.name}`,
          difficulty: level as Difficulty,
          algorithmId: slug.id,
          constraints: 'N <= 1000',
        },
      });
    }
  }

  const bubbleSortEasy = await prisma.exercise.upsert({
    where: { slug: 'bubble-sort-easy' },
    update: {
      title: 'Bubble Sort Basic',
      description:
        '### Problem\nGiven an array of integers nums, use the Bubble Sort algorithm to sort the array in ascending order. Return the sorted array.\n\n###Example:** `nums = = [5, 2, 8]`\n**Output:** `[2, 5, 8]`',
      constraints: '2 <= nums.length <= 100',
    },
    create: {
      title: 'Bubble Sort Basic',
      slug: 'bubble-sort-easy',
      difficulty: 'EASY',
      algorithmId: algorithms[0].id,
      description:
        '### Problem\nGiven an array of integers nums, use the Bubble Sort algorithm to sort the array in ascending order. Return the sorted array.\n\n###Example:** `nums = [5, 2, 8]`\n**Output:** `[2, 5, 8]`',
      constraints: '2 <= nums.length <= 100',
    },
  });

  const bubbleSortMedium = await prisma.exercise.upsert({
    where: { slug: 'bubble-sort-medium' },
    update: {
      title: 'Bubble Sort Medium',
      description:
        '### Problem\nImplement Bubble Sort, but optimize the number of iterations. If no pairs of elements are swapped during a pass, the algorithm must stop immediately (the array is already sorted).\n\nRequirement: Count the total number of swaps performed.\n\n###Example:** `nums = [1, 2, 3, 5, 4]`\n**Output:** `1 (Just swap the 5th and 4th elements once, and the array is sorted).',
      constraints: 'Do not use subarrays to store values.',
    },
    create: {
      title: 'Bubble Sort Medium',
      slug: 'bubble-sort-easy',
      difficulty: 'MEDIUM',
      algorithmId: algorithms[0].id,
      description:
        '### Problem\nImplement Bubble Sort, but optimize the number of iterations. If no pairs of elements are swapped during a pass, the algorithm must stop immediately (the array is already sorted).\n\nRequirement: Count the total number of swaps performed.\n\n###Example:** `nums = [1, 2, 3, 5, 4]`\n**Output:** `1 (Just swap the 5th and 4th elements once, and the array is sorted).',
      constraints: 'Do not use subarrays to store values.',
    },
  });

  const bubbleSortHard = await prisma.exercise.upsert({
    where: { slug: 'bubble-sort-hard' },
    update: {
      title: 'Bubble Sort Hard',
      description:
        '### Problem Given the `head` of a Singly Linked List, sort the list using the **Bubble Sort** algorithm.\n\n**Requirements:**\n\n* You must sort the list by **swapping the nodes themselves**, not just the values within the nodes.\n* You are **not allowed** to use any extra data structures like arrays or lists to store the node values.\n\n### Example\n**Input:** `head = [4, 2, 1, 3]`\n**Output:** `[1, 2, 3, 4]`\n\n**Input:** `head = [-1, 5, 3, 4, 0]`\n**Output:** `[-1, 0, 3, 4, 5]`',
      constraints:
        'The number of nodes in the list is in the range `[0, 500]\n`-10^5 <= Node.val <= 10^5`',
    },
    create: {
      title: 'Sort Singly Linked List',
      slug: 'bubble-sort-hard',
      difficulty: 'HARD',
      algorithmId:
        algorithms.find((a) => a.slug === 'bubble-sort')?.id ||
        algorithms[0].id,
      description: '### Problem\nGiven the `head` of a Singly Linked List...', // Nội dung như trên
      constraints: 'Must swap nodes, O(1) extra space.',
    },
  });

  const selectionSortEasy = await prisma.exercise.upsert({
    where: { slug: 'selection-sort-easy' },
    update: {
      title: 'Selection Sort - Minimum Index',
      description: `### Problem
        Implement the **Selection Sort** algorithm. In each iteration, find the **index** of the smallest element in the remaining unsorted portion of the array and swap it with the element at the current position.
        \n
        ### Example
        **Input:** \`nums = [29, 10, 14, 37, 13]\`  
        **Output:** \`[10, 13, 14, 29, 37]\`
        \n
        **Explanation:** 1. Find min in \`[29, 10, 14, 37, 13]\` -> 10 (index 1). Swap with 29.
        2. Find min in \`[29, 14, 37, 13]\` -> 13 (index 4). Swap with 29....`,
      constraints: '1 <= nums.length <= 100',
    },
    create: {
      title: 'Selection Sort - Minimum Index',
      slug: 'selection-sort-easy',
      difficulty: 'EASY',
      algorithmId: algorithms.find((a) => a.slug === 'selection-sort')!.id,
      description: '...',
      constraints: '1 <= nums.length <= 100',
    },
  });

  const selectionSortMedium = await prisma.exercise.upsert({
    where: { slug: 'selection-sort-medium' },
    update: {
      title: 'Sorting Strings by Length',
      description: `### Problem
        Use **Selection Sort** to sort an array of strings. The sorting criteria are:
        1. Primary: Sort by the **length** of the strings (ascending).
        2. Secondary: If two strings have the same length, sort them **alphabetically**.
        \n
        ### Example
        **Input:** \`["apple", "bat", "cat", "banana"]\`  
        **Output:** \`["bat", "cat", "apple", "banana"]\`
        \n
        ### Constraints
        * \`1 <= strings.length <= 50\`
        * Each string contains only lowercase English letters.`,
    },
    create: {
      title: 'Sorting Strings by Length',
      slug: 'selection-sort-medium',
      difficulty: 'MEDIUM',
      algorithmId: algorithms.find((a) => a.slug === 'selection-sort')!.id,
      description: '...',
    },
  });

  const selectionSortHard = await prisma.exercise.upsert({
    where: { slug: 'selection-sort-hard' },
    update: {
      title: 'Stable Selection Sort',
      description: `### Problem
        Standard Selection Sort is **unstable**. Your task is to modify the algorithm to make it **stable**.
        \n
        Instead of swapping the minimum element with the current element, you should **shift** all elements between them to the right and then place the minimum element in its correct position.
        \n
        ### Example
        **Input:** \`nums = [4a, 5, 4b, 3]\` (where 4a and 4b have the same value)  
        **Output:** \`[3, 4a, 4b, 5]\`  
        *(Note: 4a must still appear before 4b after sorting)*
        \n
        ### Constraints
        * Do not use additional arrays.
        * Time complexity remains $O(n^2)$.`,
      constraints: 'Must maintain the relative order of equal elements.',
    },
    create: {
      title: 'Stable Selection Sort',
      slug: 'selection-sort-hard',
      difficulty: 'HARD',
      algorithmId: algorithms.find((a) => a.slug === 'selection-sort')!.id,
      description: '...',
    },
  });

  const insertionSortEasy = await prisma.exercise.upsert({
    where: { slug: 'insertion-sort-easy' },
    update: {
      title: 'Insertion Sort Basic',
      description: `### Problem
        Implement the standard **Insertion Sort** algorithm. 
        \n
        For each element in the array (starting from the second element), compare it with the elements before it and move it backward until it reaches its correct position in the sorted portion.
        \n
        ### Example
        **Input:** \`nums = [12, 11, 13, 5, 6]\`  
        **Output:** \`[5, 6, 11, 12, 13]\`

        **Explanation:** 1. [**11**, 12, 13, 5, 6] (11 moved before 12)
        2. [11, 12, 13, **5**, 6] -> [5, 11, 12, 13, 6] (5 moved to the front)
        ...`,
    },
    create: {
      title: 'Insertion Sort Basic',
      slug: 'insertion-sort-easy',
      difficulty: 'EASY',
      algorithmId: algorithms.find((a) => a.slug === 'insertion-sort')!.id,
      description: '...',
      constraints: '1 <= nums.length <= 500',
    },
  });

  const insertionSortMedium = await prisma.exercise.upsert({
    where: { slug: 'insertion-sort-medium' },
    update: {
      title: 'Sort by Frequency',
      description: `### Problem
        Given a string \`s\`, sort its characters in **decreasing order** based on the **frequency** of characters. 
        \n
        Use the **Insertion Sort** logic to maintain the order of characters as you process their frequencies. If two characters have the same frequency, their relative order doesn't matter.
        \n
        ### Example
        **Input:** \`s = "tree"\`  
        **Output:** \`"eert"\` (or "eetr")
        **Explanation:** 'e' appears twice, 'r' and 't' appear once.
        \n
        **Input:** \`s = "cccaaa"\`  
        **Output:** \`"cccaaa"\` (or "aaaccc")`,
    },
    create: {
      title: 'Sort by Frequency',
      slug: 'insertion-sort-medium',
      difficulty: 'MEDIUM',
      algorithmId: algorithms.find((a) => a.slug === 'insertion-sort')!.id,
      description: '...',
    },
  });

  const insertionSortHard = await prisma.exercise.upsert({
    where: { slug: 'insertion-sort-hard' },
    update: {
      title: 'Insertion Sort on Doubly Linked List',
      description: `### Problem
        Given the head of a **Doubly Linked List**, sort it using **Insertion Sort**.
        \n
        **Requirements:**
        * You must rearrange the nodes by changing their \`prev\` and \`next\` pointers.
        * Do not just swap the values.
        * Your implementation should be efficient for linked structures.
        \n
        ### Example
        **Input:** \`head = [4, 3, 2, 1]\`  
        **Output:** \`[1, 2, 3, 4]\`
        \n
        ### Constraints
        * The number of nodes is in the range \`[0, 1000]\`.
        * \`-5000 <= Node.val <= 5000\``,
      constraints: 'O(1) extra space. Must rearrange pointers.',
    },
    create: {
      title: 'Insertion Sort on Doubly Linked List',
      slug: 'insertion-sort-hard',
      difficulty: 'HARD',
      algorithmId: algorithms.find((a) => a.slug === 'insertion-sort')!.id,
      description: '...',
      constraints: 'Must rearrange pointers.',
    },
  });

  const quickSortEasy = await prisma.exercise.upsert({
    where: { slug: 'quick-sort-easy' },
    update: {
      title: 'Quick Sort - Partition Logic',
      description: `### Problem
        Implement the core logic of **Quick Sort**. Your task is to pick the **last element** of the array as the pivot and rearrange the array so that:
        1. All elements less than or equal to the pivot are on the left.
        2. All elements greater than the pivot are on the right.
        \n
        Return the final sorted array.
        \n
        ### Example
        **Input:** \`nums = [10, 80, 30, 90, 40, 50]\`  
        **Output:** \`[10, 30, 40, 50, 80, 90]\`
        \n
        ### Constraints
        * \`1 <= nums.length <= 1000\`
        * \`-10^4 <= nums[i] <= 10^4\``,
    },
    create: {
      title: 'Quick Sort - Partition Logic',
      slug: 'quick-sort-easy',
      difficulty: 'EASY',
      algorithmId: algorithms.find((a) => a.slug === 'quick-sort')!.id,
      description: '...',
    },
  });

  const quickSortMedium = await prisma.exercise.upsert({
    where: { slug: 'quick-sort-medium' },
    update: {
      title: 'Sort Colors (3-Way Partition)',
      description: `### Problem
        Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
        \n
        We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.
        \n
        **Requirement:** You must solve this using the **3-way partitioning** logic inspired by Quick Sort.
        \n
        ### Example
        **Input:** \`nums = [2, 0, 2, 1, 1, 0]\`  
        **Output:** \`[0, 0, 1, 1, 2, 2]\`
        \n
        ### Constraints
        * \`n == nums.length\`
        * \`1 <= n <= 300\`
        * \`nums[i]\` is either \`0, 1,\` or \`2\`.`,
      constraints: 'Must be solved in-place without using library sort.',
    },
    create: {
      title: 'Sort Colors (3-Way Partition)',
      slug: 'quick-sort-medium',
      difficulty: 'MEDIUM',
      algorithmId: algorithms.find((a) => a.slug === 'quick-sort')!.id,
      description: '...',
      constraints: 'In-place sorting required.',
    },
  });

  const quickSortHard = await prisma.exercise.upsert({
    where: { slug: 'quick-sort-hard' },
    update: {
      title: 'Quick Select - Kth Smallest Element',
      description: `### Problem
        Given an integer array \`nums\` and an integer \`k\`, return the \`k^{th}\` smallest element in the array.
        \n
        Note that it is the \`k^{th}\` smallest element in the sorted order, not the \`k^{th}\` distinct element.
        \n
        **Requirement:** You must implement the **Quick Select** algorithm. Avoid sorting the entire array to maintain efficiency.
        \n
        ### Example
        **Input:** \`nums = [7, 10, 4, 3, 20, 15], k = 3\`  
        **Output:** \`7\`
        **Explanation:** The sorted array would be \`[3, 4, 7, 10, 15, 20]\`. The 3rd smallest is 7.
        \n
        ### Constraints
        * \`1 <= k <= nums.length <= 10^5\`
        * \`-10^4 <= nums[i] <= 10^4\``,
      constraints: 'Average time complexity should be O(n).',
    },
    create: {
      title: 'Quick Select - Kth Smallest Element',
      slug: 'quick-sort-hard',
      difficulty: 'HARD',
      algorithmId: algorithms.find((a) => a.slug === 'quick-sort')!.id,
      description: '...',
      constraints: 'O(n) average time complexity.',
    },
  });

  const linearSearchEasy = await prisma.exercise.upsert({
    where: { slug: 'linear-search-easy' },
    update: {
      title: 'Linear Search - First Occurrence',
      description: `### Problem
        Given an array of integers \`nums\` and an integer \`target\`, find the index of the **first occurrence** of \`target\`. If \`target\` does not exist, return \`-1\`.
        \n
        ### Example
        **Input:** \`nums = [4, 5, 2, 5, 3], target = 5\`  
        **Output:** \`1\` (Index of the first 5)
        \n
        **Input:** \`nums = [1, 2, 3], target = 4\`  
        **Output:** \`-1\``,
    },
    create: {
      title: 'Linear Search - First Occurrence',
      slug: 'linear-search-easy',
      difficulty: 'EASY',
      algorithmId: algorithms.find((a) => a.slug === 'linear-search')!.id,
      description: '...',
    },
  });

  const linearSearchMedium = await prisma.exercise.upsert({
    where: { slug: 'linear-search-medium' },
    update: {
      title: 'Search in 2D Matrix',
      description: `### Problem
        Given an \`m x n\` integer matrix, find the position \`[row, col]\` of a \`target\` value. Since the matrix is not sorted, you must check every element. Return \`[-1, -1]\` if not found.
        \n
        ### Example
        **Input:** \`matrix = [[10, 20], [30, 40]], target = 30\`  
        **Output:** \`[1, 0]\``,
    },
    create: {
      title: 'Search in 2D Matrix',
      slug: 'linear-search-medium',
      difficulty: 'MEDIUM',
      algorithmId: algorithms.find((a) => a.slug === 'linear-search')!.id,
      description: '...',
    },
  });

  const linearSearchHard = await prisma.exercise.upsert({
    where: { slug: 'linear-search-hard' },
    update: {
      title: 'Find All Anagrams (Pattern Search)',
      description: `### Problem
        Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s anagrams in \`s\`. 
        \n
        An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
        \n
        **Requirement:** You must use a linear scanning approach (Sliding Window) to check each possible position in string \`s\`.
        \n
        ### Example
        **Input:** \`s = "cbaebabacd", p = "abc"\`  
        **Output:** \`[0, 6]\`  
        **Explanation:** - The substring with start index 0 is "cba", which is an anagram of "abc".
        - The substring with start index 6 is "bac", which is an anagram of "abc".
        \n
        ### Constraints
        * \`1 <= s.length, p.length <= 3 * 10^4\`
        * \`s\` and \`p\` consist of lowercase English letters.`,
      constraints:
        'Must complete in O(n) time complexity where n is the length of string s.',
    },
    create: {
      title: 'Find All Anagrams (Pattern Search)',
      slug: 'linear-search-hard',
      difficulty: 'HARD',
      algorithmId: algorithms.find((a) => a.slug === 'linear-search')!.id,
      description: '...',
      constraints: 'Linear scan with O(n) complexity.',
    },
  });

  const binarySearchEasy = await prisma.exercise.upsert({
    where: { slug: 'binary-search-easy' },
    update: {
      title: 'Standard Binary Search',
      description: `### Problem
        Given a **sorted** array of integers \`nums\` and an integer \`target\`, write a function to search for \`target\` in \`nums\`. If it exists, return its index. Otherwise, return \`-1\`.
        \n
        ### Example
        **Input:** \`nums = [-1, 0, 3, 5, 9, 12], target = 9\`  
        **Output:** \`4\``,
      constraints: 'Time complexity must be O(log n).',
    },
    create: {
      title: 'Standard Binary Search',
      slug: 'binary-search-easy',
      difficulty: 'EASY',
      algorithmId: algorithms.find((a) => a.slug === 'binary-search')!.id,
      description: '...',
      constraints: 'O(log n) required.',
    },
  });

  const binarySearchMedium = await prisma.exercise.upsert({
    where: { slug: 'binary-search-medium' },
    update: {
      title: 'Search Range in Sorted Array',
      description: `### Problem
        Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.
        \n
        If \`target\` is not found in the array, return \`[-1, -1]\`.
        \n
        ### Example
        **Input:** \`nums = [5, 7, 7, 8, 8, 10], target = 8\`  
        **Output:** \`[3, 4]\``,
    },
    create: {
      title: 'Search Range in Sorted Array',
      slug: 'binary-search-medium',
      difficulty: 'MEDIUM',
      algorithmId: algorithms.find((a) => a.slug === 'binary-search')!.id,
      description: '...',
    },
  });

  const binarySearchHard = await prisma.exercise.upsert({
    where: { slug: 'binary-search-hard' },
    update: {
      title: 'Compute Square Root (sqrt)',
      description: `### Problem
        Given a non-negative integer \`x\`, compute and return the square root of \`x\`. Since the return type is an integer, the decimal digits are **truncated**, and only the integer part of the result is returned.
        \n
        **Requirement:** You must use **Binary Search** to find the result in \`O(log x)\`.
        \n
        ### Example
        **Input:** \`x = 8\`  
        **Output:** \`2\`  
        *(Explanation: The square root of 8 is 2.828..., and since we truncate, 2 is returned.)*`,
    },
    create: {
      title: 'Compute Square Root (sqrt)',
      slug: 'binary-search-hard',
      difficulty: 'HARD',
      algorithmId: algorithms.find((a) => a.slug === 'binary-search')!.id,
      description: '...',
    },
  });

  await prisma.testCase.createMany({
    data: [
      {
        input: '[5, 2, 8, 1, 3]',
        expectedOutput: '[1, 2, 3, 5, 8]',
        isSample: true,
        exerciseId: bubbleSortEasy.id,
      },
      {
        input: '[1, 2, 3, 5, 4]',
        expectedOutput: '[1, 2, 3, 4, 5]',
        isSample: true,
        exerciseId: bubbleSortMedium.id,
      },
      {
        input: '[4, 2, 1, 3]',
        expectedOutput: '[1, 2, 3, 4]',
        isSample: true,
        exerciseId: bubbleSortHard.id,
      },
      {
        input: '[5, 3, 8, 2]',
        expectedOutput: '[2, 3, 5, 8]',
        isSample: true,
        exerciseId: selectionSortEasy.id,
      },
      {
        input: '["banana", "apple", "cat"]',
        expectedOutput: '["cat", "apple", "banana"]',
        isSample: true,
        exerciseId: selectionSortMedium.id,
      },
      {
        input: '[4, 5, 4, 3]',
        expectedOutput: '[3, 4, 4, 5]',
        isSample: true,
        exerciseId: selectionSortHard.id,
      },
      {
        input: '[3, 1, 4, 2]',
        expectedOutput: '[1, 2, 3, 4]',
        isSample: true,
        exerciseId: insertionSortEasy.id,
      },
      {
        input: '"apple"',
        expectedOutput: '"ppael"',
        isSample: true,
        exerciseId: insertionSortMedium.id,
      },
      {
        input: '[10, 5, 20, 15]',
        expectedOutput: '[5, 10, 15, 20]',
        isSample: true,
        exerciseId: insertionSortHard.id,
      },
      {
        input: '[3, 5, 8, 1, 2, 9]',
        expectedOutput: '[1, 2, 3, 5, 8, 9]',
        isSample: true,
        exerciseId: quickSortEasy.id,
      },
      {
        input: '[2, 0, 1]',
        expectedOutput: '[0, 1, 2]',
        isSample: true,
        exerciseId: quickSortMedium.id,
      },
      {
        input: '[12, 3, 5, 7, 19], k = 2',
        expectedOutput: '5',
        isSample: true,
        exerciseId: quickSortHard.id,
      },
      {
        input: '[10, 5, 20], 5',
        expectedOutput: '1',
        isSample: true,
        exerciseId: linearSearchEasy.id,
      },
      {
        input: '[[1, 2], [3, 4]], 3',
        expectedOutput: '[1, 0]',
        isSample: true,
        exerciseId: linearSearchMedium.id,
      },
      {
        input: '[-1, 0, 5], 5',
        expectedOutput: '2',
        isSample: true,
        exerciseId: binarySearchEasy.id,
      },
      {
        input: '[5, 7, 7, 8], 7',
        expectedOutput: '[1, 2]',
        isSample: true,
        exerciseId: binarySearchMedium.id,
      },
      {
        input: '[2,5,6,0,0,1,2], 0',
        expectedOutput: 'true',
        isSample: true,
        exerciseId: binarySearchHard.id,
      },
      {
        input: 's = "cbaebabacd", p = "abc"',
        expectedOutput: '[0, 6]',
        isSample: true,
        exerciseId: linearSearchHard.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
