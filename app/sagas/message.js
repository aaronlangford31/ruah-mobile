import { put, call, select, takeLatest } from 'redux-saga/effects';
import { GET_CONVERSATIONS } from '../actions/types';
import { getConversationsLocalSuccess, getConversationsApiSuccess, setConversations } from '../actions/message';
import { error } from '../actions/logging';
import MessageApi from '../../api/message';

function* fetchConversations() {
  const state = yield select();
  const app = state.app.toJS();
  const db = app.appDb;

  try {
    const dbConversations = yield call(db.getConversations);
    yield put(setConversations(dbConversations));
    yield put(getConversationsLocalSuccess());

    const latestMessageRecordTime = yield call(db.getMostLatestMessageRecord);

    const conversations = yield call(MessageApi.GetConversations, latestMessageRecordTime || 1, app.apiAuthToken);
    conversations.sort((a, b) => b.LastInteraction - a.LastInteraction);
    conversations.forEach((c) => { c.Messages.sort((a, b) => b.Timestamp - a.Timestamp); });
    // Need store data... best way to do that?
    yield put(setConversations(conversations.concat(dbConversations)));
    yield put(getConversationsApiSuccess());
    // db.setConversations(apiConversations);
  } catch (ex) {
    yield put(error(ex));
  }
}

function* watchGetConversations() {
  yield takeLatest(GET_CONVERSATIONS, fetchConversations);
}

export default [
  watchGetConversations,
];
