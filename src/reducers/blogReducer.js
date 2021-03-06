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
    dispatch(setNotification(`a new blog ${res.title} by ${res.author} added`, 'success', 3000))
    dispatch({
      type: 'ADD_BLOG',
      data: res
    })
  }

export const likeBlog = (blog) =>
  async dispatch => {
    await blogService.likeBlog(blog)
    dispatch(setNotification(`blog ${blog.title} by ${blog.author} is liked`, 'success', 3000))
    dispatch({
      type: 'LIKE_BLOG',
      data: blog.id
    })
  }

export const removeBlog = (blog, config) =>
  async dispatch => {
    await blogService.deleteBlog(blog, config)
    dispatch(setNotification(`blog ${blog.title} by ${blog.author} is removed`, 'error', 3000))
    dispatch({
      type: 'DEL_BLOG',
      data: blog.id
    })
  }

export const commentBlog = (blog, comment) =>
  async dispatch => {
    const res = await blogService.commentBlog(blog, comment)
    dispatch(setNotification(`blog ${blog.title} has a new comment`, 'success', 3000))
    dispatch({
      type: 'COMMENT_BLOG',
      data: res
    })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data

    case 'ADD_BLOG':
      return [...state, action.data]

    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id !== action.data
          ? blog
          : { ...blog, likes: blog.likes + 1 }
      ).sort((blog1, blog2) => blog2.likes - blog1.likes)

    case 'DEL_BLOG':
      return state.filter(blog =>
        blog.id !== action.data
      )

    case 'COMMENT_BLOG':
      return state.map(blog =>
        blog.id !== action.data.id
          ? blog
          : action.data
      )

    default:
      return state
  }
}

export default reducer
