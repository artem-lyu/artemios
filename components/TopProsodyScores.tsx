import { expressionColors, isExpressionColor } from "@/utils/expressionColors";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface TopProsodyScoresProps {
  scores: [string, any][];
}

export default function TopProsodyScores({ scores }: TopProsodyScoresProps) {
  // Find the maximum score
  const maxScore = Math.max(...scores.map(([, value]) => value));

  return (
    <div className="p-3 m-3 bg-white rounded-lg w-[30%]">
      <h2 className="text-2xl">Top 10 Prosody Scores</h2>
      <div className="flex flex-col gap-3">
        {scores.map(([key, value]) => (
          <div key={key} className="w-full overflow-hidden">
            <div className="flex items-center justify-between gap-1 font-mono pb-1">
              <div className="font-medium truncate">{key}</div>
              <div className="tabular-nums opacity-50">{value.toFixed(2)}</div>
            </div>
            <div
              className="relative h-1"
              style={
                {
                  "--bg": isExpressionColor(key)
                    ? expressionColors[key]
                    : "var(--bg)",
                } as CSSProperties
              }
            >
              <div
                className="absolute top-0 left-0 size-full rounded-full opacity-10 bg-[var(--bg)]"
              />
              <motion.div
                className="absolute top-0 left-0 h-full bg-[var(--bg)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(value / maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}