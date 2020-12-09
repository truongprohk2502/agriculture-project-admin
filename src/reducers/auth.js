import * as types from "../constants/ActionTypes";
import * as messages from "../constants/errorMessages";

var initialState = {
  user: {},
  isAuthenticated: false,
  token: localStorage.getItem("jwtToken"),
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        token: "",
      };
    case types.LOGIN_USER_SUCCESS:
      const { token, ...restUserProps } = action.payload.data;
      return {
        ...state,
        token: token,
        user: restUserProps,
        error: null,
      };
    case types.LOGIN_USER_FAIL:
      return { ...state, error: messages.ERROR_LOGIN_FAIL };
    case types.LOGOUT:
      return state;
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        token: "",
        user: {},
        error: null,
      };
    case types.LOGOUT_FAIL:
      return { ...state, error: "Logout Failed" };
    default:
      return state;
  }
};

export default auth;
