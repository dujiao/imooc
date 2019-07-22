import React from "react";

import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { update } from "../../redux/user.redux";

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      avatar: ""
    };
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && path !== redirect ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={imgName => {
            console.log(imgName);
            this.setState({
              avatar: imgName
            });
          }}
        />
        <InputItem onChange={v => this.onChange("title", v)}>
        求职岗位
        </InputItem>
        <TextareaItem
          title="个人简介"
          onChange={v => this.onChange("desc", v)}
          rows={3}
          autoHeight
        />

        <Button type="primary" onClick={() => this.props.update(this.state)}>
          保存
        </Button>
      </div>
    );
  }
}

export default GeniusInfo;
