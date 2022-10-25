const mongodb = require("mongodb");
const Product = require("../models/Product");

exports.getProducts = (request, response) => {
  Product.fetchALL()
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
  Product.findByID(productID)
    .then((product) => {
      response.send(product);
    })
    .catch((err) => console.log("err:", err));
};

exports.postAddProduct = (request, response) => {
  const product = new Product(
    request.body.title,
    request.body.price,
    request.body.description,
    request.body.imageUrl
  );
  product.save();
};

exports.postEditProduct = (request, response) => {
  const postProduct = request.body;
  // console.log("postProduct:", postProduct);
  const product = new Product(
    postProduct.title,
    postProduct.price,
    postProduct.description,
    postProduct.imageUrl,
    new mongodb.ObjectId(postProduct._id)
  );
  product
    .save()
    .then((result) => {
      console.log("result:", result);
    })
    .catch((err) => console.log("err:", err));
};

// exports.deleteProduct = (request, response) => {
//   const productID = request.body.id;
//   Product.findByPk(productID)
//     .then((result) => {
//       result.destroy();
//       response.end();
//     })
//     .catch((err) => console.log("err:", err));
//   console.log("productID:", productID);
// };
