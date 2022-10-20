const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

// router.post("/add-product", (request, response) => {
//   products.push({ username: request.body.username });
//   console.log("products:", products);
// });

router.get("/get-products", productController.getProducts);
router.get("/get-product", productController.getProduct);
router.post("/add-product", productController.postAddProduct);
// router.get("/get-edit-product", productController.getEditProduct);
// router.post("/post-edit-product", productController.postEditProduct);
// router.post("/post-delete-product", productController.deleteProduct);

exports.route = router;
