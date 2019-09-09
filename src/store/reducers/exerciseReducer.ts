import { IExercise } from '../../models/exercise.interface';
import { Reducer } from 'redux';
import { ExerciseActions } from '../actions/exerciseActions';

export interface IExercisesState {
  exercises: IExercise[];
  loading: boolean;
  error: string | null;
}

const initialState: IExercisesState = {
  exercises: [],
  loading: false,
  error: null
};

const exerciseReducer: Reducer<IExercisesState, ExerciseActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'GetExercisesRequest': {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case 'GetExercisesSuccess': {
      return {
        ...state,
        exercises: action.exercises,
        loading: false,
      };
    }
    case 'GetExercisesFail': {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case 'AddExerciseRequest': {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case 'AddExerciseSuccess': {
      return {
        ...state,
        exercises: [
          ...state.exercises,
          action.exercise
        ],
        loading: false,
      };
    }
    case 'AddExerciseFail': {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  }
  return state;
};

export default exerciseReducer;
