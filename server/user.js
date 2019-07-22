const express = require("express");
const utils = require("utility");
const Router = express.Router();
const model = require("./model");

const User = model.getModel("user");


const _filter = {
  pwd: 0,
  __v: 0
};
Router.get("/list",
  function (req, res) {
    // User.remove({}, function(err, doc) {});
    const query = req.query.type ? {
      type: req.query.type
    } : {}
    User.find(query, _filter, function (err, doc) {
      return res.json({
        code: 0,
        data: doc
      });
    });
  });

Router.post("/register", function (req, res) {
  const {
    user,
    pwd,
    type
  } = req.body;
  User.findOne({
    user: user
  }, function (err, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: "用户名重复"
      });
    }
    const userModel = new User({
      user,
      type,
      pwd: utils.md5(pwd)
    });
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({
          code: 1,
          msg: "注册失败"
        });
      }
      const {
        user,
        type,
        _id
      } = doc;
      res.cookie("userId", _id);
      return res.json({
        code: 0,
        data: {
          user,
          type,
          _id
        }
      });
    });
  });
});
Router.post("/login", function (req, res) {
  const {
    user,
    pwd
  } = req.body;
  User.findOne({
    user: user,
    pwd: utils.md5(pwd)
  }, _filter, function (
    err,
    doc
  ) {
    if (doc) {
      res.cookie("userId", doc._id);
      return res.json({
        code: 0,
        data: doc
      });
    } else {
      return res.json({
        code: 1,
        msg: "用户名或者密码错误"
      });
    }
  });
});

Router.get("/info", function (req, res) {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.json({
      code: 1
    });
  }
  User.findOne({
    _id: userId
  }, _filter, function (err, doc) {
    if (err) {
      console.log(err);
      return res.json({
        code: 1,
        msg: "查询失败"
      });
    }
    if (doc) {
      return res.json({
        code: 0,
        data: doc
      });
    }
  });
});

Router.post("/update", function (req, res) {
  // User.remove({}, function(err, doc) {});
  const userId = req.cookies.userId;
  if (!userId) {
    return res.json({
      code: 1
    });
  }
  const body = req.body
  User.findOneAndUpdate({
    _id: userId
  }, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({
      code: 0,
      data
    })
  })
});

module.exports = Router;