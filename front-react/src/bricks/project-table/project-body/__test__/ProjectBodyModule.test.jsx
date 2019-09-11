import React from 'react';
import { mount, shallow } from 'enzyme';
import ProjectBodyModule from '../ProjectBodyModule';
import { dummyTask } from '../../../../utils/dummy-task';
import * as AppContext from '../../../../app/AppContext';

describe('ProjectBodyModule', () => {
  let loginSilentlyMock;

  beforeEach(() => {
    loginSilentlyMock = jest.fn();
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => ({ loginSilently: loginSilentlyMock }));
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

  describe('onMount', () => {
    it('should fetch task', () => {
      // Given
      const fetchTasks = jest.fn()
      console.error = jest.fn();

      // When
      mount(<ProjectBodyModule fetchTasks={fetchTasks}/>)

      // Then
      expect(fetchTasks).toHaveBeenCalledWith(loginSilentlyMock, false);
    });
  });
});
