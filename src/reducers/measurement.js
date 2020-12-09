import * as types from "../constants/ActionTypes";

var initialState = {
  listMeasurement: [],
  error: null,
};

const measurement = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MEASUREMENT:
      return state;
    case types.GET_MEASUREMENT_SUCCESS:
      return {
        ...state,
        listMeasurement: action.payload.data,
        error: null,
      };
    case types.GET_MEASUREMENT_FAIL:
      return { ...state, error: action.payload.error };
    case types.POST_MEASUREMENT:
      return state;
    case types.POST_MEASUREMENT_SUCCESS:
      return {
        ...state,
        listMeasurement: [...state.listMeasurement, action.payload.data],
        error: null,
      };
    case types.POST_MEASUREMENT_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_MEASUREMENT:
      return state;
    case types.PUT_MEASUREMENT_SUCCESS:
      const editedMeasurement = action.payload.data;
      return {
        ...state,
        listMeasurement: state.listMeasurement.map((measurement) => {
          if (measurement._id !== editedMeasurement._id) return measurement;
          measurement.name = editedMeasurement.name;
          measurement.guide = editedMeasurement.guide;
          measurement.standardNum = editedMeasurement.standardNum;
          measurement.unit = editedMeasurement.unit;
          return measurement;
        }),
        error: null,
      };
    case types.PUT_MEASUREMENT_FAIL:
      return { ...state, error: action.payload.error };
    case types.DELETE_MEASUREMENT:
      return state;
    case types.DELETE_MEASUREMENT_SUCCESS:
      return {
        ...state,
        listMeasurement: state.listMeasurement.filter(
          (measurement) => measurement._id !== action.payload.data.id
        ),
        error: null,
      };
    case types.DELETE_MEASUREMENT_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default measurement;
