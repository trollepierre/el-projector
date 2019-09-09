import { withReducer } from '../store/withReducer';
import { api, token, logger } from '../services';

const SET_IS_AUTHENTICATED = 'app/SET_IS_AUTHENTICATED';

const setIsAuthenticated = isAuthenticated => dispatch =>
  dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated }
});

const authenticate = value => async dispatch => {
  try {
    const data = {
      secret: value,
      email: 'some@example.org',
      name: value
    };
    const tokens = await api.post('login', data)
    await token.saveUserTokens(tokens, data)
    dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: true }})
  } catch (error) {
    dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: false }})
    logger.error(error.message);
    alert('wrong password')
  }
}

const loginSilently = () => async dispatch => {
  try {
    const refreshToken = await token.getRefreshToken();
    const tokens = await api.post('login/token', { refreshToken })
    await token.reauthenticate(tokens);
    dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: true }})
  } catch (error) {
    dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: false }})
    logger.error(error.message);
    alert('problem during login silently')
  }
}

export const actions = {
  setIsAuthenticated,
  authenticate,
  loginSilently,
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
