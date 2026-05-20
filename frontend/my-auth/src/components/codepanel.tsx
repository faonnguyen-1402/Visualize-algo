import "../pages/home/mainapp.css";
import { Algorithm } from "../types/algorithm";

type Props = {
  algorithm: Algorithm;
  highlightLine?: number;
};

export default function CodePanel({ algorithm, highlightLine }: Props) {
  const pseudoLines = algorithm.pseudoCode ? algorithm.pseudoCode.split('\n') : [];

  return (
    <div className="code-panel">
      {/* 1. Đã bỏ phần <div className="code-tabs"> vì không còn tab nữa */}
      
      {/* 2. Hiển thị nội dung Pseudocode trực tiếp */}
      <div className="code-header">
        <h3>Pseudocode</h3>
      </div>
      <div className="code-content">
        <div className="pseudocode-lines-container">
          {pseudoLines.length > 0 ? (
            pseudoLines.map((lineContent, index) => {
              const isCurrentLineActive = index === highlightLine;

              return (
                <div
                  key={index}
                  className={`code-line ${isCurrentLineActive ? "active-highlight" : ""}`}
                >
                  <span className="line-number">{index + 1}</span>
                  <span className="line-text" style={{ whiteSpace: 'pre' }}>
                    {lineContent}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="code-line">Loading pseudocode...</div>
          )}
        </div>
      </div>
    </div>
  );
}