import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = ({ children, buttonLabel }) => {
  const [isHidden, setIsHidden] = useState(true)
  const toggleHidden = () => setIsHidden(prev => !prev)
  return (
    <div>
      {
        isHidden
          ? <Button variant='contained' id='blog-button' onClick={toggleHidden}>{buttonLabel}</Button>
          : (
            <div>
              <Button color='secondary' id='blog-button' onClick={toggleHidden}>Cancel</Button>
              {children}
            </div>
            )
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
