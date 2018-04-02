import { StackNavigator } from 'react-navigation'

import Home from '../page/home'
import WebView from '../page/webview'

const routeConfiguration = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: '首页',
    },
  },
  WebView: {
    screen: WebView,
    navigationOptions: {
      headerTitle: '京东',
    },
  },
}
const stackConfiguration = {
  initialRouteName: 'Home'
}

export default StackNavigator(routeConfiguration, stackConfiguration)