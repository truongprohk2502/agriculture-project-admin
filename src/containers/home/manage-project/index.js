import React, { Component } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  Modal,
  notification,
} from "antd";
import { connect } from "react-redux";
import {
  getSampleProject,
  getActualProject,
  postSampleProject,
  deleteSampleProject,
  putSampleProject,
  putLockProject,
  postImageProject,
  putImageProject,
} from "../../../actions/project";
import { Link } from "react-router-dom";

class ManageProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenType: "",
      showDrawer: false,
      drawerType: "ADD",
      columnData: [],
      name: "",
      minimalScale: 0,
      standardUnit: "",
      estimatedCost: 0,
      estimatedTime: 0,
      estimatedTimeUnit: "",
      estimatedQuantity: 0,
      unitPrice: 0,
      description: "",
      editId: "",
      standardGap: [],
      newGap: "",
      imageModelVisible: false,
      projectId: "",
      images: [],
    };
  }

  componentDidMount() {
    const userId = this.props.match?.params?.id_user;
    if (userId) {
      this.props.getActualProject({ id: userId });
      this.setState({ screenType: "ACTUAL" });
    } else {
      this.props.getSampleProject();
      this.setState({ screenType: "SAMPLE" });
    }
    const columnData = [
      {
        title: "Tên dự án",
        dataIndex: "name",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        width: 500,
      },
      {
        title: "Tiêu chuẩn",
        render: (data) => data.standardGap.join(", "),
      },
      {
        title: "Quy mô tối thiểu",
        dataIndex: "minimalScale",
      },
      {
        title: "Đơn vị chuẩn",
        dataIndex: "standardUnit",
      },
      {
        title: "Chi phí dự toán",
        dataIndex: "estimatedCost",
      },
      {
        title: "Đon vị thời gian",
        dataIndex: "estimatedTimeUnit",
      },
      {
        title: "Sản lượng dự toán",
        dataIndex: "estimatedQuantity",
      },
      {
        title: "Đơn giá",
        dataIndex: "unitPrice",
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
        title: "Giai đoạn",
        render: ({ _id }) => (
          <Link to={"/phase/" + _id + "/" + (userId ? "0" : "1")}>
            Giai đoạn
          </Link>
        ),
      },
    ];
    this.setState({
      columnData: userId
        ? [
            ...columnData,
            {
              title: "Hành động",
              render: ({ _id, isActive }) => (
                <Popconfirm
                  title="Bạn có chắc chắn？"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => this.lockProject(_id, !isActive)}
                >
                  <a href="">{isActive ? "Khóa" : "Mở"}</a>
                </Popconfirm>
              ),
            },
          ]
        : [
            ...columnData,
            {
              title: "Sửa",
              render: ({ _id }) => (
                <a onClick={() => this.editProject(_id)}>Sửa</a>
              ),
            },
            {
              title: "Xóa",
              render: ({ _id }) => (
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa？"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => this.deleteProject(_id)}
                >
                  <a href="">Xóa</a>
                </Popconfirm>
              ),
            },
            {
              title: "Hành động",
              render: ({ _id, isActive }) => (
                <Popconfirm
                  title="Bạn có chắc chắn？"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => this.lockProject(_id, !isActive)}
                >
                  <a href="">{isActive ? "Khóa" : "Mở"}</a>
                </Popconfirm>
              ),
            },
          ],
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listSampleProject !== this.props.listSampleProject) {
      const project = nextProps.listSampleProject.find(
        (prj) => prj._id === this.state.projectId
      );
      if (project) {
        this.setState({ images: project.images });
      }
    }
  }

  lockProject = (_id, isActive) => {
    this.props.putLockProject({ _id, isActive });
    notification["success"]({
      message: `${isActive ? "Mở" : "Khóa"} dự án thành công`,
    });
  };

  openNotificationWithIcon = (type) => {
    notification[type]({
      message:
        this.state.drawerType === "ADD"
          ? "Thêm mới thành công"
          : "Cập nhật thành công",
      description:
        this.state.drawerType === "ADD"
          ? "Dự án bạn vừa tao đã được thêm mới thành công."
          : "Dự án bạn vừa sửa đã được cập nhật thành công.",
    });
  };

  showImages = (e, images, id) => {
    e.preventDefault();
    this.setState({ imageModelVisible: true, images, projectId: id });
  };

  editProject = (id) => {
    const project = this.props.listSampleProject.find(
      (project) => project._id === id
    );
    const {
      name,
      minimalScale,
      standardUnit,
      estimatedCost,
      estimatedTime,
      estimatedTimeUnit,
      estimatedQuantity,
      unitPrice,
      description,
      standardGap,
    } = project;
    this.setState({
      name,
      minimalScale,
      standardUnit,
      estimatedCost,
      estimatedTime,
      estimatedTimeUnit,
      estimatedQuantity,
      unitPrice,
      description,
      standardGap,
      editId: id,
      showDrawer: true,
      drawerType: "EDIT",
    });
  };

  deleteProject = (id) => {
    this.props.deleteSampleProject({ id });
  };

  showAddProject = () => {
    this.setState({
      showDrawer: true,
      drawerType: "ADD",
      name: "",
      minimalScale: "",
      standardUnit: "",
      estimatedCost: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      estimatedQuantity: "",
      unitPrice: "",
      description: "",
      standardGap: [],
    });
  };

  handleChangeText = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCreate = () => {
    const {
      name,
      minimalScale,
      standardUnit,
      estimatedCost,
      estimatedTime,
      estimatedTimeUnit,
      estimatedQuantity,
      unitPrice,
      description,
      standardGap,
    } = this.state;
    this.props.postSampleProject({
      name,
      minimalScale: Number(minimalScale),
      standardUnit,
      estimatedCost: Number(estimatedCost),
      estimatedTime: Number(estimatedTime),
      estimatedTimeUnit,
      estimatedQuantity: Number(estimatedQuantity),
      unitPrice: Number(unitPrice),
      description,
      standardGap,
    });
    this.openNotificationWithIcon("success");
    this.setState({
      name: "",
      minimalScale: "",
      standardUnit: "",
      estimatedCost: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      estimatedQuantity: "",
      unitPrice: "",
      description: "",
      standardGap: [],
    });
  };

  handleEdit = () => {
    const {
      editId,
      name,
      minimalScale,
      standardUnit,
      estimatedCost,
      estimatedTime,
      estimatedTimeUnit,
      estimatedQuantity,
      unitPrice,
      description,
      standardGap,
    } = this.state;
    this.props.putSampleProject({
      _id: editId,
      name,
      minimalScale: Number(minimalScale),
      standardUnit,
      estimatedCost: Number(estimatedCost),
      estimatedTime: Number(estimatedTime),
      estimatedTimeUnit,
      estimatedQuantity: Number(estimatedQuantity),
      unitPrice: Number(unitPrice),
      description,
      standardGap,
    });
    this.openNotificationWithIcon("success");
  };

  deleteImage = (imgRemove) => {
    this.props.putImageProject({
      images: this.state.images.filter((img) => img !== imgRemove),
      projectId: this.state.projectId,
    });
  };

  uploadImage = (e) => {
    this.props.postImageProject({
      file: e.target.files[0],
      projectId: this.state.projectId,
    });
  };

  render() {
    const {
      name,
      minimalScale,
      standardUnit,
      estimatedCost,
      estimatedTime,
      estimatedTimeUnit,
      estimatedQuantity,
      unitPrice,
      description,
      standardGap,
      drawerType,
      columnData,
      showDrawer,
      screenType,
      imageModelVisible,
    } = this.state;
    return (
      <div>
        {screenType === "SAMPLE" ? (
          <Button
            type="primary"
            className="add-btn"
            onClick={this.showAddProject}
            style={{ margin: "10px" }}
          >
            Thêm mới dự án
          </Button>
        ) : (
          <h1 style={{ marginLeft: 10 }}>Danh sách dự án</h1>
        )}
        <Table
          dataSource={this.props.listSampleProject}
          columns={columnData}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
        <Drawer
          title={drawerType === "ADD" ? "Thêm mới dự án" : "Sửa dự án"}
          placement="right"
          closable={true}
          width={720}
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
              <Col span={12}>
                <Form.Item name="name" label="Tên dự án">
                  {console.log(name)}
                  <Input
                    placeholder="Nhập tên dự án"
                    name="name"
                    value={name}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="standardUnit" label="Đơn vị chuẩn">
                  {console.log(standardUnit)}
                  <Input
                    placeholder="Nhập đơn vị chuẩn"
                    name="standardUnit"
                    value={standardUnit}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="minimalScale" label="Quy mô tối thiểu">
                  {console.log(minimalScale)}
                  <Input
                    type="number"
                    placeholder="Nhập quy mô tối thiểu"
                    addonAfter={standardUnit}
                    name="minimalScale"
                    value={minimalScale}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="estimatedCost" label="Chi phí dự toán">
                  {console.log(estimatedCost)}
                  <Input
                    type="number"
                    placeholder="Nhập chi phí dự toán"
                    addonAfter="đồng"
                    name="estimatedCost"
                    value={estimatedCost}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="estimatedTime" label="Thời gian dự toán">
                  {console.log(estimatedTime)}
                  <Input
                    type="number"
                    placeholder="Nhập thời gian dự toán"
                    name="estimatedTime"
                    value={estimatedTime}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="estimatedTimeUnit"
                  label="Đơn vị thời gian dự toán"
                >
                  {console.log(estimatedTimeUnit)}
                  <Select
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
              <Col span={12}>
                <Form.Item
                  name="estimatedQuantity"
                  label="Số lượng sản phẩm dự toán"
                >
                  {console.log(estimatedQuantity)}
                  <Input
                    type="number"
                    placeholder="Nhập số lượng sản phẩm dự toán"
                    name="estimatedQuantity"
                    value={estimatedQuantity}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="unitPrice" label="Đơn giá">
                  {console.log(unitPrice)}
                  <Input
                    type="number"
                    placeholder="Nhập đơn giá"
                    addonAfter="đồng"
                    name="unitPrice"
                    value={unitPrice}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                {console.log(standardGap)}
                <Form.Item name="standardGap" label="Tiêu chuẩn">
                  <div className="gap">
                    {standardGap.map((gap, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={() =>
                          this.setState((prevState) => {
                            return {
                              ...prevState,
                              standardGap: prevState.standardGap.filter(
                                (gap2) => gap2 !== gap
                              ),
                            };
                          })
                        }
                      >
                        {gap}
                      </Tag>
                    ))}
                    <input
                      placeholder="Nhập tiêu chuẩn mới"
                      name="newGap"
                      value={this.state.newGap}
                      onChange={this.handleChangeText}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            standardGap: [
                              ...prevState.standardGap,
                              this.state.newGap,
                            ],
                            newGap: "",
                          };
                        })
                      }
                    >
                      Add
                    </button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="Mô tả dự án">
                  {console.log(description)}
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập mô tả dự án"
                    name="description"
                    value={description}
                    onChange={this.handleChangeText}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
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
            screenType === "SAMPLE" ? (
              <input type="file" onChange={this.uploadImage} />
            ) : null
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
                {screenType === "SAMPLE" && (
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
  getSampleProject: () => dispatch(getSampleProject()),
  getActualProject: (data) => dispatch(getActualProject(data)),
  postSampleProject: (data) => dispatch(postSampleProject(data)),
  deleteSampleProject: (data) => dispatch(deleteSampleProject(data)),
  putSampleProject: (data) => dispatch(putSampleProject(data)),
  putLockProject: (data) => dispatch(putLockProject(data)),
  postImageProject: (data) => dispatch(postImageProject(data)),
  putImageProject: (data) => dispatch(putImageProject(data)),
});

const mapStateToProps = (state) => ({
  listSampleProject: state.project.listSampleProject,
  error: state.project.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject);
