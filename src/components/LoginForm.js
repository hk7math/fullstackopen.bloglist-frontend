import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, Typography, InputLabel, OutlinedInput, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    display: 'flex',
    flexDirection: 'column'
  }
}))

const LoginForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(loginUser(username, password))
  }

  return (
    <form className={classes.root} onSubmit={handleLogin}>
      <Typography variant='h4'>Log in to Application</Typography>
      <FormControl variant='outlined'>
        <InputLabel htmlFor='username'>Username</InputLabel>
        <OutlinedInput
          type='text'
          value={username}
          id='username'
          label='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </FormControl>
      <FormControl variant='outlined'>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <OutlinedInput
          type='password'
          value={password}
          name='Password'
          id='password'
          label='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </FormControl>
      <Button color='primary' variant='contained' type='submit' id='login-button'>Login</Button>
    </form>
  )
}

export default LoginForm
