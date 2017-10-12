import { createSelector } from 'reselect';

const selectProductState = () => (state) => state.product;

const selectCollections = () => createSelector(
  selectProductState(),
  (state) => state.get('collections').toJS(),
);

const selectCollectionsComponent = () => createSelector(
  selectProductState(),
  (state) => state.get('collectionsComponent').toJS()
);

export default {
  selectCollections,
  selectCollectionsComponent,
};
