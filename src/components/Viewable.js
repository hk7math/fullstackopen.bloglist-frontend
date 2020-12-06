import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Viewable = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')

  const blog = blogs.find(blog => blog.id === match.params.id)
  if (!blog) return <Redirect to='/blogs' />
  const { title, url, author, user, likes } = blog

  const clickLike = () => {
    dispatch(likeBlog(blog))
  }

  const clickRemove = async () => {
    const res = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (res) {
      const config = { headers: { Authorization: `bearer ${currentUser.token}` } }
      dispatch(removeBlog(blog, config))
    }
  }

  return (
    <>
      <h2>{title} {author}</h2>
      <a href={url}>{url}</a>
      <br />
      {`likes ${likes} `}
      <button data-testid='likeButton' onClick={clickLike}>like</button>
      <br />
      added by {user.name}
      <br />
      {currentUser.username === user.username && <button onClick={clickRemove}>remove</button>}
    </>
  )
}

export default Viewable
