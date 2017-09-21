import { fromJS } from 'immutable';
import {
  APP_SUBMIT_LOGIN,
  USER_SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_FAIL,
  SET_USER_ID,
  SET_PASSWORD,
  SET_STORE,
} from '../actions/types';

const initialState = fromJS({
  user: fromJS({
    authenticated: false,
    userId: '',
    password: '',
  }),
  loginComponent: fromJS({
    awaitingLoginResponse: false,
    error: '',
    shouldDisplayError: false,
  }),
  store: fromJS({}),
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case APP_SUBMIT_LOGIN:
    case USER_SUBMIT_LOGIN: {
      const loginComponent = state.get('loginComponent').toJS();
      loginComponent.awaitingLoginResponse = true;
      loginComponent.shouldDisplayError = false;
      return state
        .set('loginComponent', fromJS(loginComponent));
    }
    case SUBMIT_LOGIN_SUCCESS: {
      const loginComponent = state.get('loginComponent').toJS();
      loginComponent.awaitingLoginResponse = false;
      loginComponent.shouldDisplayError = false;
      const user = state.get('user').toJS();
      user.authenticated = true;
      return state
        .set('user', fromJS(user))
        .set('loginComponent', fromJS(loginComponent));
    }
    case SUBMIT_LOGIN_FAIL: {
      const loginComponent = state.get('loginComponent').toJS();
      loginComponent.awaitingLoginResponse = false;
      loginComponent.error = action.error;
      loginComponent.shouldDisplayError = action.shouldDisplayError;
      return state
        .set('loginComponent', fromJS(loginComponent));
    }
    case SET_USER_ID: {
      const user = state.get('user').toJS();
      user.userId = action.val;
      return state
        .set('user', fromJS(user));
    }
    case SET_PASSWORD: {
      const user = state.get('user').toJS();
      user.password = action.val;
      return state
        .set('user', fromJS(user));
    }
    case SET_STORE: {
      return state
        .set('store', fromJS(action.store));
    }
    default: {
      return state;
    }
  }
}
