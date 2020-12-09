import React, { Component } from "react";
import { deleteTask, getTask, postTask, putTask } from "../../../actions/task";
import "./style.scss";
import { connect } from "react-redux";
import {
  Popconfirm,
  Table,
  Button,
  Drawer,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import Form from "antd/lib/form/Form";
import Checkbox from "antd/lib/checkbox/Checkbox";

class ManageTaskScreen extends Component {
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
      workerNum: "",
      workerUnitFee: "",
      isDailyTask: false,
      editId: "",
    };
  }

  componentDidMount() {
    this.props.getTask({ id: this.props.match.params.id_phase });
    this.setState({
      columnData: [
        {
          title: "Tên công việc",
          dataIndex: "name",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          width: 500,
        },
        {
          title: "Ghi chú",
          dataIndex: "note",
        },
        {
          title: "Thời gian dự toán",
          dataIndex: "estimatedTime",
        },
        {
          title: "Đơn vị thời gian",
          dataIndex: "estimatedTimeUnit",
        },
        {
          title: "Số lượng công nhân",
          dataIndex: "workerNum",
        },
        {
          title: "Tiền lương công nhân",
          dataIndex: "workerUnitFee",
        },
        {
          title: "Là công việc hằng ngày",
          render: ({ isDailyTask }) => (isDailyTask ? "Có" : "Không"),
        },
        {
          title: "Vật liệu",
          render: ({ _id }) => <Link to={"/material/" + _id}>Vật liệu</Link>,
        },
        {
          title: "Đo đạc",
          render: ({ _id }) => <Link to={"/measurement/" + _id}>Đo đạc</Link>,
        },
        {
          title: "Sửa",
          render: ({ _id }) => <a onClick={() => this.editTask(_id)}>Sửa</a>,
        },
        {
          title: "Xóa",
          render: ({ _id }) => (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa？"
              okText="Có"
              cancelText="Không"
              onConfirm={() => this.deleteTask(_id)}
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
          ? "Công việc bạn vừa tao đã được thêm mới thành công."
          : "Công việc bạn vừa sửa đã được cập nhật thành công.",
    });
  };

  showAddTask = () => {
    this.setState({
      showDrawer: true,
      drawerType: "ADD",
      name: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      description: "",
      workerNum: "",
      workerUnitFee: "",
      isDailyTask: false,
    });
  };

  editTask = (id) => {
    const task = this.props.listTask.find((task) => task._id === id);
    const {
      name,
      estimatedTime,
      estimatedTimeUnit,
      description,
      workerNum,
      workerUnitFee,
      isDailyTask,
    } = task;
    this.setState({
      name,
      estimatedTime,
      estimatedTimeUnit,
      description,
      workerNum,
      workerUnitFee,
      isDailyTask,
      editId: id,
      showDrawer: true,
      drawerType: "EDIT",
    });
  };

  deleteTask = (id) => {
    this.props.deleteTask({ id });
  };

  handleChangeText = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCreate = () => {
    const {
      name,
      estimatedTime,
      estimatedTimeUnit,
      description,
      workerNum,
      workerUnitFee,
      isDailyTask,
    } = this.state;
    this.props.postTask({
      phaseId: this.props.match.params.id_phase,
      name,
      estimatedTime: Number(estimatedTime),
      estimatedTimeUnit,
      description,
      workerNum: Number(workerNum),
      workerUnitFee: Number(workerUnitFee),
      isDailyTask,
    });
    this.openNotificationWithIcon("success");
    this.setState({
      name: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      description: "",
      workerNum: "",
      workerUnitFee: "",
      isDailyTask: false,
    });
  };

  handleEdit = () => {
    const {
      editId,
      name,
      estimatedTime,
      estimatedTimeUnit,
      description,
      workerNum,
      workerUnitFee,
      isDailyTask,
    } = this.state;
    this.props.putTask({
      _id: editId,
      name,
      estimatedTime: Number(estimatedTime),
      estimatedTimeUnit,
      description,
      workerNum: Number(workerNum),
      workerUnitFee: Number(workerUnitFee),
      isDailyTask,
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
      workerNum,
      workerUnitFee,
      isDailyTask,
    } = this.state;
    return (
      <div>
        <Button type="primary" className="add-btn" onClick={this.showAddTask}>
          Thêm mới công việc
        </Button>
        <Table
          dataSource={this.props.listTask}
          columns={columnData}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
        <Drawer
          title={drawerType === "ADD" ? "Thêm mới công việc" : "Sửa công việc"}
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
                placeholder="Nhập tên công việc"
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
            <Row gutter={16} className="row">
              <Input
                type="number"
                placeholder="Nhập số lượng công nhân"
                name="workerNum"
                value={workerNum}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16} className="row">
              <Input
                type="number"
                placeholder="Nhập lương mỗi công nhân"
                name="workerUnitFee"
                value={workerUnitFee}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16} className="row">
              <Checkbox
                checked={isDailyTask}
                onChange={() =>
                  this.setState({ isDailyTask: !this.state.isDailyTask })
                }
              >
                Là công việc hằng ngày
              </Checkbox>
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
  getTask: (data) => dispatch(getTask(data)),
  postTask: (data) => dispatch(postTask(data)),
  deleteTask: (data) => dispatch(deleteTask(data)),
  putTask: (data) => dispatch(putTask(data)),
});

const mapStateToProps = (state) => ({
  listTask: state.task.listTask,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskScreen);
