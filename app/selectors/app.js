import { createSelector } from 'reselect';

const selectAppState = () => (state) => state.app;

const selectAssetsAreLoaded = () => createSelector(
  selectAppState(),
  (state) => state.get('assetsAreLoaded'),
);

export default {
  selectAssetsAreLoaded,
};
