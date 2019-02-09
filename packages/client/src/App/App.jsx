import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { issues } from '../store/modules'
import IssuesTracker from './IssuesTracker'

import './App.scss'

class App extends Component {
  static propTypes = {
    fetchIssues: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchIssues } = this.props
    fetchIssues()
  }

  render() {
    return (
      <div className="App">
        <IssuesTracker />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchIssues: () => dispatch(issues.actions.fetch())
})

export default connect(null, mapDispatchToProps)(App)
