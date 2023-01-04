const mongodb = require("mongodb");
const User = require("../models/User");

exports.login = async (req, res) => {
  const reqData = req.body.data;
  // console.log(reqData);

  const loginUser = await User.findOne({
    $and: [{ email: reqData.email }, { password: reqData.password }],
  });
  // console.log("loginUser:", loginUser);
  if (loginUser !== null) {
    req.session.isLoggedIn = true;
    res.send(req.session.isLoggedIn);
  } else {
    res.statusMessage = "Email or Password wrong";
    res.status(404).end();
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("err:", err);
    }
  });
  res.end();
};

exports.signup = (req, res) => {
  const reqData = req.body;
  const newUser = new User({
    email: reqData.email,
    password: reqData.password,
    cart: { items: [] },
  });
  newUser.save();
  res.end();
};
