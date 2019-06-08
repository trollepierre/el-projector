import React from 'react';
import { shallow } from 'enzyme'
import { ProjectBody } from './ProjectBody';
import ProjectBody  from './ProjectBody';

// TODO define how to test this brick ProjectBody

describe('ProjectBody', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<ProjectBody/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
