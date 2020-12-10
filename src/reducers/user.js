import * as types from "../constants/ActionTypes";

var initialState = {
  listUser: [],
  error: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_USER:
      return state;
    case types.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        listUser: action.payload.data,
        error: null,
      };
    case types.GET_LIST_USER_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default user;
