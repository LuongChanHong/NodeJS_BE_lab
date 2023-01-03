const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login", authController.login);
router.get("/getCookie", authController.login);

exports.route = router;
