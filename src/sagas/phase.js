import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as phaseAction from "../actions/phase";
import Axios from "axios";

function getPhaseApi(data) {
  const response = Axios.get(
    apiUrl.API_BACKEND + apiUrl.API_GET_PHASE + "/" + data.payload.data.id
  );
  return response;
}

export function* getPhase(dataBody) {
  try {
    const response = yield call(getPhaseApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(phaseAction.getPhaseSuccess(data));
    } else {
      yield put(phaseAction.getPhaseFail(data));
    }
  } catch (error) {
    console.log("Error loginUser", error);
    yield put(phaseAction.getPhaseFail(error));
  }
}

function postPhaseApi(data) {
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_PHASE,
    data.payload.data
  );
  return response;
}

export function* postPhase(dataBody) {
  try {
    const response = yield call(postPhaseApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(phaseAction.postPhaseSuccess(data));
    } else {
      yield put(phaseAction.postPhaseFail(data));
    }
  } catch (error) {
    console.log("Error", error);
    yield put(phaseAction.postPhaseFail(error));
  }
}

function deletePhaseApi(data) {
  const response = Axios.delete(
    apiUrl.API_BACKEND +
      apiUrl.API_DELETE_PHASE +
      "/" +
      data.payload.data.id
  );
  return response;
}

export function* deletePhase(dataBody) {
  try {
    yield call(deletePhaseApi, dataBody);
    yield put(phaseAction.deletePhaseSuccess({ id: dataBody.payload.data.id }));
  } catch (error) {
    console.log("Error", error);
    yield put(phaseAction.deletePhaseFail(error));
  }
}

function putPhaseApi(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND + apiUrl.API_PUT_PHASE,
    data.payload.data
  );
  return response;
}

export function* putPhase(dataBody) {
  try {
    yield call(putPhaseApi, dataBody);
    yield put(phaseAction.putPhaseSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(phaseAction.putPhaseFail(error));
  }
}

export function* actionPhase() {
  yield takeEvery(types.GET_PHASE, getPhase);
  yield takeEvery(types.POST_PHASE, postPhase);
  yield takeEvery(types.DELETE_PHASE, deletePhase);
  yield takeEvery(types.PUT_PHASE, putPhase);
}
