import star1 from "../../assets/images/pattern-star-1.svg";
import star2 from "../../assets/images/pattern-star-2.svg";
import styles from "../../styles/components/animations/starsAnimation.module.css";

export default function StarsAnimation() {
  return (
    <>
      <div className={styles.celebrationLayer}>
        <img
          src={star1}
          className={styles.star1}
          style={{
            top: "90%",
            left: "80%",
            animationDelay: `2s`,
          }}
        />
        <img
          src={star2}
          className={styles.star2}
          style={{
            top: "15%",
            left: "15%",
            animationDelay: `0.5s`,
          }}
        />
      </div>
    </>
  );
}
