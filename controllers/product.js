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

  // const prodId = req.body.productId;
  // const updatedTitle = req.body.title;
  // const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  // const updatedDesc = req.body.description;
  // Product.findById(prodId)
  //   .then((product) => {
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.description = updatedDesc;
  //     product.imageUrl = updatedImageUrl;
  //     return product.save();
  //   })
  //   .then((result) => {
  //     console.log("UPDATED PRODUCT!");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};

exports.deleteProduct = (request, response) => {
  const productID = request.body.id;
  Product.findByPk(productID)
    .then((result) => {
      result.destroy();
      response.end();
    })
    .catch((err) => console.log("err:", err));
  console.log("productID:", productID);
};
