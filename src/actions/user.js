import * as types from "../constants/ActionTypes";

export const getListUser = (data) => {
  return {
    type: types.GET_LIST_USER,
    payload: {
      data,
    },
  };
};

export const getListUserSuccess = (data) => {
  return {
    type: types.GET_LIST_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getListUserFail = (error) => {
  return {
    type: types.GET_LIST_USER_FAIL,
    payload: {
      error,
    },
  };
};
