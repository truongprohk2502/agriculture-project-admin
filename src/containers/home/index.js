import React, { Component } from "react";
import Header from "../../components/header";
import ManageProject from "./manage-project";
import ManageUser from "./manage-user";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manageButtonStatus: {
        projectManage: true,
        userManage: false,
      },
    };
  }

  setButtonStatus = (buttonName) => {
    buttonName === "project"
      ? this.setState({
          manageButtonStatus: { projectManage: true, userManage: false },
        })
      : this.setState({
          manageButtonStatus: { projectManage: false, userManage: true },
        });
  };

  render() {
    const { projectManage } = this.state.manageButtonStatus;

    return (
      <div>
        <Header
          buttonStatus={this.state.manageButtonStatus}
          setButtonStatus={this.setButtonStatus}
        />
        {projectManage ? <ManageProject /> : <ManageUser />}
      </div>
    );
  }
}

export default HomeScreen;
