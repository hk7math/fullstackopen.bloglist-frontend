import React, { useState } from 'react'

const Togglable = ({ children, buttonLabel}) => {
  const [isHidden, setIsHidden] = useState(true)
  const toggleHidden = () => setIsHidden(prev => !prev)
  return (
    <div>
      { 
        isHidden 
        ? <button onClick={toggleHidden}>{buttonLabel}</button>
        : <div>
            {children}
            <button onClick={toggleHidden}>cancel</button>
          </div>
      }
    </div>
  )
}

export default Togglable