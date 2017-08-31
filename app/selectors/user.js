import { createSelector } from 'reselect';

const selectUserState = () => (state) => state.user;

const selectUser = () => createSelector(
  selectUserState(),
  (state) => state.get('user').toJS(),
);

const selectLoginComponent = () => createSelector(
  selectUserState(),
  (state) => state.get('loginComponent').toJS(),
);

export default {
  selectUser,
  selectLoginComponent,
};
