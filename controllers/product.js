const Product = require("../models/Product");
exports.getProducts = (request, response) => {
  const products = Product.fetchAll();
  response.send(products);
};
exports.postProduct = (request, response) => {
  const product = new Product(
    request.body.title,
    request.body.description,
    request.body.price
  );
  product.add();
  // Product.create({
  //   title: request.body.title,
  //   price: request.body.price,
  //   imageUrl: request.body.imageUrl,
  //   description: request.body.description,
  // })
  //   .then((result) => console.log("result:", result))
  //   .catch((err) => console.log("err:", err));
};
