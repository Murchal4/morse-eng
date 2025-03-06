
import { cn } from "@/lib/utils";
import React from "react";

interface MorseVisualizerProps {
  morseCode: string;
  className?: string;
}

export function MorseVisualizer({ morseCode, className }: MorseVisualizerProps) {
  if (!morseCode) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2 items-center justify-center py-4", className)}>
      {morseCode.split(" ").map((symbol, wordIndex) => (
        <React.Fragment key={`word-${wordIndex}`}>
          {symbol === "/" ? (
            <div className="w-6 h-6 mx-2" />
          ) : (
            <div className="flex items-center gap-1">
              {symbol.split("").map((char, charIndex) => {
                if (char === ".") {
                  return (
                    <div
                      key={`dot-${wordIndex}-${charIndex}`}
                      className="h-3 w-3 rounded-full bg-morse-dot animate-pulse-dot"
                    />
                  );
                } else if (char === "-") {
                  return (
                    <div
                      key={`dash-${wordIndex}-${charIndex}`}
                      className="h-3 w-8 rounded-full bg-morse-dash animate-pulse-dash"
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
