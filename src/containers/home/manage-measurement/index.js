import React, { Component } from "react";
import {
  deleteMeasurement,
  getMeasurement,
  postMeasurement,
  putMeasurement,
} from "../../../actions/measurement";
import "./style.scss";
import { connect } from "react-redux";
import {
  Popconfirm,
  Table,
  Button,
  Drawer,
  Input,
  Row,
  notification,
} from "antd";
import Form from "antd/lib/form/Form";
import "./style.scss";

class ManageMeasurementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      drawerType: "ADD",
      columnData: [],
      name: "",
      guide: "",
      standardNum: "",
      unit: "",
      editId: "",
    };
  }

  componentDidMount() {
    this.props.getMeasurement({ id: this.props.match.params.id_task });
    this.setState({
      columnData: [
        {
          title: "Tên số liệu đo đạc",
          dataIndex: "name",
        },
        {
          title: "Hướng dẫn đo",
          dataIndex: "guide",
        },
        {
          title: "Số liệu chuẩn",
          dataIndex: "standardNum",
        },
        {
          title: "Đơn vị đo",
          dataIndex: "unit",
        },
        {
          title: "Sửa",
          render: ({ _id }) => (
            <a onClick={() => this.editMeasurement(_id)}>Sửa</a>
          ),
        },
        {
          title: "Xóa",
          render: ({ _id }) => (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa？"
              okText="Có"
              cancelText="Không"
              onConfirm={() => this.deleteMeasurement(_id)}
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
          ? "Số liệu đo đạc bạn vừa tao đã được thêm mới thành công."
          : "Số liệu đo đạc bạn vừa sửa đã được cập nhật thành công.",
    });
  };

  showAddMeasurement = () => {
    this.setState({
      showDrawer: true,
      drawerType: "ADD",
      name: "",
      guide: "",
      standardNum: "",
      unit: "",
    });
  };

  editMeasurement = (id) => {
    const measurement = this.props.listMeasurement.find(
      (measurement) => measurement._id === id
    );
    const { name, guide, standardNum, unit } = measurement;
    this.setState({
      name,
      guide,
      standardNum,
      unit,
      editId: id,
      showDrawer: true,
      drawerType: "EDIT",
    });
  };

  deleteMeasurement = (id) => {
    this.props.deleteMeasurement({ id });
  };

  handleChangeText = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCreate = () => {
    const { name, guide, standardNum, unit } = this.state;
    this.props.postMeasurement({
      taskId: this.props.match.params.id_task,
      name,
      guide,
      standardNum: Number(standardNum),
      unit,
    });
    this.openNotificationWithIcon("success");
    this.setState({
      name: "",
      guide: "",
      standardNum: "",
      unit: "",
    });
  };

  handleEdit = () => {
    const { editId, name, guide, standardNum, unit } = this.state;
    this.props.putMeasurement({
      _id: editId,
      name,
      guide,
      standardNum: Number(standardNum),
      unit,
    });
    this.openNotificationWithIcon("success");
  };

  render() {
    const {
      showDrawer,
      drawerType,
      columnData,
      name,
      guide,
      standardNum,
      unit,
    } = this.state;
    return (
      <div>
        <Button
          type="primary"
          className="add-btn"
          onClick={this.showAddMeasurement}
        >
          Thêm mới số liệu đo đạc
        </Button>
        <Table
          dataSource={this.props.listMeasurement}
          columns={columnData}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
        <Drawer
          title={drawerType === "ADD" ? "Thêm mới số liệu đo đạc" : "Sửa số liệu đo đạc"}
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
                placeholder="Nhập tên số liệu đo đạc"
                name="name"
                value={name}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16}>
              <Input
                placeholder="Nhập hướng dẫn đo"
                name="guide"
                value={guide}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16} className="row">
              <Input
                type="number"
                placeholder="Nhập số liệu chuẩn"
                name="standardNum"
                value={standardNum}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16}>
              <Input
                placeholder="Nhập đơn vị đo"
                name="unit"
                value={unit}
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
  getMeasurement: (data) => dispatch(getMeasurement(data)),
  postMeasurement: (data) => dispatch(postMeasurement(data)),
  deleteMeasurement: (data) => dispatch(deleteMeasurement(data)),
  putMeasurement: (data) => dispatch(putMeasurement(data)),
});

const mapStateToProps = (state) => ({
  listMeasurement: state.measurement.listMeasurement,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMeasurementScreen);