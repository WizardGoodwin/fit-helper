import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from'../../axios';
import { IMuscleGroup } from '../../models/muscle-group.interface';
import { AxiosResponse } from 'axios';
import { ActionTypes } from '../constants';

export interface IGetMuscleGroupsRequest extends Action<ActionTypes.GET_MUSCLE_GROUPS_REQUEST> {}

export interface IGetMuscleGroupsSuccess extends Action<ActionTypes.GET_MUSCLE_GROUPS_SUCCESS> {
  muscleGroups: IMuscleGroup[];
}

export interface IGetMuscleGroupsFail extends Action<ActionTypes.GET_MUSCLE_GROUPS_FAIL> {
  error: string;
}

export const getMuscleGroups: ActionCreator<
  ThunkAction<
    Promise<IGetMuscleGroupsSuccess | IGetMuscleGroupsFail>,
    IMuscleGroup[] | string,
    null,
    IGetMuscleGroupsSuccess | IGetMuscleGroupsFail
    >
  > = () => {
  return async (dispatch: Dispatch) => {
    try {
      const getMuscleGroupsRequest: IGetMuscleGroupsRequest = {
        type: ActionTypes.GET_MUSCLE_GROUPS_REQUEST,
      };
      dispatch(getMuscleGroupsRequest);
      const response: AxiosResponse = await axios.get('/muscle-groups');

      const getMuscleGroupsSuccess: IGetMuscleGroupsSuccess = {
        muscleGroups: response.data,
        type: ActionTypes.GET_MUSCLE_GROUPS_SUCCESS,
      };
      return dispatch(getMuscleGroupsSuccess);
    } catch(error) {
      const getMuscleGroupsFail: IGetMuscleGroupsFail = {
        error,
        type: ActionTypes.GET_MUSCLE_GROUPS_FAIL,
      };
      return dispatch(getMuscleGroupsFail);
    }
  };
};

export type MuscleGroupActions =
    IGetMuscleGroupsRequest
  | IGetMuscleGroupsSuccess
  | IGetMuscleGroupsFail;



