import React from 'react'
import classes from './ChatInterface.scss'
import SendMessagePanelContainer from '../containers/SendMessagePanelContainer'
import MessagesBoxContainer from '../containers/MessagesBoxContainer'
import UsersDrawerContainer from '../containers/UsersDrawerContainer'

export const ChatInterface = (props) => (
  <div className={classes.interfce}>
    <MessagesBoxContainer />
    <SendMessagePanelContainer />
    <UsersDrawerContainer />
  </div>
)

ChatInterface.propTypes = {

}

export default ChatInterface
