import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel }) => {
  const [isHidden, setIsHidden] = useState(true)
  const toggleHidden = () => setIsHidden(prev => !prev)
  return (
    <div>
      {
        isHidden
          ? <button id='blog-button' onClick={toggleHidden}>{buttonLabel}</button>
          : <div>
            {children}
            <button id='blog-button' onClick={toggleHidden}>cancel</button>
          </div>
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable