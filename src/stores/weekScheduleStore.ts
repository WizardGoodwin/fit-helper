import { observable, action } from 'mobx';
import axios from'../axios';
import { AxiosResponse } from 'axios';

import { IWeekSchedule } from '../models/week-schedule.interface';

class WeekScheduleStore {

  @observable weekSchedule: IWeekSchedule = {
    firstDay: [],
    secondDay: [],
    thirdDay: []
  };
  @observable isWeekScheduleLoading = false;
  @observable error: string | null = null;

  @action getWeekSchedule() {
    this.isWeekScheduleLoading = true;
    this.error = null;
    return axios.get('/week-schedule')
      .then(action((response: AxiosResponse) => { this.weekSchedule = response.data; }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isWeekScheduleLoading = false; }));
  }

  @action updateWeekSchedule(weekSchedule: IWeekSchedule) {
    this.isWeekScheduleLoading = true;
    return axios.put('/week-schedule/1', weekSchedule)
      .then(action(() => {
        this.weekSchedule = weekSchedule;
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isWeekScheduleLoading = false; }));
  }
}

export default new WeekScheduleStore();
