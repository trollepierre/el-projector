import React from 'react';
import { mount, shallow } from 'enzyme';
import ProjectBodyContainer from '../ProjectBodyContainer';
import { actions } from '../store';
import * as AppContext from '../../../../app/AppContext';

describe('ProjectBodyContainer', () => {
  let loginSilentlyMock;

  beforeEach(() => {
    loginSilentlyMock = jest.fn();
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => ({ loginSilently: loginSilentlyMock }));
  });

  it('should match snapshot', () => {
    // When
    const wrapper = shallow(<ProjectBodyContainer/>);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  describe('events', () => {
    it('should call fetch tasks', () => {
      // Given
      actions.fetchTasks = jest.fn(() => () => {})
      console.error = jest.fn();

      // When
      mount(<ProjectBodyContainer/>);

      // Then
      expect(actions.fetchTasks).toHaveBeenCalledWith(loginSilentlyMock);
    });
  });
});
