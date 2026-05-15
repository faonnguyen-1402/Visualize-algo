import { useState } from "react";
import "../pages/home/mainapp.css";
import { Algorithm } from "../types/algorithm";

type Props = {
  algorithm: Algorithm;
};

export default function CodePanel({ algorithm }: Props) {
  const [tab, setTab] = useState<"pseudo" | "code">("pseudo");

  return (
    <div className="code-panel">
      {/* Tabs */}
      <div className="code-tabs">
        <button
          className={`code-tab ${tab === "pseudo" ? "active" : ""}`}
          onClick={() => setTab("pseudo")}
        >
          Pseudocode
        </button>
        <button
          className={`code-tab ${tab === "code" ? "active" : ""}`}
          onClick={() => setTab("code")}
        >
          JavaScript
        </button>
      </div>

      {/* Content */}
      <div className="code-content">
        <pre style={{ 
          whiteSpace: 'pre-wrap', // Giúp code tự xuống dòng nếu quá dài
          wordBreak: 'break-word',
          fontFamily: 'monospace' 
        }}>
          {tab === "pseudo" 
            ? (algorithm.pseudoCode || "Loading dummy code...") 
            : (algorithm as any).javascriptCode || "// Code JavaScript is coming soon =))"}
        </pre>
      </div>
    </div>
  );
}