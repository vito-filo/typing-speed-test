export type Passage = {
  id: string;
  text: string;
};

export type CharacterState = {
  char: string;
  status: "untyped" | "correct" | "incorrect";
};

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "timed" | "passage";
export type PassageObj = Record<Difficulty, Passage[]>;

// Event generated from difficulty Buttons and Select
export type StatsAndSettingsEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.ChangeEvent<HTMLSelectElement>;
