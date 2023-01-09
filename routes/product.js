const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const productController = require("../controllers/product");

// router.post("/add-product", (request, response) => {
//   products.push({ username: request.body.username });
//   console.log("products:", products);
// });

/** title: "",
    description: "",
    price: "",
    imageUrl: "", */

router.get("/get-products", productController.getProducts);
router.get("/get-product", productController.getProduct);
router.post(
  "/add-product",
  [
    body("title", "Title at least have 3 number or alphabet character")
      .trim()
      .matches(/^[a-zA-Z0-9 ]+$/i)
      .isLength({ min: 3 }),
    body("imageUrl", "Image url can't be empty").notEmpty().trim(),
    body("price", "Price must be real number").isInt(),
    body("description", "Description at least 5 character")
      .trim()
      .isLength({ min: 5 }),
  ],
  productController.postAddProduct
);
router.post("/post-edit-product", productController.postEditProduct);
router.post("/post-delete-product", productController.deleteProduct);

exports.route = router;
