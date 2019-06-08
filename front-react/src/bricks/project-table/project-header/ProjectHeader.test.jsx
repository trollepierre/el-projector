import React from 'react';
import { shallow } from 'enzyme'
import ProjectHeader from './ProjectHeader';

describe('ProjectHeader', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<ProjectHeader/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
