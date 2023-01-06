const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer"); // node mail handler
const sendgridTransport = require("nodemailer-sendgrid-transport"); // sendgrid free mail server
const mongodb = require("mongodb");

const User = require("../models/User");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user: "hongmainmail@gmail.com",
      api_key:
        "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", // key from sendgrid (page) user API Key fearture
    },
  })
);

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

exports.login = async (req, res) => {
  const reqData = req.body.data;
  // console.log(reqData);

  const loginUser = await User.findOne({ email: reqData.email });
  // console.log("loginUser:", loginUser);
  // console.log("isMatch:", isMatch);
  if (loginUser !== null) {
    const isMatch = await comparePassword(reqData.password, loginUser.password);
    if (isMatch) {
      req.session.isLoggedIn = true;
      res.send(req.session.isLoggedIn);
    } else {
      res.statusMessage = "Password wrong";
      res.status(404).end();
    }
  } else {
    res.statusMessage = "Email wrong";
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

exports.signup = async (req, res) => {
  const reqData = req.body;
  const hashPass = await bcrypt.hash(reqData.password, 12);
  const newUser = new User({
    email: reqData.email,
    password: hashPass,
    cart: { items: [] },
  });
  newUser.save();

  await transporter.sendMail({
    to: reqData.email,
    from: "mail@gmail.com",
    subject: "Signup Success",
    html: "<h1>Signup Success</h1>",
  });
  res.end();
};
