import { useRef, useState } from "react";
import type { CharacterState, Passage } from "../types";

export default function PassageArea({
  passage,
  startTime,
  stopTime,
  isExpired,
}: {
  passage: Passage | null;
  startTime: () => void;
  stopTime: () => void;
  isExpired: boolean;
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
  const passageContainerRef = useRef<HTMLDivElement>(null);

  function handleStart() {
    setIsStartVisible(false); // hide the start section
    passageContainerRef.current?.focus(); // user can start typing
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key.length > 1) return; // skip special chars (eg "Shift")
    if (currentIndex >= passageArray.length) return; // passage terminated
    if (isExpired)
      return; // time is over
    else startTime();

    const nextIndex = currentIndex + 1;

    const newCharacters = [...passageArray]; // Create a copy
    newCharacters[currentIndex].status =
      event.key === passageArray[currentIndex].char ? "correct" : "incorrect";
    setPassageArray(newCharacters);
    setCurrentIndex(nextIndex);

    // passage terminated
    if (nextIndex >= passageArray.length) {
      stopTime();
      alert("Finish!!");
    }
  }

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
        {passageArray ? (
          passageArray.map((char, index) => (
            <span key={index} className={char.status}>
              {char.char}
            </span>
          ))
        ) : (
          <p>loading...</p>
        )}
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
