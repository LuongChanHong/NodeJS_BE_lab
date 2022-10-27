const Order = require("../models/Order");

exports.createOrder = (request, response) => {
  request.user
    .populate("cart.items.product")
    .then((user) => {
      const orderProducts = [];
      if (user) {
        user.cart.items.forEach((item) => {
          const newItems = { product: item.product, quantity: item.quantity };
          orderProducts.push(newItems);
        });
        const order = new Order({
          products: orderProducts,
          user: { name: user.name, userId: user._id },
        });
        order.save();
        user.cart.items = [];
        user.save();
      }
    })
    .catch((err) => console.log("err:", err));
};

exports.getOrder = (request, response) => {
  Order.find()
    .then((orders) => {
      if (orders.length == 0) {
        console.log("orders:", orders);
        // response.statusMessage = "not found orders";
        // response.status(404).end();
      } else {
        response.send(orders);
      }
    })
    .catch((err) => console.log("err:", err));
  // request.user
  //   .getOrders()
  //   .then((orders) => {
  //     return orders.map((order) => {
  //       return order.getProducts();
  //     });
  //   })
  //   .then((productPromise) => {
  //     Promise.all(productPromise)
  //       .then((result) => {
  //         response.send(result);
  //       })
  //       .catch((err) => console.log("err:", err));
  //   })
  //   .catch((err) => console.log("err:", err));
};
