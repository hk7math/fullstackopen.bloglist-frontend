import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ user, setBlogs, popMsg, setToReload }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    popMsg('Loading...', 'grey', 3000)
    const blog = { title, author, url }
    const config = { headers: { Authorization: `bearer ${user.token}` } }
    const res = await blogService.postBlog(blog, config)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(prev => [...prev, res])
    setToReload(true)
    popMsg(`a new blog ${res.title} by ${res.author} added`,'green', 3000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>title:<input id='blog-title' type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author:<input id='blog-author' type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url:<input id='blog-url' type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)}/></div>
        <button id='blog-create' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  setBlogs: PropTypes.func,
  popMsg: PropTypes.func,
  setToReload: PropTypes.func,
}

export default BlogForm