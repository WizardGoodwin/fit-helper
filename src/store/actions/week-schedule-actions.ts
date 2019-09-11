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

export interface IUpdateWeekScheduleRequest extends Action<ActionTypes.UPDATE_WEEK_SCHEDULE_REQUEST> {}

export interface IUpdateWeekScheduleSuccess extends Action<ActionTypes.UPDATE_WEEK_SCHEDULE_SUCCESS> {
  weekSchedule: IWeekSchedule;
}

export interface IUpdateWeekScheduleFail extends Action<ActionTypes.UPDATE_WEEK_SCHEDULE_FAIL> {
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
        weekSchedule: response.data[0].data,
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

export const updateWeekSchedule: ActionCreator<
  ThunkAction<
    Promise<IUpdateWeekScheduleSuccess | IUpdateWeekScheduleFail>,
    IWeekSchedule | string,
    null,
    IUpdateWeekScheduleSuccess | IUpdateWeekScheduleFail
    >
  > = (weekSchedule: IWeekSchedule) => {
  return async (dispatch: Dispatch) => {
    try {
      const updateWeekScheduleRequest: IUpdateWeekScheduleRequest = {
        type: ActionTypes.UPDATE_WEEK_SCHEDULE_REQUEST,
      };
      dispatch(updateWeekScheduleRequest);
      console.log(weekSchedule);
      const response: AxiosResponse = await axios.put(`/week-schedule/1`, weekSchedule);

      const updateWeekScheduleSuccess: IUpdateWeekScheduleSuccess = {
        weekSchedule: response.data,
        type: ActionTypes.UPDATE_WEEK_SCHEDULE_SUCCESS,
      };
      return dispatch(updateWeekScheduleSuccess);
    } catch(error) {
      const updateWeekScheduleFail: IUpdateWeekScheduleFail = {
        error,
        type: ActionTypes.UPDATE_WEEK_SCHEDULE_FAIL,
      };
      return dispatch(updateWeekScheduleFail);
    }
  };
};

export type WeekScheduleActions =
    IGetWeekScheduleRequest
  | IGetWeekScheduleSuccess
  | IGetWeekScheduleFail
  | IUpdateWeekScheduleRequest
  | IUpdateWeekScheduleSuccess
  | IUpdateWeekScheduleFail;



