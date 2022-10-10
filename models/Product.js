const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: { type: Sequelize.DOUBLE, allowNull: false },
  imageUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Product;

// const db = require("../util/db");

// // const fs = require("fs");
// // const path = require("path");
// // const productsFolder = path.join(
// //   path.dirname(require.main.filename),
// //   "data",
// //   "products.json"
// // );
// // const getProductFromFile = (callback) => {
// //   fs.readFile(productsFolder, (error, fileContent) => {
// //     if (!error) {
// //       callback(JSON.parse(fileContent));
// //     } else {
// //       callback([]);
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(title, description, price) {
//     this.id = Math.random().toString();
//     this.title = title;
//     this.imageUrl =
//       "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg";
//     this.description = description;
//     this.price = price;
//   }

//   add() {}

//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   // add() {
//   //   getProductFromFile((products) => {
//   //     products.push(this);
//   //     fs.writeFile(productsFolder, JSON.stringify(products), (error) => {
//   //       if (error) {
//   //         console.log("error:", error);
//   //       }
//   //     });
//   //   });
//   // }

//   // static fetchAll(callback) {
//   //   getProductFromFile(callback);
//   // }
// };
