import React from 'react'
import ReactDom from 'react-dom'
import classes from './MessagesBox.scss'
import {List, ListItem} from 'material-ui/List'

function scrollMessagesBox () {
  ReactDom.findDOMNode(this).lastChild.lastChild.scrollIntoView()
}

export default class MessagesBox extends React.Component {
  componentDidMount () {
    this.props.setMessagesWatcher()
    scrollMessagesBox.call(this)
  }
  componentDidUpdate () {
    scrollMessagesBox.call(this)
  }
  render () {
    return (
      <div className={`container ${classes.messagesBox}`}>
        <List>
          {
            (this.props.messages.length > 0
            ? this.props.messages.map((m, i) => (
              <ListItem
                key={i}
                primaryText={m.message}
                secondaryText={m.user.name}
                secondaryTextLines={2}
              />
            ))
            : <div>No messages yet!</div>)
          }
        </List>
      </div>
    )
  }
  static propTypes = {
    setMessagesWatcher: React.PropTypes.func.isRequired,
    ping: React.PropTypes.func.isRequired,
    messages: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        message: React.PropTypes.string,
        user: React.PropTypes.shape({
          name: React.PropTypes.string
        })
      })
    )
  }
}
