import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import phase from "./phase";
import task from "./task";
import material from "./material";
import measurement from "./measurement";
import user from "./user";

const rootReducer = combineReducers({
  auth,
  project,
  phase,
  task,
  material,
  measurement,
  user
});
export default rootReducer;
