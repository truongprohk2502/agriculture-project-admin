import * as types from "../constants/ActionTypes";

export const getMaterial = (data) => {
  return {
    type: types.GET_MATERIAL,
    payload: {
      data,
    },
  };
};

export const getMaterialSuccess = (data) => {
  return {
    type: types.GET_MATERIAL_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getMaterialFail = (error) => {
  return {
    type: types.GET_MATERIAL_FAIL,
    payload: {
      error,
    },
  };
};

export const postMaterial = (data) => {
  return {
    type: types.POST_MATERIAL,
    payload: {
      data,
    },
  };
};

export const postMaterialSuccess = (data) => {
  return {
    type: types.POST_MATERIAL_SUCCESS,
    payload: {
      data,
    },
  };
};

export const postMaterialFail = (error) => {
  return {
    type: types.POST_MATERIAL_FAIL,
    payload: {
      error,
    },
  };
};

export const deleteMaterial = (data) => {
  return {
    type: types.DELETE_MATERIAL,
    payload: {
      data,
    },
  };
};

export const deleteMaterialSuccess = (data) => {
  return {
    type: types.DELETE_MATERIAL_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteMaterialFail = (error) => {
  return {
    type: types.DELETE_MATERIAL_FAIL,
    payload: {
      error,
    },
  };
};

export const putMaterial = (data) => {
  return {
    type: types.PUT_MATERIAL,
    payload: {
      data,
    },
  };
};

export const putMaterialSuccess = (data) => {
  return {
    type: types.PUT_MATERIAL_SUCCESS,
    payload: {
      data,
    },
  };
};

export const putMaterialFail = (error) => {
  return {
    type: types.PUT_MATERIAL_FAIL,
    payload: {
      error,
    },
  };
};
