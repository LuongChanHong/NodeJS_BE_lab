const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

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
  User.findByID("635652c316d219afdb97cb89")
    .then((user) => {
      request.user = new User(user.name, user.email, user.cart, user._id);
      // console.log("request.user:", request.user);
      next();
    })
    .catch((err) => console.log("err:", err));
});

app.use(productRoute.route);
app.use(cartRoute.route);
app.use(orderRoute.route);

// app.get("/test", (request, response, next) => {
//   response.write("<h1>SERVER RUN</h1>");
// });

mongodb.mongoConnect(() => {
  app.listen(5000);
});
