import { fromJS } from 'immutable';
import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_FAIL,
} from '../actions/types';

const initialState = fromJS({
  authenticated: false,
  userId: '',
  password: '',
  apiToken: '',
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
