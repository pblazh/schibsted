import changeState from './stateMachine'
import { STATES, Issue } from './model'

describe('stateMachine', () => {
  it('has initial state open', () => {
    const initialIssue = Issue('title', 'description')

    expect(initialIssue.state).toBe(STATES.open)
  })

  it('changes state to pending if state is default', () => {
    const initialIssue = Issue('title', 'description')
    const changedIssue = changeState(STATES.pending, initialIssue)

    expect(changedIssue.state).toBe(STATES.pending)
  })

  it('does not mutate an issue', () => {
    const initialIssue = Issue({title: 'title', description: 'description'});
    const savedIssue = { ...initialIssue }
    changeState(STATES.pending, initialIssue)

    expect(initialIssue).toEqual(savedIssue)
  })

  it('does not change state to closed if state is default', () => {
    const initialIssue = Issue({title: 'title', description: 'description'});
    const changedIssue = changeState(STATES.closed, initialIssue)

    expect(changedIssue.state).toBe(STATES.default)
  })

  it('change state to closed if state is pending', () => {
    const initialIssue = Issue({title: 'title', description: 'description'});
    const pendingIssue = changeState(STATES.pending, initialIssue)
    const changedIssue = changeState(STATES.closed, pendingIssue)

    expect(changedIssue.state).toBe(STATES.closed)
  })

  it('does not change state  if state is closed', () => {
    const initialIssue = Issue({title: 'title', description: 'description'});
    const pendingIssue = changeState(STATES.pending, initialIssue)
    const closedIssue = changeState(STATES.closed, pendingIssue)

    const nonPendingIssue = changeState(STATES.pending, closedIssue)
    const nonOpenIssue = changeState(STATES.open, closedIssue)

    expect(nonPendingIssue.state).toBe(STATES.closed)
    expect(nonOpenIssue.state).toBe(STATES.closed)
  })
})
