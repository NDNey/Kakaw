import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error,'hello there');
  }
 
};

export const signup = (formData, router) => async (dispatch) => {
  console.log(formData)
  try {
    const { data } = await api.signUp(formData);
    
    dispatch({ type: AUTH, data });
    
    router.push('/');
  } catch (error) {
    console.log(error,'here');
  }

};