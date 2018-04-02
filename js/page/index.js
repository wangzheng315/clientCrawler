import MainStackNavigation from '../navigation'
import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  nav: state.nav
})

class Index extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <MainStackNavigation navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener: createReduxBoundAddListener("root"),
      })} />
    );
  }
}
export default connect(mapStateToProps)(Index)
