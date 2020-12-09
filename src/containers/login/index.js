import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { loginUser } from "../../actions/auth";
import { connect } from "react-redux";
import "./style.scss";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("jwtToken")) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.props;
    if (nextProps.token !== token) {
      this.props.history.push("/");
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;
    this.props.loginUser({ email, password });
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-container">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.handleLogin}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="email"
              onChange={this.handleChangeInput}
              value={email}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              onChange={this.handleChangeInput}
              value={password}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (data) => dispatch(loginUser(data)),
});
const mapStateToProps = (state) => ({
  error: state.auth.error,
  token: state.auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
