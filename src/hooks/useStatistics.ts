import { useCallback, useState } from "react";

export function useStatistics(elapsedSeconds: number) {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  function calculateWPM(index: number) {
    const elapsedMinutes = elapsedSeconds / 60;
    const wordsPerMinute = Math.floor(
      index / 5 / (elapsedMinutes > 0 ? elapsedMinutes : 1),
    );
    setWpm(wordsPerMinute);
    return wordsPerMinute;
  }

  function calculateAccuracy(correctChars: number, incorrectChars: number) {
    const totalTyped = correctChars + incorrectChars;
    const accuracy =
      totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
    setAccuracy(accuracy);
    return accuracy;
  }

  const resetStats = useCallback(() => {
    setWpm(0);
    setAccuracy(0);
  }, []);

  return { wpm, accuracy, calculateWPM, calculateAccuracy, resetStats };
}
