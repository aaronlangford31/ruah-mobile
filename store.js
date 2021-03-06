import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import createReducer from './app/reducers';
import bootstrapSagas from './sagaRoot';
import _ from 'underscore';

const sagaMiddleware = createSagaMiddleware();
/* global __DEV__ */
const loggerMiddleware = createLogger({
  predicate: () => __DEV__,
  stateTransformer: (state) => _.reduce(state, (memo, val, key) => {
    const mem = memo;
    mem[key] = val.toJS();
    return mem;
  }, {}),
});

let store = null;

export const maybeProvideDispatch = () => (store ? store.dispatch : null);

export default function configStore(initialState = {}) {
  const middlewares = [
    loggerMiddleware,
    sagaMiddleware,
  ];
  const enhancer = compose(
    applyMiddleware(...middlewares)
  );

  store = createStore(createReducer(), initialState, enhancer);
  store.runSaga = () => bootstrapSagas(sagaMiddleware.run);

  return store;
}
