import React from "react";
import PropTypes from "prop-types";

import { Grid, List } from "antd-mobile";

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      icon: ""
    };
  }
  render() {
    const avatarList = "boy,boy1,boy2,boy3,boy4,girl,girl1,girl2,girl3,girl4"
      .split(",")
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));

    const getHeader = this.state.icon ? (
      <div>
        <span>已选择头像 </span>
        <img src={this.state.icon.icon} style={{ maxWidth: "30px" }} />
      </div>
    ) : (
      "请选择头像"
    );
    return (
      <div>
        <List renderHeader={v => getHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm => {
              this.setState({
                icon: elm
              });
              this.props.selectAvatar(elm.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
