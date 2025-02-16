export type VerseId = string;
export type Verse = {
  id: VerseId;
  value: string;
  autor: string;
  poema: string;
  poemario: string;
};

export type BoardSections = {
  Versos: Verse[];
  Poema: Verse[];
};
