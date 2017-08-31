import { put, call, select, takeLatest } from 'redux-saga/effects';
import { APP_SUBMIT_LOGIN, USER_SUBMIT_LOGIN } from '../actions/types';
import { submitLoginSuccess, submitLoginFail } from '../actions/user';
import { info, warn } from '../actions/logging';
import UserApi from '../../api/user';

function* appCheckAuthentication() {
  const state = yield select();
  const userState = state.user.toJS();
  const userData = userState.user;
  if (userData.userId && userData.password) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.userId)) {
      yield put(submitLoginFail('Invalid email address.', true));
    }
    yield call(UserApi.Authenticate, userData.userId, userData.password);
    yield put(submitLoginSuccess());
  } else {
    yield put(submitLoginFail('No user credentials found.', false));
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
    yield call(UserApi.Authenticate, userData.userId, userData.password);
    yield put(submitLoginSuccess());
  }
}

function* watchUserSubmitLogin() {
  yield takeLatest(USER_SUBMIT_LOGIN, userCheckAuthentication);
}

export default [
  watchAppSubmitLogin,
  watchUserSubmitLogin,
];
