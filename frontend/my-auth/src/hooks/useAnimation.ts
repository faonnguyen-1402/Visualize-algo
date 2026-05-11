import { useEffect } from "react";
import { animate } from "motion";

export function useAnimation(step: any) {
  useEffect(() => {
    if (!step) return;

    const bars = document.querySelectorAll<HTMLElement>(".bar");

    bars.forEach(b => {
      b.classList.remove("comparing", "swapping", "sorted");
    });

    if (step.type === "compare") {
      bars[step.indices[0]]?.classList.add("comparing");
      bars[step.indices[1]]?.classList.add("comparing");
    }

    if (step.type === "swap") {
      bars[step.indices[0]]?.classList.add("swapping");
      bars[step.indices[1]]?.classList.add("swapping");

      if (step.array) {
        bars[step.indices[0]].style.height =
          step.array[step.indices[0]] + "%";

        bars[step.indices[1]].style.height =
          step.array[step.indices[1]] + "%";
      }
    }

    if (step.type === "sorted") {
      bars[step.index]?.classList.add("sorted");
    }

  }, [step]);
}