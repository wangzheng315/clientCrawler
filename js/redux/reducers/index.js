import { combineReducers } from 'redux'
import webview from './webview'
import nav from './navigation'

export default combineReducers({
  nav,
  webview,
})