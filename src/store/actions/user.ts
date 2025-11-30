import { Dispatch } from 'redux';
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  refreshToken as refreshTokenApi,
  getUser as getUserApi,
  updateUser as updateUserApi,
} from '../../helpers/api/auth';
import {
  saveRefreshToken,
  getRefreshToken,
  removeRefreshToken,
} from '../../helpers/utils/tokenHelper';
import type {
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
} from '../../helpers/types/authTypes';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_FAILED = 'USER_GET_FAILED';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export const USER_REFRESH_TOKEN_REQUEST = 'USER_REFRESH_TOKEN_REQUEST';
export const USER_REFRESH_TOKEN_SUCCESS = 'USER_REFRESH_TOKEN_SUCCESS';
export const USER_REFRESH_TOKEN_FAILED = 'USER_REFRESH_TOKEN_FAILED';

export const USER_CLEAR = 'USER_CLEAR';

export const loginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const loginSuccess = (
  user: { email: string; name: string },
  accessToken: string,
  refreshToken: string
) => ({
  type: USER_LOGIN_SUCCESS,
  payload: { user, accessToken, refreshToken },
});

export const loginFailed = (error: string) => ({
  type: USER_LOGIN_FAILED,
  payload: error,
});

export const registerRequest = () => ({
  type: USER_REGISTER_REQUEST,
});

export const registerSuccess = (
  user: { email: string; name: string },
  accessToken: string,
  refreshToken: string
) => ({
  type: USER_REGISTER_SUCCESS,
  payload: { user, accessToken, refreshToken },
});

export const registerFailed = (error: string) => ({
  type: USER_REGISTER_FAILED,
  payload: error,
});

export const logoutRequest = () => ({
  type: USER_LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
});

export const logoutFailed = (error: string) => ({
  type: USER_LOGOUT_FAILED,
  payload: error,
});

export const getUserRequest = () => ({
  type: USER_GET_REQUEST,
});

export const getUserSuccess = (
  user: { email: string; name: string },
  accessToken: string
) => ({
  type: USER_GET_SUCCESS,
  payload: { user, accessToken },
});

export const getUserFailed = (error: string) => ({
  type: USER_GET_FAILED,
  payload: error,
});

export const updateUserRequest = () => ({
  type: USER_UPDATE_REQUEST,
});

export const updateUserSuccess = (user: { email: string; name: string }) => ({
  type: USER_UPDATE_SUCCESS,
  payload: { user },
});

export const updateUserFailed = (error: string) => ({
  type: USER_UPDATE_FAILED,
  payload: error,
});

export const refreshTokenRequest = () => ({
  type: USER_REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = (
  accessToken: string,
  refreshToken: string
) => ({
  type: USER_REFRESH_TOKEN_SUCCESS,
  payload: { accessToken, refreshToken },
});

export const refreshTokenFailed = (error: string) => ({
  type: USER_REFRESH_TOKEN_FAILED,
  payload: error,
});

export const clearUser = () => ({
  type: USER_CLEAR,
});

export const login = (data: LoginRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await loginApi(data);
      if (response.success) {
        saveRefreshToken(response.refreshToken);
        dispatch(
          loginSuccess(
            response.user,
            response.accessToken,
            response.refreshToken
          )
        );
      }
    } catch (error: any) {
      dispatch(loginFailed('Ошибка при авторизации'));
      throw error;
    }
  };
};

export const register = (data: RegisterRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(registerRequest());
      const response = await registerApi(data);
      if (response.success) {
        saveRefreshToken(response.refreshToken);
        dispatch(
          registerSuccess(
            response.user,
            response.accessToken,
            response.refreshToken
          )
        );
      }
    } catch (error: any) {
      dispatch(registerFailed('Ошибка при регистрации'));
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch(logoutRequest());
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await logoutApi(refreshToken);
      }
      removeRefreshToken();
      dispatch(logoutSuccess());
      dispatch(clearUser());
    } catch (error: any) {
      dispatch(logoutFailed('Ошибка при выходе'));
      removeRefreshToken();
      dispatch(logoutSuccess());
      dispatch(clearUser());
    }
  };
};

export const getUser = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch(getUserRequest());
      const state = getState();
      let accessToken = state.user?.accessToken;

      if (!accessToken) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const tokenResponse = await refreshTokenApi(refreshToken);
            if (tokenResponse.success) {
              saveRefreshToken(tokenResponse.refreshToken);
              accessToken = tokenResponse.accessToken;
              dispatch(
                refreshTokenSuccess(
                  tokenResponse.accessToken,
                  tokenResponse.refreshToken
                )
              );
            }
          } catch (error) {
            dispatch(getUserFailed('Требуется авторизация'));
            return;
          }
        } else {
          dispatch(getUserFailed('Требуется авторизация'));
          return;
        }
      }

      const response = await getUserApi(accessToken);
      if (response.success) {
        dispatch(getUserSuccess(response.user, accessToken));
      }
    } catch (error: any) {
      if (error?.includes('403') || error?.includes('401')) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const tokenResponse = await refreshTokenApi(refreshToken);
            if (tokenResponse.success) {
              saveRefreshToken(tokenResponse.refreshToken);
              dispatch(
                refreshTokenSuccess(
                  tokenResponse.accessToken,
                  tokenResponse.refreshToken
                )
              );
              const response = await getUserApi(tokenResponse.accessToken);
              if (response.success) {
                dispatch(
                  getUserSuccess(response.user, tokenResponse.accessToken)
                );
                return;
              }
            }
          } catch (refreshError) {
            removeRefreshToken();
            dispatch(getUserFailed('Требуется авторизация'));
            dispatch(clearUser());
            return;
          }
        }
      }
      dispatch(getUserFailed('Ошибка при получении данных пользователя'));
    }
  };
};

export const updateUser = (data: UpdateUserRequest) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch(updateUserRequest());
      const state = getState();
      const accessToken = state.user?.accessToken;

      if (!accessToken) {
        dispatch(updateUserFailed('Требуется авторизация'));
        return;
      }

      const response = await updateUserApi(data, accessToken);
      if (response.success) {
        dispatch(updateUserSuccess(response.user));
      }
    } catch (error: any) {
      dispatch(updateUserFailed('Ошибка при обновлении данных'));
      throw error;
    }
  };
};

export const refreshToken = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(refreshTokenRequest());
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        dispatch(refreshTokenFailed('Токен не найден'));
        return;
      }
      const response = await refreshTokenApi(refreshTokenValue);
      if (response.success) {
        saveRefreshToken(response.refreshToken);
        dispatch(
          refreshTokenSuccess(response.accessToken, response.refreshToken)
        );
      }
    } catch (error: any) {
      dispatch(refreshTokenFailed('Ошибка при обновлении токена'));
      removeRefreshToken();
      throw error;
    }
  };
};
