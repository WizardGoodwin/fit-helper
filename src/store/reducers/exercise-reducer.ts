import { IExercise } from '../../models/exercise.interface';
import { Reducer } from 'redux';
import { ExerciseActions } from '../actions/exercise-actions';
import { ActionTypes } from '../constants';

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
    case ActionTypes.GET_EXERCISES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionTypes.GET_EXERCISES_SUCCESS: {
      return {
        ...state,
        exercises: action.exercises,
        loading: false,
      };
    }
    case ActionTypes.GET_EXERCISES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case ActionTypes.ADD_EXERCISE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionTypes.ADD_EXERCISE_SUCCESS: {
      return {
        ...state,
        exercises: [
          ...state.exercises,
          action.exercise
        ],
        loading: false,
      };
    }
    case ActionTypes.ADD_EXERCISE_FAIL: {
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
