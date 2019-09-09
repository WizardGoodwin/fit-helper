import { combineReducers } from 'redux';

import exerciseReducer, { IExercisesState } from './exercise-reducer';
import muscleGroupReducer, { IMuscleGroupsState } from './muscle-group-reducer';

export interface IState {
  exerciseState: IExercisesState;
  muscleGroupState: IMuscleGroupsState;
}

export const rootReducer = combineReducers<IState>({
  exerciseState: exerciseReducer,
  muscleGroupState: muscleGroupReducer,
});
