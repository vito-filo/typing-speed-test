import iconRestart from "../assets/images/icon-restart.svg";

export default function RestartButton({
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
}
