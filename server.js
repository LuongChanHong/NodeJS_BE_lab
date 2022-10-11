const http = require("http");
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const sequelize = require("./util/db");

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(productRoute.route);
app.use(cartRoute.route);

app.get("/test", (request, response, next) => {
  response.write("<h1>SERVER RUN</h1>");
});

// hàm sync sẽ tạo bảng dựa vào cái model đã được sequelize define. lưu trong database ta khai báo khi khởi tại instance sequelize
sequelize
  .sync()
  .then((result) => {
    // const server = http.createServer(app);
    server.listen(5000);
  })
  .catch((err) => console.log("err:", err));
