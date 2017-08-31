import { fromJS } from 'immutable';
import {
  LOAD_APP_ASSETS_SUCCESS,
} from '../actions/types';

const initialState = fromJS({
  assetsAreLoaded: false,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APP_ASSETS_SUCCESS: {
      return state
        .set('assetsAreLoaded', true);
    }
    default: {
      return state;
    }
  }
}
