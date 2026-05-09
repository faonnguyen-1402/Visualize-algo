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

    const width = 700;
    const height = 420;
    const svg = select(svgRef.current);

    svg.selectAll("*").remove();

    const root = hierarchy<Node>(data);
    const treeLayout = tree<Node>().size([height - 100, width - 160]);
    treeLayout(root);

    // ==================== LINKS ====================
    svg
      .selectAll(".tree-link")
      .data(root.links())
      .join("line")
      .attr("class", "tree-link")
      .attr("data-source", (d: any) => d.source.data.name)   // ← Quan trọng
      .attr("data-target", (d: any) => d.target.data.name)   // ← Quan trọng
      .attr("x1", (d: any) => d.source.y)
      .attr("y1", (d: any) => d.source.x)
      .attr("x2", (d: any) => d.target.y)
      .attr("y2", (d: any) => d.target.x)
      .attr("stroke", "#64748b")
      .attr("stroke-width", 2.5);

    // ==================== NODES ====================
    svg
      .selectAll(".tree-node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "tree-node")
      .attr("data-name", (d: any) => d.data.name)           // ← Quan trọng nhất
      .attr("cx", (d: any) => d.y)
      .attr("cy", (d: any) => d.x)
      .attr("r", 20)
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
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .text((d: any) => d.data.name);
  }, [data]);

  return (
    <figure className="visualization-area">
      <svg
        ref={svgRef}
        width={700}
        height={420}
        style={{ background: "#1f2937", borderRadius: "12px" }}
      />
    </figure>
  );
};

export default TreeVisualization;