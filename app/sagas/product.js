import { put, call, select, takeLatest } from 'redux-saga/effects';
import { GET_COLLECTIONS } from '../actions/types';
import {
  setCollections,
} from '../actions/product';
import { error } from '../actions/logging';
import ProductApi from '../../api/product';

function* fetchCollections() {
  const state = yield select();
  const app = state.app.toJS();

  try {
    const collections = yield call(ProductApi.GetCollections, app.apiAuthToken);
    console.log(collections);
    collections.sort((a, b) => b.Timestamp - a.Timestamp);

    yield put(setCollections(collections));
  } catch (ex) {
    yield put(error(ex));
  }
}

function* watchGetCollections() {
  yield takeLatest(GET_COLLECTIONS, fetchCollections);
}

export default [
  watchGetCollections,
];
