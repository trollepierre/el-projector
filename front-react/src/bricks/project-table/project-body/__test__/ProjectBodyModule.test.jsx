import React from 'react';
import { shallow } from 'enzyme';
import ProjectBodyModule from '../ProjectBodyModule';
import { dummyTask } from '../../../../utils/dummy-task';

describe('ProjectBodyModule', () => {
  describe('template', () => {
    it('should match default snapshot', () => {
      // When
      const wrapper = shallow(<ProjectBodyModule fetchTasks={jest.fn()}/>);

      // Then
      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with props', () => {
      // Given
      const props = {
        fetchTasks: jest.fn(),
        tasks: {
          isLoading: false,
          error: { message: 'error' },
          data: [dummyTask(), dummyTask()]
        }
      };

      // When
      const wrapper = shallow(<ProjectBodyModule {...props} />);

      // Then
      expect(wrapper).toMatchSnapshot();
    });
  });
});
