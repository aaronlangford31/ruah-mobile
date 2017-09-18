import { createSelector } from 'reselect';

const selectMessageState = () => (state) => state.message;

const selectConversations = () => createSelector(
  selectMessageState(),
  (state) => state.get('conversations').toJS(),
);

const selectConversationsComponent = () => createSelector(
  selectMessageState(),
  (state) => state.get('conversationsComponent').toJS(),
);

export default {
  selectConversations,
  selectConversationsComponent,
};
