import PropTypes from 'prop-types'
import React from 'react'
import Issue from '../../../atoms/Issue'

import './IssuesList.scss'

const IssuesList = ({ issues }) => (
  <div className="IssuesList">
    {issues.map(issue => <Issue key={issue.id} {...issue} />)}
  </div>
)

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired
}

export default IssuesList
