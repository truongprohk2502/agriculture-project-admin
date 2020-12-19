import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import * as apiUrl from "../constants/apiUrl";
import * as userAction from "../actions/user";
import Axios from "axios";

function getApiListUser() {
  const response = Axios.get(apiUrl.API_BACKEND + apiUrl.API_GET_LIST_USER);
  return response;
}

export function* getListUser() {
  try {
    const response = yield call(getApiListUser);
    const { data } = response;
    if (data) {
      yield put(userAction.getListUserSuccess(data));
    } else {
      yield put(userAction.getListUserFail(data));
    }
  } catch (error) {
    console.log(error);
    yield put(userAction.getListUserFail(error));
  }
}

function putApiLockUser(data) {
  const { id, isActive } = data.payload.data;
  const response = Axios.put(
    apiUrl.API_BACKEND +
      apiUrl.API_PUT_LOCK_USER +
      "?id=" +
      id +
      "&is_active=" +
      isActive
  );
  return response;
}

export function* putLockUser(dataBody) {
  try {
    const response = yield call(putApiLockUser, dataBody);
    const { data } = response;
    if (data) {
      yield put(userAction.putLockUserSuccess(dataBody.payload.data));
    } else {
      yield put(userAction.putLockUserFail(data));
    }
  } catch (error) {
    console.log(error);
    yield put(userAction.putLockUserFail(error));
  }
}

export function* actionUser() {
  yield takeEvery(types.GET_LIST_USER, getListUser);
  yield takeEvery(types.PUT_LOCK_USER, putLockUser);
}
