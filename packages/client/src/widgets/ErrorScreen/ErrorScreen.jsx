import PropTypes from 'prop-types'
import React from 'react'
import Message from '../atoms/Message'

const ErrorScreen = ({ error }) => <Message> {error.message} </Message>

ErrorScreen.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired
}

export default ErrorScreen
