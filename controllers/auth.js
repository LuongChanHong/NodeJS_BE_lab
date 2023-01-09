const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer"); // node mail handler
const sendgridTransport = require("nodemailer-sendgrid-transport"); // sendgrid free mail server
const mongodb = require("mongodb");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user: "funix-nodejs-lab",
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
  const errors = validationResult(req).array({ onlyFirstError: true });
  // console.log("errors:", errors);
  if (errors.length <= 0) {
    const loginUser = await User.findOne({ email: reqData.email });
    const isMatch = await comparePassword(reqData.password, loginUser.password);
    // console.log("isMatch:", isMatch);
    if (isMatch) {
      req.session.isLoggedIn = true;
      res.send(req.session.isLoggedIn);
    } else {
      errors.push({ msg: "Wrong password" });
      res.send(errors);
    }
  } else {
    res.send(errors);
  }
  res.end();
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
  const reqData = req.body.data;
  const hashPass = await bcrypt.hash(reqData.password, 12);
  const errors = validationResult(req);
  // console.log("errors:", errors);
  if (errors.errors.length <= 0) {
    const newUser = new User({
      email: reqData.email,
      password: hashPass,
      cart: { items: [] },
    });
    // console.log("newUser:", newUser);
    newUser.save();
    res.end();
  } else {
    res.send(errors);
  }

  // transporter
  //   .sendMail({
  //     to: reqData.email,
  //     from: "mail@gmail.com",
  //     subject: "Signup Success",
  //     html: "<h1>Signup Success</h1>",
  //   })
  //   .then((res) => console.log("res:", res));
  // res.end();
};
