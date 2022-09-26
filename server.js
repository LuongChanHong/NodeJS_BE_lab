const http = require("http");
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const productRoute = require("./routes/product");

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(productRoute.route);

app.get("/test", (request, response, next) => {
  response.write("<h1>SERVER RUN</h1>");
});

const server = http.createServer(app);

server.listen(5000);
