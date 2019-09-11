import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginPage from '../LoginPage';
import * as AppContext from '../../../app/AppContext';
import { tokenService } from '../../../services';
import { act } from 'react-dom/test-utils';

describe('LoginPage', () => {
  let setIsAuthenticatedMock;

  beforeEach(() => {
    setIsAuthenticatedMock = jest.fn();
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => ({ setIsAuthenticated: setIsAuthenticatedMock }));
  });

  it('should match snapshot', () => {
    // When
    const wrapper = shallow(<LoginPage/>);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  describe('onMount', () => {
    it('should get is authenticated from token service', () => {
      // Given
      tokenService.isAuthenticated = jest.fn();

      // When
      mount(<LoginPage/>);

      // Then
      expect(tokenService.isAuthenticated).toHaveBeenCalledWith();
    });

    it('should set is authenticated to context', () => {
      // Given
      tokenService.isAuthenticated = jest.fn().mockReturnValue(true);

      // When
      mount(<LoginPage/>);

      // Then
      expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
    });

    it('should not set is authenticated to context when user is not auth', () => {
      // Given
      tokenService.isAuthenticated = jest.fn().mockReturnValue(false);

      // When
      mount(<LoginPage/>);

      // Then
      expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    });
  });
});
