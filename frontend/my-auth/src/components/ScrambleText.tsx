import React, { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  forceColor?: string;   // Thêm prop để ép màu
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  delay = 0,
  speed = 40,
  forceColor
}) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      let iteration = 0;
      const maxIterations = 15;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      const interval = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayText(scrambled);
        iteration++;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span 
      className={className}
      style={{ 
        display: "inline-block",
        minWidth: "fit-content",
        color: forceColor || "inherit"   // Ép màu mạnh
      }}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;