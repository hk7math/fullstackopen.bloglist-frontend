import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

export const setBlogs = () =>
  async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }

export const addBlog = (blog, config) =>
  async dispatch => {
    const res = await blogService.postBlog(blog, config)
    dispatch(setNotification(`a new blog ${res.title} by ${res.author} added`, 'green', 3000))
    dispatch({
      type: 'ADD_BLOG',
      data: res
    })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data

    case 'ADD_BLOG':
      return [...state, action.data]

    default:
      return state
  }
}

export default reducer
