import { observable, action } from 'mobx';
import axios from '../shared/utils/axios';
import { AxiosResponse } from 'axios';

import { IUser } from '../models/user.interface';
import { clearCookies, setCookie } from '../shared/utils/cookie';

class UserStore {

  @observable user: IUser = { username: '' };
  @observable isLoading = false;
  @observable isRegistered = false;
  @observable isLoggedIn = false;
  @observable error: string | null = null;

  @action login(loginData: IUser) {
    this.isLoading = true;
    this.error = null;
    this.isLoggedIn = false;
    return axios.post('/login', loginData)
      .then(action((response: AxiosResponse) => {
        setCookie('fitHelperToken', response.data.token);
        this.isLoggedIn = true;
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action register(regData: IUser) {
    this.isLoading = true;
    this.error = null;
    this.isRegistered = false;
    return axios.post('/register', regData)
      .then(action((response: AxiosResponse) => {
        setCookie('fitHelperToken', response.data.token);
        this.isRegistered = true;
      }))
      .catch(action((error: string) => {
        this.error = error;
      }))
      .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action logout() {
    clearCookies();
  }

  @action clearState() {
    this.isLoading = false;
    this.isRegistered = false;
    this.isLoggedIn = false;
  }
}

export default new UserStore();
