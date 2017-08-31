import { fromJS } from 'immutable';
import {
  LOAD_APP_ASSETS_SUCCESS,
  SET_API_AUTH_TOKEN,
} from '../actions/types';

const initialState = fromJS({
  assetsAreLoaded: false,
  apiAuthToken: '',
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APP_ASSETS_SUCCESS: {
      return state
        .set('assetsAreLoaded', true);
    }
    case SET_API_AUTH_TOKEN: {
      return state
        .set('apiAuthToken', action.token);
    }
    default: {
      return state;
    }
  }
}
