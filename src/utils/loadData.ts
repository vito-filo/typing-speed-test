import type { PassageObj, Difficulty } from "../types";

export async function loadPassages() {
  try {
    console.log("Fetch passages from file");
    const response = await fetch("data.json");
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
) {
  const randIndex = Math.floor(Math.random() * passageObj[difficulty].length);
  return passageObj[difficulty][randIndex];
}
