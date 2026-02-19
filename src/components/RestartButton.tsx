import iconRestart from "../assets/images/icon-restart.svg";

export default function RestartButton({
  restartGame,
}: {
  restartGame: () => void;
}) {
  return (
    <div id="restart-button" onClick={restartGame}>
      <p>Restart Test</p>
      <img id="restart-icon" src={iconRestart} />
    </div>
  );
}
