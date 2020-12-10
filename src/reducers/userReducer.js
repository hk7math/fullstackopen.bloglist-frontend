import loginService from '../services/login'
import { setNotification } from './notificationReducer'
const initialState = null

export const loginUser = (username, password) =>
  async dispatch => {
    dispatch(setNotification('Loading...', 'info', 3000))
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setNotification(`Successfully logged in as ${user.name}`, 'success', 3000))
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (e) {
      dispatch(setNotification(e.message, 'error', 3000))
    }
  }

export const setUser = (user) =>
  async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data

    default:
      return state
  }
}

export default reducer
