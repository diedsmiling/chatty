import React from 'react'
import classes from './Header.scss'
import AppBar from 'material-ui/AppBar'
import Spinner from '../Spinner'
import NameFormContainer from 'containers/NameFormContainer'

export const Header = (props) => (
  <div className={classes.header}>
    <AppBar
      title={props.isNameFormVisible ? <NameFormContainer /> : props.username}
      onTitleTouchTap={props.isNameFormVisible ? null : props.actions.toggleNameForm}
      //onTitleTouchTap={function() { console.log(props)}}
      iconElementLeft={props.isLoading ? <Spinner /> : null}
      onLeftIconButtonTouchTap={props.actions.toggleDrawer}
    />
  </div>
)

Header.propTypes = {
  username: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  isNameFormVisible: React.PropTypes.bool,
  actions: React.PropTypes.shape({
    toggleDrawer: React.PropTypes.func.isRequired,
    toggleNameForm: React.PropTypes.func.isRequired
  })
}
export default Header
