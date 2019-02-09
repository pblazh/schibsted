import PropTypes from 'prop-types'
import React from 'react'

import './Message.scss'

const Message = ({ children }) => <div className="Message">{children}</div>
Message.propTypes = {
  children: PropTypes.node.isRequired
}
export default Message
