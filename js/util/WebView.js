
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setList } from '../redux/action/webview'
import { StyleSheet, WebView, ViewPropTypes, Dimensions, View, Text } from 'react-native'

import taobaoJS from './taobao'
import jdJS from './jd'

const initJS = `
function sendData (type, data) {
  if (window.postMessage) {
    window.postMessage(JSON.stringify({type: type, data: data}));
  } else {
    throw Error('postMessage接口还未注入');
  }
};
(function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) { 
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() { 
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
  };

  window.postMessage = patchedPostMessage;
})();
setTimeout(function () {
  var locationUrl = window.location.href;
  
  if (locationUrl.indexOf('https://h5.m.taobao.com') == 0 && $('iframe').length == 0) {
    sendData('navigation', {});
  }
  if (locationUrl.indexOf('https://m.jd.com') == 0 || locationUrl.indexOf('https://wqs.jd.com/order/orderlist_merge.shtml') == 0) {
    sendData('navigation', {});
  }
  if (locationUrl.indexOf('https://m.jd.com') == 0) {
    window.location.href = 'https://wqs.jd.com/order/orderlist_merge.shtml';
  }
}, 100);
`
/**
 * WebView组件
 * props:
 *  id:爬取的网站
 */

const mapStateToProps = state => {
  return {
    data: state.webview.data
  }
}
const mapDispatchToProps = { setList }

class WebViewUtil extends React.Component {
  constructor() {
    super(...arguments)
    this._renderError = this._renderError.bind(this)
    this._reviewJS = this._reviewJS.bind(this)
    this._onMessage = this._onMessage.bind(this)
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this)
    this.id = this.props.navigation.state.params.id
    this.state = {
      init: true, // 是否为首次加载标识
      isShow: false
    }
  }
  static propTypes = {
    data: PropTypes.array,
    setList: PropTypes.func,
    navigation: PropTypes.object,
  }
  _renderError(e) {
    console.log('异常信息===>', e)
  }
  // 判断url，注入js，返回值类型为function
  _reviewJS() {
    return alert('注入js')
  }
  _onNavigationStateChange = (navState) => {
    // 判断加载完成状态
    if (!navState.loading) {
      console.log(navState.url)
      // 注入js
      if (this.id == 'jd' && navState.url == 'https://wqs.jd.com/order/orderlist_merge.shtml') {
        console.log('注入 jd JS')
        this.refs.webView.injectJavaScript(jdJS)
      } else if (this.id == 'taobao' && navState.url == 'https://h5.m.taobao.com/mlapp/olist.html') {
        console.log('注入 taobao JS')
        this.refs.webView.injectJavaScript(taobaoJS)
      }
    }
  }
  // H5调用window.postMessage方法会调用此方法
  _onMessage(e) {
    console.log('_onMessage', e.nativeEvent.data)
    try {
      data = JSON.parse(e.nativeEvent.data)
    } catch (e) {
      return
    }

    switch (data.type) {
      case 'navigation':
        this.setState({ isShow: true })
        break;
      case 'data':
        this.props.setList(data.data)
        this.props.navigation.goBack()
        break
      case 'console':
        console.log(e.nativeEvent.data)
      default:
        break;
    }
    // console.log('H5注入JS，执行成功，回传参数为：', e.nativeEvent.data)
    // this.setState({init: false})
  }
  render() {
    let url = ''
    if (this.id == 'jd') {
      url = 'https://plogin.m.jd.com/user/login.action?appid=100'
    } else {
      url = 'https://login.m.taobao.com/login.htm?tpl_redirect_url=https%3A%2F%2Fh5.m.taobao.com%2Fmlapp%2Folist.html'
    }
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref='webView'
          style={{ flex: 1 }}
          source={{ uri: url, method: 'get' }}
          injectedJavaScript={this.state.init ? initJS : ''}
          renderError={this._renderError}
          onMessage={this._onMessage}
          onNavigationStateChange={this._onNavigationStateChange}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
        />
        {this.state.isShow ? <View style={styles.mask}>
          <Text style={{ color: 'white' }}>授信中...</Text>
        </View> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  round: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mask: {
    backgroundColor: '#000000',
    position: 'absolute',
    width: Dimensions.get('window').width,
    left: 0,
    top: 0,
    bottom: 0
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebViewUtil)