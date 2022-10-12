const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");

router.post("/add-to-cart", cartController.addToCart);
router.get("/get-cart", cartController.getCartItem);

exports.route = router;
