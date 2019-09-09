import { combineReducers } from 'redux';

import exerciseReducer, { IExercisesState } from './exerciseReducer';

export interface IState {
  exerciseState: IExercisesState;
}

export const rootReducer = combineReducers<IState>({
  exerciseState: exerciseReducer,
});
