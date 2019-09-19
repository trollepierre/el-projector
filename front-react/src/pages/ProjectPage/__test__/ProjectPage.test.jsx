import React from 'react'
import { shallow } from 'enzyme'
import { ProjectPage } from '../../index'

describe('ProjectPage', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallow(<ProjectPage/>)

    // Then
    expect(wrapper).toMatchSnapshot()
  })
})
