import axios from 'axios';

export const BackendClient = axios.create({
  baseURL: 'https://dutchnsettle-402123.uk.r.appspot.com/api/v1/',
});
