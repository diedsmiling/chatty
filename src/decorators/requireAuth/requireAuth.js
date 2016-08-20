import React, {PropTypes, Component} from 'react'
import {push} from 'react-router-redux'
import { isEmpty } from 'lodash'

export default ComposedComponent => {
  return class RequiredAuth extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      dispatch: PropTypes.func,
      hasAuthError: PropTypes.bool,
      user: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
      })
    }

    componentWillMount () {
      this.checkForAuth(this.props)
    }

    componentWillReceiveProps (nextProps) {
      this.checkForAuth(nextProps)
    }

    render () {
      const {user} = this.props
      if (!isEmpty(user)) {
        return <ComposedComponent {...this.props} />
      }
      return <div>Logging in...</div>
    }

    checkForAuth (props) {
      const { actions, user } = props
      if (isEmpty(user)) {
        actions.requestAuth()
      }
    }
  }
}
