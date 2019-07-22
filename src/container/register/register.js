import React from "react";
import Logo from "../../component/logo/logo";
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../redux/user.redux";
@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pwd: "",
      repeatPwd: "",
      type: "genius"
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChnage(key, value) {
    this.setState({
      [key]: value
    });
    console.log(this.state);
  }
  handleRegister() {
    this.props.register(this.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <InputItem onChange={v => this.handleChnage("user", v)}>
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChnage("pwd", v)}
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChnage("repeatPwd", v)}
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type == "genius"}
            onChange={() => this.handleChnage("type", "genius")}
          >
            牛人
          </RadioItem>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type == "boss"}
            onChange={() => this.handleChnage("type", "boss")}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </List>
      </div>
    );
  }
}
export default Register;
