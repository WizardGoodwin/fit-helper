import { IMuscleGroup } from '../../models/muscle-group.interface';
import { Reducer } from 'redux';
import { MuscleGroupActions } from '../actions/muscle-group-actions';
import { ActionTypes } from '../constants';

export interface IMuscleGroupsState {
  muscleGroups: IMuscleGroup[];
  loading: boolean;
  error: string | null;
}

const initialState: IMuscleGroupsState = {
  muscleGroups: [],
  loading: false,
  error: null
};

const muscleGroupReducer: Reducer<IMuscleGroupsState, MuscleGroupActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_MUSCLE_GROUPS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionTypes.GET_MUSCLE_GROUPS_SUCCESS: {
      return {
        ...state,
        muscleGroups: action.muscleGroups,
        loading: false,
      };
    }
    case ActionTypes.GET_MUSCLE_GROUPS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: return state;
  }
};

export default muscleGroupReducer;
