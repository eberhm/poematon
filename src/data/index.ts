import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: 'Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum ',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  },
  {
    id: uuidv4(),
    title: 'Verso Carlos',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  },
  {
    id: uuidv4(),
    title: 'Verso 2',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  },  
  {
    id: uuidv4(),
    title: 'Verso 3',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  },  
  {
    id: uuidv4(),
    title: 'Verso 4',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  },   {
    id: uuidv4(),
    title: 'Verso 5',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  },   {
    id: uuidv4(),
    title: 'Verso 6',
    description: 'Pablo Neruda',
    author: 'Pablo Neruda',
  }, 
];