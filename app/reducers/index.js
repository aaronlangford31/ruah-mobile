import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';
import messageReducer from './message';

export default function createReducer(asyncReducers) {
  return combineReducers({
    app: appReducer,
    user: userReducer,
    message: messageReducer,
    ...asyncReducers,
  });
}
