import { withReducer } from '../store/withReducer';
import { apiService, tokenService } from '../services';

const SET_IS_AUTHENTICATED = 'app/SET_IS_AUTHENTICATED';

const setIsAuthenticated = isAuthenticated => dispatch => {
  if(!isAuthenticated){
    tokenService.removeTokens()
  }
  return dispatch({
    type: SET_IS_AUTHENTICATED, payload: { isAuthenticated }
  });
};

const authenticate = password => async dispatch => {
  try {
    const data = {
      email: 'some@example.org',
      name: password
    };
    const tokens = await apiService.post('login', data)
    await tokenService.saveUserTokens(tokens, data)
    dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: true }})
  } catch (error) {
    dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: false }})
    alert('wrong password')
  }
}

const loginSilently = () => async dispatch => {
  try {
    const refreshToken = tokenService.getRefreshToken();
    if(!refreshToken) return;
    const tokens = await apiService.post('login/token', { refreshToken })
    await tokenService.reauthenticate(tokens);
    await dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: true }})
  } catch (error) {
    await dispatch({ type: SET_IS_AUTHENTICATED, payload: { isAuthenticated: false }})
    await tokenService.removeTokens()
    alert('problem during login silently')
    throw error
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
