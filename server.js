const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongodb = require("./util/db");

const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const User = require("./models/User");

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((request, response, next) => {
  User.findById("6358f5856fed1c1ea865fd32")
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((err) => console.log("err:", err));
});

app.use(productRoute.route);
// app.use(cartRoute.route);
// app.use(orderRoute.route);

// app.get("/test", (request, response, next) => {
//   response.write("<h1>SERVER RUN</h1>");
// });

mongoose
  .connect(
    "mongodb+srv://mongodb_admin:mongodb_admin@cluster0.e6b0l5j.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "User",
            email: "user@email.com",
            cart: { items: [] },
          });
          user.save();
        }
      })
      .catch((err) => console.log("::ERROR:", err));
    app.listen(5000);
  })
  .catch((err) => console.log("mongoose connect err:", err));
