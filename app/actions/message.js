import {
  GET_CONVERSATIONS,
  SET_CONVERSATIONS,
  GET_CONVERSATIONS_LOCAL_SUCCESS,
  GET_CONVERSATIONS_API_SUCCESS,
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
