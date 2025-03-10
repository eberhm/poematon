import { BoardSections, Verse, VerseId } from "../types";

export const initializeBoard = (verses: Verse[]): BoardSections => {
  return {
    Versos: arrayShuffle(verses),
    Poema: [],
  };
};

const arrayShuffle = (arr: Array<any>) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: VerseId
) => {
  if (id in boardSections) {
    // why do we need this???
    return id as unknown as "Versos" | "Poema";
  }

  const container = (["Versos", "Poema"] as const).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};
