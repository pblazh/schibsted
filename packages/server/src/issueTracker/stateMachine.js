import { STATES } from './model'
// state machine
export default (state, issue) => {
  if (
    (issue && state === STATES.pending && issue.state === STATES.open) ||
    (issue && state === STATES.closed && issue.state === STATES.pending)
  ) {
    return { ...issue, state }
  }
  return issue
}
