import React, { Component } from "react";
import { notification, Popconfirm, Table } from "antd";
import { getListUser, putLockUser } from "../../../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnData: [],
    };
  }

  componentDidMount() {
    this.setState({
      columnData: [
        {
          title: "Họ tên",
          dataIndex: "fullName",
        },
        {
          title: "Kiểu tài khoản",
          render: (data) => (data.local.email ? "Local" : "Gmail"),
        },
        {
          title: "Email",
          render: (data) =>
            data.local.email ? data.local.email : data.google.email,
        },
        {
          title: "Địa chỉ",
          dataIndex: "address",
        },
        {
          title: "Giới tính",
          render: ({ gender }) => (gender ? "Nam" : "Nữ"),
        },
        {
          title: "Dự án",
          render: ({ _id }) => <Link to={"/project/" + _id}>Xem dự án</Link>,
        },
        {
          title: "Hành động",
          render: ({ _id, isActive }) => (
            <Popconfirm
              title={`Bạn có chắc chắn muốn ${
                isActive ? "khóa" : "mở"
              } tài khoản？`}
              okText="Có"
              cancelText="Không"
              onConfirm={() => this.actionUser(_id, !isActive)}
            >
              <a href="">{isActive ? "Khóa tài khoản" : "Mở tài khoản"}</a>
            </Popconfirm>
          ),
        },
      ],
    });
    this.props.getListUser();
  }

  openNotificationWithIcon = (type, lock) => {
    notification[type]({
      message: `${lock ? "Khóa" : "Mở"} tài khoản thành công!`,
      description: `Tài khoản đã được ${lock ? "khóa" : "mở"} thành công!`,
    });
  };

  actionUser = (id, isActive) => {
    this.props.putLockUser({ id, isActive });
    this.openNotificationWithIcon("success", !isActive);
  };

  render() {
    return (
      <div>
        <Table
          dataSource={this.props.listUser}
          columns={this.state.columnData}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getListUser: (data) => dispatch(getListUser(data)),
  putLockUser: (data) => dispatch(putLockUser(data)),
});

const mapStateToProps = (state) => ({
  listUser: state.user.listUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
