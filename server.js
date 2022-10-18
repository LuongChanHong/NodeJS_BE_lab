const http = require("http");
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const sequelize = require("./util/db");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/OrderItem");

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((request, response, next) => {
  User.findByPk(1)
    .then((user) => {
      request.user = user;
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

User.hasMany(Product, { constranints: true, onDelete: "CASCADE" });
User.hasOne(Cart);
Cart.hasMany(CartItem);
Cart.belongsToMany(Product, { through: CartItem });
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// hàm sync sẽ tạo bảng dựa vào cái model đã được sequelize define. lưu trong database ta khai báo khi khởi tại instance sequelize
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "User", email: "somemail@mail.com" });
    }
    return user;
  })
  // .then((user) => {
  //   return user.createCart();
  // })
  // .then((cart) => {
  //   app.listen(5000);
  // })
  .then((user) => {
    app.listen(5000);
  })
  .catch((err) => console.log("err:", err));
