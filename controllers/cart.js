const Cart = require("../models/Cart");

exports.postToCart = (request, response) => {
  Cart.addToCart(request.body.id, request.body.price);
  // console.log("request:", request.body);
};
