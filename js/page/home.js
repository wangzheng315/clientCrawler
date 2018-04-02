

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  AppRegistry,
  Button,
  View,
  Text,
  Alert,
  FlatList,
  SafeAreaView,
  // WebView,
} from 'react-native'
import WebView from '../util/WebView'

const mapStateToProps = state => {
  return {
    data: state.webview.data
  }
}
class Home extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View>
          <View style={styles.btn}>
            <Button title="京东" style={styles.button} onPress={() => navigate('WebView', { id: 'jd' })}></Button>
            <Button title="淘宝" style={styles.button} onPress={() => navigate('WebView', { id: 'taobao' })}></Button>
          </View>
        </View>
        <View style={styles.flexColumn}>
          <FlatList
            kes="price"
            data={this.props.data}
            renderItem={({ item }) =>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1 }}>{item.state}</Text>
                <Text style={{ flex: 1 }}>{item.price}</Text>
                <Text style={{ flex: 2 }}>{item.skuTitle[0]}</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  btn: {
    flexDirection: 'row',
  },
  button: {
    width: 50,
    height: 50,
  }
})
export default connect(
  mapStateToProps,
)(Home)