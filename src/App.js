import React, { Component } from "react";
import "./assets/styles/main.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as path from "./constants/routePath";
import HomeScreen from "./containers/home";
import LoginScreen from "./containers/login";
import PrivateRoute from "./routes/privateRoute";
import ManageProjectScreen from "./containers/home/manage-project";
import ManagePhaseScreen from "./containers/home/manage-phase";
import ManageTaskScreen from "./containers/home/manage-task";
import ManageMaterialScreen from "./containers/home/manage-material";
import ManageMeasurementScreen from "./containers/home/manage-measurement";

class App extends Component {
  getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  adjustScreen = () => {
    const { width: vw, height: vh } = this.getWindowDimensions();
    var fontsize = 18;
    vw >= 1920
      ? (fontsize = 18)
      : vw >= 1370
      ? (fontsize = 16)
      : vw > 1080
      ? (fontsize = 13)
      : (fontsize = 11);
    document.documentElement.style.fontSize = `${fontsize}px`;
    document.documentElement.style.height = `${vh}px`;
  };

  render() {
    this.adjustScreen();
    return (
      <Router>
        <div id="App">
          <div id="Route">
            <Switch>
              <PrivateRoute
                exact
                path={path.HOME_PAGE_PATH}
                component={HomeScreen}
                token={localStorage.getItem("jwtToken")}
              />
              <Route path={path.LOGIN_PAGE_PATH} component={LoginScreen} />
              <PrivateRoute
                path="/project/:id_user"
                component={ManageProjectScreen}
              />
              <PrivateRoute
                path="/phase/:id_project/:editable"
                component={ManagePhaseScreen}
              />
              <PrivateRoute
                path="/task/:id_phase/:editable"
                component={ManageTaskScreen}
              />
              <PrivateRoute
                path="/material/:id_task/:editable"
                component={ManageMaterialScreen}
              />
              <PrivateRoute
                path="/measurement/:id_task/:editable"
                component={ManageMeasurementScreen}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
