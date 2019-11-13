import { observable, action } from 'mobx';
import axios from'../axios';
import { AxiosResponse } from 'axios';

import { IUser } from '../models/user.interface';

class UserStore {

  @observable user: IUser = { username: '' };
  @observable isLoading = false;
  @observable error: string | null = null;

  @action login(loginData: IUser) {
    this.isLoading = true;
    this.error = null;
    return axios.post('/login', loginData)
      .then(action((response: AxiosResponse) => { console.log(response) }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action register(regData: IUser) {
    this.isLoading = true;
    this.error = null;
    return axios.post('/exercises', regData)
      .then(action((response: AxiosResponse) => { console.log(response) }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action logout() {

  }

  @action clearState() {
    this.isLoading = false;
  }
}

export default new UserStore();
