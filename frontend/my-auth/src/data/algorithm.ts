import { Algorithm } from "../types/algorithm";

export const algorithms: Algorithm[] = [
        // Sorting
        {
            id: 'bubble-sort',
            name: 'Bubble Sort',
            category: 'Sorting',
            difficulty: 'Easy',
            description: 'Bubble Sort là thuật toán sắp xếp đơn giản nhất. Nó liên tục so sánh và đổi chỗ các phần tử lân cận nếu chúng ở sai thứ tự.',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            pseudocode: `procedure bubbleSort(A : list of sortable items)
n := length(A)
repeat
    swapped := false
    for i := 1 to n - 1 inclusive do
        if A[i - 1] > A[i] then
            swap(A[i - 1], A[i])
            swapped := true
        end if
    end for
    n := n - 1
until not swapped
end procedure`,
            code: `function bubbleSort(arr) {
const n = arr.length;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
    }
}
return arr;
}`
        },
        {
            id: 'quick-sort',
            name: 'Quick Sort',
            category: 'Sorting',
            difficulty: 'Hard',
            description: 'Quick Sort là thuật toán chia để trị. Nó chọn một phần tử làm pivot và chia mảng thành các phần tử nhỏ hơn và lớn hơn.',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(log n)',
            pseudocode: `procedure quickSort(A : list, low : integer, high : integer)
if low < high then
    p := partition(A, low, high)
    quickSort(A, low, p - 1)
    quickSort(A, p + 1, high)
end if
end procedure`,
            code: `function quickSort(arr, low = 0, high = arr.length - 1) {
if (low < high) {
    let p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
}
return arr;
}`
        },
        {
            id: 'merge-sort',
            name: 'Merge Sort',
            category: 'Sorting',
            difficulty: 'Medium',
            description: 'Merge Sort chia mảng thành các phần nhỏ hơn, sắp xếp chúng, rồi hợp lại. Đảm bảo sắp xếp ổn định.',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            pseudocode: `procedure mergeSort(A : list)
if length(A) ≤ 1 then
    return A
end if
mid := length(A) / 2
left := mergeSort(A[0...mid])
right := mergeSort(A[mid...end])
return merge(left, right)
end procedure`,
            code: `function mergeSort(arr) {
if (arr.length <= 1) return arr;
const mid = Math.floor(arr.length / 2);
const left = mergeSort(arr.slice(0, mid));
const right = mergeSort(arr.slice(mid));
return merge(left, right);
}`
        },
        {
            id: 'insertion-sort',
            name: 'Insertion Sort',
            category: 'Sorting',
            difficulty: 'Easy',
            description: 'Insertion Sort xây dựng mảng đã sắp xếp từng phần tử một bằng cách chèn từng phần tử vào vị trí đúng.',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            pseudocode: `procedure insertionSort(A : list)
for i := 1 to length(A) - 1 do
    key := A[i]
    j := i - 1
    while j >= 0 and A[j] > key do
        A[j + 1] := A[j]
        j := j - 1
    end while
    A[j + 1] := key
end for
end procedure`,
            code: `function insertionSort(arr) {
for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}
return arr;
}`
        },
        // Searching
        {
            id: 'binary-search',
            name: 'Binary Search',
            category: 'Searching',
            difficulty: 'Medium',
            description: 'Binary Search tìm phần tử trong mảng đã sắp xếp bằng cách chia mảng thành một nửa mỗi bước.',
            timeComplexity: 'O(log n)',
            spaceComplexity: 'O(1)',
            pseudocode: `procedure binarySearch(A : sorted list, x : item)
left := 0
right := length(A) - 1
while left ≤ right do
    mid := (left + right) / 2
    if A[mid] = x then
        return mid
    else if A[mid] < x then
        left := mid + 1
    else
        right := mid - 1
    end if
end while
return -1
end procedure`,
            code: `function binarySearch(arr, target) {
let left = 0, right = arr.length - 1;
while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;
}`
        },
        {
            id: 'linear-search',
            name: 'Linear Search',
            category: 'Searching',
            difficulty: 'Easy',
            description: 'Linear Search tìm phần tử bằng cách duyệt lần lượt từ đầu đến cuối mảng.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            pseudocode: `procedure linearSearch(A : list, x : item)
for i := 0 to length(A) - 1 do
    if A[i] = x then
        return i
    end if
end for
return -1
end procedure`,
            code: `function linearSearch(arr, target) {
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
}
return -1;
}`
        },
];