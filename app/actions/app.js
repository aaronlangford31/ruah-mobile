import {
  LOAD_APP_ASSETS,
  LOAD_APP_ASSETS_SUCCESS,
  SET_API_AUTH_TOKEN,
  LOAD_SQL_STORE,
  SET_SQL_STORE,
} from './types';

export function loadAppAssets() {
  return {
    type: LOAD_APP_ASSETS,
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

export function loadSqlStore() {
  return {
    type: LOAD_SQL_STORE,
  };
}

export function setSqlStore(db) {
  return {
    type: SET_SQL_STORE,
    db,
  };
}
