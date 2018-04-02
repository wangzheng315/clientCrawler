import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { SafeAreaView, StyleSheet } from 'react-native'
import Index from './page'
import createStore from './redux/createStore'

export default class App extends Component {
  componentWillMount () {
    this.store = createStore()
  }
  render() {
    return (
      <Provider store={this.store}>
        <Index/>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  }
})