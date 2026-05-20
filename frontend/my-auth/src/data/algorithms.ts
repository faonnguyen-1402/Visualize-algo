export const algorithms:any = {
  bubbleSort: {
   
    code: {
      javascript: "function bubbleSort(list) {\n  for (let i = 0; i < list.length - 1; i++) {\n    for (let j = 0; j < list.length - i - 1; j++) {\n      if (list[j] > list[j+1]) [list[j], list[j+1]] = [list[j+1], list[j]];\n    }\n  }\n  return list;\n}",
      python: "def bubble_sort(list):\n    n = len(list)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if list[j] > list[j+1]:\n                list[j], list[j+1] = list[j+1], list[j]\n    return list",
      cpp: "void bubbleSort(int list[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (list[j] > list[j+1]) swap(list[j], list[j+1]);\n}",
      csharp: "public static void BubbleSort(int[] list) {\n    for (int i = 0; i < list.Length - 1; i++)\n        for (int j = 0; j < list.Length - i - 1; j++)\n            if (list[j] > list[j+1]) (list[j], list[j+1]) = (list[j+1], list[j]);\n}"
    }
  },
  selectionSort: {
    
    code: {
      javascript: "function selectionSort(list) {\n  for (let i = 0; i < list.length; i++) {\n    let min = i;\n    for (let j = i + 1; j < list.length; j++) {\n      if (list[j] < list[min]) min = j;\n    }\n    [list[i], list[min]] = [list[min], list[i]];\n  }\n  return list;\n}",
      python: "def selection_sort(list):\n    for i in range(len(list)):\n        min_idx = i\n        for j in range(i+1, len(list)):\n            if list[j] < list[min_idx]: min_idx = j\n        list[i], list[min_idx] = list[min_idx], list[i]\n    return list",
      cpp: "void selectionSort(int list[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++)\n            if (list[j] < list[min_idx]) min_idx = j;\n        swap(list[min_idx], list[i]);\n    }\n}",
      csharp: "public static void SelectionSort(int[] list) {\n    for (int i = 0; i < list.Length - 1; i++) {\n        int min = i;\n        for (int j = i + 1; j < list.Length; j++)\n            if (list[j] < list[min]) min = j;\n        (list[i], list[min]) = (list[min], list[i]);\n    }\n}"
    }
  },
  insertionSort: {
   
    code: {
      javascript: "function insertionSort(list) {\n  for (let i = 1; i < list.length; i++) {\n    let key = list[i], j = i - 1;\n    while (j >= 0 && list[j] > key) {\n      list[j + 1] = list[j];\n      j--;\n    }\n    list[j + 1] = key;\n  }\n  return list;\n}",
      python: "def insertion_sort(list):\n    for i in range(1, len(list)):\n        key = list[i]\n        j = i - 1\n        while j >= 0 and list[j] > key:\n            list[j+1] = list[j]\n            j -= 1\n        list[j+1] = key\n    return list",
      cpp: "void insertionSort(int list[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = list[i], j = i - 1;\n        while (j >= 0 && list[j] > key) {\n            list[j+1] = list[j];\n            j--;\n        }\n        list[j+1] = key;\n    }\n}",
      csharp: "public static void InsertionSort(int[] list) {\n    for (int i = 1; i < list.Length; i++) {\n        int key = list[i], j = i - 1;\n        while (j >= 0 && list[j] > key) {\n            list[j+1] = list[j];\n            j--;\n        }\n        list[j+1] = key;\n    }\n}"
    }
  },
  quickSort: {
    
    code: {
      javascript: "function quickSort(arr, low, high) {\n  if (low < high) {\n    let p = partition(arr, low, high);\n    quickSort(arr, low, p - 1);\n    quickSort(arr, p + 1, high);\n  }\n}",
      python: "def quick_sort(arr, low, high):\n    if low < high:\n        p = partition(arr, low, high)\n        quick_sort(arr, low, p - 1)\n        quick_sort(arr, p + 1, high)",
      cpp: "void quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int p = partition(arr, low, high);\n        quickSort(arr, low, p - 1);\n        quickSort(arr, p + 1, high);\n    }\n}",
      csharp: "public static void QuickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int p = Partition(arr, low, high);\n        QuickSort(arr, low, p - 1);\n        QuickSort(arr, p + 1, high);\n    }\n}"
    }
  },
  binarySearch: {
    
    code: {
      javascript: "function binarySearch(list, target) {\n  let low = 0, high = list.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (list[mid] === target) return mid;\n    if (list[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
      python: "def binary_search(list, target):\n    low, high = 0, len(list)-1\n    while low <= high:\n        mid = (low + high) // 2\n        if list[mid] == target: return mid\n        elif list[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1",
      cpp: "int binarySearch(int list[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (list[mid] == target) return mid;\n        if (list[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
      csharp: "public static int BinarySearch(int[] list, int target) {\n    int low = 0, high = list.Length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (list[mid] == target) return mid;\n        if (list[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}"
    }
  },
  linearSearch: {
   
    code: {
      javascript: "function linearSearch(list, target) {\n  for (let i = 0; i < list.length; i++) {\n    if (list[i] === target) return i;\n  }\n  return -1;\n}",
      python: "def linear_search(list, target):\n    for i in range(len(list)):\n        if list[i] == target: return i\n    return -1",
      cpp: "int linearSearch(int list[], int n, int target) {\n    for (int i = 0; i < n; i++)\n        if (list[i] == target) return i;\n    return -1;\n}",
      csharp: "public static int LinearSearch(int[] list, int target) {\n    for (int i = 0; i < list.Length; i++)\n        if (list[i] == target) return i;\n    return -1;\n}"
    }
  }
};