import React from 'react';
import { shallow } from 'enzyme'
import ProjectForm from './ProjectForm';

describe('ProjectForm', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<ProjectForm/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
