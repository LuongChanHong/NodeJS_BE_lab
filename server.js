const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

// const mongodb = require("./util/db");

const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");

const MONGODB_URI =
  "mongodb+srv://mongodb_admin:mongodb_admin@cluster0.e6b0l5j.mongodb.net/shop?retryWrites=true&w=majority";

const User = require("./models/User");

const app = express();
const sessionStore = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  expires: true,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "secret cookie",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use((request, response, next) => {
  User.findById("6358f5856fed1c1ea865fd32")
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((err) => console.log("err:", err));
});

app.use(productRoute.route);
app.use(cartRoute.route);
app.use(orderRoute.route);
app.use(authRoute.route);

// app.get("/test", (request, response, next) => {
//   response.write("<h1>SERVER RUN</h1>");
// });

mongoose
  .connect(MONGODB_URI)
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
