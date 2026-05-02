import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed data');

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
      description: 'Sort the bubbles by swapping adjacent elements.',
      pseudoCode: `procedure bubbleSort(list)
        for i from 0 to n-1
            for j from 0 to n-i-1
                if list[j] > list[j+1]
                    swap(list[j], list[j+1])`,
      timeComplexity: 'O(n^2)',
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
        'Sort by continuously searching for the smallest element in the unsorted portion and moving it to the front.',
      pseudoCode: `procedure selectionSort(list)
      for i from 0 to n-1
        minIndex = i
        for j from i + 1 to n
          if list[j] < list[minIndex]
          minIndex = j
        swap(list[minIndex], list[i])`,
      timeComplexity: 'O(n^2)',
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
        'Insert elements into the final array one by one by placing each element in its correct position.',
      pseudoCode: `procedure insertionSort(list)
      for i from 1 to n
        key = list[i]
        j = i - 1
        while j >= 0 and list[j] > key
          list[j+1] = list[j]
          j = j -1
        list[j+1] = key`,
      timeComplexity: 'O(n^2)',
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
        'Quick sort uses the divide-and-conquer strategy, selecting a pivot element to split the array.',
      pseudoCode: `procedure quickSort(list, low, high)
      if low < high
        p = partition(list, low, high)
        quickSort(list, low, p - 1)
        quickSort(list, p + 1, high)`,
      timeComplexity: 'O(n log n)',
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
      description: 'Binary search on a sorted array.',
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
