import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    const blog = { title, author, url }
    const config = { headers: { Authorization: `bearer ${user.token}`}}
    const res = await blogService.postBlog(blog, config)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(prev=>[...prev,res])
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>title:<input type='text' value={title} name='title' onChange={({target}) => setTitle(target.value)}/></div>
        <div>author:<input type='text' value={author} name='author' onChange={({target}) => setAuthor(target.value)}/></div>
        <div>url:<input type='text' value={url} name='url' onChange={({target}) => setUrl(target.value)}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm