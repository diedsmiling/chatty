import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import socketCluster from 'socketcluster-client'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const socket = socketCluster.connect({
  port: 8000
})
//socket.emit('sampleClientEvent', 'This is a PING message')
//socket.on('rand', function(data) {
//  console.log(data)
//})

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { history, routes, store } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider >
          <div style={{ height: '100%' }}>
            <Router history={history} children={routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default AppContainer
