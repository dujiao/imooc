import React from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile";
import browserCookie from "browser-cookies";

@connect(state => state.user)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const alert = Modal.alert;
    alert("注销", "确认要退出登录吗？", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确认",
        onPress: () => {
          browserCookie.erase("userId");
          console.log("logOur");
        }
      }
    ]);
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${props.avatar}.png`)}
              style={{ width: "50px" }}
              alt=""
            />
          }
          title={props.user}
          message={props.type === "boss" ? props.company : null}
        />
        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {props.title}
            {props.desc.split("\n").map((v, index) => (
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <Button onClick={this.logout} type="primary">
          退出登录
        </Button>
      </div>
    ) : null;
  }
}

export default User;
