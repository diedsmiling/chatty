import React from 'react'
import classes from './NameForm.scss'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export const NameForm = (props) => {
  return (
    <form style={{background: 'white'}} onSubmit={props.handleSubmit}>
      <TextField
        {...props.fields.name}
        style={{
          width: 150,
          margin: '0 10px'
        }}
      />

      <RaisedButton
        type='submit'
        disabled={props.fields.name.value === ''}
        label='Send'
        primary />

    </form>

  )
}

NameForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func
}

export default NameForm
