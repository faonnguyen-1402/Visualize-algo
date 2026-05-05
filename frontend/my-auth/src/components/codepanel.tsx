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
        <pre>
          {tab === "pseudo" ? algorithm.pseudocode : algorithm.code}
        </pre>
      </div>
    </div>
  );
}