import React, { useState } from 'react'
import blogService from '../services/blogs'

const Viewable = ({ blog }) => {
  const {title, url, author, user, likes} = blog
  const [isHidden, setIsHidden] = useState(true)
  const toggleHidden = () => setIsHidden(prev => !prev)
  return (
    <div style={{border: '1px solid', padding: '2px'}}>
      {`${title} ${author}`} <button onClick={toggleHidden}>{isHidden ? 'view' : 'hide'}</button>
      { 
        isHidden || 
          <div> 
            {url} 
            <br/> 
            {`likes ${likes} `}
            <button onClick={() => blogService.likeBlog(blog)}>like</button>
            <br/> 
            {user.name}
          </div> 
      }
    </div>
  )
}

export default Viewable