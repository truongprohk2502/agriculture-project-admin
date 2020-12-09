import * as types from "../constants/ActionTypes";

export const getPhase = (data) => {
  return {
    type: types.GET_PHASE,
    payload: {
      data,
    },
  };
};

export const getPhaseSuccess = (data) => {
  return {
    type: types.GET_PHASE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getPhaseFail = (error) => {
  return {
    type: types.GET_PHASE_FAIL,
    payload: {
      error,
    },
  };
};

export const postPhase = (data) => {
  return {
    type: types.POST_PHASE,
    payload: {
      data,
    },
  };
};

export const postPhaseSuccess = (data) => {
  return {
    type: types.POST_PHASE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postPhaseFail = (error) => {
  return {
    type: types.POST_PHASE_FAIL,
    payload: {
      error,
    },
  };
};

export const deletePhase = (data) => {
  return {
    type: types.DELETE_PHASE,
    payload: {
      data,
    },
  };
};

export const deletePhaseSuccess = (data) => {
  return {
    type: types.DELETE_PHASE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deletePhaseFail = (error) => {
  return {
    type: types.DELETE_PHASE_FAIL,
    payload: {
      error,
    },
  };
};

export const putPhase = (data) => {
  return {
    type: types.PUT_PHASE,
    payload: {
      data,
    },
  };
};

export const putPhaseSuccess = (data) => {
  return {
    type: types.PUT_PHASE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const putPhaseFail = (error) => {
  return {
    type: types.PUT_PHASE_FAIL,
    payload: {
      error,
    },
  };
};
