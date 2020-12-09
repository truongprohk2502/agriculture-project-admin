import * as types from "../constants/ActionTypes";

export const getSampleProject = (data) => {
  return {
    type: types.GET_SAMPLE_PROJECT,
    payload: {
      data,
    },
  };
};

export const getSampleProjectSuccess = (data) => {
  return {
    type: types.GET_SAMPLE_PROJECT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getSampleProjectFail = (error) => {
  return {
    type: types.GET_SAMPLE_PROJECT_FAIL,
    payload: {
      error,
    },
  };
};

export const postSampleProject = (data) => {
  return {
    type: types.POST_SAMPLE_PROJECT,
    payload: {
      data,
    },
  };
};

export const postSampleProjectSuccess = (data) => {
  return {
    type: types.POST_SAMPLE_PROJECT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postSampleProjectFail = (error) => {
  return {
    type: types.POST_SAMPLE_PROJECT_FAIL,
    payload: {
      error,
    },
  };
};

export const deleteSampleProject = (data) => {
  return {
    type: types.DELETE_SAMPLE_PROJECT,
    payload: {
      data,
    },
  };
};

export const deleteSampleProjectSuccess = (data) => {
  return {
    type: types.DELETE_SAMPLE_PROJECT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteSampleProjectFail = (error) => {
  return {
    type: types.DELETE_SAMPLE_PROJECT_FAIL,
    payload: {
      error,
    },
  };
};

export const putSampleProject = (data) => {
  return {
    type: types.PUT_SAMPLE_PROJECT,
    payload: {
      data,
    },
  };
};

export const putSampleProjectSuccess = (data) => {
  return {
    type: types.PUT_SAMPLE_PROJECT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const putSampleProjectFail = (error) => {
  return {
    type: types.PUT_SAMPLE_PROJECT_FAIL,
    payload: {
      error,
    },
  };
};
