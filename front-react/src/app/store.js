import { withReducer } from '../store/withReducer';
import { api, token, logger } from '../services';

const SET_IS_AUTHENTICATED = 'app/SET_IS_AUTHENTICATED';

const setIsAuthenticated = isAuthenticated => dispatch => {
  console.log('alors');

  console.log({ isAuthenticated});

  if(!isAuthenticated){
    token.removeTokens()
  }
  return dispatch({
    type: SET_IS_AUTHENTICATED, payload: { isAuthenticated }
  });
};

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
    console.log('1');
    const tokens = await api.post('login/token', { refreshToken })
    console.log('2');
    await token.reauthenticate(tokens);
    console.log('3');
    await dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: true }})
    console.log('4');
  } catch (error) {
    console.log('5');
    await dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: false }})
    console.log('6');
    logger.error(error.message);
    console.log('7');
    await token.removeTokens()
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
