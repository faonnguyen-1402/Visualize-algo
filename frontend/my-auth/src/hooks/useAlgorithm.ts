import { useState, useEffect, useRef } from "react";
import { algorithmMap } from "../algorithms";

type Step =
  | { type: "compare"; indices: number[] }
  | { type: "swap"; indices: number[]; array: number[] }
  | { type: "sorted"; index: number };

export function useAlgorithm() {
  const [values, setValues] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [active, setActive] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  const playRef = useRef(false);
  const originalRef = useRef<number[]>([]);

  // ========================
  // Generate array
  // ========================
  function generateArray() {
    const arr = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 80) + 10
    );
    originalRef.current = arr;
    setValues(arr);
    return arr;
  }

  // ========================
  // Load algorithm
  // ========================
  function loadAlgorithm(id: string) {
    const arr = generateArray();
    const handler = algorithmMap[id];
    if (!handler) return;

    const s = handler([...arr]);

    setSteps(s);
    setStep(0);
    setActive([]);
    setSwapping([]);
    setSorted([]);
  }

  // ========================
  // Controls
  // ========================
  function next() {
    setStep(s => Math.min(s + 1, steps.length - 1));
  }

  function prev() {
    setStep(s => Math.max(s - 1, 0));
  }

  function reset() {
    setValues([...originalRef.current]);
    setStep(0);
    setActive([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
    playRef.current = false;
  }

  async function play() {
    setIsPlaying(true);
    playRef.current = true;

    let i = step;

    while (i < steps.length && playRef.current) {
      setStep(i);
      await new Promise(res => setTimeout(res, 400));
      i++;
    }

    setIsPlaying(false);
  }

  function pause() {
    setIsPlaying(false);
    playRef.current = false;
  }

  // ========================
  // APPLY STEP → UI
  // ========================
  useEffect(() => {
    const current = steps[step];
    if (!current) return;

    setActive([]);
    setSwapping([]);

    if (current.type === "compare") {
      setActive(current.indices);
    }

    if (current.type === "swap") {
      setSwapping(current.indices);
      setValues([...current.array]);
    }

    if (current.type === "sorted") {
    setSorted(prev => {
      if (prev.includes(current.index)) return prev;
      return [...prev, current.index];
    });
}
  }, [step, steps]);

  return {
    values,
    active,
    swapping,
    sorted,
    step,
    steps,
    isPlaying,

    loadAlgorithm,
    next,
    prev,
    play,
    pause,
    reset
  };
}