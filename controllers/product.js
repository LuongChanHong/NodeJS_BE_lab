const Product = require("../models/Product");
exports.getProducts = (request, response) => {
  Product.fetchAll((products) => {
    response.send(products);
  });
};

exports.postProduct = (request, response) => {
  const product = new Product(
    request.body.title,
    request.body.description,
    request.body.price
  );
  product.add();
};
