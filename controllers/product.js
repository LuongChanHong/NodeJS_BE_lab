const Product = require("../models/Product");
exports.getProducts = (request, response) => {
  Product.findAll()
    .then((data) => {
      if (data) {
        const result = [];
        data.forEach((item) => result.push(item.dataValues));
        response.send(result);
      } else {
        response.statusMessage = "database is empty";
        response.status(404).end();
      }
    })
    .catch((err) => console.log("err:", err));
};
exports.postAddProduct = (request, response) => {
  // const product = new Product(
  //   request.body.title,
  //   request.body.description,
  //   request.body.price
  // );
  // product.add();
  Product.create({
    title: request.body.title,
    price: request.body.price,
    imageUrl: request.body.imageUrl,
    description: request.body.description,
  })
    .then((result) => console.log("result:", result))
    .catch((err) => console.log("err:", err));
};
