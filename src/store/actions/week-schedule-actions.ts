import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from'../../axios';
import { IWeekSchedule } from '../../models/week-schedule.interface';
import { AxiosResponse } from 'axios';
import { ActionTypes } from '../constants';

export interface IGetWeekScheduleRequest extends Action<ActionTypes.GET_WEEK_SCHEDULE_REQUEST> {}

export interface IGetWeekScheduleSuccess extends Action<ActionTypes.GET_WEEK_SCHEDULE_SUCCESS> {
  weekSchedule: IWeekSchedule;
}

export interface IGetWeekScheduleFail extends Action<ActionTypes.GET_WEEK_SCHEDULE_FAIL> {
  error: string;
}

export const getWeekSchedule: ActionCreator<
  ThunkAction<
    Promise<IGetWeekScheduleSuccess | IGetWeekScheduleFail>,
    IWeekSchedule | string,
    null,
    IGetWeekScheduleSuccess | IGetWeekScheduleFail
    >
  > = () => {
  return async (dispatch: Dispatch) => {
    try {
      const getWeekScheduleRequest: IGetWeekScheduleRequest = {
        type: ActionTypes.GET_WEEK_SCHEDULE_REQUEST,
      };
      dispatch(getWeekScheduleRequest);
      const response: AxiosResponse = await axios.get('/week-schedule');

      const getWeekScheduleSuccess: IGetWeekScheduleSuccess = {
        weekSchedule: response.data,
        type: ActionTypes.GET_WEEK_SCHEDULE_SUCCESS,
      };
      return dispatch(getWeekScheduleSuccess);
    } catch(error) {
      const getWeekScheduleFail: IGetWeekScheduleFail = {
        error,
        type: ActionTypes.GET_WEEK_SCHEDULE_FAIL,
      };
      return dispatch(getWeekScheduleFail);
    }
  };
};

export type WeekScheduleActions =
    IGetWeekScheduleRequest
  | IGetWeekScheduleSuccess
  | IGetWeekScheduleFail;



