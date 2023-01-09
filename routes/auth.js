const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const User = require("../models/User");
const authController = require("../controllers/auth");

router.post(
  "/login",
  [
    body("data.email")
      .isEmail()
      .withMessage("Email invaliad")
      .custom(async (value) => {
        // custom async valida with custom err mess
        return await User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("This email don't exist, try another one");
          }
        });
      }),
  ],
  authController.login
);
router.post("/logout", authController.logout);
router.post(
  "/signup",
  [
    body("data.email")
      .isEmail()
      .withMessage("Email invaliad") // custom error mess
      .custom(async (value) => {
        // custom async valida with custom err mess
        return await User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("This email exist, try another one");
          }
        });
      }),
    //   body("password", "Password can't empty and must more than 8 character") // custom err mess for all validation item link
    body("data.password", "Password must more than 8 character") // custom err mess for all validation item link
      .isLength({ min: 8 }),
    body("data.confirm").custom((value, { req }) => {
      // custom valida with custom err mess
      if (value != req.body.data.password) {
        throw new Error("Confirm not match Password");
      }
      return true;
    }),
  ],
  authController.signup
);

exports.route = router;
