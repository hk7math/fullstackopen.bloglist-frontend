import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ msg }) => {
  const [text, color] = msg
  return (
    <div id='message' style={{ color }}>
      {text}
    </div>
  )
}

Notification.propTypes = {
  msg: PropTypes.array.isRequired
}

export default Notification