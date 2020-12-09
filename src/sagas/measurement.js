import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as measurementAction from "../actions/measurement";
import Axios from "axios";

function getMeasurementApi(data) {
  const response = Axios.get(
    apiUrl.API_BACKEND + apiUrl.API_GET_MEASUREMENT + "/" + data.payload.data.id
  );
  return response;
}

export function* getMeasurement(dataBody) {
  try {
    const response = yield call(getMeasurementApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(measurementAction.getMeasurementSuccess(data));
    } else {
      yield put(measurementAction.getMeasurementFail(data));
    }
  } catch (error) {
    console.log("Error loginUser", error);
    yield put(measurementAction.getMeasurementFail(error));
  }
}

function postMeasurementApi(data) {
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_MEASUREMENT,
    data.payload.data
  );
  return response;
}

export function* postMeasurement(dataBody) {
  try {
    const response = yield call(postMeasurementApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(measurementAction.postMeasurementSuccess(data));
    } else {
      yield put(measurementAction.postMeasurementFail(data));
    }
  } catch (error) {
    console.log("Error", error);
    yield put(measurementAction.postMeasurementFail(error));
  }
}

function deleteMeasurementApi(data) {
  const response = Axios.delete(
    apiUrl.API_BACKEND +
      apiUrl.API_DELETE_MEASUREMENT +
      "/" +
      data.payload.data.id
  );
  return response;
}

export function* deleteMeasurement(dataBody) {
  try {
    yield call(deleteMeasurementApi, dataBody);
    yield put(measurementAction.deleteMeasurementSuccess({ id: dataBody.payload.data.id }));
  } catch (error) {
    console.log("Error", error);
    yield put(measurementAction.deleteMeasurementFail(error));
  }
}

function putMeasurementApi(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND + apiUrl.API_PUT_MEASUREMENT,
    data.payload.data
  );
  return response;
}

export function* putMeasurement(dataBody) {
  try {
    yield call(putMeasurementApi, dataBody);
    yield put(measurementAction.putMeasurementSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(measurementAction.putMeasurementFail(error));
  }
}

export function* actionMeasurement() {
  yield takeEvery(types.GET_MEASUREMENT, getMeasurement);
  yield takeEvery(types.POST_MEASUREMENT, postMeasurement);
  yield takeEvery(types.DELETE_MEASUREMENT, deleteMeasurement);
  yield takeEvery(types.PUT_MEASUREMENT, putMeasurement);
}
