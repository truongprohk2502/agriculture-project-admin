import * as types from "../constants/ActionTypes";

var initialState = {
  listMaterial: [],
  error: null,
};

const material = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MATERIAL:
      return state;
    case types.GET_MATERIAL_SUCCESS:
      return {
        ...state,
        listMaterial: action.payload.data,
        error: null,
      };
    case types.GET_MATERIAL_FAIL:
      return { ...state, error: action.payload.error };
    case types.POST_MATERIAL:
      return state;
    case types.POST_MATERIAL_SUCCESS:
      return {
        ...state,
        listMaterial: [...state.listMaterial, action.payload.data],
        error: null,
      };
    case types.POST_MATERIAL_FAIL:
      return { ...state, error: action.payload.error };
    case types.PUT_MATERIAL:
      return state;
    case types.PUT_MATERIAL_SUCCESS:
      const editedMaterial = action.payload.data;
      return {
        ...state,
        listMaterial: state.listMaterial.map((material) => {
          if (material._id !== editedMaterial._id) return material;
          material.name = editedMaterial.name;
          material.quantity = editedMaterial.quantity;
          material.unit = editedMaterial.unit;
          material.unitPrice = editedMaterial.unitPrice;
          return material;
        }),
        error: null,
      };
    case types.PUT_MATERIAL_FAIL:
      return { ...state, error: action.payload.error };
    case types.DELETE_MATERIAL:
      return state;
    case types.DELETE_MATERIAL_SUCCESS:
      return {
        ...state,
        listMaterial: state.listMaterial.filter(
          (material) => material._id !== action.payload.data.id
        ),
        error: null,
      };
    case types.DELETE_MATERIAL_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default material;
