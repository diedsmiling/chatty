import { actions } from '../modules/chat'
import SendMessagePanel from '../components/SendMessagePanel/SendMessagePanel'
import { reduxForm } from 'redux-form'
const fields = [
  'message',
  'userId'
]

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    onSubmit (data) {
      dispatch(actions.sendMessage(data))
    }
  }
}

function mapStateToProps (state) {
  return {
    initialValues: {
      message: '',
      userId: state.chat.user.id
    }
  }
}

export default reduxForm(
  {
    form: 'SendMessageForm',
    fields
  },
  mapStateToProps,
  mapDispatchToProps
)(SendMessagePanel)
