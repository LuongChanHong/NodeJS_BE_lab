const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  // mongoose relation
  cart: {
    items: [
      {
        product: {
          type: Object,
          ref: "Product", // mongoose relation
          require: true,
        },
        quantity: { type: Number, require: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  // trường hợp user đã có object cart
  if (this.cart) {
    const index = this.cart.items.findIndex(
      (item) => item.product._id.toString() === product._id.toString()
    );
    const updateItems = [...this.cart.items];
    if (index >= 0) {
      updateItems[index].quantity = updateItems[index].quantity + 1;
    } else {
      updateItems.push({
        product: product,
        quantity: 1,
      });
    }
    this.cart = {
      items: updateItems,
    };
    // trường hợp user chưa có object cart
  } else {
    this.cart = { items: [{ product: product, quantity: 1 }] };
  }
  return this.save();
};

userSchema.methods.deleteFromCart = function (id) {
  const updateCartItems = this.cart.items.filter((item) => {
    return item._id.toString() != id.toString();
  });
  this.cart.items = updateCartItems;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const mongodb = require("mongodb");
// const getDB = require("../util/db").getDB;

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDB();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(id) {
//     let setObject;
//     // trường hợp user đã có object cart
//     if (this.cart) {
//       const index = this.cart.items.findIndex(
//         (item) => item.productId.toString() === id.toString()
//       );
//       const updateItems = [...this.cart.items];
//       if (index >= 0) {
//         updateItems[index].quantity = updateItems[index].quantity + 1;
//       } else {
//         updateItems.push({
//           productId: new mongodb.ObjectId(id),
//           quantity: 1,
//         });
//       }
//       setObject = {
//         cart: {
//           items: updateItems,
//         },
//       };
//       // trường hợp user chưa có object cart
//     } else {
//       this.cart = { items: [{ productId: id, quantity: 1 }] };
//       setObject = this;
//     }
//     const db = getDB();
//     return db
//       .collection("users")
//       .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: setObject });
//   }

//   deleteCartItem(id) {
//     const updateCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() != id.toString();
//     });
//     const db = getDB();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updateCartItems } } }
//       );
//   }

//   getCart() {
//     let result = [];
//     const db = getDB();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         this.cart.items.forEach((item) => {
//           const findProduct = products.find(
//             (prod) => item.productId.toString() === prod._id.toString()
//           );
//           if (findProduct) {
//             delete findProduct.userId;
//             findProduct.quantity = item.quantity;
//             result.push(findProduct);
//           }
//         });
//         return result;
//       })
//       .catch((err) => console.log("err:", err));
//   }

//   createOrder() {
//     return this.getCart()
//       .then((products) => {
//         const newOrders = {
//           items: products,
//           userId: this._id,
//         };
//         const db = getDB();
//         return db
//           .collection("orders")
//           .insertOne(newOrders)
//           .then((result) => {
//             this.cart.items = [];
//             db.collection("users").updateOne(
//               { _id: new mongodb.ObjectId(this._id) },
//               { $set: { cart: { items: [] } } }
//             );
//           })
//           .catch((err) => console.log("err:", err));
//       })
//       .catch((err) => console.log("err:", err));
//   }

//   getOrders() {
//     const db = getDB();
//     return db
//       .collection("orders")
//       .find()
//       .toArray()
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log("err:", err));
//   }

//   static findByID(id) {
//     const db = getDB();
//     return db.collection("users").findOne({ _id: mongodb.ObjectId(id) });
//   }
// }

// module.exports = User;
