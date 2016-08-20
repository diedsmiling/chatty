import React from 'react'
import classes from './SendMessagePanel.scss'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export const SendMessagePanel = (props) => {
  return (
    <div className={`container ${classes.sendMessagePanel}`}>
      <div className={classes.messageBox}>
        <form onSubmit={props.handleSubmit}>
          <div className='col-xs-8 col-lg-10'>
            <TextField
              {...props.fields.message} style={{width: '100%'}}
              hintText='Enter your message, super hero!'
              floatingLabelText='Your message'
            />
          </div>
          <div className={`col-xs-4 col-lg-2 ${classes.margined}`}>
            <RaisedButton
              type='submit'
              disabled={props.fields.message.value === ''}
              label='Send'
              primary />
          </div>
        </form>
      </div>
    </div>
  )
}

SendMessagePanel.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func
}

export default SendMessagePanel
