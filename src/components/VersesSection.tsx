import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import Typography from "@mui/material/Typography";
import { Task } from "../types";
import TaskItem from "./TaskItem";
import VerseItem from "./VerseItem";

type VersesSectionProps = {
  tasks: Task[];
};

const VersesSection = ({ tasks }: VersesSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: "Versos",
  });

  return (
    <Box
      sx={{ color: "#fff", backgroundColor: "#eee", padding: 2 }}
      className="versos_seccion"
      id={"Versos"}
      ref={setNodeRef}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Versos
      </Typography>
      {tasks.map((task) => (
        <Box key={task.id} sx={{ mb: 3 }}>
          <VerseItem id={task.id}>
            <TaskItem task={task} />
          </VerseItem>
        </Box>
      ))}
    </Box>
  );
};

export default VersesSection;
