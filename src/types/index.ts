
export type TaskId = number
export type Task = {
  id: TaskId;
  sourceId?: TaskId
  title: string;
  description: string;
};

export type BoardSections = {
  Versos: Task[];
  Poema: Task[];
};
