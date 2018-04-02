
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import WebViewUtil from '../util/WebView'

export default class WebView extends Component {
  render() {
    return (
      <View style={styles.webview}>
        <WebViewUtil navigation={this.props.navigation}></WebViewUtil>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})