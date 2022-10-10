const Product = require("../models/Product");
exports.getProducts = (request, response) => {
  Product.fetchAll()
    .then(([products, otherData]) => {
      response.send(products);
    })
    .catch((err) => console.log("err:", err));
};

exports.postProduct = (request, response) => {
  const product = new Product(
    request.body.title,
    request.body.description,
    request.body.price
  );
  product.add();
};
