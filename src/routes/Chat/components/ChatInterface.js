import React from 'react'
import classes from './ChatInterface.scss'
import SendMessagePanelContainer from '../containers/SendMessagePanelContainer'
import MessagesBox from './MessagesBox/MessagesBox'

export const ChatInterface = (props) => (
  <div className={classes.interfce}>
    <MessagesBox />
    <SendMessagePanelContainer />
  </div>
)

ChatInterface.propTypes = {

}

export default ChatInterface
