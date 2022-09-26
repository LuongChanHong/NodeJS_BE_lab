const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

// router.post("/add-product", (request, response) => {
//   products.push({ username: request.body.username });
//   console.log("products:", products);
// });

router.get("/get-product", productController.getProducts);
router.post("/add-product", productController.postProduct);

exports.route = router;
