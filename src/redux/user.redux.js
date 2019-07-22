import axios from "axios";
import {
  getRedirectPath
} from "../util";

// const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
// const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS"

const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: "",
  type: "",
};

//reducer
export function user(state = initState, action) {
  console.log(action.type)
  switch (action.type) {
    case "AUTH_SUCCESS":
      console.log(action.payload)
      return {
        ...state,
        msg: "",
          redirectTo: getRedirectPath(action.payload),
          isAuth: true,
          ...action.payload
      };
    case "ERROR_MSG":
      console.log(action);
      return {
        ...state,
        isAuth: false,
          msg: action.msg
      };
    case "LOAD_DATA":
      console.log(action);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  };
}

function authSuccess(data) {
  console.log(data)
  return {
    type: AUTH_SUCCESS,
    payload: data
  };
}
export function register({
  user,
  pwd,
  repeatPwd,
  type
}) {
  if (!user || !pwd || !type) {
    return errorMsg("用户名密码必须输入");
  }
  if (pwd !== repeatPwd) {
    return errorMsg("密码和确认密码不同");
  }

  return dispatch => {
    axios
      .post("/user/register", {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(
            authSuccess({
              user,
              pwd,
              type
            })
          );
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      })
      .catch(err => {});
  };
}

export function login({
  user,
  pwd
}) {
  if (!user || !pwd) {
    return errorMsg("用户名密码必须输入");
  }
  return dispatch => {
    axios
      .post("/user/login", {
        user,
        pwd
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}

export function loadData(userInfo) {
  return {
    type: LOAD_DATA,
    payload: userInfo
  };
}

export function update(data) {
  return dispatch => {
    axios
      .post("/user/update", data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}