import { createSelector } from 'reselect';

const selectMessageState = () => (state) => state.message;

const selectConversations = () => createSelector(
  selectMessageState(),
  (state) => state.get('conversations').toJS(),
);

const selectCurrConversation = () => createSelector(
  selectMessageState(),
  (state) => state.get('currConversation').toJS(),
);

const selectConversationsComponent = () => createSelector(
  selectMessageState(),
  (state) => state.get('conversationsComponent').toJS(),
);

const selectCurrMessage = () => createSelector(
  selectMessageState(),
  (state) => state.get('currMessage').toJS(),
);

export default {
  selectConversations,
  selectCurrConversation,
  selectConversationsComponent,
  selectCurrMessage,
};
