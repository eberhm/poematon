import { Card, CardContent } from "@mui/material";
import { Verse } from "../types";

type VerseCardProps = {
  verse: Verse;
};

const VerseCard = ({ verse }: VerseCardProps) => {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardContent className="elemento">
        <span>{verse.autor}</span>
        {verse.value}
      </CardContent>
    </Card>
  );
};

export default VerseCard;
