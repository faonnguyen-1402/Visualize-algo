import { useEffect } from "react";
import { animate } from "motion";

export function useTreeAnimation(step: any) {
  useEffect(() => {
    console.log("useTreeAnimation called with step:", step);
    if (!step) return;

    const nodes = document.querySelectorAll<SVGCircleElement>(".tree-node");
    const links = document.querySelectorAll<SVGLineElement>(".tree-link");

    // RESET tất cả các hiệu ứng trước
    nodes.forEach((node) => {
      node.classList.remove("active", "visited", "found");
    });

    links.forEach((link) => {
      link.classList.remove("active-path"); 
    });

    // =========================
    // VISIT (Node đang duyệt)
    // =========================
    if (step.type === "visit" && step.activeNode) {
      const activeNodeEl = Array.from(nodes).find(
        (node) => node.getAttribute("data-name") === step.activeNode
      );

      if (activeNodeEl) {
        activeNodeEl.classList.add("active");

        animate(
          activeNodeEl,
          {
            scale: [1, 1.45, 1],
            fill: "#facc15",
          },
          {
            duration: 0.7,
            ease: "easeInOut",
          }
        );
      }

      // Highlight đường dẫn (path)
      if (step.path && step.path.length > 0) {
        links.forEach((link) => {
          const source = link.getAttribute("data-source");
          const target = link.getAttribute("data-target");

          if (
            source &&
            target &&
            step.path.includes(source) &&
            step.path.includes(target)
          ) {
            link.classList.add("active-path");

            animate(
              link,
              {
                stroke: "#f97316",
                strokeWidth: [2.5, 5.5, 4],
              },
              {
                duration: 0.5,
              }
            );
          }
        });
      }
    }

    // =========================
    // VISITED NODES
    // =========================
    if (step.visitedNodes && Array.isArray(step.visitedNodes)) {
      step.visitedNodes.forEach((name: string) => {
        const visitedNode = Array.from(nodes).find(
          (node) => node.getAttribute("data-name") === name
        );

        if (visitedNode) {
          visitedNode.classList.add("visited");
          animate(visitedNode, { fill: "#22c55e" }, { duration: 0.4 });
        }
      });
    }

    // =========================
    // FOUND
    // =========================
    if (step.type === "found" && step.activeNode) {
      const foundNode = Array.from(nodes).find(
        (node) => node.getAttribute("data-name") === step.activeNode
      );

      if (foundNode) {
        foundNode.classList.add("found");

        animate(
          foundNode,
          {
            scale: [1, 1.6, 1.2],
            fill: "#eab308",
          },
          {
            duration: 0.9,
          }
        );
      }
    }

    // =========================
    // DONE
    // =========================
    if (step.type === "done") {
      nodes.forEach((node, index) => {
        animate(
          node,
          {
            fill: "#22c55e",
            scale: [1, 1.1, 1],
          },
          {
            duration: 0.6,
            delay: index * 0.03,
          }
        );
      });
    }
  }, [step]);
}