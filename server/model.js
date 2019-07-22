const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/imooc-chat";
mongoose.connect(DB_URL, {
  useNewUrlParser: true
});
mongoose.set('useFindAndModify', false)
const models = {
  user: {
    user: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    avatar: String, //头像
    desc: String, //个人简介或者职位简介
    title: String, //职位名
    company: String,
    money: String
  },
  chat: {}
};
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}


module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};

// mongoose.connection.on("connected", function() {
//   console.log("mongo connect success");
// });