import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import Typography from "@mui/material/Typography";
import { Verse } from "../types";
import VerseCard from "./VerseCard";
import VerseItem from "./VerseItem";
import { Alert } from "@mui/material";


type VersesSectionProps = {
  verses: Verse[];
  isMax: boolean;
};

const VersesSection = ({ verses, isMax }: VersesSectionProps) => {
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
        {verses.map((verse) => (
          <Box key={verse.id} sx={{ mb: 3 }}>
            <VerseItem id={verse.id}>
              <VerseCard verse={verse} />
            </VerseItem>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VersesSection;
