import iconRestart from "../assets/images/icon-restart.svg";

export default function RestartButton() {
  return (
    <div id="restart-button">
      <p>Restart Test</p>
      <img id="restart-icon" src={iconRestart} />
    </div>
  );
}
