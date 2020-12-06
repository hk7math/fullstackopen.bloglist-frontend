import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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

export default BlogForm
