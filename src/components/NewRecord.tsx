import GameOver from "./ui/GameOver";
import ConfettiAnimation from "../components/animations/ConfettiAnimation";
import newRecordIcon from "../assets/images/icon-new-pb.svg";
import styles from "../styles/components/complete.module.css";
import type { FinalScore } from "../types";

export default function NewRecord({ score }: { score: FinalScore }) {
  return (
    <GameOver
      title={"High Score Smashed!"}
      subTitle={"You are getting faster. That was incredible typing."}
      wpm={score.wpm}
      accuracy={score.accuracy}
      correctChars={score.correctChars}
      incorrectChars={score.incorrectChars}
      buttonText={"Go Again"}
      animation={<ConfettiAnimation />}
      icon={<img src={newRecordIcon} className={styles.newRecordIcon} />}
    />
  );
}
