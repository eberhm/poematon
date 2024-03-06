import { Task, TaskId } from "../types";

export const getVerseById = (tasks: Task[], id: TaskId) => {
  return tasks.find((task) => task.id === id.split("-inPoem")[0]);
};
