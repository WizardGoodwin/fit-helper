import { MuscleGroup } from './exercise-group.enum';

export interface IExercise {
  id?: number;
  name?: string;
  muscleGroup?: MuscleGroup;
}
