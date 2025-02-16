import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { INITIAL_VERSES } from "../data";
import { BoardSections as BoardSectionsType, Verse, VerseId } from "../types";
import { getVerseById } from "../utils/verse";
import { findBoardSectionContainer, initializeBoard } from "../utils/board";
import VerseCard from "./VerseCard";
import VersesSection from "./VersesSection";
import PoemSection from "./PoemSection";

const initialBoardSections = initializeBoard();
const availableVerses = INITIAL_VERSES;
const MAX_VERSES = 12

const PoematonSectionList = () => {
  const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeVerseId, setActiveVerseId] = useState<null | VerseId>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveVerseId(() => {
      return active.id as VerseId;
    });
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as VerseId,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as VerseId,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer ||
      (activeContainer === "Versos" && boardSections["Poema"].length >= MAX_VERSES)
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const getActiveContainerElements = () => {
        return [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id,
          ),
        ];
      };

      const getOverContainerElements = () => {
        const activeItems = boardSection[activeContainer];
        const overItems = boardSection[overContainer];

        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id,
        );

        const overIndex = overItems.findIndex((item) => item.id !== over?.id);

        return [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length,
          ),
        ];
      };

      const newBoardSection = {
        ...boardSection,
        [activeContainer]: getActiveContainerElements(),
        [overContainer]: getOverContainerElements(),
      };

      return {
        ...newBoardSection,
        Versos: calculateVersosSectionByPoem(newBoardSection.Poema),
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    console.log('end dragging')

    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as VerseId,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as VerseId,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      console.log('returning')
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (verse) => verse.id === active.id,
    );
    const overIndex = boardSections[overContainer].findIndex(
      (verse) => verse.id === over?.id,
    );
    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => {
        const newBoardSection = {
          ...boardSection,
          [overContainer]: arrayMove(
            boardSection[overContainer],
            activeIndex,
            overIndex,
          ),
        } as const;

        return {
          ...newBoardSection,
          Versos: calculateVersosSectionByPoem(newBoardSection.Poema),
        };
      });
    }

    setActiveVerseId(null);
  };

  const verse = activeVerseId
    ? getVerseById(availableVerses, activeVerseId)
    : null;

  return (
    <>
      <Container className="app_screen">
        <Grid container spacing={4}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <Grid item xs={6} key="Versos">
              <VersesSection verses={boardSections.Versos} isMax={boardSections["Poema"].length >= MAX_VERSES}/>
            </Grid>

            <Grid item xs={6} key="Poema">
              <PoemSection verses={boardSections["Poema"]} />
            </Grid>

            <DragOverlay dropAnimation={{ ...defaultDropAnimation }}>
              {verse ? <VerseCard verse={verse} /> : null}
            </DragOverlay>
          </DndContext>
        </Grid>
      </Container>
      <div className="print_version">
        <div className="poema_impreso">
          <span>POEMATÓN. Tu Poema ready-made:</span>
          <ul>
            {boardSections.Poema.map((autor) => {
              return <li>{autor.value}</li>;
            })}
          </ul>
        </div>
        <div className="autores">
          <span>Poema confeccionado con los versos de los autores (autoría, poema):</span>
          <ul>
            {boardSections.Poema.map((verso) => {
              const metaData = [verso.autor];
              verso.poema && metaData.push(verso.poema);
              verso.poemario && metaData.push(verso.poemario);
              return <li>{metaData.join(", ")}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const calculateVersosSectionByPoem = (poema: Verse[]) => {
  return initialBoardSections.Versos.map((item) => {
    const id = poema.find((poemVerse) => poemVerse.id === item.id)
      ? item.id + "-inPoem" + Date.now()
      : item.id;

    return {
      ...item,
      id,
    };
  });
};

export default PoematonSectionList;
