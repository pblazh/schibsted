import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withErrorBoundary } from '../atoms/ErrorBoundary'
import Message from '../atoms/Message'
import AppendButton from '../atoms/AppendButton'
import ErrorScreen from '../ErrorScreen'
import { IssuesList } from './components'

import './IssuesTracker.scss'

const isError = data => data && data.error

class IssuesTracker extends PureComponent {
  static propTypes = {
    issues: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({ message: PropTypes.string })
    ]),
    fetch: PropTypes.func.isRequired,
    append: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    closed: PropTypes.func.isRequired,
    pending: PropTypes.func.isRequired
  }

  static defaultProps = {
    issues: null,
  }

  componentDidMount() {
    const { fetch } = this.props
    fetch()
  }

  onAppend = () => {
    const { append } = this.props
    append({
      title: 'New Issue',
      description: 'New Issue description'
    })
  }

  onRemove = id => {
    const { remove } = this.props
    remove(id)
  }

  onPending = id => {
    const { pending } = this.props
    pending(id)
  }

  onClosed = id => {
    const { closed } = this.props
    closed(id)
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
        <AppendButton type="button" onClick={this.onAppend} />
        <IssuesList
          issues={issues}
          closed={this.onClosed}
          pending={this.onPending}
          remove={this.onRemove}
        />
      </div>
    )
  }
}

export default withErrorBoundary(IssuesTracker, ErrorScreen)
