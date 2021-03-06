import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as taskAction from "../actions/task";
import Axios from "axios";

function getTaskApi(data) {
  const response = Axios.get(
    apiUrl.API_BACKEND + apiUrl.API_GET_TASK + "/" + data.payload.data.id
  );
  return response;
}

export function* getTask(dataBody) {
  try {
    const response = yield call(getTaskApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(taskAction.getTaskSuccess(data));
    } else {
      yield put(taskAction.getTaskFail(data));
    }
  } catch (error) {
    console.log("Error loginUser", error);
    yield put(taskAction.getTaskFail(error));
  }
}

function postTaskApi(data) {
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_TASK,
    data.payload.data
  );
  return response;
}

export function* postTask(dataBody) {
  try {
    const response = yield call(postTaskApi, dataBody);
    const { data } = response;
    if (data) {
      yield put(taskAction.postTaskSuccess(data));
    } else {
      yield put(taskAction.postTaskFail(data));
    }
  } catch (error) {
    console.log("Error", error);
    yield put(taskAction.postTaskFail(error));
  }
}

function deleteTaskApi(data) {
  const response = Axios.delete(
    apiUrl.API_BACKEND + apiUrl.API_DELETE_TASK + "/" + data.payload.data.id
  );
  return response;
}

export function* deleteTask(dataBody) {
  try {
    yield call(deleteTaskApi, dataBody);
    yield put(taskAction.deleteTaskSuccess({ id: dataBody.payload.data.id }));
  } catch (error) {
    console.log("Error", error);
    yield put(taskAction.deleteTaskFail(error));
  }
}

function putTaskApi(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND + apiUrl.API_PUT_TASK,
    data.payload.data
  );
  return response;
}

export function* putTask(dataBody) {
  try {
    yield call(putTaskApi, dataBody);
    yield put(taskAction.putTaskSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(taskAction.putTaskFail(error));
  }
}

function postImageTaskApi(dataBody) {
  const data = new FormData();
  data.append("files", dataBody.payload.data.file);
  data.append("taskId", dataBody.payload.data.taskId);
  const response = Axios.post(
    apiUrl.API_BACKEND + apiUrl.API_POST_IMAGE_TASK,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
}

export function* postImageTask(dataBody) {
  try {
    const response = yield call(postImageTaskApi, dataBody);
    yield put(
      taskAction.postImageTaskSuccess({
        images: response.data.images,
        taskId: dataBody.payload.data.taskId,
      })
    );
  } catch (error) {
    console.log("Error", error);
    yield put(taskAction.postImageTaskFail(error));
  }
}

function putApiImageTask(data) {
  const response = Axios.put(
    apiUrl.API_BACKEND +
      apiUrl.API_PUT_IMAGE_TASK +
      "/" +
      data.payload.data.taskId,
    data.payload.data.images
  );
  return response;
}

export function* putImageTask(dataBody) {
  try {
    yield call(putApiImageTask, dataBody);
    yield put(taskAction.putImageTaskSuccess(dataBody.payload.data));
  } catch (error) {
    console.log("Error", error);
    yield put(taskAction.putImageTaskFail(error));
  }
}

export function* actionTask() {
  yield takeEvery(types.GET_TASK, getTask);
  yield takeEvery(types.POST_TASK, postTask);
  yield takeEvery(types.DELETE_TASK, deleteTask);
  yield takeEvery(types.PUT_TASK, putTask);
  yield takeEvery(types.POST_IMAGE_TASK, postImageTask);
  yield takeEvery(types.PUT_IMAGE_TASK, putImageTask);
}
