import React, { Component } from "react";
import {
  deletePhase,
  getPhase,
  postPhase,
  putPhase,
} from "../../../actions/phase";
import "./style.scss";
import { connect } from "react-redux";
import { Popconfirm, Table, Button, Drawer, Input, Row, Select, notification } from "antd";
import { Link } from "react-router-dom";
import Form from "antd/lib/form/Form";

class ManagePhaseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      drawerType: "ADD",
      columnData: [],
      name: "",
      description: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      editId: ""
    };
  }

  componentDidMount() {
    this.props.getPhase({ id: this.props.match.params.id_project });
    this.setState({
      columnData: [
        {
          title: "Tên giai đoạn",
          dataIndex: "name",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          width: 500,
        },
        {
          title: "Thời gian dự toán",
          dataIndex: "estimatedTime",
        },
        {
          title: "Công việc",
          render: ({ _id }) => <Link to={"/task/" + _id}>Công việc</Link>,
        },
        {
          title: "Sửa",
          render: ({ _id }) => <a onClick={() => this.editPhase(_id)}>Sửa</a>,
        },
        {
          title: "Xóa",
          render: ({ _id }) => (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa？"
              okText="Có"
              cancelText="Không"
              onConfirm={() => this.deletePhase(_id)}
            >
              <a href="">Xóa</a>
            </Popconfirm>
          ),
        },
      ],
    });
  }

  openNotificationWithIcon = (type) => {
    notification[type]({
      message:
        this.state.drawerType === "ADD"
          ? "Thêm mới thành công"
          : "Cập nhật thành công",
      description:
        this.state.drawerType === "ADD"
          ? "Giai đoạn bạn vừa tao đã được thêm mới thành công."
          : "Giai đoạn bạn vừa sửa đã được cập nhật thành công.",
    });
  };

  showAddPhase = () => {
    this.setState({
      showDrawer: true,
      drawerType: "ADD",
      name: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      description: "",
    });
  };

  editPhase = (id) => {
    const phase = this.props.listPhase.find(
        (phase) => phase._id === id
      );
      const {
        name,
        estimatedTime,
        estimatedTimeUnit,
        description,
      } = phase;
      this.setState({
        name,
        estimatedTime,
        estimatedTimeUnit,
        description,
        editId: id,
        showDrawer: true,
        drawerType: "EDIT",
      });
  };

  deletePhase = (id) => {
    this.props.deletePhase({ id });
  };

  handleChangeText = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCreate = () => {
    const { name, estimatedTime, estimatedTimeUnit, description } = this.state;
    this.props.postPhase({
      projectId: this.props.match.params.id_project,
      name,
      estimatedTime: Number(estimatedTime),
      estimatedTimeUnit,
      description,
    });
    this.openNotificationWithIcon("success");
    this.setState({
      name: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      description: "",
    });
  };

  handleEdit = () => {
    const {
        editId,
        name,
        estimatedTime,
        estimatedTimeUnit,
        description,
      } = this.state;
      this.props.putPhase({
        _id: editId,
        name,
        estimatedTime: Number(estimatedTime),
        estimatedTimeUnit,
        description,
      });
      this.openNotificationWithIcon("success");
  };

  render() {
    const {
      showDrawer,
      drawerType,
      columnData,
      name,
      description,
      estimatedTime,
      estimatedTimeUnit,
    } = this.state;
    return (
      <div>
        <Button type="primary" className="add-btn" onClick={this.showAddPhase}>
          Thêm mới giai đoạn
        </Button>
        <Table
          dataSource={this.props.listPhase}
          columns={columnData}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
        <Drawer
          title={drawerType === "ADD" ? "Thêm mới giai đoạn" : "Sửa giai đoạn"}
          placement="right"
          closable={true}
          width={300}
          onClose={() => this.setState({ showDrawer: false })}
          visible={showDrawer}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={
              drawerType === "ADD" ? this.handleCreate : this.handleEdit
            }
          >
            <Row gutter={16}>
              <Input
                placeholder="Nhập tên giai đoạn"
                name="name"
                value={name}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16}>
              <Input.TextArea
                rows={4}
                placeholder="Nhập mô tả"
                name="description"
                value={description}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16}>
              <Select
                name="estimatedTimeUnit"
                value={estimatedTimeUnit}
                onChange={(value) =>
                  this.setState({ estimatedTimeUnit: value })
                }
              >
                <Select.Option value="">Chọn đơn vị thời gian</Select.Option>
                <Select.Option value="Ngày">Ngày</Select.Option>
                <Select.Option value="Tháng">Tháng</Select.Option>
                <Select.Option value="Năm">Năm</Select.Option>
              </Select>
            </Row>
            <Row gutter={16} className="row">
              <Input
                type="number"
                placeholder="Nhập thời gian dự toán"
                name="estimatedTime"
                value={estimatedTime}
                onChange={this.handleChangeText}
              />
            </Row>
            <Button type="primary" htmlType="submit">
              {drawerType === "ADD" ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPhase: (data) => dispatch(getPhase(data)),
  postPhase: (data) => dispatch(postPhase(data)),
  deletePhase: (data) => dispatch(deletePhase(data)),
  putPhase: (data) => dispatch(putPhase(data)),
});

const mapStateToProps = (state) => ({
  listPhase: state.phase.listPhase,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePhaseScreen);
