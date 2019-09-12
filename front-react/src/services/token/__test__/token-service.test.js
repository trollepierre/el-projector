import canUseDOM from 'can-use-dom';
import { tokenService } from '../../index';
import { getInLocalStorage, removeInLocalStorage, saveInLocalStorage } from '../../window/window-service';

jest.mock('can-use-dom', () => true);
jest.mock('../../window/window-service');

describe('token-service', () => {
  const token = 'token';
  const refreshToken = 'refreshToken';
  const tokens = { token, refreshToken };
  const name = 'name';
  const email = 'email';
  const data = { name, email };

  describe('saveUserTokens', () => {
    it('should store in local storage access token', () => {
      // When
      tokenService.saveUserTokens(tokens, data);

      // Then
      expect(saveInLocalStorage).toHaveBeenCalledWith('access_token', token);
    });

    it('should store in local storage refresh token', () => {
      // When
      tokenService.saveUserTokens(tokens, data);

      // Then
      expect(saveInLocalStorage).toHaveBeenNthCalledWith(2, 'refresh_token', refreshToken);
    });

    it('should store in local storage refresh token', () => {
      // When
      tokenService.saveUserTokens(tokens, data);

      // Then
      expect(saveInLocalStorage).toHaveBeenNthCalledWith(3, 'authenticated_user', '{"name":"name","email":"email"}');
    });
  });

  describe('reauthenticate', () => {
    it('should store in local storage access token', () => {
      // When
      tokenService.reauthenticate(tokens);

      // Then
      expect(saveInLocalStorage).toHaveBeenCalledWith('access_token', token);
    });

    it('should store in local storage refresh token', () => {
      // When
      tokenService.reauthenticate(tokens);

      // Then
      expect(saveInLocalStorage).toHaveBeenNthCalledWith(2, 'refresh_token', refreshToken);
    });
  });

  describe('removeToken', () => {
    it('should remove items from local storage', () => {
      // When
      tokenService.removeTokens();

      // Then
      expect(removeInLocalStorage).toHaveBeenNthCalledWith(1, 'access_token');
      expect(removeInLocalStorage).toHaveBeenNthCalledWith(2, 'refresh_token');
      expect(removeInLocalStorage).toHaveBeenNthCalledWith(3, 'authenticated_user');
    });
  });

  describe('getRefreshToken', () => {
    it('should get in local storage', () => {
      // When
      tokenService.getRefreshToken();

      // Then
      expect(getInLocalStorage).toHaveBeenCalledWith('refresh_token');
    });

    it('should return value from local storage', () => {
      // Given
      getInLocalStorage.mockReturnValue('token from storage');

      // When
      const refreshTokenFromLocalStorage = tokenService.getRefreshToken();

      // Then
      expect(refreshTokenFromLocalStorage).toEqual('token from storage');
    });
  });

  describe('getAccessToken', () => {
    it('should get in local storage', () => {
      // When
      tokenService.getAccessToken();

      // Then
      expect(getInLocalStorage).toHaveBeenCalledWith('access_token');
    });

    it('should return value from local storage', () => {
      // Given
      getInLocalStorage.mockReturnValue('token from storage');

      // When
      const accessTokenFromLocalStorage = tokenService.getAccessToken();

      // Then
      expect(accessTokenFromLocalStorage).toEqual('token from storage');
    });
  });

  describe('isAuthenticated', () => {
    it('should get in local storage', () => {
      // When
      tokenService.isAuthenticated();

      // Then
      expect(getInLocalStorage).toHaveBeenCalledWith('access_token');
    });

    it('should return value from local storage', () => {
      // Given
      getInLocalStorage.mockReturnValue('token from storage');

      // When
      const accessTokenFromLocalStorage = tokenService.isAuthenticated();

      // Then
      expect(accessTokenFromLocalStorage).toEqual(true);
    });

    it('should return value from local storage', () => {
      // Given
      getInLocalStorage.mockReturnValue(undefined);

      // When
      const accessTokenFromLocalStorage = tokenService.isAuthenticated();

      // Then
      expect(accessTokenFromLocalStorage).toEqual(false);
    });
  });

  describe('getAuthenticatedUser', () => {
    it('should get in local storage user', () => {
      // Given
      getInLocalStorage.mockReturnValue('{"name":"name","email":"email"}');

      // When
      tokenService.getAuthenticatedUser();

      // Then
      expect(getInLocalStorage).toHaveBeenCalledWith('authenticated_user');
    });

    it('should return user from local storage', () => {
      // Given
      getInLocalStorage.mockReturnValue('{"name":"name","email":"email"}');

      // When
      const accessTokenFromLocalStorage = tokenService.getAuthenticatedUser();

      // Then
      expect(accessTokenFromLocalStorage).toEqual(data);
    });
  });
});
