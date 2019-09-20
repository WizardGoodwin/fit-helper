import { observable, action } from 'mobx';
import axios from'../axios';
import { AxiosResponse } from 'axios';

import { IMuscleGroup } from '../models/muscle-group.interface';

class MuscleGroupsStore {

  @observable muscleGroups: IMuscleGroup[] = [];
  @observable isMuscleGroupsLoading = false;
  @observable error: string | null = null;

  @action getMuscleGroups() {
    this.isMuscleGroupsLoading = true;
    this.error = null;
    return axios.get('/muscle-groups')
      .then(action((response: AxiosResponse) => { this.muscleGroups = response.data; }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isMuscleGroupsLoading = false; }));
  }
}

export default new MuscleGroupsStore();
