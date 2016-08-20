import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { actions } from '../modules/chat'
import UsersDrawer from '../components/UsersDrawer/UsersDrawer'

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatContainer extends Component {
  render () {
    return <UsersDrawer {...this.props} />
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...actions}, dispatch),
    dispatch
  }
}

function mapStateToProps (state) {
  return {
    isDrawerOpen: state.chat.isDrawerOpen,
    users: state.chat.users
  }
}
