const mongodb = require("mongodb");
const getDB = require("../util/db").getDB;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }
  save() {
    const db = getDB();
    let _db;
    if (this._id) {
      _db = db.collection("products").updateOne(
        {
          _id: new mongodb.ObjectId(this._id),
        },
        { $set: this }
      );
    } else {
      _db = db.collection("products").insertOne(this);
    }
    _db
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
      .catch((err) => console.log("err fetchALL:", err));
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
