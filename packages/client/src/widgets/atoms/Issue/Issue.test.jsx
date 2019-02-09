import { mount } from 'enzyme'
import React from 'react'
import Issue from './Issue'

describe('Issue', () => {
  it('renders', () => {
    const issue = mount(
      <Issue
        issue={{
          id: 1,
          title: 'title text',
          description: 'description text',
          state: 'open'
        }}
        closed={() => {}}
        pending={() => {}}
        remove={() => {}}
      />
    )
    expect(issue.text()).toContain('title text')
    expect(issue.text()).toContain('description text')
  })
})
