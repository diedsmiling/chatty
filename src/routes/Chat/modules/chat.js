import update from 'react-addons-update'
import socketCluster from 'socketcluster-client'
import {SOCKET_OPTIONS} from '../../../configs'
import { isEqual } from 'lodash'

const socket = socketCluster.connect(SOCKET_OPTIONS)

// ------------------------------------
// Constants
// ------------------------------------
export const AUTH_REQUEST_START = 'AUTH_REQUEST_START'
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR'
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS'
export const MESSAGE_REQUEST_START = 'MESSAGE_REQUEST_START'
export const MESSAGE_REQUEST_ERROR = 'MESSAGE_REQUEST_ERROR'
export const MESSAGE_REQUEST_SUCCESS = 'MESSAGE_REQUEST_SUCCESS'
export const NAME_REQUEST_START = 'NAME_REQUEST_START'
export const NAME_REQUEST_ERROR = 'NAME_REQUEST_ERROR'
export const NAME_REQUEST_SUCCESS = 'NAME_REQUEST_SUCCESS'
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const UPDATE_USERS = 'UPDATE_USERS'
export const TOGGLE_NAME_FORM = 'TOGGLE_NAME_FORM'

// ------------------------------------
// Actions
// ------------------------------------
function startAuthRequest () {
  return {
    type: AUTH_REQUEST_START
  }
}

function resolveAuthRequest (data) {
  return {
    type: AUTH_REQUEST_SUCCESS,
    data
  }
}

function resolveNameRequest (data) {
  return {
    type: NAME_REQUEST_SUCCESS,
    data
  }
}

function rejectAuthRequest (error) {
  return {
    type: AUTH_REQUEST_ERROR,
    error
  }
}

function startMessageRequest () {
  return {
    type: MESSAGE_REQUEST_START
  }
}

function resolveMessageRequest (message) {
  return {
    type: MESSAGE_REQUEST_SUCCESS,
    message
  }
}

function rejectMessageRequest (error) {
  return {
    type: MESSAGE_REQUEST_ERROR,
    error
  }
}

function startNameRequest () {
  return {
    type: NAME_REQUEST_START
  }
}

function rejectNameRequest (error) {
  return {
    type: NAME_REQUEST_ERROR,
    error
  }
}

function updateMessages (messages) {
  return {
    type: UPDATE_MESSAGES,
    messages
  }
}

function fetchMessages (state, action) {
  return update(state, {
    messages: {$set: action.messages},
    isLoading: {$set: false}
  })
}

export function toggleDrawer () {
  return {
    type: TOGGLE_DRAWER
  }
}

export function toggleNameForm () {
  return {
    type: TOGGLE_NAME_FORM
  }
}

export function updateUsers (users) {
  return {
    type: UPDATE_USERS,
    users
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
    dispatch(startAuthRequest())
    emit('registerUser', '')
      .then(response => {
        dispatch(resolveAuthRequest(response))
      })
      .catch(error => {
        console.error(error)
        console.error('You had an error: ', error.stack)
        dispatch(rejectAuthRequest(error))
      })
  }
}

export const sendMessage = (data) => {
  return dispatch => {
    dispatch(startMessageRequest())
    emit('sendMessage', data)
      .then(response => {
        //dispatch(resolveMessageRequest(response))
      })
      .catch(error => {
        dispatch(rejectMessageRequest(error))
      })
  }
}

export const sendName = (data) => {
  return dispatch => {
    dispatch(startNameRequest())
    emit('sendName', data)
      .then(response => {
        dispatch(toggleNameForm())
        dispatch(resolveNameRequest(response))
      })
      .catch(error => {
        dispatch(rejectNameRequest(error))
      })
  }
}

export const pingServer = (id) => {
  setInterval(() => {
    socket.emit('ping', id)
  }, 1000)
}

export const watchForMessages = (messages, users) => {
  console.log('Watching ....')
  return dispatch => {
    socket.on('data', function (data) {
      if (data.messages && (!isEqual(data.messages, messages))) {
        messages = data.messages
        dispatch(updateMessages(data.messages))
      }
      if (data.users && (!isEqual(data.users, users))) {
        users = data.users
        dispatch(updateUsers(data.users))
      }
    })
  }
}

export const actions = {
  sendMessage,
  requestAuth,
  watchForMessages,
  toggleDrawer,
  toggleNameForm,
  sendName
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AUTH_REQUEST_SUCCESS]: (state, action) => {
    return update(state, {
      user: {
        $set: action.data.user
      },
      messages: {
        $set: action.data.messages
      },
      isLoading: { $set: false }
    })
  },
  [AUTH_REQUEST_START]: state => {
    return update(state, {
      isLoading: { $set: true }
    })
  },
  [AUTH_REQUEST_ERROR]: (state, action) => {
    return update(state, {
      isLoading: { $set: false },
      error: { $set: action.error }
    })
  },
  [MESSAGE_REQUEST_START]: (state) => {
    return update(state, {
      isLoading: { $set: true }
    })
  },
  [MESSAGE_REQUEST_SUCCESS]: (state, action) => {
    return update(state, {
      isLoading: { $set: false }
    })
  },
  [UPDATE_MESSAGES]: (state, action) => {
    return fetchMessages(state, action)
  },
  [MESSAGE_REQUEST_ERROR]: (state, action) => {
    return update(state, {
      isLoading: {$set: false},
      error: {$set: action.error}
    })
  },
  [TOGGLE_DRAWER]: (state) => {
    return update(state, {
      isDrawerOpen: { $apply: v => !v }
    })
  },
  [TOGGLE_NAME_FORM]: (state) => {
    return update(state, {
      isNameFormVisible: { $apply: v => !v }
    })
  },
  [UPDATE_USERS]: (state, action) => {
    return update(state, {
      users: {$set: action.users}
    })
  },
  [NAME_REQUEST_SUCCESS]: (state, action) => {
    return update(state, {
      user: {$set: action.data}
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ({
  isLoading: false,
  isDrawerOpen: false,
  isNameFormVisible: false,
  user: {},
  error: {},
  messages: [],
  users: []
})

export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
