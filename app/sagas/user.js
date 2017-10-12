import { put, call, fork, select, takeLatest } from 'redux-saga/effects';
import { APP_SUBMIT_LOGIN, USER_SUBMIT_LOGIN, SUBMIT_LOGIN_SUCCESS } from '../actions/types';
import { submitLoginSuccess, submitLoginFail, setUserId, setPassword, setStore } from '../actions/user';
import { error } from '../actions/logging';
import UserApi from '../../api/user';

function* appCheckAuthentication() {
  const state = yield select();
  const app = state.app.toJS();
  const db = app.appDb;

  try {
    const userData = yield call(db.getUserProps, ['userId', 'password']);
    if (userData.userId && userData.password) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.userId)) {
        yield put(submitLoginFail('Invalid email address.', false));
      }
      yield call(UserApi.Authenticate, userData.userId, userData.password);
      yield put(setUserId(userData.userId));
      yield put(setPassword(userData.password));
      yield put(submitLoginSuccess());
    } else {
      yield put(submitLoginFail('No user credentials found.', false));
    }
  } catch (err) {
    yield put(error(err));
  }
}

function* watchAppSubmitLogin() {
  yield takeLatest(APP_SUBMIT_LOGIN, appCheckAuthentication);
}

function* userCheckAuthentication() {
  const state = yield select();
  const userState = state.user.toJS();
  const userData = userState.user;
  if (!userData.userId && !userData.password) {
    yield put(submitLoginFail('Oops! Looks like you forgot to enter your credentials.', true));
  } else if (!userData.userId) {
    yield put(submitLoginFail('Oops! Looks like you forgot to enter your email.', true));
  } else if (!userData.password) {
    yield put(submitLoginFail('Oops! Looks like you forgot to enter your password.', true));
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.userId)) {
    yield put(submitLoginFail('Oops! Looks like you didn\'t enter a proper email address.', true));
  } else {
    const result = yield call(UserApi.Authenticate, userData.userId, userData.password);
    if (result === 403) {
      yield put(submitLoginFail('Username and password were incorrect.', true));
    } else if (typeof (result) === 'number' && result >= 500) {
      yield put(submitLoginFail('Something went wrong with Ruah\'s servers. Our engineers will be investigating this issue shortly.', true));
    } else {
      yield put(submitLoginSuccess());
    }
  }
}

function* persistUserData() {
  try {
    const state = yield select();
    const app = state.app.toJS();
    const userState = state.user.toJS();
    const db = app.appDb;
    yield call(db.setUserProps, userState.user);
  } catch (err) {
    yield put(error(err));
  }
}

function* fetchStore() {
  const state = yield select();
  const appState = state.app.toJS();
  const auth = appState.apiAuthToken;
  const store = yield call(UserApi.GetStore, auth);
  yield put(setStore(store));
}

function* onSubmitLoginSuccess() {
  yield fork(persistUserData);
  yield fork(fetchStore);
}

function* watchUserSubmitLogin() {
  yield takeLatest(USER_SUBMIT_LOGIN, userCheckAuthentication);
}

function* watchSubmitLoginSuccess() {
  yield takeLatest(SUBMIT_LOGIN_SUCCESS, onSubmitLoginSuccess);
}

export default [
  watchAppSubmitLogin,
  watchUserSubmitLogin,
  watchSubmitLoginSuccess,
];
