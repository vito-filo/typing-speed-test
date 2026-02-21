import { useEffect, useMemo, useRef, useState } from "react";
import type { CharacterState, Passage, FinalScore } from "../types";

export default function PassageArea({
  passage,
  startTime,
  stopTime,
  isExpired,
  calculateWPM,
  calculateAccuracy,
  onGameover,
}: {
  passage: Passage | null;
  startTime: () => void;
  stopTime: () => void;
  isExpired: boolean;
  calculateWPM: (index: number) => number;
  calculateAccuracy: (correctChars: number, incorrectChars: number) => number;
  onGameover: (score: FinalScore) => void;
}) {
  const [isStartVisible, setIsStartVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [passageArray, setPassageArray] = useState<CharacterState[]>(() => {
    if (passage) {
      const chars = passage.text.split("").map((char) => ({
        char,
        status: "untyped" as const,
      }));
      return chars;
    }
    return [];
  });

  const correctChars = useMemo(
    () => passageArray.filter((char) => char.status === "correct").length,
    [passageArray],
  );

  const incorrectChars = useMemo(
    () => passageArray.filter((char) => char.status === "incorrect").length,
    [passageArray],
  );

  const passageContainerRef = useRef<HTMLDivElement>(null);

  function handleStart() {
    setIsStartVisible(false); // hide the start section
    passageContainerRef.current?.focus(); // user can start typing
  }

  // Trigger gameover function
  useEffect(() => {
    if (isExpired) {
      const wpm = calculateWPM(currentIndex);
      const accuracy = calculateAccuracy(correctChars, incorrectChars);
      onGameover({ wpm, accuracy, correctChars, incorrectChars });
    }
  }, [
    isExpired,
    currentIndex,
    correctChars,
    incorrectChars,
    calculateWPM,
    calculateAccuracy,
    onGameover,
  ]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key.length > 1) return; // skip special chars (eg "Shift")
    if (currentIndex >= passageArray.length) return; // passage terminated
    if (isExpired)
      return; // time is over
    else startTime();

    const nextIndex = currentIndex + 1;

    const newCharacters = [...passageArray]; // Create a copy

    if (event.key === passageArray[currentIndex].char) {
      newCharacters[currentIndex].status = "correct";
    } else {
      newCharacters[currentIndex].status = "incorrect";
    }

    // calculate statistics after each typed word
    if (nextIndex % 5 === 0) {
      calculateWPM(nextIndex);
      calculateAccuracy(correctChars, incorrectChars);
    }

    setPassageArray(newCharacters);
    setCurrentIndex(nextIndex);

    // passage terminated
    if (nextIndex >= passageArray.length) {
      stopTime();
      const wpm = calculateWPM(nextIndex);
      const accuracy = calculateAccuracy(correctChars, incorrectChars);
      onGameover({ wpm, accuracy, correctChars, incorrectChars });
    }
  }

  /**
   * Renders the passage with character-level styling and cursor positioning.
   * 
   * Processes the passage array into React nodes, grouping non-whitespace characters
   * into word spans and individual spans for whitespace. Each character receives a
   * className based on its status and whether it's at the current cursor position.
   * 
   * This structure allows to treat every character as single <span> but group words together
   * so the browser knows how to go new line correctly.
   * 
   * for example: 
  [
    <span key="word-0" className="word">
      <span key="c-0" className="correct">H</span>
      <span key="c-1" className="correct cursor">e</span>
      <span key="c-2" className="untyped">l</span>
      <span key="c-3" className="untyped">l</span>
      <span key="c-4" className="untyped">o</span>
    </span>,
    <span key="ws-5" className="untyped"> </span>,
    <span key="word-6" className="word">
      <span key="c-6" className="incorrect">w</span>
      <span key="c-7" className="untyped">o</span>
      <span key="c-8" className="untyped">r</span>
      <span key="c-9" className="untyped">l</span>
      <span key="c-10" className="untyped">d</span>
    </span>
  ]
   */
  const renderedPassage = useMemo(() => {
    if (!passageArray.length) return null;

    const nodes: React.ReactNode[] = [];

    const getCharClassName = (
      status: CharacterState["status"],
      index: number,
    ) => `${status}${index === currentIndex ? " cursor" : ""}`;

    let i = 0;
    while (i < passageArray.length) {
      const isWhitespace = /\s/.test(passageArray[i].char);

      if (isWhitespace) {
        const c = passageArray[i];
        nodes.push(
          <span key={`ws-${i}`} className={getCharClassName(c.status, i)}>
            {c.char}
          </span>,
        );
        i += 1;
        continue;
      }

      const wordStart = i;
      const wordChars: React.ReactNode[] = [];

      while (i < passageArray.length && !/\s/.test(passageArray[i].char)) {
        const c = passageArray[i];
        wordChars.push(
          <span key={`c-${i}`} className={getCharClassName(c.status, i)}>
            {c.char}
          </span>,
        );
        i += 1;
      }

      nodes.push(
        <span key={`word-${wordStart}`} className="word">
          {wordChars}
        </span>,
      );
    }

    return nodes;
  }, [passageArray, currentIndex]);

  return (
    <>
      <div
        ref={passageContainerRef}
        id="passage-container"
        className={isStartVisible ? "blur" : ""}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleStart}
      >
        {renderedPassage ?? <p>loading...</p>}
      </div>
      {isStartVisible && (
        <div id="start-section">
          <button id="start-button" onClick={handleStart}>
            Start Typing test
          </button>
          <p id="start-message">Or click the text and start typing</p>
        </div>
      )}
      <hr /> {/* Horizontal line */}
    </>
  );
}
