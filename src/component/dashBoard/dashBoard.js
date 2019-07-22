import React from "react";
import { NavBar } from "antd-mobile";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import NavLinkBar from "../navLink/navLink";
import Boss from "../boss/boss";
import Genius from "../genius/genius";
import User from '../user/user';
function Msg(params) {
  return <h1>消息</h1>;
}


@connect(state => state)
@withRouter
class DashBoard extends React.Component {
  render() {
    const user = this.props.user;
    console.log(this.props);
    const { pathname } = this.props.location;
    console.log(pathname);
    const navList = [
      {
        text: "牛人",
        path: "/boss",
        icon: "list",
        title: "牛人列表",
        component: Genius,
        hide: user.type === "genius"
      },
      {
        text: "BOSS",
        path: "/genius",
        icon: "list",
        title: "BOSS列表",
        component: Boss,
        hide: user.type === "boss"
      },
      {
        text: "消息",
        path: "/msg",
        icon: "msg",
        title: "消息列表",
        component: Msg,
        hide: false
      },
      {
        text: "我",
        path: "/me",
        icon: "me",
        title: "个人中心",
        component: User,
        hide: false
      }
    ];
    return (
      <div>
        <NavBar mode="dark">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}
export default DashBoard;
