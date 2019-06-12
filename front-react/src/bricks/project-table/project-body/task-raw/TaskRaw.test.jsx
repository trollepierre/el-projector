import React from 'react';
import { shallow } from 'enzyme'
import TaskRaw from './TaskRaw';
import { dummyTask } from '../../../../utils/dummy-task';

describe('TaskRaw', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // Given
      const props = {
        task: dummyTask()
      }

      // When
      const wrapper = shallow(<TaskRaw {...props}/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
