import { useEffect } from "react";
import { animate } from "motion";

export function useAnimation(step: any, targetValue?: number | null) {
  useEffect(() => {
    if (!step) return;

    const timeoutId = setTimeout(()=>{
    const bars = document.querySelectorAll<HTMLElement>(".bar");

    bars.forEach(b => {
      b.classList.remove("comparing", "swapping", "sorted", "active", "active-mid", "active-range", "target");
    });

    if (targetValue !== undefined && targetValue !== null) {
      bars.forEach(b => {
        const label = b.querySelector(".bar-label");
        if (label && parseInt(label.textContent || "0") === targetValue) {
          b.classList.add("target"); // Thêm class target
        }
      });
    }

    const type = step.type?.toUpperCase();
    const indices = step.indices || [];

    if (type === "COMPARE" && indices.length === 3) {
        bars[indices[0]]?.classList.add("active-range");
        bars[indices[1]]?.classList.add("active-mid");
        bars[indices[2]]?.classList.add("active-range");
      } else if(type === "COMPARE") {
       indices.forEach((idx: number) => bars[idx]?.classList.add("active"));
      }
    
    if (type === "PRE_SORT" && step.array) {
      step.array.forEach((val: number, idx: number) => {
        if (bars[idx]) {
          bars[idx].style.height = val + "%";
          const label = bars[idx].querySelector(".bar-label");
          if (label) label.textContent = val.toString();
        }
      });

      if (targetValue !== null) {
        bars.forEach(b => {
          const label = b.querySelector(".bar-label");
          if (label && parseInt(label.textContent || "0") === targetValue) {
            b.classList.add("target");
          }
        });
      }
    }

    if (type === "SORTED" || type === "FOUND") {
      if (step.index !== undefined) {
        bars[step.index]?.classList.add("sorted");
      } else {
        indices.forEach((idx: number) => bars[idx]?.classList.add("sorted"));
      }
    }

    // if (type === "FOUND") {
    //   //  const foundIdx = indices[0];
    //    bars[indices[0]]?.classList.add("sorted"); // Đổi sang xanh lá khi xong
    // }

    if (type === "SWAP" && step.array) {
      indices.forEach((idx: number) => {
        bars[idx]?.classList.add("swapping");
      });

      if (step.array) {
        indices.forEach((idx: number) => {
          if (bars[idx]) {
            bars[idx].style.height = step.array[idx] + "%";
            const label = bars[idx].querySelector(".bar-label");
            if (label) label.textContent = step.array[idx];
          }
        });
      }
    }



    // if (step.type === "compare") {
    //   bars[step.indices[0]]?.classList.add("comparing");
    //   bars[step.indices[1]]?.classList.add("comparing");
    // }

    // if (step.type === "swap") {
    //   bars[step.indices[0]]?.classList.add("swapping");
    //   bars[step.indices[1]]?.classList.add("swapping");

    //   if (step.array) {
    //     bars[step.indices[0]].style.height =
    //       step.array[step.indices[0]] + "%";

    //     bars[step.indices[1]].style.height =
    //       step.array[step.indices[1]] + "%";
    //   }
    // }

    // if (step.type === "sorted") {
    //   bars[step.index]?.classList.add("sorted");
    // }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [step, targetValue]);
}