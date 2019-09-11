import React from 'react';
import LoginForm from '../LoginForm';
import { shallow } from 'enzyme';
import * as AppContext from '../../../app/AppContext';
import { Button } from '../../../components';

describe('LoginForm', () => {
  let authenticateMock;

  beforeEach(() => {
    authenticateMock = jest.fn();
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => ({ authenticate: authenticateMock }));
  });

  it('should match snapshot', () => {
    // When
    const wrapper = shallow(<LoginForm/>);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

  describe('events', () => {
    describe('onClick on logout button', () => {
      beforeEach(() => {
        jest
          .spyOn(React, 'createRef')
          .mockImplementation(() => ({ current: {value: 'value'} }));
      })

      it('should authenticate with value', () => {
        // Given
        const wrapper = shallow(<LoginForm/>);
        const event = { preventDefault: jest.fn()}

        // When
        wrapper.find(Button).simulate('click', event);

        // Then
        expect(authenticateMock).toHaveBeenCalledWith('value');
      });

      it('should prevent event default', () => {
        // Given
        const wrapper = shallow(<LoginForm/>);
        const event = { preventDefault: jest.fn()}

        // When
        wrapper.find(Button).simulate('click', event);

        // Then
        expect(event.preventDefault).toHaveBeenCalledWith();
      });
    });

    describe('onSubmit of form', () => {
      beforeEach(() => {
        jest
          .spyOn(React, 'createRef')
          .mockImplementation(() => ({ current: {value: 'value'} }));
      })

      it('should authenticate with value', () => {
        // Given
        const wrapper = shallow(<LoginForm/>);
        const event = { preventDefault: jest.fn()}

        // When
        wrapper.find('.login-form').simulate('submit', event);

        // Then
        expect(authenticateMock).toHaveBeenCalledWith('value');
      });

      it('should prevent event default', () => {
        // Given
        const wrapper = shallow(<LoginForm/>);
        const event = { preventDefault: jest.fn()}

        // When
        wrapper.find('.login-form').simulate('submit', event);

        // Then
        expect(event.preventDefault).toHaveBeenCalledWith();
      });
    });

  });
});
