import apiService from '../../../services/api/api-service';
import { withReducer } from '../../../store/withReducer';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

const fetchTasks = loginSilently => async dispatch => {
  dispatch({ type: FETCH_TASKS_STARTED });
  try {
    const data = await apiService.get('tasks');

    dispatch({
      type: FETCH_TASKS_SUCCEEDED,
      payload: data,
    });

  } catch (error) {
    if (error.message === 'Request failed with status code 401') {
      try {
        await loginSilently();
        return fetchTasks(loginSilently)(dispatch);
      } catch (newError) {
        dispatch({
          type: FETCH_TASKS_FAILED,
          error: newError,
        });
        return;
      }
    }
    dispatch({
      type: FETCH_TASKS_FAILED,
      error,
    });
  }
};

export const actions = {
  fetchTasks,
};

export const initialState = {
  tasks: {
    data: [],
    isLoading: false,
    error: undefined,
  },
};

export const actionHandlers = {
  [FETCH_TASKS_STARTED]: state => {
    return {
      ...state,
      tasks: {
        ...state.tasks,
        error: undefined,
        isLoading: true,
      },
    };
  },
  [FETCH_TASKS_SUCCEEDED]: (state, action) => {
    return {
      ...state,
      tasks: {
        data: action.payload,
        error: undefined,
        isLoading: false,
      },
    };
  },
  [FETCH_TASKS_FAILED]: (state, action) => {
    return {
      ...state,
      tasks: {
        ...state.tasks,
        error: action.error,
        isLoading: false,
      },
    };
  },
};

export const reducer = withReducer(initialState, actionHandlers);

export const tasksSelector = state => state.tasks;

