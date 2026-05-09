import { useEffect, useRef } from "react";
import { select, hierarchy, tree } from "d3";
import { useTreeAnimation } from "../hooks/useTreeAnimation";
import "../pages/home/mainapp.css";

type Node = {
  name: string;
  children?: Node[];
};

type Props = {
  data?: Node;
  activeNode?: string;
  visitedNodes?: string[];
  pathNodes?: string[];
  step?: any;
};

const TreeVisualization = ({
  data,
  activeNode,
  visitedNodes = [],
  pathNodes = [],
  step,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useTreeAnimation(step);   // ← Giữ nguyên

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const width = 760;
    const height = 460;
    const svg = select(svgRef.current);

    svg.selectAll("*").remove();

    const root = hierarchy<Node>(data);
    const treeLayout = tree<Node>().size([
  height - 50,
  width - 160
]);
    treeLayout(root);
    root.descendants().forEach((d: any) => {
      d.y += 80;
    });

    // ==================== LINKS ====================
    svg
    .selectAll(".tree-link")
    .data(root.links())
    .join("path")
    .attr("class", "tree-link")
    .attr("data-source", (d: any) => d.source.data.name)
    .attr("data-target", (d: any) => d.target.data.name)
    .attr("stroke", "#64748b")
    .attr("stroke-width", 3)
    .attr("stroke-linecap", "round")
    .attr("fill", "none")
    .attr("d", (d: any) => {

      const sx = d.source.y;
      const sy = d.source.x;

      const tx = d.target.y;
      const ty = d.target.x;

      return `
        M ${sx},${sy}
        C ${(sx + tx) / 2},${sy}
          ${(sx + tx) / 2},${ty}
          ${tx},${ty}
      `;
    });

    // ==================== NODES ====================
    svg
      .selectAll(".tree-node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "tree-node")
      .attr("data-name", (d: any) => d.data.name)           // ← Quan trọng nhất
      .attr("cx", (d: any) => d.y)
      .attr("cy", (d: any) => d.x)
      .attr("r", 24)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 3);

    // ==================== LABELS ====================
    svg
      .selectAll(".tree-label")
      .data(root.descendants())
      .join("text")
      .attr("class", "tree-label")
      .attr("x", (d: any) => d.y)
      .attr("y", (d: any) => d.x + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "15px")
      .attr("font-weight", "bold")
      .text((d: any) => d.data.name);
  }, [data]);

  return (
    <figure className="visualization-area tree-wrapper">
      <svg
        ref={svgRef}
        viewBox="0 0 760 460"
        preserveAspectRatio="xMidYMid meet"
        className="tree-svg"
      />
    </figure>
  );
};

export default TreeVisualization;