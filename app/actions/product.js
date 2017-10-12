import {
  GET_COLLECTIONS,
  SET_COLLECTIONS,
} from './types';

export function getCollections() {
  return {
    type: GET_COLLECTIONS,
  };
}

export function setCollections(collections) {
  return {
    type: SET_COLLECTIONS,
    collections,
  };
}
