import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  message: {
    marginTop: theme.spacing(1)
  }
}))

const Notification = () => {
  const classes = useStyles()
  const [text, severity] = useSelector(state => state.notification)

  return (
    <Alert className={classes.message} id='message' variant='outlined' severity={severity}>{text}</Alert>
  )
}

export default Notification
