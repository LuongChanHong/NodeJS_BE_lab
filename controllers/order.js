const Order = require("../models/Order");

exports.createOrder = (res, req, next) => {
  try {
    res.user
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
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getOrder = (res, req, next) => {
  try {
    Order.find({ "user.userId": res.user._id })
      .then((orders) => {
        if (orders.length != 0) {
          req.send(orders);
        } else {
          req.statusMessage = "not found orders";
          req.status(404).end();
        }
      })
      .catch((err) => console.log("err:", err));
  } catch (error) {
    return next(new Error(error));
  }
};
