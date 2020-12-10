import { all } from "redux-saga/effects";
import { actionAuth } from "./auth";
import { actionMaterial } from "./material";
import { actionMeasurement } from "./measurement";
import { actionPhase } from "./phase";
import { actionProject } from "./project";
import { actionTask } from "./task";
import { actionUser } from "./user";

export default function* rootSaga() {
  yield all([
    actionAuth(),
    actionProject(),
    actionPhase(),
    actionTask(),
    actionMaterial(),
    actionMeasurement(),
    actionUser()
  ]);
}
