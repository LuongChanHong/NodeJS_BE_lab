// const Product = require("../models/Product");

exports.addToCart = (request, response) => {
  const product = request.body;
  console.log("product:", product);
  request.user
    .addToCart(product)
    .then(() => {
      response.end();
    })
    .catch((err) => console.log("err:", err));
};

exports.getCartItem = (request, response) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      if (user) {
        // console.log("user.cart.items:", user.cart.items);
        response.send(user.cart.items);
      } else {
        response.statusMessage = "cart is empty";
        response.status(404).end();
      }
    })
    .catch((err) => console.log("err:", err));
};

// exports.deleteCartItem = (request, response) => {
//   const productsID = request.body.id;
//   // console.log("productsID:", productsID);
//   request.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: productsID } });
//     })
//     .then((products) => {
//       let product = products[0];
//       product.cartItem.destroy();
//     })
//     .catch((err) => console.log("err:", err));
// };
