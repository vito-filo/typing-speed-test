import GameOver from "./ui/GameOver";
import StarsAnimation from "./animations/StarsAnimation";
import completedIcon from "../assets/images/icon-completed.svg";
import styles from "../styles/components/complete.module.css";
import type { FinalScore } from "../types";

export default function Complete({
  score,
  onRestartGame,
}: {
  score: FinalScore;
  onRestartGame: (score: FinalScore) => void;
}) {
  return (
    <>
      <GameOver
        title={"Test Complete!"}
        subTitle={"Solid run. Keep pushing to beat your high score."}
        wpm={score.wpm}
        accuracy={score.accuracy}
        correctChars={score.correctChars}
        incorrectChars={score.incorrectChars}
        buttonText={"Go Again"}
        animation={<StarsAnimation />}
        icon={<img src={completedIcon} className={styles.completedIcon} />}
        onRestartGame={() => {
          onRestartGame(score);
        }}
      />
    </>
  );
}
