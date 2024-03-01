
export type TaskId = string
export type Task = {
  id: TaskId;
  verso: string
  autor: string;
  poemario: string;
};

export type BoardSections = {
  Versos: Task[];
  Poema: Task[];
};
