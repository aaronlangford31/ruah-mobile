import { put, call, all, takeLatest } from 'redux-saga/effects';
import { Font } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AppDb from '../../db';
import { LAUNCH_APP } from '../actions/types';
import { loadAppAssetsSuccess, setSqlStore } from '../actions/app';
import { appSubmitLogin } from '../actions/user';
import { info, warn, error } from '../actions/logging';

function* initApp() {
  yield call(loadAssetsAsync);
  yield call(loadSqlStore);
  yield put(appSubmitLogin());
}

function* loadAssetsAsync() {
  try {
    yield call(() => Promise.all([
      Font.loadAsync([
        // This is the font that we are using for our tab bar
        Ionicons.font,
        MaterialIcons.font,
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

function* loadSqlStore() {
  try {
    const db = new AppDb();
    yield call(db.init);
    yield put(setSqlStore(db));
  } catch (err) {
    yield put(error(err));
  }
}

function* watchLaunchApp() {
  yield takeLatest(LAUNCH_APP, initApp);
}

export default [
  watchLaunchApp,
];
