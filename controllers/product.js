const mongodb = require("mongodb");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length == 0) {
      res.statusMessage = "not found products";
      res.status(404).end();
    } else {
      res.send(products);
    }
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productID = req.query.id;
    const product = await Product.findById(productID);
    if (product) {
      res.send(product);
    }
  } catch (error) {
    return next(new Error(error));
  }
};

exports.postAddProduct = (req, res, next) => {
  try {
    console.log("req.file:", req.file);
    // console.log("req.body:", req.body);
    const url =
      req.file.path.split("\\")[0] + "/" + req.file.path.split("\\")[1];
    // console.log("url:", url);
    const image = req.file;
    if (!image) {
      res.send([{ msg: "Image file invalid" }]);
    }
    const errors = validationResult(req).array({ onlyFirstError: true });
    // console.log("errors:", errors);
    if (errors.length <= 0) {
      const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: url,
        // userId: req.user._id,
      });
      // console.log("product:", product);
      product.save();
    } else {
      res.send(errors);
    }
    res.end();
  } catch (error) {
    return next(new Error(error));
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // console.log("errors:", errors);
    if (errors.length <= 0) {
      const postProduct = req.body;
      const postImage = req.file;
      // console.log("postProduct:", postProduct);
      const product = await Product.findById(postProduct._id);
      // console.log("product:", product);
      if (product) {
        for (let postProperty in postProduct) {
          product[`${postProperty}`] = postProduct[`${postProperty}`];
        }
        if (postImage) {
          product.imageUrl = postImage.path;
        }
        product.save();
      }
    } else {
      res.send(errors);
    }
    res.end();
  } catch (error) {
    return next(new Error(error));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productID = req.body._id;
    // console.log("req.body:", req.body);
    await Product.findByIdAndRemove(productID);
    res.end();
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getImage = (req, res, next) => {
  console.log("req.query:", req.query);
  const image = "../images/" + req.query;
  console.log("image:", image);
  res.end();
};
