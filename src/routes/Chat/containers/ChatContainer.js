import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { actions } from '../modules/chat'
import requireAuth from 'decorators/requireAuth'
import Chat from '../components/ChatInterface'

@connect(mapStateToProps, mapDispatchToProps)
@requireAuth
export default class ChatContainer extends Component {
  render () {
    return <Chat {...this.props} />
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
    user: state.chat.user
  }
}
