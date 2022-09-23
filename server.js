const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminData.route);

// app.get("/", (request, response, next) => {
//   response.send(adminData.userList);
// });

const server = http.createServer(app);

server.listen(5000);
