import loginService from '../services/login'
import { setNotification } from './notificationReducer'
const initialState = null

export const loginUser = (username, password) =>
  async dispatch => {
    dispatch(setNotification('Loading...', 'grey', 3000))
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setNotification(`Successfully logged in as ${user.name}`, 'green', 3000))
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (e) {
      dispatch(setNotification(e.message, 'red', 3000))
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
