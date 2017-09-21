import { fromJS } from 'immutable';
import { _ } from 'underscore';
import {
  GET_CONVERSATIONS,
  SET_CONVERSATIONS,
  SET_CONVERSATION,
  GET_CONVERSATIONS_LOCAL_SUCCESS,
  GET_CONVERSATIONS_API_SUCCESS,
  SET_MESSAGE_CONTENT,
} from '../actions/types';

const initialState = fromJS({
  conversations: fromJS([]),
  currConversation: fromJS({}),
  currMessage: fromJS({}),
  conversationComponent: fromJS({}),
  conversationsComponent: fromJS({
    awaitingLocalData: false,
    awaitingApiData: false,
  }),
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS: {
      const conversationsComponent = state.get('conversationsComponent').toJS();
      conversationsComponent.awaitingLocalData = true;
      conversationsComponent.awaitingApiData = true;
      return state
        .set('conversationsComponent', fromJS(conversationsComponent));
    }
    case SET_CONVERSATIONS: {
      return state
        .set('conversations', fromJS(action.conversations));
    }
    case SET_CONVERSATION: {
      const conversations = state.get('conversations').toJS();
      const conversation = _.find(conversations, (c) => c.ChannelId === action.channelId);
      const message = {
        Content: '',
        Timestamp: Date.now(),
        Recipient: conversation.RecipientId,
      };
      return state
        .set('currMessage', fromJS(message))
        .set('currConversation', fromJS(conversation));
    }
    case GET_CONVERSATIONS_LOCAL_SUCCESS: {
      const conversationsComponent = state.get('conversationsComponent').toJS();
      conversationsComponent.awaitingLocalData = false;
      return state
        .set('conversationsComponent', fromJS(conversationsComponent));
    }
    case GET_CONVERSATIONS_API_SUCCESS: {
      const conversationsComponent = state.get('conversationsComponent').toJS();
      conversationsComponent.awaitingApiData = false;
      return state
        .set('conversationsComponent', fromJS(conversationsComponent));
    }
    case SET_MESSAGE_CONTENT: {
      const message = state.get('currMessage').toJS();
      message.Timestamp = Date.now();
      message.Content = action.val;
      return state
        .set('currMessage', fromJS(message));
    }
    default: {
      return state;
    }
  }
}
