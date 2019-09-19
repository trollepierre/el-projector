import React from 'react';
import { shallow } from 'enzyme';

import AppContainer, { AppModule } from '../AppContainer';
import * as AppContext from '../AppContext';

describe('AppContainer', () => {
  describe('AppModule', () => {
    it('should match snapshot when authenticated', () => {
      // Given
      jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => ({ isAuthenticated: true }));

      // When
      const wrapper = shallow(<AppModule/>);

      // Then
      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot when not authenticated', () => {
      // Given
      jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => ({ isAuthenticated: false }));

      // When
      const wrapper = shallow(<AppModule/>);

      // Then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('AppContainer', () => {
    it('should match snapshot', () => {
      // When
      const wrapper = shallow(<AppContainer/>);

      // Then
      expect(wrapper).toMatchSnapshot();
    });
  });
});
