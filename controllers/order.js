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
  Order.find({ "user.userId": request.user._id })
    .then((orders) => {
      if (orders.length != 0) {
        response.send(orders);
      } else {
        response.statusMessage = "not found orders";
        response.status(404).end();
      }
    })
    .catch((err) => console.log("err:", err));
};
