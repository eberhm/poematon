import { Task, TaskId } from '../types';

export const getTaskById = (tasks: Task[], id: TaskId) => {
  return tasks.find((task) => task.id === id);
};
