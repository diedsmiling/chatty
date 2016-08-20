import update from 'react-addons-update'
import socketCluster from 'socketcluster-client'
import {SOCKET_OPTIONS} from '../../../configs'

const socket = socketCluster.connect(SOCKET_OPTIONS)

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const REQUEST_AUTH_START = 'REQUEST_AUTH_START'
export const REQUEST_AUTH_ERROR = 'REQUEST_AUTH_ERROR'
export const REQUEST_AUTH_SUCCESS = 'REQUEST_AUTH_SUCCESS'
export const INPUT_CHANGE = 'INPUT_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
function startRequestAuth () {
  return {
    type: REQUEST_AUTH_START
  }
}

function resolveRequestAuth (user) {
  return {
    type: REQUEST_AUTH_SUCCESS,
    user
  }
}

function rejectRequestAuth (error) {
  return {
    type: REQUEST_AUTH_ERROR,
    error
  }
}

function emit (event, data) {
  return new Promise((resolve, reject) => {
    socket.emit(event, data, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function requestAuth () {
  return dispatch => {
    dispatch(startRequestAuth())
    emit('registerUser', '')
      .then(response => {
        dispatch(resolveRequestAuth(response))
      })
      .catch(error => {
        dispatch(rejectRequestAuth(error))
      })
  }
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  doubleAsync,
  requestAuth
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_AUTH_SUCCESS]: (state, action) => {
    return update(state, {
      user: {
        $set: action.user
      },
      isLoading: { $set: false }
    })
  },
  [REQUEST_AUTH_START]: state => {
    return update(state, {
      isLoading: { $set: true }
    })
  },
  [REQUEST_AUTH_ERROR]: (state, action) => {
    console.warn('ERROR', action.error)
    return update(state, {
      isLoading: { $set: false },
      error: { $set: action.error }
    })
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ({
  isLoading: false,
  isDrawerOpen: false,
  user: {},
  error: {}
})

export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
