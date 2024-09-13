import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import { Task } from "../types";
import PoemItem from "./PoemItem";
import TaskItem from "./TaskItem";

type PoemSectionProps = {
  tasks: Task[];
};

const PoemSection = ({ tasks }: PoemSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: "Poema",
  });

  return (
    <Box
      sx={{ color: "#fff", backgroundColor: "#eee", padding: 2 }}
      className="poema_seccion versos_container"
      id={ "Poema" }
      ref={  setNodeRef }
    >
      <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
        TU POEMA
      </Typography>    
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <Box className="versos_list">
          {tasks.map((task) => (
            <Box key={task.id} sx={{ mb: 3 }}>
              <PoemItem id={task.id}>
                <TaskItem task={task} />
              </PoemItem>
            </Box>
          ))}
        </Box>
      </SortableContext>  
    </Box>
  );
};

export default PoemSection;
