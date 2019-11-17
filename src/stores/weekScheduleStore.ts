import { observable, action } from 'mobx';
import axios from '../shared/utils/axios';
import { AxiosResponse } from 'axios';

import { IWeekSchedule } from '../models/week-schedule.interface';

class WeekScheduleStore {

  @observable weekSchedule: IWeekSchedule = {
    firstDay: {
      mainRound: [],
      additionalRound: []
    },
    secondDay: {
      mainRound: [],
      additionalRound: []
    },
    thirdDay: {
      mainRound: [],
      additionalRound: []
    }
  };
  @observable isLoading = false;
  @observable error: string | null = null;

  @action getWeekSchedule() {
    this.isLoading = true;
    this.error = null;
    return axios.get('/week-schedule/1')
      .then(action((response: AxiosResponse) => { this.weekSchedule = response.data.weekSchedule }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action updateWeekSchedule(weekSchedule: IWeekSchedule) {
    this.isLoading = true;
    this.error = null;
    return axios.put('/week-schedule/1', weekSchedule)
      .then(action(() => {
        this.weekSchedule = weekSchedule;
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }
}

export default new WeekScheduleStore();
