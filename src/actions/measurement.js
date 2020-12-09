import * as types from "../constants/ActionTypes";

export const getMeasurement = (data) => {
  return {
    type: types.GET_MEASUREMENT,
    payload: {
      data,
    },
  };
};

export const getMeasurementSuccess = (data) => {
  return {
    type: types.GET_MEASUREMENT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getMeasurementFail = (error) => {
  return {
    type: types.GET_MEASUREMENT_FAIL,
    payload: {
      error,
    },
  };
};

export const postMeasurement = (data) => {
  return {
    type: types.POST_MEASUREMENT,
    payload: {
      data,
    },
  };
};

export const postMeasurementSuccess = (data) => {
  return {
    type: types.POST_MEASUREMENT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postMeasurementFail = (error) => {
  return {
    type: types.POST_MEASUREMENT_FAIL,
    payload: {
      error,
    },
  };
};

export const deleteMeasurement = (data) => {
  return {
    type: types.DELETE_MEASUREMENT,
    payload: {
      data,
    },
  };
};

export const deleteMeasurementSuccess = (data) => {
  return {
    type: types.DELETE_MEASUREMENT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteMeasurementFail = (error) => {
  return {
    type: types.DELETE_MEASUREMENT_FAIL,
    payload: {
      error,
    },
  };
};

export const putMeasurement = (data) => {
  return {
    type: types.PUT_MEASUREMENT,
    payload: {
      data,
    },
  };
};

export const putMeasurementSuccess = (data) => {
  return {
    type: types.PUT_MEASUREMENT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const putMeasurementFail = (error) => {
  return {
    type: types.PUT_MEASUREMENT_FAIL,
    payload: {
      error,
    },
  };
};
