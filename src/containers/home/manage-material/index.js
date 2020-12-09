import React, { Component } from "react";
import {
  deleteMaterial,
  getMaterial,
  postMaterial,
  putMaterial,
} from "../../../actions/material";
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

class ManageMaterialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      drawerType: "ADD",
      columnData: [],
      name: "",
      quantity: "",
      unit: "",
      unitPrice: "",
      editId: "",
    };
  }

  componentDidMount() {
    this.props.getMaterial({ id: this.props.match.params.id_task });
    this.setState({
      columnData: [
        {
          title: "Tên vật liệu",
          dataIndex: "name",
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
        },
        {
          title: "Đơn vị vật liệu",
          dataIndex: "unit",
        },
        {
          title: "Đơn giá",
          dataIndex: "unitPrice",
        },
        {
          title: "Sửa",
          render: ({ _id }) => (
            <a onClick={() => this.editMaterial(_id)}>Sửa</a>
          ),
        },
        {
          title: "Xóa",
          render: ({ _id }) => (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa？"
              okText="Có"
              cancelText="Không"
              onConfirm={() => this.deleteMaterial(_id)}
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
          ? "Vật liệu bạn vừa tao đã được thêm mới thành công."
          : "Vật liệu bạn vừa sửa đã được cập nhật thành công.",
    });
  };

  showAddMaterial = () => {
    this.setState({
      showDrawer: true,
      drawerType: "ADD",
      name: "",
      quantity: "",
      unit: "",
      unitPrice: "",
    });
  };

  editMaterial = (id) => {
    const material = this.props.listMaterial.find(
      (material) => material._id === id
    );
    const { name, quantity, unit, unitPrice } = material;
    this.setState({
      name,
      quantity,
      unit,
      unitPrice,
      editId: id,
      showDrawer: true,
      drawerType: "EDIT",
    });
  };

  deleteMaterial = (id) => {
    this.props.deleteMaterial({ id });
  };

  handleChangeText = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCreate = () => {
    const { name, quantity, unit, unitPrice } = this.state;
    this.props.postMaterial({
      taskId: this.props.match.params.id_task,
      name,
      quantity: Number(quantity),
      unit,
      unitPrice: Number(unitPrice),
    });
    this.openNotificationWithIcon("success");
    this.setState({
      name: "",
      quantity: "",
      unit: "",
      unitPrice: "",
    });
  };

  handleEdit = () => {
    const { editId, name, quantity, unit, unitPrice } = this.state;
    this.props.putMaterial({
      _id: editId,
      name,
      quantity: Number(quantity),
      unit,
      unitPrice: Number(unitPrice),
    });
    this.openNotificationWithIcon("success");
  };

  render() {
    const {
      showDrawer,
      drawerType,
      columnData,
      name,
      quantity,
      unit,
      unitPrice,
    } = this.state;
    return (
      <div>
        <Button
          type="primary"
          className="add-btn"
          onClick={this.showAddMaterial}
        >
          Thêm mới vật liệu
        </Button>
        <Table
          dataSource={this.props.listMaterial}
          columns={columnData}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
        <Drawer
          title={drawerType === "ADD" ? "Thêm mới vật liệu" : "Sửa vật liệu"}
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
                placeholder="Nhập tên vật liệu"
                name="name"
                value={name}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16}>
              <Input
                placeholder="Nhập số lượng"
                type="number"
                name="quantity"
                value={quantity}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16}>
              <Input
                placeholder="Nhập đơn vị vật liệu"
                name="unit"
                value={unit}
                onChange={this.handleChangeText}
              />
            </Row>
            <Row gutter={16} className="row">
              <Input
                type="number"
                placeholder="Nhập đơn giá"
                name="unitPrice"
                value={unitPrice}
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
  getMaterial: (data) => dispatch(getMaterial(data)),
  postMaterial: (data) => dispatch(postMaterial(data)),
  deleteMaterial: (data) => dispatch(deleteMaterial(data)),
  putMaterial: (data) => dispatch(putMaterial(data)),
});

const mapStateToProps = (state) => ({
  listMaterial: state.material.listMaterial,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMaterialScreen);
