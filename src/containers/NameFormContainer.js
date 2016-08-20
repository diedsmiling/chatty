import { actions } from 'routes/Chat/modules/chat'
import NameForm from 'components/Header/NameForm/NameForm'
import { reduxForm } from 'redux-form'
const fields = [
  'name',
  'userId'
]

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    onSubmit (data) {
      dispatch(actions.sendName(data))
    }
  }
}

function mapStateToProps (state) {
  return {
    initialValues: {
      name: state.chat.user.name,
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
)(NameForm)
