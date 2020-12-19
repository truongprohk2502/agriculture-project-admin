import * as types from "../constants/ActionTypes";

var initialState = {
  listSampleProject: [],
  error: null,
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SAMPLE_PROJECT:
      return state;
    case types.GET_SAMPLE_PROJECT_SUCCESS:
      return {
        ...state,
        listSampleProject: action.payload.data,
        error: null,
      };
    case types.GET_SAMPLE_PROJECT_FAIL:
      return { ...state, error: action.payload.error };
    case types.GET_ACTUAL_PROJECT:
      return state;
    case types.GET_ACTUAL_PROJECT_SUCCESS:
      return {
        ...state,
        listSampleProject: action.payload.data,
        error: null,
      };
    case types.GET_ACTUAL_PROJECT_FAIL:
      return { ...state, error: action.payload.error };
    case types.POST_SAMPLE_PROJECT:
      return state;
    case types.POST_SAMPLE_PROJECT_SUCCESS:
      const createdProject = action.payload.data;
      return {
        ...state,
        listSampleProject: [...state.listSampleProject, createdProject],
        error: null,
      };
    case types.POST_SAMPLE_PROJECT_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_SAMPLE_PROJECT:
      return state;
    case types.PUT_SAMPLE_PROJECT_SUCCESS:
      const editedProject = action.payload.data;
      return {
        ...state,
        listSampleProject: state.listSampleProject.map((project) => {
          if (project._id !== editedProject._id) return project;
          project.name = editedProject.name;
          project.description = editedProject.description;
          project.minimalScale = editedProject.minimalScale;
          project.standardUnit = editedProject.standardUnit;
          project.estimatedCost = editedProject.estimatedCost;
          project.estimatedTime = editedProject.estimatedTime;
          project.estimatedTimeUnit = editedProject.estimatedTimeUnit;
          project.estimatedQuantity = editedProject.estimatedQuantity;
          project.unitPrice = editedProject.unitPrice;
          project.standardGap = editedProject.standardGap;
          return project;
        }),
        error: null,
      };
    case types.PUT_SAMPLE_PROJECT_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_LOCK_PROJECT:
      return state;
    case types.PUT_LOCK_PROJECT_SUCCESS:
      const lock_project = action.payload.data;
      return {
        ...state,
        listSampleProject: state.listSampleProject.map((project) => {
          if (project._id !== lock_project._id) return project;
          project.isActive = lock_project.isActive;
          return project;
        }),
        error: null,
      };
    case types.PUT_LOCK_PROJECT_FAIL:
      return { ...state, error: action.payload.error };
    case types.DELETE_SAMPLE_PROJECT:
      return state;
    case types.DELETE_SAMPLE_PROJECT_SUCCESS:
      const deleteProjectId = action.payload.data.id;
      return {
        ...state,
        listSampleProject: state.listSampleProject.filter(
          (project) => project._id !== deleteProjectId
        ),
        error: null,
      };
    case types.DELETE_SAMPLE_PROJECT_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default project;
