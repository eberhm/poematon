import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { INITIAL_TASKS } from '../data';
import { BoardSections as BoardSectionsType, Task, TaskId } from '../types';
import { getVerseById } from '../utils/tasks';
import { findBoardSectionContainer, initializeBoard } from '../utils/board';
import TaskItem from './TaskItem';
import VersesSection from './VersesSection';
import PoemSection from './PoemSection';

const initialBoardSections = initializeBoard();

const PoematonSectionList = () => {
  const availableVerses = INITIAL_TASKS;
  
  const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | TaskId>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as TaskId);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as TaskId
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as TaskId
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      console.log('boardSection', boardSection)
      
      

      
      
      const getActiveContainerElements = () => {
        return [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ]
      }

      const getOverContainerElements = () => {
        const activeItems = boardSection[activeContainer];
        const overItems = boardSection[overContainer];

        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id
        );

        const overIndex = overItems.findIndex((item) => item.id !== over?.id);

        return [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ]
      }

      
      const newBoardSection = {
        ...boardSection,
        [activeContainer]: getActiveContainerElements(),
        [overContainer]: getOverContainerElements(),
      }

      return {
        ...newBoardSection,
        Versos: calculateVersosSectionByPoem(newBoardSection.Poema)
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as TaskId
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as TaskId
    );
    console.log(active.id )
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );
      if (activeIndex !== overIndex) {
      

      setBoardSections((boardSection) => {
        const newBoardSection = {
          ...boardSection,
          [overContainer]: arrayMove(
            boardSection[overContainer],
            activeIndex,
            overIndex
          )
        } as const

        return ({
          ...newBoardSection,
          Versos: calculateVersosSectionByPoem(newBoardSection.Poema)
        })
      });
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getVerseById(availableVerses, activeTaskId) : null;

  return (
    <Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={4}>
            <Grid item xs={6} key="Versos">
              <VersesSection
                tasks={calculateVersosSectionByPoem(boardSections.Poema)}
              />
            </Grid>
            <Grid item xs={6} key="Versos">
            <PoemSection
              tasks={boardSections["Poema"]}
            />
          </Grid>
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </Grid>
      </DndContext>
    </Container>
  );
};

const calculateVersosSectionByPoem = (poema: Task[]) => {
  return initialBoardSections.Versos.map(item => {
    const id = poema.find(poemVerse => poemVerse.id === item.id) ? item.id + '-inPoem' + Date.now(): item.id

    return {
      ...item,
      id
    }
  })
}

export default PoematonSectionList;