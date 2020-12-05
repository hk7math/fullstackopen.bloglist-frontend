import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Viewable = ({ blog, currentUser }) => {
  const dispatch = useDispatch()
  const { title, url, author, user, likes } = blog
  const [isHidden, setIsHidden] = useState(true)
  const toggleHidden = () => setIsHidden(prev => !prev)

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
    <div style={{ border: '1px solid', padding: '2px' }} className='blog'>
      {`${title} ${author}`} <button onClick={toggleHidden}>{isHidden ? 'view' : 'hide'}</button>
      {
        isHidden ||
          <div>
            <a href={url}>{url}</a>
            <br />
            {`likes ${likes} `}
            <button data-testid='likeButton' onClick={clickLike}>like</button>
            <br />
            {user.name}
            <br />
            {currentUser.username === user.username && <button onClick={clickRemove}>remove</button>}
          </div>
      }
    </div>
  )
}

Viewable.propTypes = {
  blog: PropTypes.exact({
    id: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  }),
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }),
  popMsg: PropTypes.func

}

export default Viewable
