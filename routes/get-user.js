const express = require("express");
const route = express.Router();

const addUserData = require("./add-user");

route.get("/get-user", (request, response, next) => {
  console.log("addUserData.userList:", addUserData.userList);
  response.send(addUserData.userList);
});

exports.route = route;
