import logoSmall from "../assets/images/logo-small.svg";
import personalBestLogo from "../assets/images/icon-personal-best.svg";

export default function Header({ bestWPM }: { bestWPM: number | undefined }) {
  return (
    <div id="header">
      <div id="app-branding">
        <img id="app-logo" src={logoSmall} />
        <div id="app-name">
          <h1 id="app-title">Typing Speed Test</h1>
          <p id="app-subtitle">Type as fast as you can in 60 seconds</p>
        </div>
      </div>
      <div id="record-section">
        <img id="trophy" src={personalBestLogo} />
        <p>
          <span id="best-label-short">Best:</span>
          <span id="best-label-full">Personal best:</span>
          <span id="best-wpm">{bestWPM || 0} WPM</span>
        </p>
      </div>
    </div>
  );
}
