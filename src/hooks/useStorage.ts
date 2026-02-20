import { useState } from "react";
import type { FinalScore } from "../types";

export function useLocalStorage() {
  const [bestScore, setBestScore] = useState<FinalScore | null>(() => {
    const stored = window.localStorage.getItem("best-score");
    return stored ? JSON.parse(stored) : null;
  });

  function setNewBestScore(newScore: FinalScore) {
    setBestScore(newScore);
    window.localStorage.setItem("best-score", JSON.stringify(newScore));
  }

  return { bestScore, setNewBestScore };
}
