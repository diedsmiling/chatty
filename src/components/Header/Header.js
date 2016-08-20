import React from 'react'
import classes from './Header.scss'
import AppBar from 'material-ui/AppBar'
import Spinner from '../Spinner'
export const Header = (props) => (
  <div className={classes.header}>
    <AppBar
      title={props.username}
      iconElementLeft={props.isLoading ? <Spinner /> : null}
    />
  </div>
)

Header.propTypes = {
  username: React.PropTypes.string,
  isLoading: React.PropTypes.bool
}
export default Header
