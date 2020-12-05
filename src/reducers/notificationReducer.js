const initialState = []
let timeout

export const setNotification = (text, color, duration) =>
  async dispatch => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: initialState
      })
    }, duration)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: [text, color]
    })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    default:
      return state
  }
}

export default reducer
