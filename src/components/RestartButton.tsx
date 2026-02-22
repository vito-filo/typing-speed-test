import iconRestart from "../assets/images/icon-restart.svg";
import { memo } from "react";

const RestartButton = memo(function RestartButton({
  restartGame,
}: {
  restartGame: () => void;
}) {
  return (
    <div className="restart-button" onClick={restartGame}>
      <p>Restart Test</p>
      <img src={iconRestart} />
    </div>
  );
});

export default RestartButton;
