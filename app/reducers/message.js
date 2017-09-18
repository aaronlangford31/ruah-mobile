import { fromJS } from 'immutable';
import {
  GET_CONVERSATIONS,
  SET_CONVERSATIONS,
  GET_CONVERSATIONS_LOCAL_SUCCESS,
  GET_CONVERSATIONS_API_SUCCESS,
} from '../actions/types';

const initialState = fromJS({
  conversations: fromJS([]),
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
    default: {
      return state;
    }
  }
}
