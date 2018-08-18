import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () =>
  async (dispatch) => {
    try {
      const response = await axios.get('/api/current-user');
      dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_USER,
        payload: '',
      });
    }
  };

export const handleToken = (token) =>
  async (dispatch) => {
    try {
      const response = await axios.post('/api/stripe', token);
      dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_USER,
        payload: '',
      });
    }
  };
