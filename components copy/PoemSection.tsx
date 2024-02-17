import React from 'react';
import Box from '@mui/material/Box';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Typography from '@mui/material/Typography';
import { Task } from '../src/types';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';

type PoemSectionProps = {
  tasks: Task[];
};

const PoemSection = ({ tasks }: PoemSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: "Poema",
  });

  return (
    <Box sx={{ color: '#fff', backgroundColor: '#eee', padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
       Poema
      </Typography>
      <SortableContext
        id={"Poema"}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div id={"Poema"} ref={setNodeRef}>
          {tasks.map((task) => (
            <Box key={task.id} sx={{ mb: 3}}>
              <SortableTaskItem id={task.id}>

                <TaskItem task={task} />
              </SortableTaskItem>
            </Box>
          ))}
        </div>
      </SortableContext>
    </Box>
  );
};

export default PoemSection;
