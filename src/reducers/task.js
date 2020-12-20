import * as types from "../constants/ActionTypes";

var initialState = {
  listTask: [],
  error: null,
};

const phase = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TASK:
      return state;
    case types.GET_TASK_SUCCESS:
      return {
        ...state,
        listTask: action.payload.data,
        error: null,
      };
    case types.GET_TASK_FAIL:
      return { ...state, error: action.payload.error };
    case types.POST_TASK:
      return state;
    case types.POST_TASK_SUCCESS:
      return {
        ...state,
        listTask: [...state.listTask, action.payload.data],
        error: null,
      };
    case types.POST_TASK_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_TASK:
      return state;
    case types.PUT_TASK_SUCCESS:
      const editedTask = action.payload.data;
      return {
        ...state,
        listTask: state.listTask.map((task) => {
          if (task._id !== editedTask._id) return task;
          task.name = editedTask.name;
          task.description = editedTask.description;
          task.estimatedTime = editedTask.estimatedTime;
          task.estimatedTimeUnit = editedTask.estimatedTimeUnit;
          task.workerNum = editedTask.workerNum;
          task.workerUnitFee = editedTask.workerUnitFee;
          return task;
        }),
        error: null,
      };
    case types.PUT_TASK_FAIL:
      return { ...state, error: action.payload.error };
    case types.DELETE_TASK:
      return state;
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        listTask: state.listTask.filter(
          (task) => task._id !== action.payload.data.id
        ),
        error: null,
      };
    case types.DELETE_TASK_FAIL:
      return { ...state, error: action.payload.error };
    case types.POST_IMAGE_TASK:
      return state;
    case types.POST_IMAGE_TASK_SUCCESS:
      const post_image_task_data = action.payload.data;
      return {
        ...state,
        listTask: state.listTask.map((task) => {
          if (task._id === post_image_task_data.taskId) {
            task.images = post_image_task_data.images;
          }
          return task;
        }),
        error: null,
      };
    case types.POST_IMAGE_TASK_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_IMAGE_TASK:
      return state;
    case types.PUT_IMAGE_TASK_SUCCESS:
      const put_image_task_data = action.payload.data;
      return {
        ...state,
        listTask: state.listTask.map((task) => {
          if (task._id === put_image_task_data.taskId) {
            task.images = put_image_task_data.images;
          }
          return task;
        }),
        error: null,
      };
    case types.PUT_IMAGE_TASK_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default phase;
