import { Verse, VerseId } from "../types";

export const getVerseById = (verses: Verse[], id: VerseId) => {
  return verses.find((verse) => verse.id === id.split("-inPoem")[0]);
};
