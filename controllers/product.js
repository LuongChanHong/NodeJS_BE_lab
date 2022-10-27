const mongodb = require("mongodb");
const Product = require("../models/Product");

exports.getProducts = (request, response) => {
  Product.find()
    .then((products) => {
      if (products.length == 0) {
        response.statusMessage = "not found products";
        response.status(404).end();
      } else {
        response.send(products);
      }
    })
    .catch((err) => console.log("err getProducts:", err));
};

exports.getProduct = (request, response) => {
  const productID = request.query.id;
  Product.findById(productID)
    .then((product) => {
      response.send(product);
    })
    .catch((err) => console.log("err:", err));
};

exports.postAddProduct = (request, response) => {
  const product = new Product({
    title: request.body.title,
    price: request.body.price,
    description: request.body.description,
    imageUrl: request.body.imageUrl,
    userId: request.user._id,
  });
  product.save();
};

exports.postEditProduct = (request, response) => {
  const postProduct = request.body;
  Product.findById(postProduct._id)
    .then((product) => {
      // console.log("product:", product);
      // cách 1
      // product.title = request.body.title;
      // product.price = request.body.price;
      // product.description = request.body.description;
      // product.imageUrl = request.body.imageUrl;
      // cách 2
      for (let postProperty in postProduct) {
        product[`${postProperty}`] = postProduct[`${postProperty}`];
      }
      product.save();
    })
    .catch((err) => console.log("::ERROR:", err));
};

exports.deleteProduct = (request, response) => {
  const productID = request.body._id;
  // console.log("request.body:", request.body);
  Product.findByIdAndRemove(productID)
    .then(() => {
      response.end();
    })
    .catch((err) => console.log("err:", err));
};
