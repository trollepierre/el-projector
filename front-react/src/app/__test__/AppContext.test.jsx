import React from 'react';
import { shallow } from 'enzyme';
import AppContext, { AppProvider, getProps } from '../AppContext';
import { actions } from '../store';

describe('AppContext', () => {
  describe('default', () => {
    let realCreateContext;
    let mockCreateContext;

    beforeEach(() => {
      realCreateContext = React.createContext;
      mockCreateContext = realCreateContext;
    });

    afterEach(() => {
      React.createContext = realCreateContext;
    });

    it('should get createContext', () => {
      expect(AppContext).toEqual(mockCreateContext());
    });
  });

  describe('AppProvider', () => {
    it('should get createContext api and inject it in the header context', () => {
      // When
      const wrapper = shallow(
        <AppProvider>I am the children</AppProvider>
      );

      // Then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('getProps', () => {
    const dispatch = jest.fn();

    it('should plug setIsAuthenticated', () => {
      // Given
      const props = getProps({}, dispatch);
      actions.setIsAuthenticated = jest.fn(() => () => {});

      // When
      props.setIsAuthenticated('isAuthenticated');

      // Then
      expect(actions.setIsAuthenticated).toHaveBeenCalledWith(
        'isAuthenticated',
      );
    });

    it('should plug authenticate', () => {
      // Given
      const props = getProps({}, dispatch);
      actions.authenticate = jest.fn(() => () => {});

      // When
      props.authenticate('password');

      // Then
      expect(actions.authenticate).toHaveBeenCalledWith(
        'password',
      );
    });

    it('should plug loginSilently', () => {
      // Give,
      const props = getProps({}, dispatch);
      actions.loginSilently = jest.fn(() => () => {});

      // When
      props.loginSilently();

      // Then
      expect(actions.loginSilently).toHaveBeenCalledWith();
    });
  });
});

