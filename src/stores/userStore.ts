import { observable, action } from 'mobx';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

import { IUser } from '../models/user.interface';
import { clearCookies, setCookie } from '../utils/cookie';

class UserStore {

  @observable user: IUser = { username: '' };
  @observable isLoading = false;
  @observable isUpdating = false;
  @observable isRegistered = false;
  @observable isLoggedIn = false;
  @observable isUpdated = false;
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

  @action getUser() {
    this.isLoading = true;
    this.error = null;
    return axios.get('/user')
      .then(action((response: AxiosResponse) => { this.user = response.data.user; }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action updateUser(user: IUser) {
    this.isUpdated = false;
    this.isUpdating = true;
    this.error = null;
    return axios.put('/user', user)
      .then(action(() => {
        this.user = { ...user };
        this.isUpdated = true;
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => {
        this.isUpdating = false;
      }));
  }

  @action clearState() {
    this.isLoading = false;
    this.isRegistered = false;
    this.isLoggedIn = false;
    this.isUpdated = false;
    this.isUpdating = false;
  }
}

export default new UserStore();
