import { Card, CardContent } from '@mui/material';
import { Task } from '../types';

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Card>
      <CardContent><span>{task.autor}</span>{task.verso}</CardContent>
    </Card>
  );
};

export default TaskItem;
