import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import Typography from "@mui/material/Typography";
import { Task } from "../types";
import TaskItem from "./TaskItem";
import VerseItem from "./VerseItem";
import { Alert } from "@mui/material";


type VersesSectionProps = {
  tasks: Task[];
  isMax: boolean;
};

const VersesSection = ({ tasks, isMax }: VersesSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: "Versos",
  });

  return (
    <Box
      sx={{ color: "#fff", backgroundColor: "#eee", padding: 2 }}
      className="versos_seccion versos_container"
      id={"Versos"}
      ref={setNodeRef}
    >
      <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
          VERSOS
      </Typography>
      { isMax ? <Alert className="max_verses_alert" severity="error">Has llegado al número máximo de versos, pero aún puedes reordenar tu poema o sustituir versos.</Alert> : null}
      <Box className="versos_list">
        {tasks.map((task) => (
          <Box key={task.id} sx={{ mb: 3 }}>
            <VerseItem id={task.id}>
              <TaskItem task={task} />
            </VerseItem>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VersesSection;
