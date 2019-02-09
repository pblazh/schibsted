import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import * as modules from './modules'

/* eslint-disable */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const moduleSagas = Object.values(modules).reduce(
  (acc, module) => [...acc, module.saga && module.saga()],
  []
)
/* eslint-enable */

function * rootSaga () {
  yield all(moduleSagas)
}

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const reducers = Object.values(modules).reduce(
  (acc, module) => ({ ...acc, [module.mountPoint]: module.reducer }),
  {}
)

export default (state = {}) => {
  const store = createStore(combineReducers(reducers), { ...state }, enhancer)

  sagaMiddleware.run(rootSaga)
  return store
}
