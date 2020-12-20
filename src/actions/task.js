import * as types from "../constants/ActionTypes";

export const getTask = (data) => {
  return {
    type: types.GET_TASK,
    payload: {
      data,
    },
  };
};

export const getTaskSuccess = (data) => {
  return {
    type: types.GET_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getTaskFail = (error) => {
  return {
    type: types.GET_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const postTask = (data) => {
  return {
    type: types.POST_TASK,
    payload: {
      data,
    },
  };
};

export const postTaskSuccess = (data) => {
  return {
    type: types.POST_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postTaskFail = (error) => {
  return {
    type: types.POST_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const deleteTask = (data) => {
  return {
    type: types.DELETE_TASK,
    payload: {
      data,
    },
  };
};

export const deleteTaskSuccess = (data) => {
  return {
    type: types.DELETE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteTaskFail = (error) => {
  return {
    type: types.DELETE_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const putTask = (data) => {
  return {
    type: types.PUT_TASK,
    payload: {
      data,
    },
  };
};

export const putTaskSuccess = (data) => {
  return {
    type: types.PUT_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const putTaskFail = (error) => {
  return {
    type: types.PUT_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const postImageTask = (data) => {
  return {
    type: types.POST_IMAGE_TASK,
    payload: {
      data,
    },
  };
};

export const postImageTaskSuccess = (data) => {
  return {
    type: types.POST_IMAGE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postImageTaskFail = (error) => {
  return {
    type: types.POST_IMAGE_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const putImageTask = (data) => {
  return {
    type: types.PUT_IMAGE_TASK,
    payload: {
      data,
    },
  };
};

export const putImageTaskSuccess = (data) => {
  return {
    type: types.PUT_IMAGE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const putImageTaskFail = (error) => {
  return {
    type: types.PUT_IMAGE_TASK_FAIL,
    payload: {
      error,
    },
  };
};
