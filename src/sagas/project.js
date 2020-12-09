import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as projectAction from "../actions/project";
import Axios from "axios";

function getSampleProjectApi() {
  const response = Axios.get(
    apiUrl.API_BACKEND +
      apiUrl.API_GET_SAMPLE_PROJECT +
      "?page=0&size=100&is_active=true"
  );
  return response;
}

export function* getSampleProject() {
  try {
    const response = yield call(getSampleProjectApi);
    const { data } = response;
    if (data) {
      yield put(projectAction.getSampleProjectSuccess(data));
    } else {
      yield put(projectAction.getSampleProjectFail(data));
    }
  } catch (error) {
    console.log("Error loginUser", error);
    yield put(projectAction.getSampleProjectFail(error));
  }
}

function postSampleProjectApi(data) {
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_SAMPLE_PROJECT,
    data.payload.data
  );
  return response;
}

export function* postSampleProject(dataBody) {
  try {
    const response = yield call(postSampleProjectApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(projectAction.postSampleProjectSuccess(data));
    } else {
      yield put(projectAction.postSampleProjectFail(data));
    }
  } catch (error) {
    console.log("Error", error);
    yield put(projectAction.postSampleProjectFail(error));
  }
}

function deleteSampleProjectApi(data) {
  const response = Axios.delete(
    apiUrl.API_BACKEND +
      apiUrl.API_DELETE_SAMPLE_PROJECT +
      "/" +
      data.payload.data.id
  );
  return response;
}

export function* deleteSampleProject(dataBody) {
  try {
    yield call(deleteSampleProjectApi, dataBody);
    yield put(
      projectAction.deleteSampleProjectSuccess({ id: dataBody.payload.data.id })
    );
  } catch (error) {
    console.log("Error", error);
    yield put(projectAction.deleteSampleProjectFail(error));
  }
}

function putSampleProjectApi(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND + apiUrl.API_PUT_SAMPLE_PROJECT,
    data.payload.data
  );
  return response;
}

export function* putSampleProject(dataBody) {
  try {
    yield call(putSampleProjectApi, dataBody);
    yield put(projectAction.putSampleProjectSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(projectAction.putSampleProjectFail(error));
  }
}

export function* actionProject() {
  yield takeEvery(types.GET_SAMPLE_PROJECT, getSampleProject);
  yield takeEvery(types.POST_SAMPLE_PROJECT, postSampleProject);
  yield takeEvery(types.DELETE_SAMPLE_PROJECT, deleteSampleProject);
  yield takeEvery(types.PUT_SAMPLE_PROJECT, putSampleProject);
}
