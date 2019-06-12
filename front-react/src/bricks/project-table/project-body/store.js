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

export const fetchTasks = () => async dispatch => {
  dispatch({ type: FETCH_TASKS_STARTED });

  try {
    // const tasksFixtures = [
    //   {
    //     id: 1,
    //     image_src:
    //       'https://cdn.manomano.fr/martillo-dewalt-dch273n-18v-P-2075566-4162147_1.jpg',
    //     title: 'Demo react Product',
    //     price_currency: '€',
    //     price: '2490.50',
    //   },
    //   {
    //     id: 2,
    //     image_src:
    //       'https://cdn.manomano.com/futbolin-de-acero-60-kg-140x745x875-cm-negro-P-334554-10088120_1.jpg',
    //     title: 'DIY Essential',
    //     price_currency: '€',
    //     price: '240.50',
    //   },
    // ];
    const data = await apiService.get('tasks');
    dispatch({
      type: FETCH_TASKS_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILED,
      error,
    });
  }
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

export default reducer;

