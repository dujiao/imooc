import React from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../userCard/userCard";

@connect(
  state => state.chatUser,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList("genius");
  }
  render() {
    return <UserCard userList={this.props.userList} />;
  }
}

export default Genius;
