import React from 'react'
import Header from '../../containers/HeaderContainer'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className={`container ${classes.absoulte}`}>
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
