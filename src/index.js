import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthRoute from "./component/authRoute/authRoute";
import Login from "./container/login/login";
import Register from "./container/register/register";
import BossInfo from "./container/bossInfo/bossInfo";
import GeniusInfo from "./container/geniusInfo/geniusInfo";
import DashBoard from "./component/dashBoard/dashBoard";

import reducers from "./reducer";
import "./config";

import "./index.css";
// import App from './App';
// import * as serviceWorker from './serviceWorker';
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route component={DashBoard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
