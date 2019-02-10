import { STATES, Issue } from './model'

describe('Model', () => {
  it('creates Issue with a default state', () => {
    const initialIssue = Issue({title: 'title', description: 'description'});

    expect(initialIssue.id).toBe(null)
    expect(initialIssue.title).toBe('title')
    expect(initialIssue.description).toBe('description')
    expect(initialIssue.state).toBe(STATES.default)
  })
})
