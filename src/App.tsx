import Header from "./components/Header";
import StatsAndSettings from "./components/StatsAndSettings";
import PassageArea from "./components/PassageArea";
import RestartButton from "./components/RestartButton";

import "./App.css";
import { useEffect, useMemo, useState } from "react";
import type {
  PassageObj,
  Difficulty,
  Mode,
  StatsAndSettingsEvent,
} from "./types";
import { loadPassages, getRandomPassage } from "./utils/loadData";
import { useStopwatch, useCountdown } from "./hooks/useTimer";

function App() {
  const [passageObj, setPassageObj] = useState<PassageObj | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<Mode>("passage");
  const stopwatch = useStopwatch();
  const countdown = useCountdown();

  const timer = mode === "passage" ? stopwatch : countdown;

  useEffect(() => {
    loadPassages()
      .then((data: PassageObj | null) => {
        setPassageObj(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function setDifficultyCustom(event: StatsAndSettingsEvent) {
    const newDifficulty = event.currentTarget.value as Difficulty;
    setDifficulty(newDifficulty);
    timer.stopTime();
  }

  function setModeCustom(event: StatsAndSettingsEvent) {
    const mode = event.currentTarget.value as Mode;
    setMode(mode);
    timer.stopTime();
  }

  const passage = useMemo(() => {
    if (!passageObj) return null;
    return getRandomPassage(passageObj, difficulty);
  }, [passageObj, difficulty]);

  return (
    <>
      <Header />
      <StatsAndSettings
        difficulty={difficulty}
        mode={mode}
        setDifficulty={setDifficultyCustom}
        setMode={setModeCustom}
        printTime={timer.printTime}
      />
      <PassageArea
        key={passage?.id || "0"}
        passage={passage}
        startTime={timer.startTime}
        stopTime={timer.stopTime}
        isExpired={timer.isExpired}
      />
      <RestartButton />
    </>
  );
}

export default App;
