// Define the structure of the GameOver page
// can be Baseline, Test Complete, New high score

import restartIcon from "../../assets/images/icon-restart.svg";
import styles from "../../styles/components/complete.module.css";

type GameOverProps = {
  title: string;
  subTitle: string;
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  buttonText: string;
  animation: React.JSX.Element;
  icon: React.JSX.Element;
};

export default function GameOver({
  title,
  subTitle,
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  buttonText,
  animation,
  icon,
}: GameOverProps) {
  return (
    <div className={styles.container}>
      {icon}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subTitle}>{subTitle}</p>
      <div className={styles.scoreContainer}>
        <p className={styles.scoreLabel}>WPM:</p>
        <span className={`wpm-score ${styles.scoreText}`}> {wpm} </span>
      </div>
      <div className={styles.scoreContainer}>
        <p className={styles.scoreLabel}>Accuracy:</p>
        <span className={`${styles.scoreText} accuracy-score`}>
          {accuracy}%{" "}
        </span>{" "}
      </div>
      <div className={styles.scoreContainer}>
        <p className={styles.scoreLabel}>Characters:</p>
        <span className={`${styles.scoreText} correct`}>{correctChars} </span>/
        <span className={`${styles.scoreText} incorrect`}>
          {" "}
          {incorrectChars}
        </span>
      </div>
      <div className={`restart-button ${styles.restartButton}`}>
        <p>{buttonText}</p>
        <img src={restartIcon} className={`${styles.restartIcon}`} />
      </div>
      {animation}
    </div>
  );
}
