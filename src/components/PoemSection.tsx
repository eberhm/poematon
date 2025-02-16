import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import { Verse } from "../types";
import PoemItem from "./PoemItem";
import VerseCard from "./VerseCard";

type PoemSectionProps = {
  verses: Verse[];
};

const PoemSection = ({ verses }: PoemSectionProps) => {
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
      <SortableContext items={verses} strategy={verticalListSortingStrategy}>
        <Box className="versos_list">
          {verses.map((verse) => (
            <Box key={verse.id} sx={{ mb: 3 }}>
              <PoemItem id={verse.id}>
                <VerseCard verse={verse} />
              </PoemItem>
            </Box>
          ))}
        </Box>
      </SortableContext>  
    </Box>
  );
};

export default PoemSection;
