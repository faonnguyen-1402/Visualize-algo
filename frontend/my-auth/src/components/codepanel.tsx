import { useState } from "react";
import "../pages/home/mainapp.css";
import { Algorithm } from "../types/algorithm";

type Props = {
  algorithm: Algorithm;
  highlightLine?: number;
};

export default function CodePanel({ algorithm, highlightLine }: Props) {
  const [tab, setTab] = useState<"pseudo" | "code">("pseudo");

  const pseudoLines = algorithm.pseudoCode ? algorithm.pseudoCode.split('\n') : [];

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
      {/* <div className="code-content">
        <pre style={{ 
          whiteSpace: 'pre-wrap', // Giúp code tự xuống dòng nếu quá dài
          wordBreak: 'break-word',
          fontFamily: 'monospace' 
        }}>
          {tab === "pseudo" 
            ? (algorithm.pseudoCode || "Loading dummy code...") 
            : (algorithm as any).javascriptCode || "// Code JavaScript is coming soon =))"}
        </pre>
      </div> */}

        <div className="code-content">
        {tab === "pseudo" ? (
          <div className="pseudocode-lines-container">
            {pseudoLines.length > 0 ? (
              pseudoLines.map((lineContent, index) => {
                // SO SÁNH: Nếu index trùng với dòng cần sáng từ backend truyền sang
                const isCurrentLineActive = index === highlightLine;

                return (
                  <div
                    key={index}
                    className={`code-line ${isCurrentLineActive ? "active-highlight" : ""}`}
                  >
                    {/* Số thứ tự dòng */}
                    <span className="line-number">{index + 1}</span>
                    {/* Chữ của dòng đó - whiteSpace pre để giữ nguyên căn lề thụt đầu dòng */}
                    <span className="line-text" style={{ whiteSpace: 'pre' }}>
                      {lineContent}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="code-line">Loading dummy code...</div>
            )}
          </div>
        ) : (
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            fontFamily: 'monospace',
            padding: '10px'
          }}>
            {(algorithm as any).javascriptCode || "// Code JavaScript is coming soon =))"}
          </pre>
        )}
      </div>

    </div>
  );
}