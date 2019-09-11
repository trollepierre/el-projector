import React from 'react';
import Header from '../Header';
import { shallow } from 'enzyme';
import * as AppContext from '../../../app/AppContext';
import { Button } from '../../../components';
import { tokenService } from '../../../services';

describe('Header', () => {
  let setIsAuthenticatedMock;

  beforeEach(() => {
    setIsAuthenticatedMock = jest.fn();
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => ({ setIsAuthenticated: setIsAuthenticatedMock }));
  });

  it('should match snapshot', () => {
    // When
    const wrapper = shallow(<Header/>);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  describe('events', () => {
    describe('onClick on logout button', () => {
      it('should set is authenticated to false', () => {
        // Given
        const wrapper = shallow(<Header/>);

        // When
        wrapper.find(Button).simulate('click');

        // Then
        expect(setIsAuthenticatedMock).toHaveBeenCalledWith(false);
      });

      it('should remove tokens', () => {
        // Given
        tokenService.removeTokens = jest.fn()
        const wrapper = shallow(<Header/>);

        // When
        wrapper.find(Button).simulate('click');

        // Then
        expect(tokenService.removeTokens).toHaveBeenCalledWith();
      });
    });
  });
});
