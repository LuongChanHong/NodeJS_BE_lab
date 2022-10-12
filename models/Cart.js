const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: { type: Sequelize.DOUBLE, allowNull: false },
  imageUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;

// const fs = require("fs");
// const path = require("path");

// const cartFolder = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "cart.json"
// );

// // Tạo file cart.json
// const createNewCart = () => {
//   let cart = {
//     products: [],
//     totalPrice: 0,
//   };
//   fs.writeFile(
//     path.join(path.dirname(require.main.filename), "data"),
//     "cart.json",
//     cart
//   );
// };
// const addProductToCart = (id, price) => {
//   fs.readFile(cartFolder, (error, cartFile) => {
//     const cart = JSON.parse(cartFile);
//     // Trường hợp đã có file cart.json trong thư mục
//     if (error === null) {
//       const index = cart.products.findIndex((item) => item.id === id);
//       // Trường hợp id product tồn tại trong cart
//       if (index >= 0) {
//         // Tăng số lượng product
//         let count = cart.products[index].quantity;
//         cart.products[index].quantity = count + 1;
//         console.log(
//           "id:",
//           cart.products[index].id,
//           "quantity:",
//           cart.products[index].quantity
//         );
//         fs.writeFile(cartFolder, JSON.stringify(cart), (error) => {
//           if (error) {
//             console.log("error:", error);
//           }
//         });
//         // Trường hợp id product chưa có trong cart
//       } else {
//         cart.products.push({
//           id: id,
//           quantity: 1,
//         });
//         fs.writeFile(cartFolder, JSON.stringify(cart), (error) => {
//           if (error) {
//             console.log("error:", error);
//           }
//         });
//       }
//       // Trường hợp chưa có file cart.json trong thư mục
//     } else {
//       // Tạo file cart.json
//       createNewCart();
//     }
//   });
// };

// module.exports = class Cart {
//   static addToCart(id, price) {
//     addProductToCart(id, price);
//   }
// };
