import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { logger } from "redux-logger";
import rootSaga from "./sagas";
import setAuthorizationToken from "./utils/setAuthorizationToken";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

setAuthorizationToken(localStorage.getItem("jwtToken"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
