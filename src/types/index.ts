
export type TaskId = string
export type Task = {
  id: TaskId;
  sourceId?: TaskId
  title: string;
  description: string;
  author: string;
};

export type BoardSections = {
  Versos: Task[];
  Poema: Task[];
};
