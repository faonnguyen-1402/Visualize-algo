// ==================== DATA ====================
    const algorithms = [
        // Sorting
        {
            id: 'bubble-sort',
            name: 'Bubble Sort',
            category: 'Sorting',
            difficulty: 'Easy',
            icon: '📊',
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
            icon: '⚡',
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
            icon: '🔀',
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
            icon: '📌',
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
            icon: '🔎',
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
            icon: '🔍',
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

    // ==================== STATE ====================
    let currentAlgorithm = null;
    let currentStep = 0;
    let isPlaying = false;
    let animationSpeed = 1;
    let playInterval = null;
    let steps = [];

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', () => {
        renderAlgorithmCards();
    });

    function renderAlgorithmCards() {
        const sorting = algorithms.filter(a => a.category === 'Sorting');
        const searching = algorithms.filter(a => a.category === 'Searching');

        renderCards('sorting-cards', sorting);
        renderCards('searching-cards', searching);
    }

    function renderCards(containerId, algos) {
        const container = document.getElementById(containerId);
        container.innerHTML = algos.map((algo, idx) => `
            <article class="algorithm-card" style="animation-delay: ${idx * 0.1}s" onclick="openAlgorithm('${algo.id}')">
                <div class="card-glow"></div>
                <div class="card-content">
                    <div class="card-header">
                        <span class="card-icon">${algo.icon}</span>
                        <span class="card-category">${algo.category}</span>
                    </div>
                    <h3 class="card-title">${algo.name}</h3>
                    <div class="card-footer">
                        <span class="difficulty ${algo.difficulty.toLowerCase()}">${algo.difficulty}</span>
                        <span class="card-arrow">Learn →</span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // ==================== MODAL FUNCTIONS ====================
    function openAlgorithm(algorithmId) {
        currentAlgorithm = algorithms.find(a => a.id === algorithmId);
        if (!currentAlgorithm) return;

        // Populate modal
        document.getElementById('modalTitle').textContent = currentAlgorithm.name;
        document.getElementById('algorithmDescription').textContent = currentAlgorithm.description;
        document.getElementById('infoDifficulty').textContent = currentAlgorithm.difficulty;
        document.getElementById('infoTimeComplexity').textContent = currentAlgorithm.timeComplexity;
        document.getElementById('infoSpaceComplexity').textContent = currentAlgorithm.spaceComplexity;
        document.getElementById('infoCategory').textContent = currentAlgorithm.category;
        document.getElementById('codeContent').textContent = currentAlgorithm.pseudocode;

        // Reset visualization
        resetAlgorithm();

        // Show modal
        document.getElementById('algorithmModal').classList.add('active');
    }

    function showHomepage() {
        document.getElementById('algorithmModal').classList.remove('active');
        stopPlayback();
    }

    // ==================== VISUALIZATION ====================
    function generateVisualization() {
        const container = document.getElementById('arrayBars');
        const barCount = 12;
        const bars = [];

        for (let i = 0; i < barCount; i++) {
            bars.push(Math.floor(Math.random() * 80) + 10);
        }

        container.innerHTML = bars.map((height, idx) => `
            <div class="bar" data-index="${idx}" style="height: ${height}%">
                <span class="bar-label">${Math.round(height)}</span>
            </div>
        `).join('');

        return bars;
    }

    function updateVisualization(comparingIndices = [], swappingIndices = [], sortedIndices = []) {
        document.querySelectorAll('.bar').forEach((bar, idx) => {
            bar.classList.remove('comparing', 'swapping', 'sorted');

            if (sortedIndices.includes(idx)) {
                bar.classList.add('sorted');
            } else if (swappingIndices.includes(idx)) {
                bar.classList.add('swapping');
            } else if (comparingIndices.includes(idx)) {
                bar.classList.add('comparing');
            }
        });
    }

    // ==================== ALGORITHM STEPS ====================
    
    function resetAlgorithm() {
        stopPlayback();
        currentStep = 0;
        generateVisualization();
        updateStepDisplay();
        updateProgressBar();
        document.getElementById('totalSteps').textContent = '10';
    }

    function nextStep() {
        if (currentStep < 9) {
            currentStep++;
            simulateStep();
        }
    }

    function previousStep() {
        if (currentStep > 0) {
            currentStep--;
            simulateStep();
        }
    }

    function simulateStep() {
        // Simulate different states for visualization
        const bars = document.querySelectorAll('.bar');
        const step = currentStep;

        bars.forEach(bar => bar.classList.remove('comparing', 'swapping', 'sorted'));

        if (step % 3 === 0 && step > 0) {
            // Show comparing state
            const idx1 = Math.floor(Math.random() * (bars.length - 1));
            const idx2 = idx1 + 1;
            bars[idx1]?.classList.add('comparing');
            bars[idx2]?.classList.add('comparing');
        } else if (step % 3 === 1 && step > 0) {
            // Show swapping state
            const idx1 = Math.floor(Math.random() * (bars.length - 1));
            const idx2 = idx1 + 1;
            bars[idx1]?.classList.add('swapping');
            bars[idx2]?.classList.add('swapping');
        } else if (step % 3 === 2 && step > 0) {
            // Show sorted state
            const sortedCount = Math.floor((step / 10) * bars.length);
            for (let i = bars.length - sortedCount; i < bars.length; i++) {
                bars[i]?.classList.add('sorted');
            }
        }

        updateStepDisplay();
        updateProgressBar();
    }

    function updateStepDisplay() {
        document.getElementById('currentStep').textContent = currentStep;
        const stepValue = document.querySelector('.step-value');
        stepValue.style.animation = 'none';
        setTimeout(() => {
            stepValue.style.animation = 'pulse 0.3s ease-out';
        }, 10);
    }

    function updateProgressBar() {
        const totalSteps = 10;
        const percentage = (currentStep / totalSteps) * 100;
        document.getElementById('progressFill').style.width = percentage + '%';
    }

    // ==================== PLAYBACK CONTROL ====================
    function togglePlay() {
        isPlaying ? stopPlayback() : startPlayback();
    }

    function startPlayback() {
        isPlaying = true;
        const playBtn = document.getElementById('playBtn');
        playBtn.classList.add('playing');
        playBtn.textContent = '⏸ Pause';

        playInterval = setInterval(() => {
            if (currentStep < 9) {
                nextStep();
            } else {
                stopPlayback();
            }
        }, 1000 / animationSpeed);
    }

    function stopPlayback() {
        isPlaying = false;
        clearInterval(playInterval);
        const playBtn = document.getElementById('playBtn');
        playBtn.classList.remove('playing');
        playBtn.textContent = '▶ Play';
    }

    function updateSpeed() {
        const slider = document.getElementById('speedSlider');
        animationSpeed = parseFloat(slider.value);
        document.getElementById('speedValue').textContent = animationSpeed.toFixed(1) + 'x';

        if (isPlaying) {
            stopPlayback();
            startPlayback();
        }
    }

    // ==================== CODE PANEL ====================
    function switchCodeTab(tab) {
        document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');

        if (tab === 'pseudo') {
            document.getElementById('codeContent').textContent = currentAlgorithm.pseudocode;
        } else {
            document.getElementById('codeContent').textContent = currentAlgorithm.code;
        }
    }

    // Close modal on background click
    window.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy chuỗi ID từ URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedId = urlParams.get('id');

    // 2. Nếu có ID, tìm thuật toán trong mảng dữ liệu và hiển thị
    if (selectedId) {
        // currentAlgorithm = algorithms.find(a => a.id === selectedId);
        // Sau đó gọi hàm hiển thị thông tin như bạn đã làm
        openAlgorithm(selectedId); 
    }
});