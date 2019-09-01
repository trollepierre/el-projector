import { withReducer } from '../store/withReducer';

const SET_IS_AUTHENTICATED = 'app/SET_IS_AUTHENTICATED';

const setIsAuthenticated = isAuthenticated => dispatch =>
  dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated }
});

export const actions = {
  setIsAuthenticated,
};

export const initialState = {
  isAuthenticated: false,
};

export const actionHandlers = {
  [SET_IS_AUTHENTICATED]: (state, action) => {
    const { isAuthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated,
    };
  },
};

export const reducer = withReducer(initialState, actionHandlers);
