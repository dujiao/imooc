import React from "react";
import { connect } from "react-redux";
import Logo from "../../component/logo/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { login } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlLogin = this.handlLogin.bind(this);
    this.state = {
      user: "",
      pwd: ""
    };
  }
  register() {
    this.props.history.push("/register");
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  handlLogin() {
    this.props.login(this.state);
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.handleChange("user", v)}>
              用户
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.handleChange("pwd", v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
          </List>
          <Button type="primary" onClick={this.handlLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
