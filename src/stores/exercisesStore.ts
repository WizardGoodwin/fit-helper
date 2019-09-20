import { observable, action } from 'mobx';
import axios from'../axios';
import { AxiosResponse } from 'axios';

import { IExercise } from '../models/exercise.interface';

class ExercisesStore {

  @observable exercises: IExercise[] = [];
  @observable isExercisesLoading = false;
  @observable error: string | null = null;

  @action getExercises() {
    this.isExercisesLoading = true;
    this.error = null;
    return axios.get('/exercises')
      .then(action((response: AxiosResponse) => { this.exercises = response.data; }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isExercisesLoading = false; }));
  }

  @action addExercise(newExercise: IExercise) {
    this.isExercisesLoading = true;
    return axios.post('/exercises', newExercise)
      .then(action(() => { this.exercises.push(newExercise)}))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isExercisesLoading = false; }));
  }

  @action updateExercise(exercise: IExercise) {
    this.isExercisesLoading = true;
    return axios.put(`/exercises/${exercise.id}`, exercise)
      .then(action(() => {
        const index = this.exercises.findIndex((item: IExercise) => item.id === exercise.id);
        this.exercises[index] = exercise;
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
      .finally(action(() => { this.isExercisesLoading = false; }));
  }

  @action deleteExercise(id?: number) {
    return axios.delete(`/exercises/${id}`)
      .then(action(() => {
        this.exercises = this.exercises.filter((item: IExercise) => item.id !== id);
      }))
      .catch(action((error: any) => {
        this.error = error;
      }))
  }
}

export default new ExercisesStore();
