import React from 'react';
import { shallow } from 'enzyme'
import ProjectTable from './ProjectTable';

describe('ProjectTable', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<ProjectTable/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
