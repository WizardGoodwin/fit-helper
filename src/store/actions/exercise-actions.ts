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

export interface IUpdateExerciseRequest extends Action<ActionTypes.UPDATE_EXERCISE_REQUEST> {}

export interface IUpdateExerciseSuccess extends Action<ActionTypes.UPDATE_EXERCISE_SUCCESS> {
  exercise: IExercise;
}

export interface IUpdateExerciseFail extends Action<ActionTypes.UPDATE_EXERCISE_FAIL> {
  error: string;
}

export interface IDeleteExerciseRequest extends Action<ActionTypes.DELETE_EXERCISE_REQUEST> {}

export interface IDeleteExerciseSuccess extends Action<ActionTypes.DELETE_EXERCISE_SUCCESS> {
  id?: number;
}

export interface IDeleteExerciseFail extends Action<ActionTypes.DELETE_EXERCISE_FAIL> {
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

export const updateExercise: ActionCreator<
  ThunkAction<
    Promise<IUpdateExerciseSuccess | IUpdateExerciseFail>,
    IExercise | string,
    null,
    IUpdateExerciseSuccess | IUpdateExerciseFail
    >
  > = (exercise: IExercise) => {
  return async (dispatch: Dispatch) => {
    try {
      const updateExerciseRequest: IUpdateExerciseRequest = {
        type: ActionTypes.UPDATE_EXERCISE_REQUEST,
      };
      dispatch(updateExerciseRequest);
      const response: AxiosResponse = await axios.put(`/exercises/${exercise.id}`, exercise);
      const updateExerciseSuccess: IUpdateExerciseSuccess = {
        exercise,
        type: ActionTypes.UPDATE_EXERCISE_SUCCESS,
      };
      return dispatch(updateExerciseSuccess);
    } catch(error) {
      const updateExerciseFail: IUpdateExerciseFail = {
        error,
        type: ActionTypes.UPDATE_EXERCISE_FAIL,
      };
      return dispatch(updateExerciseFail);
    }
  };
};

export const deleteExercise: ActionCreator<
  ThunkAction<
    Promise<IDeleteExerciseSuccess | IDeleteExerciseFail>,
    string | void,
    null,
    IDeleteExerciseSuccess | IDeleteExerciseFail
    >
  > = (id?: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const deleteExerciseRequest: IDeleteExerciseRequest = {
        type: ActionTypes.DELETE_EXERCISE_REQUEST,
      };
      dispatch(deleteExerciseRequest);
      const response: AxiosResponse = await axios.delete(`/exercises/${id}`);
      const deleteExerciseSuccess: IDeleteExerciseSuccess = {
        id,
        type: ActionTypes.DELETE_EXERCISE_SUCCESS,
      };
      return dispatch(deleteExerciseSuccess);
    } catch(error) {
      const deleteExerciseFail: IDeleteExerciseFail = {
        error,
        type: ActionTypes.DELETE_EXERCISE_FAIL,
      };
      return dispatch(deleteExerciseFail);
    }
  };
};

export type ExerciseActions =
    IGetExercisesRequest
  | IGetExercisesSuccess
  | IGetExercisesFail
  | IAddExerciseRequest
  | IAddExerciseSuccess
  | IAddExerciseFail
  | IUpdateExerciseRequest
  | IUpdateExerciseSuccess
  | IUpdateExerciseFail
  | IDeleteExerciseRequest
  | IDeleteExerciseSuccess
  | IDeleteExerciseFail;
