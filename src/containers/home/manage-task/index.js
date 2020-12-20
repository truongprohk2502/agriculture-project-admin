import React, { Component } from "react";
import {
  deleteTask,
  getTask,
  postTask,
  putTask,
  postImageTask,
  putImageTask,
} from "../../../actions/task";
import { connect } from "react-redux";
import {
  Popconfirm,
  Table,
  Button,
  Drawer,
  Input,
  Row,
  Col,
  Checkbox,
  Select,
  Form,
  Modal,
  notification,
} from "antd";
import { Link } from "react-router-dom";

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
      editable: true,
      imageModelVisible: false,
      taskId: "",
      images: [],
    };
  }

  componentDidMount() {
    this.props.getTask({ id: this.props.match.params.id_phase });
    const editable = this.props.match?.params?.editable;
    this.setState({ editable: editable === "1" });
    let columnData = [
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
        title: "Hình ảnh",
        render: ({ images, _id }) => (
          <a href="" onClick={(e) => this.showImages(e, images, _id)}>
            Hình ảnh
          </a>
        ),
      },
      {
        title: "Vật liệu",
        render: ({ _id }) => (
          <Link to={"/material/" + _id + "/" + editable}>Vật liệu</Link>
        ),
      },
      {
        title: "Đo đạc",
        render: ({ _id }) => (
          <Link to={"/measurement/" + _id + "/" + editable}>Đo đạc</Link>
        ),
      },
    ];
    if (editable === "1") {
      columnData = [
        ...columnData,
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
      ];
    }
    this.setState({
      columnData,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listTask !== this.props.listTask) {
      const task = nextProps.listTask.find(
        (tsk) => tsk._id === this.state.taskId
      );
      if (task) {
        this.setState({ images: task.images });
      }
    }
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

  deleteImage = (imgRemove) => {
    this.props.putImageTask({
      images: this.state.images.filter((img) => img !== imgRemove),
      taskId: this.state.taskId,
    });
  };

  uploadImage = (e) => {
    this.props.postImageTask({
      file: e.target.files[0],
      taskId: this.state.taskId,
    });
  };

  showImages = (e, images, id) => {
    e.preventDefault();
    this.setState({ imageModelVisible: true, images, taskId: id });
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
      editable,
      imageModelVisible,
    } = this.state;
    return (
      <div>
        {editable ? (
          <Button
            type="primary"
            className="add-btn"
            onClick={this.showAddTask}
            style={{ margin: "10px" }}
          >
            Thêm mới công việc
          </Button>
        ) : (
          <h1 style={{ marginLeft: 10 }}>Danh sách công việc</h1>
        )}
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
          width={480}
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
              <Col span={24}>
                <Form.Item name="name" label="Tên giai đoạn">
                  {console.log(name)}
                  <Input
                    placeholder="Nhập tên công việc"
                    name="name"
                    value={name}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="name" label="Mô tả công việc">
                  {console.log(description)}
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập mô tả"
                    name="description"
                    value={description}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="estimatedTimeUnit" label="Đơn vị thời gian">
                  {console.log(estimatedTimeUnit)}
                  <Select
                    placeholder="Nhập đơn vị thời gian"
                    name="estimatedTimeUnit"
                    value={estimatedTimeUnit}
                    onChange={(value) =>
                      this.setState({ estimatedTimeUnit: value })
                    }
                  >
                    <Select.Option value="Ngày">Ngày</Select.Option>
                    <Select.Option value="Tháng">Tháng</Select.Option>
                    <Select.Option value="Năm">Năm</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="estimatedTime" label="Thời gian dự toán">
                  {console.log(estimatedTime)}
                  <Input
                    addonAfter={estimatedTimeUnit}
                    type="number"
                    placeholder="Nhập thời gian dự toán"
                    name="estimatedTime"
                    value={estimatedTime}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="workerNum" label="Số lượng công nhân">
                  {console.log(workerNum)}
                  <Input
                    type="number"
                    placeholder="Nhập số lượng công nhân"
                    name="workerNum"
                    value={workerNum}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="workerUnitFee" label="Lương mỗi công nhân">
                  {console.log(workerUnitFee)}
                  <Input
                    type="number"
                    placeholder="Nhập lương mỗi công nhân"
                    name="workerUnitFee"
                    value={workerUnitFee}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                {console.log(isDailyTask)}
                <Checkbox
                  checked={isDailyTask}
                  onChange={() =>
                    this.setState({ isDailyTask: !this.state.isDailyTask })
                  }
                >
                  Là công việc hằng ngày
                </Checkbox>
              </Col>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
            >
              {drawerType === "ADD" ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Form>
        </Drawer>
        <Modal
          title="Hình ảnh dự án"
          centered
          visible={imageModelVisible}
          onCancel={() => this.setState({ imageModelVisible: false })}
          footer={
            editable ? <input type="file" onChange={this.uploadImage} /> : null
          }
          width={1000}
        >
          <div style={{ display: "flex" }}>
            {this.state.images.map((img, index) => (
              <div
                style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }}
              >
                <div>
                  <img key={index} src={img} width={200} alt="img" />
                </div>
                {editable && (
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa？"
                    okText="Có"
                    cancelText="Không"
                    onConfirm={() => this.deleteImage(img)}
                  >
                    <Button type="primary" danger style={{ marginTop: 10 }}>
                      Xóa
                    </Button>
                  </Popconfirm>
                )}
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTask: (data) => dispatch(getTask(data)),
  postTask: (data) => dispatch(postTask(data)),
  deleteTask: (data) => dispatch(deleteTask(data)),
  putTask: (data) => dispatch(putTask(data)),
  postImageTask: (data) => dispatch(postImageTask(data)),
  putImageTask: (data) => dispatch(putImageTask(data)),
});

const mapStateToProps = (state) => ({
  listTask: state.task.listTask,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskScreen);
