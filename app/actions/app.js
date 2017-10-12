import {
  LAUNCH_APP,
  LOAD_APP_ASSETS_SUCCESS,
  SET_API_AUTH_TOKEN,
  SET_SQL_STORE,
} from './types';

export function launchApp() {
  return {
    type: LAUNCH_APP,
  };
}

export function loadAppAssetsSuccess() {
  return {
    type: LOAD_APP_ASSETS_SUCCESS,
  };
}

export function setApiAuthToken(token) {
  return {
    type: SET_API_AUTH_TOKEN,
    token,
  };
}

export function setSqlStore(db) {
  return {
    type: SET_SQL_STORE,
    db,
  };
}
