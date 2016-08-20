import React, {Component} from 'react'
import { connect } from 'react-redux'
import MessagesBox from '../components/MessagesBox/MessagesBox'
import { watchForMessages, pingServer } from 'routes/Chat/modules/chat'
let interval

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
export default class MessagesBoxContainer extends Component {
  componentDidMount () {
    interval = setInterval(() => {
      pingServer(this.props.userId)
    }, 300)
  }

  componentWillUnmount () {
    clearInterval(interval)
  }
  render () {
    return <MessagesBox {...this.props} />
  }
}

function mapStateToProps (state) {
  return {
    userId: state.chat.user.id,
    messages: state.chat.messages
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

function mergeProps (state, dispatchProps) {
  const { dispatch } = dispatchProps
  return {
    ...state,
    ping () {
      dispatch(pingServer)
    },
    setMessagesWatcher () {
      dispatch(watchForMessages(state.messages))
    }
  }
}
