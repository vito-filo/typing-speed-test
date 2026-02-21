import Header from "./components/Header";
import StatsAndSettings from "./components/StatsAndSettings";
import PassageArea from "./components/PassageArea";
import RestartButton from "./components/RestartButton";

import Baseline from "./components/Baseline";
import Complete from "./components/Complete";
import NewRecord from "./components/NewRecord";

import "./App.css";
import { useEffect, useMemo, useState } from "react";
import type {
  PassageObj,
  Difficulty,
  Mode,
  StatsAndSettingsEvent,
  FinalScore,
} from "./types";
import { loadPassages, getRandomPassage } from "./utils/loadData";
import { useStopwatch, useCountdown } from "./hooks/useTimer";
import { useStatistics } from "./hooks/useStatistics";
import { useLocalStorage } from "./hooks/useStorage";

function App() {
  // States
  const [passageObj, setPassageObj] = useState<PassageObj | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<Mode>("passage");
  const [round, setRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState<{
    flag: boolean;
    type: "baseline" | "completed" | "record";
  }>({ flag: false, type: "completed" });
  const [score, setScore] = useState<FinalScore>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
  });

  // Hooks
  const stopwatch = useStopwatch();
  const countdown = useCountdown();
  const timer = mode === "passage" ? stopwatch : countdown;
  const statistics = useStatistics(timer.totalSeconds);
  const { bestScore, setNewBestScore } = useLocalStorage();

  useEffect(() => {
    loadPassages()
      .then((data: PassageObj | null) => {
        setPassageObj(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function restartGame() {
    setRound((r) => r + 1);
    timer.resetTime();
    statistics.resetStats();
  }

  function setDifficultyCustom(event: StatsAndSettingsEvent) {
    const newDifficulty = event.currentTarget.value as Difficulty;
    setDifficulty(newDifficulty);
    timer.stopTime();
    restartGame();
  }

  function setModeCustom(event: StatsAndSettingsEvent) {
    const mode = event.currentTarget.value as Mode;
    setMode(mode);
    timer.stopTime();
    restartGame();
  }

  function onGameover(score: FinalScore) {
    setScore(score);
    if (!bestScore) {
      // Baseline screen
      setIsGameOver({ flag: true, type: "baseline" });
      setNewBestScore(score); // Save new score
      return;
    }

    // TODO compara also with accuracy and time?
    if (score.wpm > bestScore.wpm) {
      // New Record screen
      setIsGameOver({ flag: true, type: "record" });
      setNewBestScore(score); // Save new score
      return;
    }

    // Completed screen
    setIsGameOver({ flag: true, type: "completed" });
    return;
  }

  const passage = useMemo(() => {
    if (!passageObj) return null;
    const newPassage = getRandomPassage(passageObj, difficulty, round);
    return newPassage;
  }, [passageObj, difficulty, round]);

  function renderGameOverSection() {
    switch (isGameOver.type) {
      case "baseline":
        return <Baseline score={score} />;
      case "record":
        return <NewRecord score={score} />;
      case "completed":
        return <Complete score={score} />;
    }
  }

  return (
    <>
      <Header bestWPM={bestScore?.wpm} />
      {isGameOver.flag ? (
        renderGameOverSection()
      ) : (
        <>
          <StatsAndSettings
            difficulty={difficulty}
            mode={mode}
            setDifficulty={setDifficultyCustom}
            setMode={setModeCustom}
            printTime={timer.printTime}
            wpm={statistics.wpm}
            accuracy={statistics.accuracy}
          />
          <PassageArea
            key={passage?.id || "0"}
            passage={passage}
            startTime={timer.startTime}
            stopTime={timer.stopTime}
            isExpired={timer.isExpired}
            calculateWPM={statistics.calculateWPM}
            calculateAccuracy={statistics.calculateAccuracy}
            onGameover={onGameover}
          />
          <RestartButton restartGame={restartGame} />
        </>
      )}
    </>
  );
}

export default App;
