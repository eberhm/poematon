import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { TaskId } from "../types";
import { useDraggable } from "@dnd-kit/core";

type VerseItemProps = {
  children: React.ReactNode;
  id: TaskId;
};

const VerseItem = ({ children, id }: VerseItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default VerseItem;
