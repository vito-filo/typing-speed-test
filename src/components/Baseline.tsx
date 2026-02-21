import GameOver from "./ui/GameOver";
import StarsAnimation from "./animations/StarsAnimation";
import completedIcon from "../assets/images/icon-completed.svg";
import styles from "../styles/components/complete.module.css";
import type { FinalScore } from "../types";

export default function Baseline({
  score,
  onRestartGame,
}: {
  score: FinalScore;
  onRestartGame: (score: FinalScore) => void;
}) {
  return (
    <GameOver
      title={"Baseline Established!"}
      subTitle={
        "You've set the bar. Now the real challenge begins. Time to beat it."
      }
      wpm={score.wpm}
      accuracy={score.accuracy}
      correctChars={score.correctChars}
      incorrectChars={score.incorrectChars}
      buttonText={"Beat This Score"}
      animation={<StarsAnimation />}
      icon={<img src={completedIcon} className={styles.completedIcon} />}
      onRestartGame={() => {
        onRestartGame(score);
      }}
    />
  );
}
