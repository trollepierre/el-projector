import React from 'react';
import { shallow } from 'enzyme'
import TaskRaw from './TaskRaw';

describe('TaskRaw', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<TaskRaw/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
