const { where } = require("sequelize");
const Product = require("../models/Product");
const sequelize = require("../util/db");

const resultFilter = (array) => {
  const result = [];
  array.forEach((item) => result.push(item.dataValues));
  return result;
};

exports.getProducts = (request, response) => {
  Product.findAll()
    .then((data) => {
      if (data) {
        const result = resultFilter(data);
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

exports.getEditProduct = (request, response) => {
  const productID = parseInt(request.query.id);
  // console.log("productID:", productID);
  Product.findAll({ where: { id: productID } })
    .then((data) => {
      const result = resultFilter(data);
      response.send(result[0]);
    })
    .catch((err) => console.log("err:", err));
};

exports.postEditProduct = (request, response) => {
  const postProduct = request.body;
  // console.log("postProduct:", postProduct);
  Product.update({ ...postProduct }, { where: { id: postProduct.id } }).catch(
    (err) => console.log("err:", err)
  );
};
