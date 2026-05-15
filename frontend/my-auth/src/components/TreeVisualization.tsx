import { useEffect, useRef } from "react";
import { select, hierarchy, tree } from "d3";
import { useTreeAnimation } from "../hooks/useTreeAnimation";
import "../pages/home/mainapp.css";
// import Tree from 'react-d3-tree';

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

  useTreeAnimation(step);  

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const width = 760;
    const height = 460;
    const svg = select(svgRef.current);

    svg.selectAll("*").remove();

    const root = hierarchy<Node>(data);
    const treeLayout = tree<Node>().size([height - 50,width - 160]);
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
    .attr("stroke", (d: any) => {
        if (pathNodes.includes(d.target.data.name)) return "#ff0055";
        return "#1e293b";
    })
    .attr("stroke-width", (d: any) => (pathNodes.includes(d.target.data.name) ? 4 : 2))
    .attr("fill", "none")
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
    const nodes = svg
      .selectAll(".tree-node-group")
      .data(root.descendants())
      .join("g")
      .attr("class", "tree-node-group")

      .attr("transform", (d: any) => `translate(${d.y},${d.x})`)

    nodes.append("circle")
      .attr("r", 28)
      .attr("fill", "none")
      .attr("stroke", (d:any) => d.data.name === activeNode ? "#facc15" : "none")
      .attr("stroke-width", 2)
      .attr("class", "node-glow")

    nodes.append("circle") 
      .attr("class", (d:any)=>{
        let cls = "tree-node";
        if (d.data.name === activeNode) cls += " active";
        if (pathNodes.includes(d.data.name)) cls += " path";
        if (visitedNodes.includes(d.data.name)) cls += " visited";
        return cls;
      })
      .attr("data-name", (d: any) => d.data.name)           // ← Quan trọng nhất
      // .attr("cx", (d: any) => d.y)
      // .attr("cy", (d: any) => d.x)
      .attr("r", 24)
      .attr("fill", (d: any) => {
        if (d.data.name === activeNode) return "#facc15"; 
        if (pathNodes.includes(d.data.name)) return "#ff0055"; 
        if (visitedNodes.includes(d.data.name)) return "#4ade80"; 
        return "#1e293b"; 
      })
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 2)

    // ==================== LABELS ====================
  //   svg
  //     .selectAll(".tree-label")
  //     .data(root.descendants())
  //     .join("text")
  //     .attr("class", "tree-label")
  //     .attr("x", (d: any) => d.y)
  //     .attr("y", (d: any) => d.x + 5)
  //     .attr("text-anchor", "middle")
  //     .attr("fill", "white")
  //     .attr("font-size", "15px")
  //     .attr("font-weight", "bold")
  //     .text((d: any) => d.data.name);
  // }, [data]);
    nodes.append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", (d: any) => (visitedNodes.includes(d.data.name) || pathNodes.includes(d.data.name) ? "black" : "white"))
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text((d: any) => d.data.name);

    }, [data, activeNode, visitedNodes, pathNodes]); 

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