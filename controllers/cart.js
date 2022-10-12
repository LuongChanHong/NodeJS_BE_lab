const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = (request, response) => {
  const requestItem = request.body;
  // console.log("requestItem:", requestItem);
  // Tìm product muốn thêm đã có trong cart chưa
  Cart.findAll({ where: { id: requestItem.id } })
    .then((data) => {
      // console.log("data:", data);
      // Trường hợp có rồi thì tăng số lượng lên 1
      if (data.length != 0) {
        const foundItem = data[0].dataValues;
        Cart.update(
          { quantity: foundItem.quantity + 1 },
          { where: { id: requestItem.id } }
        );
        // Trường hợp chưa thì thêm product đó vô
      } else {
        Cart.create({
          ...requestItem,
          quantity: 1,
        }).catch((err) => console.log("err:", err));
      }
    })
    .catch((err) => console.log("err:", err));

  // console.log("request:", request.body);
  // Trả về response sau khi xử lí để tránh lỗi fetch ở UI
  // response.statusCode = 200;
  // response.setHeader("Content-Type", "application/json");
  // response.write(JSON.stringify({ msg: "success" }));
  // response.end();
};

exports.getCartItem = (request, response) => {
  Cart.findAll()
    .then((data) => {
      if (data) {
        const result = [];
        data.forEach((item) => result.push(item.dataValues));
        response.send(result);
      } else {
        response.statusMessage = "cart is empty";
        response.status(404).end();
      }
    })
    .catch((err) => console.log("err:", err));
};
