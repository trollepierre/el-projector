import React from 'react';
import { shallow } from 'enzyme'
import ProjectBodyModule  from './ProjectBodyModule';

describe('ProjectBodyModule', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<ProjectBodyModule/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
