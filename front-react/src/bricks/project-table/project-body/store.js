import apiService from '../../../services/api/api-service'
import { withReducer } from '../../../store/withReducer';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

// this.sortedTasks = apiService.get('tasks').then(tasks => {
//   console.log('tasks');
//   console.log(tasks);
//   return tasks
// })

const fetchTasks = (setIsAuthenticated) => async dispatch => {
  dispatch({ type: FETCH_TASKS_STARTED });
  try {
    const data = await apiService.get('tasks');
    console.log('inside store with');
    console.log({ data });

    dispatch({
      type: FETCH_TASKS_SUCCEEDED,
      payload: data,
    });

  } catch (error) {
    console.log(error.message);

    console.log('inside error of store');
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
    console.log('inside succeeded');
    let newStore = {
      ...state,
      tasks: {
        data: action.payload,
        error: undefined,
        isLoading: false,
      },
    };
    console.log({ newStore});
    return newStore;
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

export default reducer;

