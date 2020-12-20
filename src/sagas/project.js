import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as projectAction from "../actions/project";
import Axios from "axios";

function getSampleProjectApi() {
  const response = Axios.get(
    apiUrl.API_BACKEND +
      apiUrl.API_GET_SAMPLE_PROJECT +
      "?page=0&size=100&all=true"
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

function getActualProjectApi(data) {
  const response = Axios.get(
    apiUrl.API_BACKEND +
      apiUrl.API_GET_ACTUAL_PROJECT +
      "/" +
      data.payload.data.id
  );
  return response;
}

export function* getActualProject(dataBody) {
  try {
    const response = yield call(getActualProjectApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(projectAction.getActualProjectSuccess(data));
    } else {
      yield put(projectAction.getActualProjectFail(data));
    }
  } catch (error) {
    console.log("Error loginUser", error);
    yield put(projectAction.getActualProjectFail(error));
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

function putLockProjectApi(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND + apiUrl.API_PUT_SAMPLE_PROJECT,
    data.payload.data
  );
  return response;
}

export function* putLockProject(dataBody) {
  try {
    yield call(putLockProjectApi, dataBody);
    yield put(projectAction.putLockProjectSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(projectAction.putLockProjectFail(error));
  }
}

function postImageProjectApi(dataBody) {
  const data = new FormData();
  data.append("files", dataBody.payload.data.file);
  data.append("projectId", dataBody.payload.data.projectId);
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_IMAGE_PROJECT,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
}

export function* postImageProject(dataBody) {
  try {
    const response = yield call(postImageProjectApi, dataBody);
    yield put(
      projectAction.postImageProjectSuccess({
        images: response.data.images,
        projectId: dataBody.payload.data.projectId,
      })
    );
  } catch (error) {
    console.log("Error", error);
    yield put(projectAction.postImageProjectFail(error));
  }
}

function putApiImageProject(data) {
  console.log(data.payload)
  const response = Axios.put(
    apiUrl.API_BACKEND +
      apiUrl.API_PUT_IMAGE_PROJECT +
      "/" +
      data.payload.data.projectId,
    data.payload.data.images
  );
  return response;
}

export function* putImageProject(dataBody) {
  try {
    yield call(putApiImageProject, dataBody);
    yield put(projectAction.putImageProjectSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(projectAction.putImageProjectFail(error));
  }
}

export function* actionProject() {
  yield takeEvery(types.GET_SAMPLE_PROJECT, getSampleProject);
  yield takeEvery(types.GET_ACTUAL_PROJECT, getActualProject);
  yield takeEvery(types.POST_SAMPLE_PROJECT, postSampleProject);
  yield takeEvery(types.DELETE_SAMPLE_PROJECT, deleteSampleProject);
  yield takeEvery(types.PUT_SAMPLE_PROJECT, putSampleProject);
  yield takeEvery(types.PUT_LOCK_PROJECT, putLockProject);
  yield takeEvery(types.POST_IMAGE_PROJECT, postImageProject);
  yield takeEvery(types.PUT_IMAGE_PROJECT, putImageProject);
}
