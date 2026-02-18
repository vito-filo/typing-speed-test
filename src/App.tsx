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

function App() {
  const [passageObj, setPassageObj] = useState<PassageObj | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<Mode>("passage");

  useEffect(() => {
    loadPassages()
      .then((data: PassageObj | null) => {
        setPassageObj(data);
        console.log("Fetched: ", data);
      })
      .catch((err) => console.error(err));
  }, []);

  function setDifficultyCustom(event: StatsAndSettingsEvent) {
    const newDifficulty = event.currentTarget.value as Difficulty;
    setDifficulty(newDifficulty);
  }

  function setModeCustom(event: StatsAndSettingsEvent) {
    const mode = event.currentTarget.value as Mode;
    setMode(mode);
  }

  const passage = useMemo(() => {
    if (!passageObj) return null;
    return getRandomPassage(passageObj, difficulty);
  }, [passageObj, difficulty]);

  // const PassageArray = useMemo(() => {
  //   if (passage) {
  //     const chars = passage.text.split("").map((char) => ({
  //       char,
  //       status: "untyped" as const,
  //     }));
  //     return chars;
  //   }
  //   return [];
  // }, [passage]);

  console.log("Passage: ", passage);
  // console.log("PassageArray: ", PassageArray);

  return (
    <>
      <Header />
      <StatsAndSettings
        difficulty={difficulty}
        mode={mode}
        setDifficulty={setDifficultyCustom}
        setMode={setModeCustom}
      />
      <PassageArea key={passage?.id || "0"} passage={passage} />
      <RestartButton />
    </>
  );
}

export default App;
