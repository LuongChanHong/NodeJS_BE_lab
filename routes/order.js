const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/create-order", orderController.createOrder);
router.get("/get-order", orderController.getOrder);
router.get("/get-invoice", orderController.getInvoice);

exports.route = router;
