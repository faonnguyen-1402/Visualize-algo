import { useState } from "react";
import { algorithms } from '../data/algorithms'; 
import "../pages/home/mainapp.css";

// Sử dụng đúng cách SyntaxHighlighter cho React
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = { algoKey: string; };

export default function CodeList({ algoKey }: Props) {
  const [selectedLang, setSelectedLang] = useState<"python" | "cpp" | "javascript" | "csharp">("javascript");

  const getCurrentCode = (): string => {
    const availableKeys = Object.keys(algorithms);
    const foundKey = availableKeys.find((k) => k.toLowerCase() === algoKey.toLowerCase());
    return foundKey ? algorithms[foundKey].code[selectedLang] : "// Chưa có code";
  };

  const code = getCurrentCode();

  return (
    <div className="code-panel">
      <div className="code-tabs">
        {["JavaScript", "Python", "C++", "C#"].map((langName) => {
          const key = langName.toLowerCase().replace("c++", "cpp").replace("c#", "csharp");
          return (
            <button
              key={key}
              className={`code-tab ${selectedLang === key ? "active" : ""}`}
              onClick={() => setSelectedLang(key as any)}
            >
              {langName}
            </button>
          );
        })}
      </div>

      <div className="code-content">
        {/* SyntaxHighlighter tự động thay thế thẻ <pre> và <code> */}
        <SyntaxHighlighter 
          language={selectedLang === 'cpp' ? 'cpp' : selectedLang === 'csharp' ? 'csharp' : selectedLang} 
          style={tomorrow}
          customStyle={{ margin: 0, background: 'transparent' }}
          showLineNumbers={true}
          lineNumberStyle={{ 
            minWidth: '2em', 
            paddingRight: '1em', 
            color: '#888',
            textAlign: 'right' 
  }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}