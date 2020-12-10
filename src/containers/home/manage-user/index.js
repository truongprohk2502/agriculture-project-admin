import React, { Component } from "react";
import { Popconfirm, Table } from "antd";
import { getListUser } from "../../../actions/user";
import { connect } from "react-redux";

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
          title: "Hành động",
          render: ({ _id, isActive }) => (
            <Popconfirm
              title={`Bạn có chắc chắn muốn ${
                isActive ? "khóa" : "mở"
              } tài khoản？`}
              okText="Có"
              cancelText="Không"
              onConfirm={() => this.actionUser(_id)}
            >
              <a href="">{isActive ? "Khóa tài khoản" : "Mở tài khoản"}</a>
            </Popconfirm>
          ),
        },
      ],
    });
    this.props.getListUser();
  }

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
});

const mapStateToProps = (state) => ({
  listUser: state.user.listUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
