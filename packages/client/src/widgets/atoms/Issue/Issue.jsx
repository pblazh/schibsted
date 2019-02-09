import PropTypes from 'prop-types'
import React from 'react'

import './Issue.scss'

const IssueButton = ({ type, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className={`IssueButton IssueButton--${type}`}
    >
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

const Issue = ({
  issue: { title, state, id, description },
  remove,
  pending,
  closed
}) => (
  <section className={`Issue Issue--${state}`}>
    <header className="Issue__header">
      <section className="Issue__title">
        <section className="Issue__state">{state}</section>
        {title}
      </section>
      <section className="Issue__actions">
        {/(pending|open)/.test(state) && (
          <IssueButton
            type={state}
            onClick={() => (state === 'open' ? pending(id) : closed(id))}
          />
        )}
        <IssueButton type="delete" onClick={() => remove(id)} />
      </section>
    </header>
    <section className="Issue__description">{description}</section>
  </section>
)

Issue.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['open', 'pending', 'closed']).isRequired
  }).isRequired,
  remove: PropTypes.func.isRequired,
  closed: PropTypes.func.isRequired,
  pending: PropTypes.func.isRequired
}

export default Issue
