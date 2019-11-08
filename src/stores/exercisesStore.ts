import { observable, action } from 'mobx';
import axios from'../axios';
import { AxiosResponse } from 'axios';

import { IExercise } from '../models/exercise.interface';

class ExercisesStore {

  @observable exercises: IExercise[] = [];
  @observable isLoading = false;
  @observable isAdded = false;
  @observable isUpdated = false;
  @observable isDeleted = false;
  @observable error: string | null = null;

  @action getExercises() {
    this.isLoading = true;
    this.error = null;
    return axios.get('/exercises')
      .then(action((response: AxiosResponse) => { this.exercises = response.data.exercises; }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action addExercise(newExercise: IExercise) {
    this.isAdded = false;
    this.error = null;
    return axios.post('/exercises', newExercise)
      .then(action(() => { this.exercises.push(newExercise)}))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isAdded = true; }));
  }

  @action updateExercise(exercise: IExercise) {
    this.isUpdated = false;
    this.error = null;
    return axios.put(`/exercises/${exercise.id}`, exercise)
      .then(action(() => {
        const index = this.exercises.findIndex((item: IExercise) => item.id === exercise.id);
        this.exercises[index] = exercise;
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isUpdated = true; }));
  }

  @action deleteExercise(id?: number) {
    this.isDeleted = false;
    this.error = null;
    return axios.delete(`/exercises/${id}`)
      .then(action(() => {
        this.exercises = this.exercises.filter((item: IExercise) => item.id !== id);
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isDeleted = true; }));
  }

  @action clearState() {
    this.isLoading = false;
    this.isAdded = false;
    this.isUpdated = false;
    this.isDeleted = false;
  }
}

export default new ExercisesStore();
