import {
  APP_SUBMIT_LOGIN,
  USER_SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_FAIL,
  SET_USER_ID,
  SET_PASSWORD,
  SET_STORE,
} from './types';

export function appSubmitLogin() {
  return {
    type: APP_SUBMIT_LOGIN,
  };
}

export function userSubmitLogin() {
  return {
    type: USER_SUBMIT_LOGIN,
  };
}

export function submitLoginSuccess() {
  return {
    type: SUBMIT_LOGIN_SUCCESS,
  };
}

export function submitLoginFail(error, shouldDisplayError) {
  return {
    type: SUBMIT_LOGIN_FAIL,
    error,
    shouldDisplayError,
  };
}

export function setUserId(val) {
  return {
    type: SET_USER_ID,
    val,
  };
}

export function setPassword(val) {
  return {
    type: SET_PASSWORD,
    val,
  };
}

export function setStore(store) {
  return {
    type: SET_STORE,
    store,
  };
}
