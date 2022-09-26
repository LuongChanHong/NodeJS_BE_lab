const express = require("express");
const router = express.Router();

const userList = [
  { username: "user 1" },
  { username: "user 2" },
  { username: "user 3" },
];

router.post("/add-user", (request, response) => {
  userList.push({ username: request.body.username });
  console.log("userList:", userList);
});

exports.route = router;
exports.userList = userList;
