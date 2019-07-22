import React from "react";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import PropTypes from "prop-types";
class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  };
  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userList.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Card.Body>
                {v.type == 'boss' ? <div>公司：{v.company}</div> : null}

                {v.desc.split("\n").map((d,index)=> (
                  <div key={index}>{d}</div>
                ))}
                {v.type=='boss'?<div>薪资：{v.money}</div>:null}
              </Card.Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    );
  }
}

export default UserCard;
