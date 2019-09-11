import React, { useReducer } from 'react';
import { shallow } from 'enzyme';
import ProjectBodyContainer from '../ProjectBodyContainer';
import ProjectBodyModule from '../ProjectBodyModule';
import { actions } from '../store';

describe('ProjectBodyContainer', () => {
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
      const wrapper = shallow(<ProjectBodyContainer/>);

      // When
      wrapper.find(ProjectBodyModule).props().fetchTasks('loginSilently')

      // Then
      expect(actions.fetchTasks).toHaveBeenCalledWith('loginSilently');
    });
  });
});
