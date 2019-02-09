import PropTypes from 'prop-types'
import React, { Component } from 'react'

const ErrorBoundaryFallbackComponent = ({ error, componentStack = '' }) => (
  <span>
    ERROR:{error.message}, STACK:{componentStack}{' '}
  </span>
)

ErrorBoundaryFallbackComponent.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  componentStack: PropTypes.node
}

ErrorBoundaryFallbackComponent.defaultProps = {
  componentStack: ''
}

export class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func.isRequired,
    FallbackComponent: PropTypes.node
  }

  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent
  }

  state = {
    error: null,
    info: null
  }

  componentDidCatch(error, info) {
    const { onError } = this.props

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '')
      } catch (ignoredError) {} // eslint-disable-line
    }

    this.setState({ error, info })
  }

  render() {
    const { children, FallbackComponent } = this.props
    const { error, info } = this.state

    if (error) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ''}
          error={error}
        />
      )
    }

    return children
  }
}

export const withErrorBoundary = (Wrapped, Fallback, onError) => props => (
  <ErrorBoundary FallbackComponent={Fallback} onError={onError}>
    <Wrapped {...props} />
  </ErrorBoundary>
)

export default ErrorBoundary
