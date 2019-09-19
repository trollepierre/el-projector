import React from 'react'
import { shallow } from 'enzyme'
import Input from '.'

describe('Input', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Input
        type="text"
        id="id"
        name="name"
        label="label"
        helper="helper"
        value="value"
      />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a input', () => {
    expect(wrapper.find('input')).toHaveLength(1)
  })

  it('should render a label', () => {
    expect(wrapper.find('label').text()).toEqual('label')
  })

  it('should render an helper span', () => {
    wrapper = shallow(
      <Input type="text" name="name" value="value" helper="helper" />
    )
    expect(wrapper.find('span').text()).toEqual('helper')
  })

  it('should render an error span', () => {
    wrapper = shallow(
      <Input type="text" name="name" value="value" error="error" />
    )
    expect(wrapper.find('span').text()).toEqual('error')
  })

  it('should render an indicator', () => {
    wrapper = shallow(
      <Input type="text" name="name" value="value" indicator="indicator" />
    )
    expect(wrapper.find('span').text()).toEqual('indicator')
  })
})
