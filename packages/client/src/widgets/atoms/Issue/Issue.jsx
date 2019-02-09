import PropTypes from 'prop-types'
import React from 'react'

import './Issue.scss'

const IssueButton = ({type}) => {
  return (
    <button type="button" className={`IssueButton IssueButton--${type}`}>
      {
        {
          open: 'assign',
          pending: 'close',
          delete: '🗑'
        }[type]
      }
    </button>
  )
}

IssueButton.propTypes = {
  type: PropTypes.oneOf(['open', 'pending', 'delete']).isRequired
}

const Issue = ({ title, description, state }) => (
  <section className={`Issue Issue--${state}`}>
    <header className="Issue__header">
      <section className="Issue__title">
        <section className="Issue__state">{state}</section>
        {title}
      </section>
      <section className="Issue__actions">
        {/(pending|open)/.test(state) && <IssueButton type={state} />}
        <IssueButton type="delete" />
      </section>
    </header>
    <section className="Issue__description">{description}</section>
  </section>
)

Issue.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  state: PropTypes.oneOf(['open', 'pending', 'closed']).isRequired
}

export default Issue
