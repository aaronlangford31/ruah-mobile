import {
  LOAD_APP_ASSETS,
  LOAD_APP_ASSETS_SUCCESS,
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
