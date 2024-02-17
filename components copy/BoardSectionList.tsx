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
import { INITIAL_TASKS } from '../src/data';
import { BoardSections as BoardSectionsType, TaskId } from '../src/types';
import { getTaskById } from '../src/utils/tasks';
import { findBoardSectionContainer, initializeBoard } from '../src/utils/board';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';

const POEM_IDS_DELTA = 3000

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS, {
    Poem: "Poem",
    Verses: "Verses"
  });
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
    if (active.id as number > POEM_IDS_DELTA) {
      // I'm dragging from Versos, create a new task in poems
      
      //create a new task (verse)
      // add it to the list of verses

    }

    setActiveTaskId(active.id as TaskId);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as number
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as number
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
        // if (activeContainer === "Versos") {
        //   return initialBoardSections["Versos"]
        // }

        return [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ]
      }

      const getOverContainerElements = () => {
        const activeItems = boardSection[activeContainer];
        const overItems = boardSection[overContainer];

        // Find the indexes for the items
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

      

      // O aquí
      return {
        ...boardSection,
        [activeContainer]: getActiveContainerElements(),
        [overContainer]: getOverContainerElements(),
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
      

      // O aquí
      setBoardSections((boardSection) => {
          return ({
          ...boardSection,
          // this is opnly to reorder. It should always happen
          [overContainer]: arrayMove(
            boardSection[overContainer],
            activeIndex,
            overIndex
          ),
        })
      });
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

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
          {Object.keys(boardSections).map((boardSectionKey) => (
            <Grid item xs={6} key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
              />
            </Grid>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </Grid>
      </DndContext>
    </Container>
  );
};

export default BoardSectionList;
