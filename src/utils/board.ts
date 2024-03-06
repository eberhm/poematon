import { BoardSections, TaskId } from "../types";
import { INITIAL_TASKS } from "../data";

export const initializeBoard = (): BoardSections => {
  return {
    Versos: arrayShuffle(INITIAL_TASKS),
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
  id: TaskId,
) => {
  if (id in boardSections) {
    // why do we need this???
    return id as unknown as "Versos" | "Poema";
  }

  const container = (["Versos", "Poema"] as const).find((key) =>
    boardSections[key].find((item) => item.id === id),
  );
  return container;
};
