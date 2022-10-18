const Order = require("../models/Order");

exports.createOrder = (request, response) => {
  let _cart;
  request.user
    .getCart()
    .then((cart) => {
      _cart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      // tạo order từ tất cả item trong cart
      request.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
              // return { ...product, quantity: product.cartItem.quantity };
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      _cart.setProducts(null);
    })
    .catch((err) => console.log(err));
};

exports.getOrder = (request, response) => {
  request.user
    .getOrders()
    .then((orders) => {
      return orders.map((order) => {
        return order.getProducts();
      });
    })
    .then((productPromise) => {
      Promise.all(productPromise)
        .then((result) => {
          response.send(result);
        })
        .catch((err) => console.log("err:", err));
    })
    .catch((err) => console.log("err:", err));
};
