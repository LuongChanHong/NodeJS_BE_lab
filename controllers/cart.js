const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = (request, response) => {
  const productID = request.body.id;
  let newQuantity = 1;
  let _cart;
  request.user
    .getCart()
    .then((cart) => {
      _cart = cart;
      return cart.getProducts({ where: { id: productID } });
    })
    .then((products) => {
      // trường hợp đã có product trong cart
      // ta tăng thuộc tính quantity lên 1
      // trường hợp chưa có product trong cart
      // ta chạy đoạn then tiếp theo để thêm product mới
      if (products.length > 0) {
        const oldQuantity = products[0].cartItem.quantity;
        newQuantity = oldQuantity + 1;
      }
      return Product.findByPk(productID);
    })
    .then((product) => {
      _cart.addProduct(product.id, { through: { quantity: newQuantity } });
    })
    .catch((err) => console.log("err:", err));
  console.log("requestItem:", requestItem);
  // let _cart;
  // request.user
  //   .getCart()
  //   .then((cart) => {
  //     _cart = cart;
  //     cart
  //       .getProducts({ where: { id: requestItem.id } })
  //       .then((products) => {
  //         let quantity = 1;
  //         if (products.length > 0) {
  //           // console.log("products.length:", products.length);
  //           // console.log("products[0]:", products[0]);
  //           quantity = products[0].cartItem.quantity + 1;
  //           _cart.addProduct(products[0], { through: { quantity: quantity } });
  //         } else {
  //           // console.log("products.length:", products.length);
  //           Product.findByPk(requestItem.id)
  //             .then((product) => {
  //               _cart.addProduct(product.id, { through: { quantity: 1 } });
  //             })
  //             .catch((err) => console.log("err:", err));
  //         }
  //       })
  //       .catch((err) => console.log("err:", err));
  //   })
  //   .catch((err) => console.log("err:", err));

  // ==================================================

  // // console.log("requestItem:", requestItem);
  // // Tìm product muốn thêm đã có trong cart chưa
  // Cart.findAll({ where: { id: requestItem.id } })
  //   .then((data) => {
  //     // console.log("data:", data);
  //     // Trường hợp có rồi thì tăng số lượng lên 1
  //     if (data.length != 0) {
  //       const foundItem = data[0].dataValues;
  //       Cart.update(
  //         { quantity: foundItem.quantity + 1 },
  //         { where: { id: requestItem.id } }
  //       );
  //       // Trường hợp chưa thì thêm product đó vô
  //     } else {
  //       Cart.create({
  //         ...requestItem,
  //         quantity: 1,
  //       }).catch((err) => console.log("err:", err));
  //     }
  //   })
  //   .catch((err) => console.log("err:", err));
};

exports.getCartItem = (request, response) => {
  request.user
    .getCart()
    .then((cart) => {
      cart
        .getProducts()
        .then((products) => {
          if (products) {
            response.send(products);
          } else {
            response.statusMessage = "cart is empty";
            response.status(404).end();
          }
        })
        .catch((err) => console.log("err:", err));
    })
    .catch((err) => console.log("err:", err));
};

exports.deleteCartItem = (request, response) => {
  const productsID = request.body.id;
  // console.log("productsID:", productsID);
  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productsID } });
    })
    .then((products) => {
      let product = products[0];
      product.cartItem.destroy();
    })
    .catch((err) => console.log("err:", err));
};
