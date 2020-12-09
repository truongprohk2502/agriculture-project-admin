import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as materialAction from "../actions/material";
import Axios from "axios";

function getMaterialApi(data) {
  const response = Axios.get(
    apiUrl.API_BACKEND + apiUrl.API_GET_MATERIAL + "/" + data.payload.data.id
  );
  return response;
}

export function* getMaterial(dataBody) {
  try {
    const response = yield call(getMaterialApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(materialAction.getMaterialSuccess(data));
    } else {
      yield put(materialAction.getMaterialFail(data));
    }
  } catch (error) {
    console.log("Error loginUser", error);
    yield put(materialAction.getMaterialFail(error));
  }
}

function postMaterialApi(data) {
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_MATERIAL,
    data.payload.data
  );
  return response;
}

export function* postMaterial(dataBody) {
  try {
    const response = yield call(postMaterialApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(materialAction.postMaterialSuccess(data));
    } else {
      yield put(materialAction.postMaterialFail(data));
    }
  } catch (error) {
    console.log("Error", error);
    yield put(materialAction.postMaterialFail(error));
  }
}

function deleteMaterialApi(data) {
  const response = Axios.delete(
    apiUrl.API_BACKEND +
      apiUrl.API_DELETE_MATERIAL +
      "/" +
      data.payload.data.id
  );
  return response;
}

export function* deleteMaterial(dataBody) {
  try {
    yield call(deleteMaterialApi, dataBody);
    yield put(materialAction.deleteMaterialSuccess({ id: dataBody.payload.data.id }));
  } catch (error) {
    console.log("Error", error);
    yield put(materialAction.deleteMaterialFail(error));
  }
}

function putMaterialApi(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND + apiUrl.API_PUT_MATERIAL,
    data.payload.data
  );
  return response;
}

export function* putMaterial(dataBody) {
  try {
    yield call(putMaterialApi, dataBody);
    yield put(materialAction.putMaterialSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(materialAction.putMaterialFail(error));
  }
}

export function* actionMaterial() {
  yield takeEvery(types.GET_MATERIAL, getMaterial);
  yield takeEvery(types.POST_MATERIAL, postMaterial);
  yield takeEvery(types.DELETE_MATERIAL, deleteMaterial);
  yield takeEvery(types.PUT_MATERIAL, putMaterial);
}
