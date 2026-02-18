import type { Difficulty, Mode, StatsAndSettingsEvent } from "../types";

type StatsAndSettingsProps = {
  difficulty: Difficulty;
  setDifficulty: (event: StatsAndSettingsEvent) => void;
  mode: Mode;
  setMode?: (event: StatsAndSettingsEvent) => void;
};

export default function StatsAndSettings({
  difficulty,
  setDifficulty,
  mode,
  setMode,
}: StatsAndSettingsProps) {
  return (
    <>
      <div id="stats-and-settings">
        <div id="statistics">
          <div className="statistics-element">
            {/* WPM */}
            <p className="stats-settings-label">WPM:</p>
            <span id="current-wpm"> 100 </span>
          </div>

          <div className="vertical-line"></div>

          <div className="statistics-element">
            {/* Accuracy */}
            <p className="stats-settings-label">Accuracy:</p>
            <span id="accuracy"> 90% </span>
          </div>

          <div className="vertical-line"></div>

          <div className="statistics-element">
            {/* Time */}
            <p className="stats-settings-label">Time:</p>
            <span id="time"> 0:00 </span>
          </div>
        </div>

        <div id="settings">
          {/* Difficulty Settings */}
          <div className="settings-element">
            {/* Buttons only on Desktop */}
            <div id="desktop-difficulty-buttons">
              <p className="stats-settings-label">Difficulty:</p>
              <button
                className={`difficulty-button ${difficulty === "easy" && "active"}`}
                id="easy-button"
                value="easy"
                onClick={setDifficulty}
              >
                Easy
              </button>
              <button
                className={`difficulty-button ${difficulty === "medium" && "active"}`}
                id="medium-button"
                value="medium"
                onClick={setDifficulty}
              >
                Medium
              </button>
              <button
                className={`difficulty-button ${difficulty === "hard" && "active"}`}
                id="hard-button"
                value="hard"
                onClick={setDifficulty}
              >
                Hard
              </button>
            </div>

            {/* Dropdown only on Mobile */}
            <select
              name="difficulty"
              id="mobile-difficulty-select"
              onChange={setDifficulty}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="vertical-line desktop-block"></div>

          {/* Mode Settingd */}
          <div className="settings-element">
            {/* Buttons only on Desktop */}
            <div id="desktop-mode-buttons">
              <p className="stats-settings-label">Mode:</p>
              <button
                className={`mode-button ${mode === "timed" && "active"}`}
                id="time-mode"
                value="timed"
                onClick={setMode}
              >
                Timed (60s)
              </button>
              <button
                className={`mode-button ${mode === "passage" && "active"}`}
                id="passage-mode"
                value="passage"
                onClick={setMode}
              >
                Passage
              </button>
            </div>

            {/* Dropdown only on Mobile */}
            <select name="mode" id="mobile-mode-select" onChange={setMode}>
              <option value="timed">Timed (60s)</option>
              <option value="passage">Passage</option>
            </select>
          </div>
        </div>
      </div>
      {/* Horizontal line */}
      <hr />
    </>
  );
}
