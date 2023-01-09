const mongodb = require("mongodb");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      if (products.length == 0) {
        res.statusMessage = "not found products";
        res.status(404).end();
      } else {
        res.send(products);
      }
    })
    .catch((err) => console.log("err getProducts:", err));
};

exports.getProduct = (req, res) => {
  const productID = req.query.id;
  Product.findById(productID)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log("err:", err));
};

exports.postAddProduct = (req, res) => {
  const errors = validationResult(req).array({ onlyFirstError: true });
  // console.log("errors:", errors);
  if (errors.length <= 0) {
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      // userId: req.user._id,
    });
    // console.log("product:", product);
    product.save();
  } else {
    res.send(errors);
  }
  res.end();
};

exports.postEditProduct = (req, res) => {
  const postProduct = req.body;
  Product.findById(postProduct._id)
    .then((product) => {
      // console.log("product:", product);
      // cách 1
      // product.title = req.body.title;
      // product.price = req.body.price;
      // product.description = req.body.description;
      // product.imageUrl = req.body.imageUrl;
      // cách 2
      for (let postProperty in postProduct) {
        product[`${postProperty}`] = postProduct[`${postProperty}`];
      }
      product.save();
    })
    .catch((err) => console.log("::ERROR:", err));
};

exports.deleteProduct = (req, res) => {
  const productID = req.body._id;
  // console.log("req.body:", req.body);
  Product.findByIdAndRemove(productID)
    .then(() => {
      res.end();
    })
    .catch((err) => console.log("err:", err));
};
