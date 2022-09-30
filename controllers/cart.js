const Cart = require("../models/Cart");

exports.postToCart = (request, response) => {
  Cart.addToCart(request.body.id, request.body.price);
  // console.log("request:", request.body);
  // Trả về response sau khi xử lí để tránh lỗi fetch ở UI
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.write(JSON.stringify({ msg: "success" }));
  response.end();
};
