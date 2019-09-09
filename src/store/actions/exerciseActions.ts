import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from'../../axios';
import { IExercise } from '../../models/exercise.interface';
import { AxiosResponse } from 'axios';

export interface IGetExercisesRequest extends Action<'GetExercisesRequest'> {}

export interface IGetExercisesSuccess extends Action<'GetExercisesSuccess'> {
  exercises: IExercise[];
}

export interface IGetExercisesFail extends Action<'GetExercisesFail'> {
  error: string;
}

export interface IAddExerciseRequest extends Action<'AddExerciseRequest'> {}

export interface IAddExerciseSuccess extends Action<'AddExerciseSuccess'> {
  exercise: IExercise;
}

export interface IAddExerciseFail extends Action<'AddExerciseFail'> {
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
        type: 'GetExercisesRequest',
      };
      dispatch(getExercisesRequest);
      const response: AxiosResponse = await axios.get('/exercises');

      const getExercisesSuccess: IGetExercisesSuccess = {
        exercises: response.data,
        type: 'GetExercisesSuccess',
      };
      return dispatch(getExercisesSuccess);
    } catch(error) {
      const getExercisesFail: IGetExercisesFail = {
        error,
        type: 'GetExercisesFail',
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
        type: 'AddExerciseRequest',
      };
      dispatch(addExerciseRequest);
      const response: AxiosResponse = await axios.post('/exercises', newExercise);
      const addExerciseSuccess: IAddExerciseSuccess = {
        exercise: response.data,
        type: 'AddExerciseSuccess',
      };
      return dispatch(addExerciseSuccess);
    } catch(error) {
      const addExerciseFail: IAddExerciseFail = {
        error,
        type: 'AddExerciseFail',
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



