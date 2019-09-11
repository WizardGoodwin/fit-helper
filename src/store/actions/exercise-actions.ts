import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from'../../axios';
import { IExercise } from '../../models/exercise.interface';
import { AxiosResponse } from 'axios';
import { ActionTypes } from '../constants';

export interface IGetExercisesRequest extends Action<ActionTypes.GET_EXERCISES_REQUEST> {}

export interface IGetExercisesSuccess extends Action<ActionTypes.GET_EXERCISES_SUCCESS> {
  exercises: IExercise[];
}

export interface IGetExercisesFail extends Action<ActionTypes.GET_EXERCISES_FAIL> {
  error: string;
}

export interface IAddExerciseRequest extends Action<ActionTypes.ADD_EXERCISE_REQUEST> {}

export interface IAddExerciseSuccess extends Action<ActionTypes.ADD_EXERCISE_SUCCESS> {
  exercise: IExercise;
}

export interface IAddExerciseFail extends Action<ActionTypes.ADD_EXERCISE_FAIL> {
  error: string;
}

export const getExercises: ActionCreator<
  ThunkAction<
    Promise<IGetExercisesSuccess | IGetExercisesFail>,
    IExercise[] | string,
    null,
    IGetExercisesSuccess | IGetExercisesFail
    >
  > = () => {
  return async (dispatch: Dispatch) => {
    try {
      const getExercisesRequest: IGetExercisesRequest = {
        type: ActionTypes.GET_EXERCISES_REQUEST,
      };
      dispatch(getExercisesRequest);
      const response: AxiosResponse = await axios.get('/exercises');

      const getExercisesSuccess: IGetExercisesSuccess = {
        exercises: response.data,
        type: ActionTypes.GET_EXERCISES_SUCCESS,
      };
      return dispatch(getExercisesSuccess);
    } catch(error) {
      const getExercisesFail: IGetExercisesFail = {
        error,
        type: ActionTypes.GET_EXERCISES_FAIL,
      };
      return dispatch(getExercisesFail);
    }
  };
};

export const addExercise: ActionCreator<
  ThunkAction<
    Promise<IAddExerciseSuccess | IAddExerciseFail>,
    IExercise | string,
    null,
    IAddExerciseSuccess | IAddExerciseFail
    >
  > = (newExercise: IExercise) => {
  return async (dispatch: Dispatch) => {
    try {
      const addExerciseRequest: IAddExerciseRequest = {
        type: ActionTypes.ADD_EXERCISE_REQUEST,
      };
      dispatch(addExerciseRequest);
      const response: AxiosResponse = await axios.post('/exercises', newExercise);
      const addExerciseSuccess: IAddExerciseSuccess = {
        exercise: {id: response.data.id, ...newExercise },
        type: ActionTypes.ADD_EXERCISE_SUCCESS,
      };
      return dispatch(addExerciseSuccess);
    } catch(error) {
      const addExerciseFail: IAddExerciseFail = {
        error,
        type: ActionTypes.ADD_EXERCISE_FAIL,
      };
      return dispatch(addExerciseFail);
    }
  };
};

export type ExerciseActions =
    IGetExercisesRequest
  | IGetExercisesSuccess
  | IGetExercisesFail
  | IAddExerciseRequest
  | IAddExerciseSuccess
  | IAddExerciseFail;



