import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withErrorBoundary } from '../atoms/ErrorBoundary'
import Message from '../atoms/Message'
import ErrorScreen from '../ErrorScreen'
import { IssuesList } from './components'

import './IssuesTracker.scss'

const isError = data => data && data.error

class IssuesTracker extends PureComponent {
  static propTypes = {
    issues: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({ message: PropTypes.string })
    ]).isRequired,
    fetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetch } = this.props
    fetch()
  }

  render() {
    const { issues } = this.props

    if (isError(issues)) {
      return <Message>{issues.message}</Message>
    }

    if (!issues) {
      return <Message>Loading...</Message>
    }

    if (!issues.length) {
      return <Message>There are no issues!</Message>
    }

    return (
      <div className="IssuesTracker">
        <IssuesList issues={issues} />
      </div>
    )
  }
}

export default withErrorBoundary(IssuesTracker, ErrorScreen)
