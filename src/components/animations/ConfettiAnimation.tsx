import type { CSSProperties } from "react";
import confettiBlue from "../../assets/images/confetti-blue.svg";
import confettigreen from "../../assets/images/confetti-green.svg";
import confettired from "../../assets/images/confetti-red.svg";
import confettiyellow from "../../assets/images/confetti-yellow.svg";

import styles from "../../styles/components/animations/confettiAnimation.module.css";

const icons = [confettiBlue, confettigreen, confettired, confettiyellow];
const confetti = Array.from({ length: 100 }, (_, index) => {
  return {
    icon: icons[index % 4],
    style: {
      position: "fixed",
      top: `${Math.random() * (120 - 80) + 95}%`,
      left: `${Math.random() * 110 - 10}%`,
      width: `${Math.random() * 5}vh`,
      height: `${Math.random() * 5}vh`,
    } as CSSProperties,
  };
});
export default function ConfettiAnimation() {
  return (
    <>
      <div className={styles.celebrationLayer}>
        {confetti.map((conf, index) => {
          return (
            <img
              key={index}
              src={conf.icon}
              className={styles.confetti}
              style={conf.style}
            />
          );
        })}
      </div>
    </>
  );
}
