import React from 'react';
import Box from '@mui/material/Box';
import { useDroppable } from '@dnd-kit/core';
import Typography from '@mui/material/Typography';
import { Task } from '../types';
import TaskItem from './TaskItem';
import DraggableTaskItem from './DraggableTaskItem';

type VersesSectionProps = {
  tasks: Task[];
};

const VersesSection = ({ tasks }: VersesSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: "Versos",
  });

  return (
    <Box sx={{ color: '#fff', backgroundColor: '#eee', padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Versos
      </Typography>
        <div id={"Versos"} ref={setNodeRef}>
          {tasks.map((task) => (
            <Box key={task.id} sx={{ mb: 3}}>
              <DraggableTaskItem id={task.id}>
                <TaskItem task={task} />
              </DraggableTaskItem>
            </Box>
          ))}
        </div>
    </Box>
  );
};

export default VersesSection;
