import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ user, setBlogs, setToReload }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    dispatch(setNotification('Loading...', 'grey', 3000))
    const blog = { title, author, url }
    const config = { headers: { Authorization: `bearer ${user.token}` } }
    dispatch(addBlog(blog, config))
    setTitle('')
    setAuthor('')
    setUrl('')
    setToReload(true)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>title:<input id='blog-title' type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author:<input id='blog-author' type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url:<input id='blog-url' type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)} /></div>
        <button id='blog-create' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }),
  setBlogs: PropTypes.func,
  popMsg: PropTypes.func,
  setToReload: PropTypes.func
}

export default BlogForm
