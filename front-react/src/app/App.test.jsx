import React from 'react';
import { shallow } from 'enzyme'
import App from './App';

describe('App', () => {
  describe('template', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<App/>)

      // Then
      expect(wrapper).toMatchSnapshot()
    });
  });
});
