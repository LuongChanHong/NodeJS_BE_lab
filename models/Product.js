const mongodb = require("mongodb");
const getDB = require("../util/db").getDB;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    const db = getDB();
    db.collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("result:", result);
      })
      .catch((err) => console.log("err:", err));
  }

  static fetchALL() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log("err:", err));
  }

  static findByID(id) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log("err:", err));
  }
}

module.exports = Product;
