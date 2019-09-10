import { Reducer } from 'redux';
import { ActionTypes } from '../constants';
import { IWeekSchedule } from '../../models/week-schedule.interface';
import { WeekScheduleActions } from '../actions/week-schedule-actions';

export interface IWeekScheduleState {
  weekSchedule: IWeekSchedule;
  loading: boolean;
  error: string | null;
}

const initialState: IWeekScheduleState = {
  weekSchedule: {
    firstDay: [],
    secondDay: [],
    thirdDay: []
  },
  loading: false,
  error: null
};

const weekScheduleReducer: Reducer<IWeekScheduleState, WeekScheduleActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_WEEK_SCHEDULE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionTypes.GET_WEEK_SCHEDULE_SUCCESS: {
      return {
        ...state,
        weekSchedule: action.weekSchedule,
        loading: false,
      };
    }
    case ActionTypes.GET_WEEK_SCHEDULE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: return state;
  }
};

export default weekScheduleReducer;
