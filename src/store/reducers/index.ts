import { combineReducers } from 'redux';

import exerciseReducer, { IExercisesState } from './exercise-reducer';
import muscleGroupReducer, { IMuscleGroupsState } from './muscle-group-reducer';
import weekScheduleReducer, { IWeekScheduleState } from './week-schedule-reducer';

export interface IState {
  exerciseState: IExercisesState;
  muscleGroupState: IMuscleGroupsState;
  weekScheduleState: IWeekScheduleState;
}

export const rootReducer = combineReducers<IState>({
  exerciseState: exerciseReducer,
  muscleGroupState: muscleGroupReducer,
  weekScheduleState: weekScheduleReducer
});
