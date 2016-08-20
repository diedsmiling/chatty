import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { actions } from 'routes/Chat/modules/chat'
import Header from '../components/Header'

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatContainer extends Component {
  render () {
    return <Header {...this.props} />
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
    username: state.chat.user.name,
    isLoading: state.chat.isLoading
  }
}
