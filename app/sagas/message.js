import { put, call, select, takeLatest } from 'redux-saga/effects';
import { GET_CONVERSATIONS, SEND_MESSAGE } from '../actions/types';
import {
  getConversationsLocalSuccess,
  getConversationsApiSuccess,
  setConversations,
  setMessageContent,
} from '../actions/message';
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

function* sendMessage() {
  const state = yield select();
  const app = state.app.toJS();
  const db = app.appDb;
  const messageState = state.message.toJS();
  yield put(setMessageContent(''));
  const conversation = messageState.conversations.find((c) => c.ChannelId === messageState.currConversation.ChannelId);
  conversation.Messages.push(messageState.currMessage);

  try {
    const result = yield call(MessageApi.SendMessage, messageState.currMessage, app.apiAuthToken);
    if (typeof (result) !== 'number') {
      yield call(db.insertMessage, messageState.currMessage);
    }
  } catch (ex) {
    yield put(error(ex));
  }
}

function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE, sendMessage);
}

export default [
  watchGetConversations,
  watchSendMessage,
];
