import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { actions } from '../modules/chat'
import SendMessagePanel from '../components/SendMessagePanel/SendMessagePanel'
import { reduxForm } from 'redux-form'
const fields = [
  'message'
]

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...actions}, dispatch),
    dispatch
  }
}

function mapStateToProps (state) {
  return {
    counter: state.counter,
    user: state.chat.user
  }
}

export default reduxForm(
  {
    form: 'SendMessageForm',
    fields
  },
  mapStateToProps,
  mapDispatchToProps
)(SendMessagePanel)
