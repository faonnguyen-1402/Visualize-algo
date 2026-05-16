import { useState, useEffect, useRef } from "react";
import { algorithmMap } from "../algorithms";
import axios from "axios";

type Step =
  | { type: "compare"; indices: number[] }
  | { type: "swap"; indices: number[]; array: number[] }
  | { type: "sorted"; index: number };

export function useSortAlgorithm() {
  const [values, setValues] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [active, setActive] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  const playRef = useRef(false);
  const originalRef = useRef<number []>([]);

  const [target, setTarget] = useState<number | null>(null);
  const originalTargetRef = useRef<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  function generateArray() {
    const arr = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 80) + 10
    );
    originalRef.current = arr;
    setValues(arr);
    return arr;
  }

  // function loadAlgorithm(id: number | string) {
  //   const arr = generateArray();
  //   const handler = algorithmMap[id];
  //   if (!handler) return;

  //   const s = handler([...arr]);

  //   setSteps(s);
  //   setStep(0);
  //   setActive([]);
  //   setSwapping([]);
  //   setSorted([]);
  // }
  // const [target, setTarget] = useState<number | null>(null);

  async function loadAlgorithm(slug:string) {
    setTarget(null);
    setSteps([]);
    setStep(0);
    setSorted([]);
    setMessage(null);

    const randomArray = generateArray(); 
    const targetVal = randomArray[Math.floor(Math.random() * randomArray.length)];

    const response = await axios.post(`http://localhost:3001/algorithms/${slug}/simulate`, {
      array: randomArray,
      target: targetVal
    });

    const {steps, sortedArray} = response.data;

    const foundStep = steps.find((s: any) => s.type.toLowerCase() === 'found');
    let actualTarget = targetVal; 

    if (foundStep && foundStep.message) {
    const match = foundStep.message.match(/Found (\d+)/);
    if (match) actualTarget = parseInt(match[1]);
  }

    setTarget(actualTarget);
    originalTargetRef.current = actualTarget;
    // setSteps(steps);
    setValues(randomArray);
    // setStep(0);
    originalRef.current = randomArray;

    let finalSteps = steps;
    if (slug === 'binary-search') {
      const preSortStep = {
        type: "PRE_SORT",
        array: sortedArray, 
        message: "Sắp xếp mảng để thực hiện Binary Search..."
      };
      finalSteps = [preSortStep, ...steps];
    }

    setSteps(finalSteps);
    setStep(0);
  }

  function next() {
    setStep(s => Math.min(s + 1, steps.length - 1));
  }

  function prev() {
    setStep(s => Math.max(s - 1, 0));
  }

  function reset() {
    setValues([...originalRef.current]);
    setTarget(originalTargetRef.current);
    setMessage(null);
    setStep(0);
    setActive([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
    playRef.current = false;
  }

  async function play() {
    if (isPlaying) return;
    setIsPlaying(true);
    playRef.current = true;

    for (let i = step; i < steps.length; i++) {
      if (!playRef.current) break;
      setStep(i);
      await new Promise(res => setTimeout(res, 400));
    }

    if (playRef.current) {
      setIsPlaying(false);
      setSorted([0, 1, 2, 3, 4, 5, 6]); 
      setActive([]);
      setSwapping([]);

      const bars = document.querySelectorAll<HTMLElement>(".bar");
    bars.forEach(bar => {
      bar.classList.remove("active", "swapping", "active-mid", "active-range");
      bar.classList.add("sorted"); // Thêm class màu hoàn tất (ví dụ xanh lá)
    });

    }

    setIsPlaying(false);
    playRef.current = false;
  }

  function pause() {
    setIsPlaying(false);
    playRef.current = false;
  }

  useEffect(() => {
    const current = steps[step];
    if (!current) return;
     
    console.log("Đang chạy bước:", step, "Dữ liệu:", steps[step]);
    setActive([]);
    setSwapping([]);

   const type = current.type.toLowerCase();

    if (type !== "found") {
     // Có thể ẩn message khi đang chạy các bước so sánh
     // setMessage(null); 
    }

    if (type === "PRE_SORT" && (current as any).array) {
    // Cập nhật mảng về trạng thái đã sắp xếp ngay tại bước này
      setValues([...(current as any).array]);
      setActive([]);
      setSwapping([]);
      return;
    }

    if (type === "compare" && "indices" in current) {
      setActive(current.indices as number[]);
    }

    if (type === "swap" && "indices" in current && "array" in current) {
      setSwapping(current.indices as number[]);
      if(current.array){
        setValues([...current.array]);
      }
    }

    if (type === "found") {
      const foundIdx = "indices" in current 
        ? current.indices[0] 
        : (current as any).index;
        
      // target là giá trị bạn đã tìm thấy từ Backend và set vào state 'target'
      setMessage(`Found ${target} at index ${foundIdx}`);
  }

    if (type === "sorted") {
    setSorted(prev => {
      const newIndices = "indices" in current 
      ? (current.indices as number[]) 
      : [(current as any).index];
      
    // Sửa dòng này: Dùng Array.from thay vì spread trực tiếp Set
    const updatedSorted = Array.from(new Set([...prev, ...newIndices]));
    
    return updatedSorted;
    });
  }
  }, [step, steps, target]);

  return {
    values,
    target,
    treeData: null,
    activeNode: null,
    visitedNodes: null,
    pathNodes: null,
    currentIndex: null,
    message,
    active,
    swapping,
    sorted,
    step,
    steps,
    isPlaying,
    highlightLine: steps[step] ? (steps[step] as any).highlightLine : 0,
    loadAlgorithm,
    next,
    prev,
    play,
    pause,
    reset
  };
}