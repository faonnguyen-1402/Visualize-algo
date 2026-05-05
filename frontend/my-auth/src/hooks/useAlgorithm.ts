import { useState, useEffect } from "react";
import { algorithmMap } from "../algorithms";

export function useAlgorithm() {
  const [values, setValues] = useState<number[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [step, setStep] = useState(0);

  const [active, setActive] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  function generateArray() {
    const arr = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 80) + 10
    );
    setValues(arr);
    return arr;
  }

  function loadAlgorithm(id: string) {
    const arr = generateArray();

    const handler = algorithmMap[id];
    if (!handler) return;

    const s = handler([...arr]); // ⚠️ clone để tránh mutate

    setSteps(s);
    setStep(0);
    setActive([]);
    setSwapping([]);
    setSorted([]);
  }

  function next() {
    setStep(s => Math.min(s + 1, steps.length - 1));
  }

  function prev() {
    setStep(s => Math.max(s - 1, 0));
  }

  // 🔥 APPLY STEP → UI
  useEffect(() => {
    const current = steps[step];
    if (!current) return;

    // reset
    setActive([]);
    setSwapping([]);

    if (current.type === "compare") {
      setActive(current.indices || []);
    }

    if (current.type === "swap") {
      setSwapping(current.indices || []);
      if (current.array) {
        setValues([...current.array]); // 🔥 update UI
      }
    }

    if (current.type === "sorted") {
      if (current.index !== undefined) {
        setSorted(prev => [...prev, current.index]);
      }
    }
  }, [step, steps]);

  return {
    values,
    active,
    swapping,
    sorted,
    step,
    steps,
    loadAlgorithm,
    next,
    prev
  };
}