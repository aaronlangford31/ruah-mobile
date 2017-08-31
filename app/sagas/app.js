import { put, call, takeLatest } from 'redux-saga/effects';
import { Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { LOAD_APP_ASSETS } from '../actions/types';
import { loadAppAssetsSuccess } from '../actions/app';
import { info, warn } from '../actions/logging';

function* loadAssetsAsync() {
  try {
    yield call(() => Promise.all([
      Asset.loadAsync([
        require('../../assets/images/robot-dev.png'), // eslint-disable-line global-require
        require('../../assets/images/robot-prod.png'), // eslint-disable-line global-require
      ]),
      Font.loadAsync([
        // This is the font that we are using for our tab bar
        Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        { 'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf') }, // eslint-disable-line global-require
      ]),
    ]));
    yield put(loadAppAssetsSuccess());
  } catch (e) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    yield put(warn(
      'There was an error caching assets (see: app/sagas/app.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
    ));
    yield put(info(e));
  }
}

function* watchLoadAppAssets() {
  yield takeLatest(LOAD_APP_ASSETS, loadAssetsAsync);
}

export default [
  watchLoadAppAssets,
];
