import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { loadData } from "../../redux/user.redux";
import { connect } from "react-redux";
@withRouter
@connect(
  null,
  {
    loadData
  }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const pubilcList = ["/login", "/register"];
    const pathName = this.props.location.pathname;
    if (pubilcList.indexOf(pathName) > -1) {
      return null;
    }
    //获取用户信息
    axios.get("/user/info").then(res => {
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.code === 0) {
          this.props.loadData(res.data.data);
        } else {
          this.props.history.push("/login");
        }
      }
    });
    // 是否登录
    //现在的url地址，login是不需要跳转的

    //用户的type 身份是boss还是牛人
    //用户是否完善信息（选择头像  个人简介）
  }
  render() {
    return <h1> </h1>;
  }
}

export default AuthRoute;
