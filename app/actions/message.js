import {
  GET_CONVERSATIONS,
  SET_CONVERSATIONS,
  SET_CONVERSATION,
  GET_CONVERSATIONS_LOCAL_SUCCESS,
  GET_CONVERSATIONS_API_SUCCESS,
  SET_MESSAGE_CONTENT,
  SEND_MESSAGE,
} from './types';

export function getConversations() {
  return {
    type: GET_CONVERSATIONS,
  };
}

export function setConversations(conversations) {
  return {
    type: SET_CONVERSATIONS,
    conversations,
  };
}

export function setConversation(channelId) {
  return {
    type: SET_CONVERSATION,
    channelId,
  };
}

export function getConversationsLocalSuccess() {
  return {
    type: GET_CONVERSATIONS_LOCAL_SUCCESS,
  };
}

export function getConversationsApiSuccess() {
  return {
    type: GET_CONVERSATIONS_API_SUCCESS,
  };
}

export function setMessageContent(val) {
  return {
    type: SET_MESSAGE_CONTENT,
    val,
  };
}

export function sendMessage() {
  return {
    type: SEND_MESSAGE,
  };
}
