import { useState } from "react";
import "../pages/home/mainapp.css";
import { Algorithm } from "../types/algorithm";

type Props = {
  algorithm: Algorithm;
};

export default function CodeList({ algorithm }: Props) {
  const [selectedLang, setSelectedLang] = useState<"python" | "cpp" | "javascript" | "csharp">("python");

  const languages = [
    { label: "Python", key: "pythonCode" },
    { label: "C++", key: "cppCode" },
    { label: "JavaScript", key: "javascriptCode" },
    { label: "C#", key: "csharpCode" },
  ] as const;

  // Lấy code an toàn
  const getCurrentCode = (): string => {
    const lang = languages.find(
      (l) => l.label.toLowerCase() === selectedLang || l.key.toLowerCase() === `${selectedLang}Code`
    );

    if (!lang) return "// Chưa có code cho ngôn ngữ này";

    const code = (algorithm as any)[lang.key];
    return typeof code === "string" ? code : "// Chưa có code cho ngôn ngữ này";
  };

  const currentCode = getCurrentCode();

  return (
    <div className="code-panel">
      {/* Tabs chọn ngôn ngữ */}
      <div className="code-tabs">
        {languages.map((lang) => (
          <button
            key={lang.key}
            className={`code-tab ${selectedLang === lang.label.toLowerCase().replace("#", "sharp") ? "active" : ""}`}
            onClick={() => setSelectedLang(lang.label.toLowerCase().replace("#", "sharp") as any)}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Hiển thị code thuần */}
      <div className="code-content">
        <pre className="pure-code">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
}