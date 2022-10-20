const Product = require("../models/Product");

exports.getProducts = (request, response) => {
  Product.fetchALL()
    .then((products) => {
      if (!products || products.length === 0) {
        response.statusMessage = "not found products";
        response.status(404).end();
      }
      response.send(products);
    })
    .catch((err) => console.log("err:", err));
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

// exports.getEditProduct = (request, response) => {
//   const productID = request.query.id;
//   // console.log("productID:", productID);
//   request.user
//     .getProducts({ where: { id: productID } })
//     .then((data) => {
//       const result = resultFilter(data);
//       response.send(result[0]);
//     })
//     .catch((err) => console.log("err:", err));
// };

// exports.postEditProduct = (request, response) => {
//   const postProduct = request.body;
//   // console.log("postProduct:", postProduct);
//   Product.update({ ...postProduct }, { where: { id: postProduct.id } }).catch(
//     (err) => console.log("err:", err)
//   );
// };

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
