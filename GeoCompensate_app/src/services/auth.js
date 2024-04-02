import {httpClient} from '../utils/http';

export const authneticateUser = async data => {
  let response;
  try {
    response = await httpClient.post('/login', data);
  } catch (error) {
    console.error('Error sending data:', JSON.stringify(error));
  }
  return response?.data?.data;
};
