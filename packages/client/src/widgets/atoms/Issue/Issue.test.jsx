import { shallow } from 'enzyme'
import React from 'react'
import Issue from './Issue'

describe('Issue', () => {
  it('renders', () => {
    const issue = shallow(
      <Issue title="title" description="description" state="open" />
    )
    expect(issue.text()).toEqual('$1')
  })
})
