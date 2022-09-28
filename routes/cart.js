const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");

router.post("/add-to-cart", cartController.postToCart);

exports.route = router;
