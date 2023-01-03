const mongodb = require("mongodb");

exports.login = (req, res) => {
  // const reqData = req.body;
  // console.log(reqData);
  // console.log("authCookie:", authCookie);
  // res
  //   .cookie("testing_cookie", authCookie)
  //   .status(200)
  //   .send({ authCookie: authCookie });
  req.session.isLoggedIn = true;
  res.end();
  // console.log("value:", res._header.includes("testing_cookie=adasdasdasdasda"));
};
