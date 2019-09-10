// import env from '../../../env/env';
import axios from 'axios';

import { logger, token } from '../../index';
import { axiosHandler } from '../api-handler';

jest.mock('axios')
jest.mock('../../../env/env');

describe('axiosHandler', () => {
  const updateMock = jest.fn(data => data);
  // const API_URL = 'http://localhost:3001/';
  const data = { hello: 'world' };
  const path = 'tasks';
  // const url = `${API_URL}${path}`;

  describe('when the promise resolves data', () => {
    beforeEach(() => {
      // env.mockReturnValue(API_URL);
      axios.mockResolvedValue({ data })
    });

    it('should call the correct API status endpoint', async () => {
      // When
      await axiosHandler('get', updateMock)(path, data);

      // Then
      expect(axios).toHaveBeenLastCalledWith({
        data: {"hello": "world"},
        headers: {},
        method: "get",
        url: "http://localhost:3001/tasks"});
    });

    it('should call the correct API status endpoint', async () => {
      // Given
      token.getAccessToken = jest.fn(() => 'access token')
      // When
      await axiosHandler('get', updateMock)(path, data);

      // Then
      expect(axios).toHaveBeenLastCalledWith({
        data: {"hello": "world"},
        headers: {"Authorization": "Bearer access token"},
        method: "get",
        url: "http://localhost:3001/tasks"});
    });

    it('should return response data', async () => {
      // When
      const response = await axiosHandler('get', updateMock)(path, data);

      // Then
      expect(response).toEqual({ data });
    });
  });

  describe('when the promise rejects', () => {
    beforeEach(() => {
      axios.mockRejectedValue('error');
      logger.error = jest.fn();
    });

    it('should log the error', async () => {
      // When
      try {
        await axiosHandler('get', updateMock)(path, data);
      } catch (error) {
        // Then
        expect(logger.error).toHaveBeenCalledWith('error');
        expect(error).toEqual('error');
      }
    });
  });
});
