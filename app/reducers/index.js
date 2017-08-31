import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';

export default function createReducer(asyncReducers) {
  return combineReducers({
    app: appReducer,
    user: userReducer,
    ...asyncReducers,
  });
}
