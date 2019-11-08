import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fit-helper-api.herokuapp.com/',
});

export default instance;
