import { createStore as _createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
})
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

let middlewares = [navigationMiddleware]

if (isDebuggingInChrome) {
  middlewares.push(logger)
}

export default function createStore () {
  const store = _createStore(
    reducer,
    applyMiddleware(...middlewares),
  )
  return store
}
