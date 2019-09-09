import React, { useReducer, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState, actions } from './store';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const getProps = (state, dispatch) => ({
  ...state,
  setIsAuthenticated: isAuthenticated => actions.setIsAuthenticated(isAuthenticated)(dispatch),
  authenticate: value => actions.authenticate(value)(dispatch),
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...getProps(state, dispatch) }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
