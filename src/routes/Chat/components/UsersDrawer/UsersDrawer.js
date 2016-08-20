import React from 'react'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'

export const SendMessagePanel = (props) => (
  <Drawer
    docked={false}
    open={props.isDrawerOpen}
    onRequestChange={props.actions.toggleDrawer} //eslint-disable-line
  >
    <h1>Online users</h1>
    <List>
      {
        (props.users.length > 0
          ? props.users.map((u, i) => (
            <ListItem
              key={i}
              primaryText={u.name}
            />
        ))
          : <div>No users yet!</div>)
      }
    </List>
  </Drawer>
)

SendMessagePanel.propTypes = {
  isDrawerOpen: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.shape({
    toggleDrawer: React.PropTypes.func.isRequired
  }),
  users: React.PropTypes.array
}

export default SendMessagePanel
