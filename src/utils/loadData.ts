import type { PassageObj, Difficulty } from "../types";

export async function loadPassages() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data.json`);
    const passages = (await response.json()) as PassageObj;

    return passages;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getRandomPassage(
  passageObj: PassageObj,
  difficulty: Difficulty,
  round = 0, // random seed, needed for trigger new passsage in parent parent component
) {
  const randIndex = Math.floor(
    ((Math.random() + round) * passageObj[difficulty].length) %
      passageObj[difficulty].length,
  );
  return passageObj[difficulty][randIndex];
}
