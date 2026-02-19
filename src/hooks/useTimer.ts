import { useCallback, useEffect, useRef, useState } from "react";

type TimerInterface = {
  startTime: () => void;
  stopTime: () => void;
  printTime: () => string;
  resetTime: () => void;
  isExpired: boolean;
  totalSeconds: number;
};

function useBaseTimer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const isExpired = false;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const startTime = useCallback(() => {
    if (timerRef.current != null) return; // timer is already running
    setTotalSeconds(0); // reset time

    timerRef.current = setInterval(() => {
      setTotalSeconds((s) => s + 1);
    }, 1000);
  }, []);

  const stopTime = useCallback(() => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  function resetTime() {
    setTotalSeconds(0);
  }

  return { totalSeconds, timerRef, startTime, stopTime, isExpired, resetTime };
}

export function useStopwatch(): TimerInterface {
  const { totalSeconds, startTime, stopTime, isExpired, resetTime } =
    useBaseTimer();

  function printTime() {
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    if (hours)
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    else return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return { startTime, stopTime, printTime, isExpired, totalSeconds, resetTime };
}

export function useCountdown(targetSeconds = 60): TimerInterface {
  const { totalSeconds, startTime, stopTime, resetTime } = useBaseTimer();
  const isExpired = totalSeconds >= targetSeconds;

  function printTime() {
    const remaining = targetSeconds - totalSeconds;
    const seconds = remaining % 60;
    const minutes = Math.floor(remaining / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // Stop when time is over
  useEffect(() => {
    if (isExpired) {
      stopTime();
      alert("Finish!!"); // TODO remove from here
    }
  }, [stopTime, isExpired]);

  return { startTime, stopTime, printTime, isExpired, totalSeconds, resetTime };
}
