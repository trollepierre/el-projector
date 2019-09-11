import React from 'react';
import { shallow } from 'enzyme';
import ProjectBodyModule from './ProjectBodyModule';
import { dummyTask } from '../../../utils/dummy-task';
import * as AppContext from '../../../app/AppContext';

describe('ProjectBodyModule', () => {

  beforeEach(() => {
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => ({ loginSilently: jest.fn() }));

  });
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
        isLoading: false,
        error: { message: 'error' },
        data: [dummyTask(), dummyTask()]
      };

      // When
      const wrapper = shallow(<ProjectBodyModule {...props} />);

      // Then
      expect(wrapper).toMatchSnapshot();
    });
  });
});
