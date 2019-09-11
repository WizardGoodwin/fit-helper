import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import { IWeekSchedule } from '../models/week-schedule.interface';

export const getRandomSchedule = (exercises: IExercise[], muscleGroups: IMuscleGroup[]): IWeekSchedule => {
  const weekSchedule: IWeekSchedule = {
    firstDay: [],
    secondDay: [],
    thirdDay: []
  };

  let _exercises: IExercise[] = exercises;

  muscleGroups.forEach((item) => {
    const filteredExercises = getExercisesFilteredByGroupId(_exercises, item.id);
    const randomExercise = getRandomExercise(filteredExercises);
    _exercises = _exercises.filter((item: IExercise) => item.id !== randomExercise.id);
    weekSchedule.firstDay.push(randomExercise.name);
  });

  muscleGroups.forEach((item) => {
    const filteredExercises = getExercisesFilteredByGroupId(_exercises, item.id);
    const randomExercise = getRandomExercise(filteredExercises);
    _exercises = _exercises.filter((item: IExercise) => item.id !== randomExercise.id);
    weekSchedule.secondDay.push(randomExercise.name);
  });

  muscleGroups.forEach((item) => {
    const filteredExercises = getExercisesFilteredByGroupId(_exercises, item.id);
    const randomExercise = getRandomExercise(filteredExercises);
    _exercises = _exercises.filter((item: IExercise) => item.id !== randomExercise.id);
    weekSchedule.thirdDay.push(randomExercise.name);
  });

  return weekSchedule;
};

const getRandomExercise = (exercises: IExercise[]): IExercise => {
  const exercisesCount = exercises.length;
  const randomNumber = Math.floor(Math.random() * (exercisesCount));
  return exercises[randomNumber];
};

const getExercisesFilteredByGroupId = (exercises: IExercise[], groupId: number): IExercise[] => {
  return exercises.filter((item: IExercise) => item.muscleGroupId === groupId);
};
