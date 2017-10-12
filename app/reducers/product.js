import { fromJS } from 'immutable';
import {
  GET_COLLECTIONS,
  SET_COLLECTIONS,
} from '../actions/types';

const initialState = fromJS({
  collections: fromJS([]),
  collectionsComponent: fromJS({
    awaitingApiData: false,
  }),
});

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTIONS: {
      const collectionsComponent = state.get('collectionsComponent').toJS();
      collectionsComponent.awaitingApiData = true;
      return state
        .set('collectionsComponent', fromJS(collectionsComponent));
    }
    case SET_COLLECTIONS: {
      const collectionsComponent = state.get('collectionsComponent').toJS();
      collectionsComponent.awaitingApiData = false;
      return state
        .set('collectionsComponent', fromJS(collectionsComponent))
        .set('collections', fromJS(action.collections));
    }
    default: {
      return state;
    }
  }
}
