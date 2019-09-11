import {
  actionHandlers,
  actions,
  FETCH_TASKS_FAILED,
  FETCH_TASKS_STARTED,
  FETCH_TASKS_SUCCEEDED,
  initialState,
  tasksSelector
} from '../store';
import { apiService } from '../../../../services';

describe('store', () => {

  describe('initialState', () => {
    it('should contain no data', () => {
      // Then
      expect(initialState).toEqual({
        tasks: {
          data: [],
          isLoading: false,
          error: undefined,
        },
      });
    });
  });

  describe('actions.fetchTasks', () => {
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('should dispatch fetch start', () => {
      // When
      actions.fetchTasks()(dispatch);

      // Then
      expect(dispatch).toHaveBeenCalledWith({ type: FETCH_TASKS_STARTED });
    });

    it('should call api to get tasks', () => {
      // Given
      apiService.get = jest.fn();

      // When
      actions.fetchTasks()(dispatch);

      // Then
      expect(apiService.get).toHaveBeenCalledWith('tasks');
    });

    it('should dispatch data on success', async () => {
      // Given
      apiService.get = jest.fn().mockResolvedValue('data');

      // When
      await actions.fetchTasks()(dispatch);

      // Then
      expect(dispatch).toHaveBeenLastCalledWith({
        type: FETCH_TASKS_SUCCEEDED,
        payload: 'data',
      });
    });

    it('should dispatch error on failure', async () => {
      // Given
      const error = { message: 'something' };
      apiService.get = jest.fn().mockRejectedValue(error);

      // When
      await actions.fetchTasks()(dispatch);

      // Then
      expect(dispatch).toHaveBeenLastCalledWith({
        type: FETCH_TASKS_FAILED,
        error,
      });
    });

    it('should loginSilently on failure with 401', async () => {
      // Given
      const error = { message: 'Request failed with status code 401' };
      apiService.get = jest.fn()
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce('data');
      const loginSilently = jest.fn();

      // When
      await actions.fetchTasks(loginSilently)(dispatch);

      // Then
      expect(loginSilently).toHaveBeenCalledWith();
    });

    it('should dispatch new error when api get do not work again with something not 401', async () => {
      // Given
      const error401 = { message: 'Request failed with status code 401' };
      const error500 = { message: 'Request failed with status code 500' };
      apiService.get = jest.fn()
        .mockRejectedValueOnce(error401)
        .mockRejectedValueOnce(error500);
      const loginSilently = jest.fn();

      // When
      await actions.fetchTasks(loginSilently)(dispatch);

      // Then
      expect(dispatch).toHaveBeenLastCalledWith({
        type: FETCH_TASKS_FAILED,
        error: error500,
      });
    });

    it('should dispatch new error when login silently fails', async () => {
      // Given
      const error401 = { message: 'Request failed with status code 401' };
      const error403 = { message: 'Request failed with status code 403' };
      apiService.get = jest.fn().mockRejectedValueOnce(error401);
      const loginSilently = jest.fn().mockRejectedValue(error403);

      // When
      await actions.fetchTasks(loginSilently)(dispatch);

      // Then
      expect(dispatch).toHaveBeenLastCalledWith({
        type: FETCH_TASKS_FAILED,
        error: error403,
      });
    });
  });

  describe('tasksSelector', () => {
    it('should return tasks', () => {
      // Given
      const state = { tasks: 'tasks' };

      // When
      const selector = tasksSelector(state);

      // Then
      expect(selector).toEqual('tasks');
    });
  });

  describe('actionHandlers', () => {
    it('should update FETCH_TASKS_STARTED', () => {
      // Given
      const state = { foo: 'bar', tasks: { data: ['tasks'] } };

      // When
      const returnedState = actionHandlers['FETCH_TASKS_STARTED'](state);

      // Then
      expect(returnedState).toEqual({
          foo: 'bar',
          tasks: {
            data: ['tasks'],
            error: undefined,
            isLoading: true,
          }
        }
      );
    });

    it('should update FETCH_TASKS_SUCCEEDED', () => {
      // Given
      const state = { foo: 'bar', tasks: { data: ['tasks'] } };
      const action = { payload: 'data' };

      // When
      const returnedState = actionHandlers['FETCH_TASKS_SUCCEEDED'](state, action);

      // Then
      expect(returnedState).toEqual({
          foo: 'bar',
          tasks: {
            data: 'data',
            error: undefined,
            isLoading: false,
          }
        }
      );
    });

    it('should update FETCH_TASKS_FAILED', () => {
      // Given
      const state = { foo: 'bar', tasks: { data: ['tasks'] } };
      const action = { error: 'error' };

      // When
      const returnedState = actionHandlers['FETCH_TASKS_FAILED'](state, action);

      // Then
      expect(returnedState).toEqual({
          foo: 'bar',
          tasks: {
            data: ['tasks'],
            error: 'error',
            isLoading: false,
          }
        }
      );
    });
  });
});
