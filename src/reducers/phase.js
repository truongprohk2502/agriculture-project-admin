import * as types from "../constants/ActionTypes";

var initialState = {
  listPhase: [],
  error: null,
};

const phase = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PHASE:
      return state;
    case types.GET_PHASE_SUCCESS:
      return {
        ...state,
        listPhase: action.payload.data,
        error: null,
      };
    case types.GET_PHASE_FAIL:
      return { ...state, error: action.payload.error };
    case types.POST_PHASE:
      return state;
    case types.POST_PHASE_SUCCESS:
      const createdPhase = action.payload.data;
      return {
        ...state,
        listPhase: [...state.listPhase, createdPhase],
        error: null,
      };
    case types.POST_PHASE_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_PHASE:
      return state;
    case types.PUT_PHASE_SUCCESS:
      const editedPhase = action.payload.data;
      return {
        ...state,
        listPhase: state.listPhase.map((phase) => {
          if (phase._id !== editedPhase._id) return phase;
          phase.name = editedPhase.name;
          phase.description = editedPhase.description;
          phase.estimatedTime = editedPhase.estimatedTime;
          phase.estimatedTimeUnit = editedPhase.estimatedTimeUnit;
          return phase
        }),
        error: null,
      };
    case types.PUT_PHASE_FAIL:
      return { ...state, error: action.payload.error };
    case types.DELETE_PHASE:
      return state;
    case types.DELETE_PHASE_SUCCESS:
      const deletePhaseId = action.payload.data.id;
      return {
        ...state,
        listPhase: state.listPhase.filter(
          (phase) => phase._id !== deletePhaseId
        ),
        error: null,
      };
    case types.DELETE_PHASE_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default phase;
