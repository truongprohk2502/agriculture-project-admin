import * as types from "../constants/ActionTypes";

export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER,
    payload: {
      data,
    },
  };
};

export const loginUserSuccess = (data) => {
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loginUserFailed = (error) => {
  return {
    type: types.LOGIN_USER_FAIL,
    payload: {
      error,
    },
  };
};

export const logout = (data) => {
  return {
    type: types.LOGOUT,
    payload: {
      data,
    },
  };
};

export const logoutSuccess = (data) => {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const logoutFail = (error) => {
  return {
    type: types.LOGOUT_FAIL,
    payload: {
      error,
    },
  };
};