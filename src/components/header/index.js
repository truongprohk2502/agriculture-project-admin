import React, { Component } from "react";
import "./style.scss";
import Avatar from "../../assets/images/avatar.png";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutButton: false,
    };
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { showLogoutButton } = this.state;
    const { buttonStatus, setButtonStatus } = this.props;

    return (
      <div className="header">
        <div className="homepage">
          <span>Quản lý dự án nông nghiệp</span>
        </div>
        <div className="manage-container">
          <span
            className={
              buttonStatus.projectManage
                ? "manage-button active"
                : "manage-button"
            }
            onClick={() => setButtonStatus("project")}
          >
            Quản lý dự án
          </span>
          <span
            className={
              buttonStatus.userManage ? "manage-button active" : "manage-button"
            }
            onClick={() => setButtonStatus("user")}
          >
            Quản lý người dùng
          </span>
        </div>
        <div className="avatar">
          <img
            src={Avatar}
            onClick={() =>
              this.setState({ showLogoutButton: !showLogoutButton })
            }
            alt="avatar"
          />
          {showLogoutButton && (
            <span className="logout" onClick={this.handleLogout}>
              Đăng xuất
            </span>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Header);
