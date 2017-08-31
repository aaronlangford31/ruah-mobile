import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import createReducer from './app/reducers';
import bootstrapSagas from './sagaRoot';

const sagaMiddleware = createSagaMiddleware();
/* global __DEV__ */
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

export default function configStore(initialState = {}) {
  const middlewares = [
    loggerMiddleware,
    sagaMiddleware,
  ];
  const enhancer = compose(
    applyMiddleware(...middlewares)
  );

  const store = createStore(createReducer(), initialState, enhancer);
  store.runSaga = () => bootstrapSagas(sagaMiddleware.run);

  return store;
}
