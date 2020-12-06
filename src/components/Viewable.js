import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'

const Viewable = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [comment, setComment] = useState('')
  const match = useRouteMatch('/blogs/:id')

  const blog = blogs.find(blog => blog.id === match.params.id)
  if (!blog) return <Redirect to='/blogs' />
  const { title, url, author, user, likes, comments } = blog

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

  const clickComment = async () => {
    dispatch(commentBlog(blog, comment))
    setComment('')
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

      <h3>comments</h3>
      <input name='comment' value={comment} onChange={({ target }) => setComment(target.value)} />
      <button onClick={clickComment}>add comment</button>
      {!!comments.length && (
        <ul>
          {comments.map(comment => <li key={comment.date}>{comment.body}</li>)}
        </ul>
      )}
    </>
  )
}

export default Viewable
