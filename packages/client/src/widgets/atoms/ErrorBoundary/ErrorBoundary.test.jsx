/* eslint-disable react/prop-types */
import { mount, shallow } from 'enzyme'
import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'

describe('ErrorBoundary', () => {
  it('renders passed child', () => {
    const errorBoundary = shallow(<ErrorBoundary>passed child</ErrorBoundary>)

    expect(errorBoundary.text()).toEqual('passed child')
  })

  it('renders fallback component', () => {
    const fallback = () => <div>fallback component</div>

    const errorBoundary = mount(
      <ErrorBoundary FallbackComponent={fallback}>passed child</ErrorBoundary>
    )
    errorBoundary.setState({
      componentStack: 'error stack',
      error: new Error('error message')
    })

    expect(errorBoundary.text()).toEqual('fallback component')
  })

  it('pass error message', () => {
    const fallback = ({ error, componentStack }) => (
      <div>
        {error.message}
        {componentStack}
      </div>
    )

    const errorBoundary = mount(
      <ErrorBoundary FallbackComponent={fallback}>passed child</ErrorBoundary>
    )
    errorBoundary.setState({
      componentStack: 'error stack',
      error: new Error('error message')
    })

    expect(errorBoundary.text()).toEqual('error message')
  })
})
